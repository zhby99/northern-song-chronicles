#!/usr/bin/env python3
"""
《北宋立志传》M0-2 & M0-3 标准 ID 字典对齐与全量静态数据库编译器

功能：
1. [M0-2] 建立全局唯一的 38 地区 ID、20 门派(+11 朝堂/地域组织) ID、216 武学 ID 权威字典；
   支持 `--normalize-docs` 模式，幂等批量修正 `docs/CHARACTER_COMPENDIUM.md` 中的旧地名，
   并修复 `docs/*.md` 中的旧跨分支 `file:///...` 绝对路径为相对路径。
2. [M0-3] 解析四大 Markdown 设定文档 + 现有地图/内景/立绘配置，生成严格类型化且零未解析引用的静态 JSON：
   - src/data/idRegistry.json
   - src/data/regions.json
   - src/data/buildings.json
   - src/data/martial_arts.json
   - src/data/npcs.json
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any

ROOT_DIR = Path(__file__).resolve().parent.parent
DOCS_DIR = ROOT_DIR / "docs"
DATA_DIR = ROOT_DIR / "src" / "data"
PUBLIC_DIR = ROOT_DIR / "public"


# ==============================================================================
# 1. [M0-2] 43 地区标准字典与旧地名归一表
# ==============================================================================

CANONICAL_REGION_ORDER: list[tuple[str, str, str]] = [
    # 01~15 大宋十五府
    ("REG-01", "01", "bianliang"),
    ("REG-02", "02", "luoyang"),
    ("REG-03", "03", "daming"),
    ("REG-04", "04", "zhending"),
    ("REG-05", "05", "taiyuan"),
    ("REG-06", "06", "changan"),
    ("REG-07", "07", "yanan"),
    ("REG-08", "08", "jinan"),
    ("REG-09", "09", "yangzhou"),
    ("REG-10", "10", "jiangning"),
    ("REG-11", "11", "suzhou"),
    ("REG-12", "12", "hangzhou"),
    ("REG-13", "13", "chengdu"),
    ("REG-14", "14", "xiangyang"),
    ("REG-15", "15", "quanzhou"),
    # 16~21 四夷列国六城
    ("REG-16", "16", "xijin_liao"),
    ("REG-17", "17", "dading_liao"),
    ("REG-18", "18", "linhuang_liao"),
    ("REG-19", "19", "xingqing_xixia"),
    ("REG-20", "20", "luoxie_tubo"),
    ("REG-21", "21", "dali_city"),
    # 22~38 十七名山秘境与战略雄关
    ("REG-22", "22", "kunlun"),
    ("REG-23", "23", "shaolin"),
    ("REG-24", "24", "yanmenguan"),
    ("REG-25", "25", "wutaishan"),
    ("REG-26", "26", "taihang"),
    ("REG-27", "27", "tongguan"),
    ("REG-28", "28", "zhongnanshan"),
    ("REG-29", "29", "taishan"),
    ("REG-30", "30", "yanziwu"),
    ("REG-31", "31", "taohuadao"),
    ("REG-32", "32", "jianmenguan"),
    ("REG-33", "33", "qingcheng"),
    ("REG-34", "34", "emeishan"),
    ("REG-35", "35", "wuliangshan"),
    ("REG-36", "36", "wudangshan"),
    ("REG-37", "37", "tiezhangfeng"),
    ("REG-38", "38", "nanshaolin"),
    # 39~42 新增四座大宋州府重镇（皇祐二年）
    ("REG-39", "39", "guangzhou"),
    ("REG-40", "40", "tanzhou"),
    ("REG-41", "41", "hongzhou"),
    ("REG-42", "42", "qinzhou"),
    # 43 新增辽国东京道重镇
    ("REG-43", "43", "liaoyang_liao"),
]

# 任意旧地名 / 规范地名 -> (regionId, 规范文档展示名, subLocation)
LOCATION_RESOLUTION_MAP: dict[str, tuple[str, str, str | None]] = {
    # 01 开封府
    "东京汴梁": ("bianliang", "开封府", None),
    "开封府": ("bianliang", "开封府", None),
    # 02 洛阳府
    "西京洛阳": ("luoyang", "洛阳府", None),
    "洛阳府": ("luoyang", "洛阳府", None),
    # 03 大名府
    "北京大名府": ("daming", "大名府", None),
    "大名府": ("daming", "大名府", None),
    # 04 真定府
    "真定府": ("zhending", "真定府", None),
    # 05 太原府
    "太原府": ("taiyuan", "太原府", None),
    # 06 京兆府
    "京兆长安": ("changan", "京兆府", None),
    "京兆府": ("changan", "京兆府", None),
    # 07 延安府
    "延州（延安）": ("yanan", "延安府", None),
    "延安府": ("yanan", "延安府", None),
    # 08 济南府
    "青州 / 济南": ("jinan", "济南府", "青州/济南"),
    "济南府": ("jinan", "济南府", None),
    # 09 扬州府
    "扬州": ("yangzhou", "扬州府", None),
    "扬州府": ("yangzhou", "扬州府", None),
    # 10 江宁府
    "江宁府": ("jiangning", "江宁府", None),
    # 11 苏州府
    "苏州（平江）": ("suzhou", "苏州府", None),
    "苏州府": ("suzhou", "苏州府", None),
    # 12 杭州府
    "杭州（临安）": ("hangzhou", "杭州府", None),
    "杭州府": ("hangzhou", "杭州府", None),
    # 13 成都府
    "成都府": ("chengdu", "成都府", None),
    # 14 襄阳府
    "江陵 / 襄阳": ("xiangyang", "襄阳府", "江陵/襄阳"),
    "襄阳府": ("xiangyang", "襄阳府", None),
    # 15 泉州府
    "福州 / 泉州": ("quanzhou", "泉州府", "福州/泉州"),
    "泉州府": ("quanzhou", "泉州府", None),
    # 16 析津府
    "南京析津府（幽州）": ("xijin_liao", "析津府", None),
    "析津府": ("xijin_liao", "析津府", None),
    # 17 大定府
    "中京大定府": ("dading_liao", "大定府", None),
    "大定府": ("dading_liao", "大定府", None),
    # 18 临潢府
    "上京临潢府": ("linhuang_liao", "临潢府", None),
    "临潢府": ("linhuang_liao", "临潢府", None),
    # 19 兴庆府
    "兴庆府（银川）": ("xingqing_xixia", "兴庆府", None),
    "兴庆府": ("xingqing_xixia", "兴庆府", None),
    # 20 逻些（拉萨）
    "逻些（拉萨）": ("luoxie_tubo", "逻些（拉萨）", None),
    # 21 阳苴咩城（大理）
    "阳苴咩城（大理）": ("dali_city", "阳苴咩城（大理）", None),
    # 22 昆仑山（万山之祖）
    "昆仑山": ("kunlun", "昆仑山（万山之祖）", None),
    "昆仑山（万山之祖）": ("kunlun", "昆仑山（万山之祖）", None),
    # 23 嵩山少林寺
    "嵩山少林寺": ("shaolin", "嵩山少林寺", None),
    # 24 雁门关
    "雁门关": ("yanmenguan", "雁门关", None),
    # 25 五台山清凉寺
    "五台山": ("wutaishan", "五台山清凉寺", None),
    "五台山清凉寺": ("wutaishan", "五台山清凉寺", None),
    # 26 太行山绿林总寨
    "太行山绿林总寨": ("taihang", "太行山绿林总寨", None),
    # 27 潼关 / 西岳华山（保留双子片区）
    "潼关": ("tongguan", "潼关 / 西岳华山（潼关）", "潼关"),
    "潼关 / 西岳华山（潼关）": ("tongguan", "潼关 / 西岳华山（潼关）", "潼关"),
    "华山": ("tongguan", "潼关 / 西岳华山（华山）", "西岳华山"),
    "潼关 / 西岳华山（华山）": ("tongguan", "潼关 / 西岳华山（华山）", "西岳华山"),
    "潼关 / 西岳华山": ("tongguan", "潼关 / 西岳华山", None),
    # 28 终南山隐宗
    "终南山": ("zhongnanshan", "终南山隐宗", None),
    "终南山隐宗": ("zhongnanshan", "终南山隐宗", None),
    # 29 东岳泰山
    "泰山": ("taishan", "东岳泰山", None),
    "东岳泰山": ("taishan", "东岳泰山", None),
    # 30 太湖燕子坞
    "太湖燕子坞": ("yanziwu", "太湖燕子坞", None),
    # 31 东海桃花岛
    "东海桃花岛": ("taohuadao", "东海桃花岛", None),
    # 32 剑门关
    "剑门关": ("jianmenguan", "剑门关", None),
    # 33 青城山 / 唐家堡（保留双子片区）
    "青城山": ("qingcheng", "青城山 / 唐家堡（青城山）", "青城山"),
    "青城山 / 唐家堡（青城山）": ("qingcheng", "青城山 / 唐家堡（青城山）", "青城山"),
    "唐家堡": ("qingcheng", "青城山 / 唐家堡（唐家堡）", "唐家堡"),
    "青城山 / 唐家堡（唐家堡）": ("qingcheng", "青城山 / 唐家堡（唐家堡）", "唐家堡"),
    "青城山 / 唐家堡": ("qingcheng", "青城山 / 唐家堡", None),
    # 34 蜀中峨眉山
    "峨眉山": ("emeishan", "蜀中峨眉山", None),
    "蜀中峨眉山": ("emeishan", "蜀中峨眉山", None),
    # 35 无量山 / 剑湖秘境
    "无量山": ("wuliangshan", "无量山 / 剑湖秘境", None),
    "无量山 / 剑湖秘境": ("wuliangshan", "无量山 / 剑湖秘境", None),
    # 36 武当山真武道宗
    "武当山": ("wudangshan", "武当山真武道宗", None),
    "武当山真武道宗": ("wudangshan", "武当山真武道宗", None),
    # 37 洞庭铁掌峰
    "洞庭铁掌峰": ("tiezhangfeng", "洞庭铁掌峰", None),
    # 38 莆田南少林
    "莆田南少林": ("nanshaolin", "莆田南少林", None),
    # 39 广州府
    "广州": ("guangzhou", "广州府", None),
    "羊城": ("guangzhou", "广州府", None),
    "广州府": ("guangzhou", "广州府", None),
    # 40 潭州府
    "潭州": ("tanzhou", "潭州府", None),
    "长沙": ("tanzhou", "潭州府", None),
    "潭州府": ("tanzhou", "潭州府", None),
    # 41 洪州府
    "洪州": ("hongzhou", "洪州府", None),
    "南昌": ("hongzhou", "洪州府", None),
    "洪州府": ("hongzhou", "洪州府", None),
    # 42 秦州府
    "秦州": ("qinzhou", "秦州府", None),
    "天水": ("qinzhou", "秦州府", None),
    "秦州府": ("qinzhou", "秦州府", None),
    # 43 辽阳府
    "东京辽阳府": ("liaoyang_liao", "辽阳府", None),
    "辽阳": ("liaoyang_liao", "辽阳府", None),
    "辽阳府": ("liaoyang_liao", "辽阳府", None),
}


# ==============================================================================
# 2. [M0-2] 30 武林门派 (18 一流大派 + 12 二三流门派［6 二流 + 6 三流］) + 11 朝堂/地域势力标准字典
# ==============================================================================

CANONICAL_FACTIONS: list[dict[str, Any]] = [
    # 18 个一流名门大派 + 2 个编号保留但划归二流门派的水陆/绿林大帮 (MARTIAL_ARTS_SECTS.md §2~§3)
    {
        "id": "SECT-01",
        "name": "嵩山少林寺",
        "shortName": "北少林",
        "isMajorSect": True,
        "isMinorSect": False,
        "sectTier": "一流大派",
        "group": "抗辽中流砥柱·名门正宗",
        "stance": "抗辽护国",
        "hqRegionId": "shaolin",
        "aliases": ["嵩山少林", "少林寺", "北少林", "少林"],
    },
    {
        "id": "SECT-02",
        "name": "丐帮",
        "shortName": "丐帮",
        "isMajorSect": True,
        "isMinorSect": False,
        "sectTier": "一流大派",
        "group": "抗辽中流砥柱·名门正宗",
        "stance": "抗辽护国",
        "hqRegionId": "luoyang",
        "aliases": ["丐帮总舵", "丐帮中原总舵"],
    },
    {
        "id": "SECT-03",
        "name": "五台山清凉寺",
        "shortName": "清凉寺",
        "isMajorSect": True,
        "isMinorSect": False,
        "sectTier": "一流大派",
        "group": "抗辽中流砥柱·名门正宗",
        "stance": "抗辽护国",
        "hqRegionId": "wutaishan",
        "aliases": ["清凉寺", "五台山"],
    },
    {
        "id": "SECT-04",
        "name": "莆田南少林",
        "shortName": "南少林",
        "isMajorSect": True,
        "isMinorSect": False,
        "sectTier": "一流大派",
        "group": "抗辽中流砥柱·名门正宗",
        "stance": "抗辽护国",
        "hqRegionId": "nanshaolin",
        "aliases": ["南少林", "福建南少林"],
    },
    {
        "id": "SECT-05",
        "name": "华山派",
        "shortName": "华山",
        "isMajorSect": True,
        "isMinorSect": False,
        "sectTier": "一流大派",
        "group": "抗辽中流砥柱·名门正宗",
        "stance": "正道侠义",
        "hqRegionId": "tongguan",
        "aliases": ["西岳华山派", "华山剑宗"],
    },
    {
        "id": "SECT-06",
        "name": "泰山派",
        "shortName": "泰山",
        "isMajorSect": True,
        "isMinorSect": False,
        "sectTier": "一流大派",
        "group": "抗辽中流砥柱·名门正宗",
        "stance": "正道侠义",
        "hqRegionId": "taishan",
        "aliases": ["东岳泰山派"],
    },
    {
        "id": "SECT-07",
        "name": "峨眉派",
        "shortName": "峨眉",
        "isMajorSect": True,
        "isMinorSect": False,
        "sectTier": "一流大派",
        "group": "抗辽中流砥柱·名门正宗",
        "stance": "正道侠义",
        "hqRegionId": "emeishan",
        "aliases": ["蜀中峨眉派", "峨眉"],
    },
    {
        "id": "SECT-08",
        "name": "真武道宗",
        "shortName": "真武",
        "isMajorSect": True,
        "isMinorSect": False,
        "sectTier": "一流大派",
        "group": "抗辽中流砥柱·名门正宗",
        "stance": "道法清正",
        "hqRegionId": "wudangshan",
        "aliases": ["真武道宗（武当山道脉）", "武当山道脉", "武当山真武道宗"],
    },
    {
        "id": "SECT-09",
        "name": "逍遥派",
        "shortName": "逍遥",
        "isMajorSect": True,
        "isMinorSect": False,
        "sectTier": "一流大派",
        "group": "隐世奇门·绝世传承",
        "stance": "逍遥超然",
        "hqRegionId": "wuliangshan",
        "aliases": ["天山灵鹫宫", "逍遥派灵鹫宫"],
    },
    {
        "id": "SECT-10",
        "name": "姑苏慕容氏",
        "shortName": "慕容",
        "isMajorSect": True,
        "isMinorSect": False,
        "sectTier": "一流大派",
        "group": "隐世奇门·绝世传承",
        "stance": "图谋复燕",
        "hqRegionId": "yanziwu",
        "aliases": ["燕子坞慕容氏", "姑苏慕容"],
    },
    {
        "id": "SECT-11",
        "name": "终南隐宗",
        "shortName": "终南",
        "isMajorSect": True,
        "isMinorSect": False,
        "sectTier": "一流大派",
        "group": "隐世奇门·绝世传承",
        "stance": "隐逸清修",
        "hqRegionId": "zhongnanshan",
        "aliases": ["终南隐宗（活死人墓/全真前脉）", "活死人墓", "终南山道脉前传"],
    },
    {
        "id": "SECT-12",
        "name": "东海桃花岛",
        "shortName": "桃花岛",
        "isMajorSect": True,
        "isMinorSect": False,
        "sectTier": "一流大派",
        "group": "隐世奇门·绝世传承",
        "stance": "亦正亦邪",
        "hqRegionId": "taohuadao",
        "aliases": ["东海桃花岛一脉", "桃花岛"],
    },
    {
        "id": "SECT-13",
        "name": "蜀中唐门",
        "shortName": "唐门",
        "isMajorSect": True,
        "isMinorSect": False,
        "sectTier": "一流大派",
        "group": "地域世家·霸道强宗",
        "stance": "中立世家",
        "hqRegionId": "qingcheng",
        "aliases": ["唐门", "唐家堡"],
    },
    {
        "id": "SECT-14",
        "name": "青城派",
        "shortName": "青城",
        "isMajorSect": True,
        "isMinorSect": False,
        "sectTier": "一流大派",
        "group": "地域世家·霸道强宗",
        "stance": "地域争锋",
        "hqRegionId": "qingcheng",
        "aliases": ["青城山上清宫"],
    },
    {
        "id": "SECT-15",
        "name": "铁掌帮",
        "shortName": "铁掌",
        "isMajorSect": True,
        "isMinorSect": False,
        "sectTier": "一流大派",
        "group": "地域世家·霸道强宗",
        "stance": "霸道绿林",
        "hqRegionId": "tiezhangfeng",
        "aliases": ["洞庭铁掌帮"],
    },
    {
        "id": "SECT-16",
        "name": "江淮漕帮",
        "shortName": "漕帮",
        "isMajorSect": False,
        "isMinorSect": True,
        "sectTier": "二流门派",
        "group": "二流世家·行业武盟",
        "stance": "水陆商帮",
        "hqRegionId": "yangzhou",
        "aliases": ["漕帮", "淮南盐帮"],
    },
    {
        "id": "SECT-17",
        "name": "开封府 / 六扇门",
        "shortName": "六扇门",
        "isMajorSect": True,
        "isMinorSect": False,
        "sectTier": "一流大派",
        "group": "朝廷鹰犬·草莽与外邦渗透势力",
        "stance": "庙堂护法",
        "hqRegionId": "bianliang",
        "aliases": ["开封府 / 六扇门（含大内禁军武学）", "六扇门", "大内禁军"],
    },
    {
        "id": "SECT-18",
        "name": "太行/京东绿林盟",
        "shortName": "绿林盟",
        "isMajorSect": False,
        "isMinorSect": True,
        "sectTier": "二流门派",
        "group": "二流世家·行业武盟",
        "stance": "替天行道/反官",
        "hqRegionId": "taihang",
        "aliases": ["太行/京东绿林盟（反官义军潜流）", "太行绿林", "京东绿林", "太行绿林盟"],
    },
    {
        "id": "SECT-19",
        "name": "星宿派",
        "shortName": "星宿",
        "isMajorSect": True,
        "isMinorSect": False,
        "sectTier": "一流大派",
        "group": "朝廷鹰犬·草莽与外邦渗透势力",
        "stance": "西域毒宗",
        "hqRegionId": "kunlun",
        "aliases": ["星宿派（西域毒宗中原潜伏点）", "星宿海"],
    },
    {
        "id": "SECT-20",
        "name": "一品堂 / 辽国武林暗桩",
        "shortName": "一品堂",
        "isMajorSect": True,
        "isMinorSect": False,
        "sectTier": "一流大派",
        "group": "朝廷鹰犬·草莽与外邦渗透势力",
        "stance": "外邦敌对",
        "hqRegionId": "xingqing_xixia",
        "aliases": ["西夏一品堂", "辽国武林暗桩", "一品堂 / 辽国武林暗桩（外邦敌对势力）"],
    },
    # 其余 10 个初入江湖友好型二三流门派 (MARTIAL_ARTS_SECTS.md §3~§4)
    {
        "id": "SECT-21",
        "name": "洛阳金刀门",
        "shortName": "金刀门",
        "isMajorSect": False,
        "isMinorSect": True,
        "sectTier": "二流门派",
        "group": "二流世家·行业武盟",
        "stance": "正道世家",
        "hqRegionId": "luoyang",
        "aliases": ["金刀王家", "金刀门"],
    },
    {
        "id": "SECT-22",
        "name": "常山枪派",
        "shortName": "常山枪",
        "isMajorSect": False,
        "isMinorSect": True,
        "sectTier": "二流门派",
        "group": "二流世家·行业武盟",
        "stance": "抗辽义武",
        "hqRegionId": "zhending",
        "aliases": ["真定常山枪派", "常山枪"],
    },
    {
        "id": "SECT-23",
        "name": "沧州八极门",
        "shortName": "八极门",
        "isMajorSect": False,
        "isMinorSect": True,
        "sectTier": "二流门派",
        "group": "二流世家·行业武盟",
        "stance": "刚猛武馆",
        "hqRegionId": "daming",
        "aliases": ["八极门", "河北八极门"],
    },
    {
        "id": "SECT-24",
        "name": "闽海镇远镖局",
        "shortName": "镇远镖局",
        "isMajorSect": False,
        "isMinorSect": True,
        "sectTier": "二流门派",
        "group": "二流世家·行业武盟",
        "stance": "海陆商镖",
        "hqRegionId": "quanzhou",
        "aliases": ["镇远镖局", "泉州镇远镖局"],
    },
    {
        "id": "SECT-25",
        "name": "齐鲁查拳馆",
        "shortName": "查拳馆",
        "isMajorSect": False,
        "isMinorSect": True,
        "sectTier": "三流小派",
        "group": "三流武馆·市井帮会",
        "stance": "市井武馆",
        "hqRegionId": "jinan",
        "aliases": ["查拳馆", "济南查拳馆"],
    },
    {
        "id": "SECT-26",
        "name": "钱塘怒潮帮",
        "shortName": "怒潮帮",
        "isMajorSect": False,
        "isMinorSect": True,
        "sectTier": "三流小派",
        "group": "三流武馆·市井帮会",
        "stance": "水陆潮帮",
        "hqRegionId": "hangzhou",
        "aliases": ["怒潮帮", "钱塘潮帮"],
    },
    {
        "id": "SECT-27",
        "name": "岭南洪门武馆",
        "shortName": "洪门武馆",
        "isMajorSect": False,
        "isMinorSect": True,
        "sectTier": "三流小派",
        "group": "三流武馆·市井帮会",
        "stance": "市舶义勇",
        "hqRegionId": "guangzhou",
        "aliases": ["洪门武馆", "广州洪拳馆"],
    },
    {
        "id": "SECT-28",
        "name": "陇右金环刀堂",
        "shortName": "金环刀堂",
        "isMajorSect": False,
        "isMinorSect": True,
        "sectTier": "三流小派",
        "group": "三流武馆·市井帮会",
        "stance": "边塞趟马",
        "hqRegionId": "qinzhou",
        "aliases": ["金环刀堂", "秦州金环堂"],
    },
    {
        "id": "SECT-29",
        "name": "巴蜀百草药王门",
        "shortName": "百草门",
        "isMajorSect": False,
        "isMinorSect": True,
        "sectTier": "三流小派",
        "group": "三流武馆·市井帮会",
        "stance": "悬壶采药",
        "hqRegionId": "chengdu",
        "aliases": ["百草药王门", "百草门"],
    },
    {
        "id": "SECT-30",
        "name": "湘西五溪蛊寨",
        "shortName": "五溪蛊寨",
        "isMajorSect": False,
        "isMinorSect": True,
        "sectTier": "三流小派",
        "group": "三流武馆·市井帮会",
        "stance": "苗疆奇门",
        "hqRegionId": "tanzhou",
        "aliases": ["五溪蛊寨", "湘西蛊寨"],
    },
    # 11 个朝堂 / 士林 / 异域及散人阵营 (CHARACTER_COMPENDIUM.md)
    {
        "id": "ORG-01",
        "name": "隐世散人",
        "shortName": "散人",
        "isMajorSect": False,
        "isMinorSect": False,
        "sectTier": "朝堂与地域组织",
        "group": "江湖散人与隐逸奇侠",
        "stance": "自由中立",
        "hqRegionId": None,
        "aliases": ["江湖散人", "草莽散人"],
    },
    {
        "id": "ORG-02",
        "name": "大宋朝廷",
        "shortName": "宋廷",
        "isMajorSect": False,
        "isMinorSect": False,
        "sectTier": "朝堂与地域组织",
        "group": "庙堂政权与四夷王庭",
        "stance": "大宋庙堂",
        "hqRegionId": "bianliang",
        "aliases": ["北宋朝廷", "大宋禁军"],
    },
    {
        "id": "ORG-03",
        "name": "大宋士林",
        "shortName": "士林",
        "isMajorSect": False,
        "isMinorSect": False,
        "sectTier": "朝堂与地域组织",
        "group": "儒林百工与杏林名宿",
        "stance": "大宋儒林",
        "hqRegionId": "luoyang",
        "aliases": ["洛学士林", "太学儒林"],
    },
    {
        "id": "ORG-04",
        "name": "大宋百工",
        "shortName": "百工",
        "isMajorSect": False,
        "isMinorSect": False,
        "sectTier": "朝堂与地域组织",
        "group": "儒林百工与杏林名宿",
        "stance": "科技匠造",
        "hqRegionId": "bianliang",
        "aliases": ["百工匠作"],
    },
    {
        "id": "ORG-05",
        "name": "大宋医家",
        "shortName": "杏林",
        "isMajorSect": False,
        "isMinorSect": False,
        "sectTier": "朝堂与地域组织",
        "group": "儒林百工与杏林名宿",
        "stance": "悬壶济世",
        "hqRegionId": "bianliang",
        "aliases": ["太医局", "医家"],
    },
    {
        "id": "ORG-06",
        "name": "大辽朝廷",
        "shortName": "辽廷",
        "isMajorSect": False,
        "isMinorSect": False,
        "sectTier": "朝堂与地域组织",
        "group": "庙堂政权与四夷王庭",
        "stance": "契丹王庭",
        "hqRegionId": "linhuang_liao",
        "aliases": ["契丹朝廷", "大辽南院"],
    },
    {
        "id": "ORG-07",
        "name": "西夏朝廷",
        "shortName": "夏廷",
        "isMajorSect": False,
        "isMinorSect": False,
        "sectTier": "朝堂与地域组织",
        "group": "庙堂政权与四夷王庭",
        "stance": "党项王庭",
        "hqRegionId": "xingqing_xixia",
        "aliases": ["党项王庭"],
    },
    {
        "id": "ORG-08",
        "name": "大理皇室",
        "shortName": "大理",
        "isMajorSect": False,
        "isMinorSect": False,
        "sectTier": "朝堂与地域组织",
        "group": "庙堂政权与四夷王庭",
        "stance": "南诏佛国",
        "hqRegionId": "dali_city",
        "aliases": ["大理段氏", "天龙寺"],
    },
    {
        "id": "ORG-09",
        "name": "吐蕃诸部",
        "shortName": "吐蕃",
        "isMajorSect": False,
        "isMinorSect": False,
        "sectTier": "朝堂与地域组织",
        "group": "庙堂政权与四夷王庭",
        "stance": "雪域密宗",
        "hqRegionId": "luoxie_tubo",
        "aliases": ["青唐吐蕃", "雪域密宗"],
    },
    {
        "id": "ORG-10",
        "name": "南疆势力",
        "shortName": "南疆",
        "isMajorSect": False,
        "isMinorSect": False,
        "sectTier": "朝堂与地域组织",
        "group": "边裔诸部",
        "stance": "西南边裔",
        "hqRegionId": "guangzhou",
        "aliases": ["广源州侬氏", "南疆诸洞"],
    },
    {
        "id": "ORG-11",
        "name": "塞外诸部",
        "shortName": "塞外",
        "isMajorSect": False,
        "isMinorSect": False,
        "sectTier": "朝堂与地域组织",
        "group": "边裔诸部",
        "stance": "白山黑水",
        "hqRegionId": "liaoyang_liao",
        "aliases": ["生女真完颜部"],
    },
]

FACTION_BY_NAME: dict[str, dict[str, Any]] = {}
for fac in CANONICAL_FACTIONS:
    FACTION_BY_NAME[fac["name"]] = fac
    for alias in fac["aliases"]:
        FACTION_BY_NAME[alias] = fac


# 境界 -> 基准四维区间 (CHARACTER_COMPENDIUM.md §1.1)
REALM_BENCHMARKS: dict[str, tuple[tuple[int, int], tuple[int, int], tuple[int, int], tuple[int, int], int]] = {
    "大宗师上品": ((9800, 9999), (9800, 9999), (96, 99), (96, 99), 1),
    "大宗师中品": ((8600, 9000), (8700, 9100), (93, 96), (90, 94), 2),
    "大宗师下品": ((7800, 8200), (7900, 8300), (91, 94), (86, 90), 3),
    "宗师上品": ((6400, 7200), (6200, 7200), (85, 92), (78, 86), 4),
    "宗师中品": ((5200, 6100), (5000, 6000), (80, 87), (72, 80), 5),
    "宗师下品": ((4300, 5000), (4100, 4900), (75, 83), (66, 75), 6),
    "一流上品": ((3400, 4100), (3100, 3900), (69, 77), (58, 68), 7),
    "一流中品": ((2700, 3300), (2400, 3000), (63, 71), (50, 60), 8),
    "一流下品": ((2100, 2650), (1800, 2350), (57, 65), (43, 53), 9),
    "二流上品": ((1600, 2050), (1300, 1750), (50, 58), (36, 45), 10),
    "二流中品": ((1250, 1580), (950, 1280), (44, 52), (30, 39), 11),
    "二流下品": ((950, 1220), (680, 930), (38, 46), (24, 33), 12),
    "三流上品": ((700, 920), (420, 650), (32, 40), (18, 26), 13),
    "三流中品": ((500, 680), (240, 400), (26, 34), (13, 21), 14),
    "三流下品": ((340, 490), (100, 230), (20, 28), (8, 16), 15),
    "不入流": ((150, 320), (0, 80), (10, 22), (3, 12), 16),
}

CITY_BASE_META_SONG = {
    "yamen": (
        "府州衙门 · 捕盗司",
        "yamen",
        "官署悬赏",
        "州府升堂理事、张贴江湖海捕文书与发放赏银之官衙。",
        "揭榜缉盗领赏（纹银+16两 / 策论+1）",
        0,
        {"silver": 16, "skill": ["策论", 1]},
    ),
    "tavern": (
        "临街酒楼 · 醉仙楼",
        "tower",
        "江湖风闻",
        "酒旗招展、座上豪客云集，打听《江湖风闻录》与磨砺辩才之地。",
        "痛饮纵论天下（辩才+3，耗银2两）",
        2,
        {"skill": ["辩才", 3]},
    ),
    "inn": (
        "悦来客栈 · 车马店",
        "manor",
        "投宿调息",
        "备有上房药浴与草料马厩，供远行侠客休整疗伤、淬炼寒暑抗性。",
        "药浴静养调息（气血+30 / 抗性+1，耗银3两）",
        3,
        {"hp": 30, "res": 1},
    ),
    "dojo": (
        "演武拳馆 · 讲武堂",
        "camp",
        "实战锤炼",
        "设梅花桩、石锁箭垛与比武擂台，可锤炼实战气血、内力与身法。",
        "桩功吐纳拆招（气血+28 / 内力+22 / 身法+1）",
        0,
        {"hp": 28, "mp": 22, "agi": 1},
    ),
    "academy": (
        "州学书院 · 崇文讲堂",
        "pavilion",
        "经义算学",
        "书声琅琅、典籍浩瀚，可系统研习儒释道经义、兵书策论与九章算术。",
        "潜心研读经史算学（经义+2 / 策论+2 / 算术+2）",
        0,
        {"skill": ["经义", 2], "skill2": ["策论", 2], "skill3": ["算术", 2]},
    ),
}

CITY_BASE_META_FOREIGN = {
    "yamen": (
        "王庭牙帐 · 番邦官署",
        "yamen",
        "官署悬赏",
        "番邦王庭签发通关文牒、悬赏缉捕草原剧盗之官署。",
        "揭榜缉盗领赏（纹银+16两 / 策论+1）",
        0,
        {"silver": 16, "skill": ["策论", 1]},
    ),
    "tavern": (
        "胡姬酒肆 · 马奶酒坊",
        "tower",
        "江湖风闻",
        "胡姬琵琶助兴，塞外刀客、番僧与马帮在此豪饮纵谈。",
        "痛饮纵论天下（辩才+3，耗银2两）",
        2,
        {"skill": ["辩才", 3]},
    ),
    "inn": (
        "四方国信馆驿",
        "manor",
        "投宿调息",
        "备有上房药浴与草料马厩，供远行侠客休整疗伤、淬炼寒暑抗性。",
        "药浴静养调息（气血+30 / 抗性+1，耗银3两）",
        3,
        {"hp": 30, "res": 1},
    ),
    "dojo": (
        "王庭射猎演武场",
        "camp",
        "实战锤炼",
        "设梅花桩、石锁箭垛与比武擂台，可锤炼实战气血、内力与身法。",
        "桩功吐纳拆招（气血+28 / 内力+22 / 身法+1）",
        0,
        {"hp": 28, "mp": 22, "agi": 1},
    ),
    "academy": (
        "皇家译经院 · 国子讲堂",
        "pavilion",
        "经义算学",
        "书声琅琅、典籍浩瀚，可系统研习儒释道经义、兵书策论与九章算术。",
        "潜心研读经史算学（经义+2 / 策论+2 / 算术+2）",
        0,
        {"skill": ["经义", 2], "skill2": ["策论", 2], "skill3": ["算术", 2]},
    ),
}


def deterministic_int(seed_str: str, lo: int, hi: int) -> int:
    if lo >= hi:
        return lo
    digest = hashlib.sha256(seed_str.encode("utf-8")).digest()
    val = int.from_bytes(digest[:4], "big")
    return lo + (val % (hi - lo + 1))


def strip_art_book_marks(name: str) -> str:
    return re.sub(r"[《》「」\s]", "", name).strip()


# ==============================================================================
# 3. [M0-2] 文档原地规范化（幂等）
# ==============================================================================

def normalize_markdown_docs() -> dict[str, int]:
    """
    1) 将 docs/CHARACTER_COMPENDIUM.md 中 1000 名人物的常驻地点统一为 38 地区标准地名；
    2) 修复 docs/GAME_MECHANICS.md 与 docs/REGIONAL_MAPS_AND_BUILDINGS.md 中的旧分支绝对路径链接。
    """
    stats = {"npc_locations_updated": 0, "doc_links_updated": 0}

    # 1. Normalize CHARACTER_COMPENDIUM.md
    cc_path = DOCS_DIR / "CHARACTER_COMPENDIUM.md"
    cc_lines = cc_path.read_text(encoding="utf-8").splitlines()
    new_cc_lines: list[str] = []

    for ln in cc_lines:
        if re.match(r"^\|\s*`?NPC-\d{4}`?\s*\|", ln):
            raw_parts = ln.strip().strip("|").split("|")
            parts = [p.strip() for p in raw_parts]
            loc_str = parts[7]
            if " > " in loc_str:
                loc_segs = [s.strip() for s in loc_str.split(" > ")]
                reg_raw = loc_segs[0]
                if reg_raw not in LOCATION_RESOLUTION_MAP:
                    raise ValueError(f"Unmapped region {reg_raw!r} in line: {ln}")
                _, canonical_reg_display, _ = LOCATION_RESOLUTION_MAP[reg_raw]
                # Keep clean region name without composite parenthetical suffix when building is explicit
                clean_reg_name = re.sub(r"（华山）|（潼关）|（青城山）|（唐家堡）$", "", canonical_reg_display)
                rebuilt_loc = " > ".join([clean_reg_name, *loc_segs[1:]])
                if loc_str != rebuilt_loc:
                    parts[7] = rebuilt_loc
                    stats["npc_locations_updated"] += 1
                    ln = "| " + " | ".join(parts) + " |"
            else:
                if loc_str not in LOCATION_RESOLUTION_MAP:
                    raise ValueError(f"Unmapped location {loc_str!r} in line: {ln}")
                _, canonical_display, _ = LOCATION_RESOLUTION_MAP[loc_str]
                if loc_str != canonical_display:
                    parts[7] = canonical_display
                    stats["npc_locations_updated"] += 1
                    ln = "| " + " | ".join(parts) + " |"
        new_cc_lines.append(ln)

    cc_path.write_text("\n".join(new_cc_lines) + "\n", encoding="utf-8")

    # 2. Fix cross-branch file:/// links in docs/*.md
    link_replacements = {
        "file:///home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/165aeb2d-47c6-4ae8-9373-51acdcc9d87b/REGIONAL_MAPS_AND_BUILDINGS.md": "./REGIONAL_MAPS_AND_BUILDINGS.md",
        "file:///home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/165aeb2d-47c6-4ae8-9373-51acdcc9d87b/MARTIAL_ARTS_COMPENDIUM.md": "./MARTIAL_ARTS_COMPENDIUM.md",
        "file:///home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/165aeb2d-47c6-4ae8-9373-51acdcc9d87b/GAME_MECHANICS.md": "./GAME_MECHANICS.md",
        "file:///home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/165aeb2d-47c6-4ae8-9373-51acdcc9d87b/northern_song_map.html": "../index.html",
    }
    for md_file in sorted(DOCS_DIR.glob("*.md")):
        txt = md_file.read_text(encoding="utf-8")
        orig = txt
        for old_url, new_url in link_replacements.items():
            if old_url in txt:
                cnt = txt.count(old_url)
                txt = txt.replace(old_url, new_url)
                stats["doc_links_updated"] += cnt
        if txt != orig:
            md_file.write_text(txt, encoding="utf-8")

    return stats


# ==============================================================================
# 4. [M0-3] 解析 216 门武学 (MARTIAL_ARTS_COMPENDIUM.md)
# ==============================================================================

def resolve_sect_for_origin(origin_text: str) -> str | None:
    # Explicit minor-sect tags take precedence when not overshadowed by Tangmen's core dart art
    if "唐门" in origin_text or "唐家堡" in origin_text:
        return "SECT-13"
    minor_rules = [
        (["闽海镇远镖局"], "SECT-24"),
        (["洛阳金刀门"], "SECT-21"),
        (["常山枪派"], "SECT-22"),
        (["沧州八极门"], "SECT-23"),
        (["齐鲁查拳馆"], "SECT-25"),
        (["钱塘怒潮帮"], "SECT-26"),
        (["岭南洪门武馆"], "SECT-27"),
        (["陇右金环刀堂"], "SECT-28"),
        (["巴蜀百草药王门"], "SECT-29"),
        (["湘西五溪蛊寨"], "SECT-30"),
    ]
    for keywords, sid in minor_rules:
        if any(kw in origin_text for kw in keywords):
            return sid

    rules = [
        (["嵩山少林", "北少林", "少林七十二", "少林达摩", "少林"], "SECT-01"),
        (["莆田南少林", "南少林"], "SECT-04"),
        (["丐帮"], "SECT-02"),
        (["五台山", "清凉寺", "杨家"], "SECT-03"),
        (["华山"], "SECT-05"),
        (["泰山"], "SECT-06"),
        (["峨眉"], "SECT-07"),
        (["真武", "武当"], "SECT-08"),
        (["逍遥", "灵鹫", "天山", "无量玉洞"], "SECT-09"),
        (["慕容", "燕子坞", "参合"], "SECT-10"),
        (["终南", "古墓", "活死人墓", "全真"], "SECT-11"),
        (["桃花岛"], "SECT-12"),
        (["青城"], "SECT-14"),
        (["铁掌"], "SECT-15"),
        (["漕帮", "淮南盐帮", "水路"], "SECT-16"),
        (["六扇门", "开封府", "禁军", "大内"], "SECT-17"),
        (["太行", "绿林"], "SECT-18"),
        (["星宿"], "SECT-19"),
        (["一品堂", "辽", "契丹", "西夏"], "SECT-20"),
        (["大理", "段氏", "天龙寺"], "ORG-08"),
        (["吐蕃", "密宗", "雪域"], "ORG-09"),
    ]
    # Check 南少林 before 北少林 if explicitly 南少林 only
    if "南少林" in origin_text and "北少林" not in origin_text and "嵩山" not in origin_text:
        return "SECT-04"
    for keywords, sid in rules:
        if any(kw in origin_text for kw in keywords):
            return sid
    return None



def compute_martial_art_levels(art: dict[str, Any]) -> list[dict[str, Any]]:
    # 严格锚定 CHARACTER_COMPENDIUM.md 六境十六阶人物实战四维基准：
    # 习武者不入流肉身底子约：气血 250 / 内力 50 / 身法 15 / 抗性 8
    # - 良品下品内功 10 重 -> 二流上品（HP 1600~2050, MP 1300~1750）
    # - 良品中品内功 10 重 -> 一流下品（HP 2100~2650, MP 1800~2350）
    # - 良品上品内功 10 重 -> 一流上品（HP 3400~4100, MP 3100~3900）
    # - 地阶下品内功 10 重 -> 宗师下品（HP 4300~5000, MP 4100~4900）
    # - 天阶上品内功 10 重 -> 大宗师上品（HP 9800~9999, MP 9800~9999）
    sub_key = (art["tier"], art["subTier"])
    code = art["code"]

    neigong_benchmarks: dict[tuple[str, str], tuple[int, int, int]] = {
        ("凡品", "下品"): (520, 600, 12),     # 10重 -> 三流上品
        ("凡品", "中品"): (800, 900, 18),     # 10重 -> 二流下品
        ("凡品", "上品"): (1120, 1220, 24),   # 10重 -> 二流中品
        ("良品", "下品"): (1550, 1650, 30),   # 10重 -> 二流上品
        ("良品", "中品"): (2100, 2200, 38),   # 10重 -> 一流下品
        ("良品", "上品"): (3550, 3550, 52),   # 10重 -> 一流上品
        ("地阶", "下品"): (4400, 4450, 58),   # 10重 -> 宗师下品
        ("地阶", "中品"): (5500, 5550, 66),   # 10重 -> 宗师中品
        ("地阶", "上品"): (6750, 6750, 74),   # 10重 -> 宗师上品
        ("天阶", "下品"): (8000, 7850, 80),   # 10重 -> 大宗师下品
        ("天阶", "中品"): (8900, 8650, 86),   # 10重 -> 大宗师中品
        ("天阶", "上品"): (9850, 9650, 92),   # 10重 -> 大宗师上品
    }

    qinggong_benchmarks: dict[tuple[str, str], tuple[int, int]] = {
        ("凡品", "下品"): (18, 0),
        ("凡品", "中品"): (25, 0),
        ("凡品", "上品"): (31, 0),
        ("良品", "下品"): (38, 0),
        ("良品", "中品"): (45, 0),
        ("良品", "上品"): (56, 0),
        ("地阶", "下品"): (62, 0),
        ("地阶", "中品"): (67, 0),
        ("地阶", "上品"): (72, 360),
        ("天阶", "下品"): (76, 550),
        ("天阶", "中品"): (80, 750),
        ("天阶", "上品"): (83, 1050),
    }

    damage_benchmarks: dict[tuple[str, str], int] = {
        ("凡品", "下品"): 110,
        ("凡品", "中品"): 160,
        ("凡品", "上品"): 220,
        ("良品", "下品"): 300,
        ("良品", "中品"): 410,
        ("良品", "上品"): 560,
        ("地阶", "下品"): 720,
        ("地阶", "中品"): 900,
        ("地阶", "上品"): 1120,
        ("天阶", "下品"): 1400,
        ("天阶", "中品"): 1700,
        ("天阶", "上品"): 2050,
    }

    exp_tier_mult: dict[tuple[str, str], float] = {
        ("凡品", "下品"): 1.0,
        ("凡品", "中品"): 1.3,
        ("凡品", "上品"): 1.7,
        ("良品", "下品"): 2.4,
        ("良品", "中品"): 3.2,
        ("良品", "上品"): 4.5,
        ("地阶", "下品"): 6.5,
        ("地阶", "中品"): 8.5,
        ("地阶", "上品"): 11.0,
        ("天阶", "下品"): 15.0,
        ("天阶", "中品"): 20.0,
        ("天阶", "上品"): 26.0,
    }

    cat = art["category"]
    name = art["cleanName"]
    desc = art["description"]

    base_max_mp = 0
    base_max_hp = 0
    base_agility = 0
    base_resistance = 0
    base_constitution = 0
    base_charm = 0
    base_phys = 0
    base_poison = 0
    base_sound = 0
    base_hidden = 0

    tier_rank = {
        ("凡品", "下品"): 1, ("凡品", "中品"): 2, ("凡品", "上品"): 3,
        ("良品", "下品"): 4, ("良品", "中品"): 5, ("良品", "上品"): 6,
        ("地阶", "下品"): 7, ("地阶", "中品"): 8, ("地阶", "上品"): 9,
        ("天阶", "下品"): 10, ("天阶", "中品"): 11, ("天阶", "上品"): 12,
    }.get(sub_key, 1)

    if cat == "内功":
        ng_mp, ng_hp, ng_res = neigong_benchmarks[sub_key]
        if code == "009":  # 八荒六合唯我独尊功：基础内力/气血上限额外提高 10%
            base_max_mp = round(ng_mp * 1.10)
            base_max_hp = round(ng_hp * 1.10)
        elif any(k in name + desc for k in ("九阳", "混天", "龙象", "金刚", "铁布衫", "伏虎", "罡气", "玄甲", "壮血", "扛鼎")):
            base_max_hp = round(ng_hp * 1.04)
            base_max_mp = round(ng_mp * 0.97)
        elif any(k in name + desc for k in ("北冥", "斗转", "小无相", "紫霞", "先天", "碧海", "莲华")):
            base_max_mp = round(ng_mp * 1.04)
            base_max_hp = round(ng_hp * 0.97)
        else:
            base_max_mp = ng_mp
            base_max_hp = ng_hp

        if any(k in name + desc for k in ("易筋", "洗髓", "金刚", "混天", "化功", "万毒", "铁布衫", "玄甲", "龙象", "不坏", "伏虎", "罡气", "鲸息", "毒砂", "神照")):
            base_resistance = round(ng_res * 1.05)
        else:
            base_resistance = round(ng_res * 0.85)

        if any(k in name + desc for k in ("易筋", "洗髓", "先天", "九阴", "太玄", "混天", "龙象", "北冥", "八荒六合", "壮骨", "内壮")):
            base_constitution = max(2, round(tier_rank * 1.25))
        if any(k in name + desc for k in ("八荒六合", "北冥", "小无相", "玉女", "碧海", "莲华", "驻颜", "清心")):
            base_charm = max(2, round(tier_rank * 1.15))

    elif cat == "轻功":
        base_agility, base_max_mp = qinggong_benchmarks[sub_key]
        if code == "010":  # 凌波微步
            base_max_mp = 1350
        elif code == "036":  # 葵花残卷
            base_agility += 3

    elif cat in ("拳掌", "指法", "剑法", "刀法", "枪法", "棍棒"):
        dmg = damage_benchmarks[sub_key]
        if cat in ("刀法", "枪法"):
            base_phys = round(dmg * 1.04)
        elif cat == "指法":
            base_phys = round(dmg * 1.02)
        else:
            base_phys = dmg
    elif cat == "毒功":
        base_poison = round(damage_benchmarks[sub_key] * 0.96)
    elif cat == "音功":
        base_sound = round(damage_benchmarks[sub_key] * 0.98)
    elif cat == "暗器":
        base_hidden = round(damage_benchmarks[sub_key] * 0.97)

    # 37 门天阶武学专属特殊效果精确映射（001~019 定稿，020~037 严格降档克制）
    tian_effects_map: dict[str, list[tuple[str, str, float, str, str]]] = {
        # === 天阶上品 (001 ~ 010) ===
        "001": [
            ("formless_qi_wall", "无相气墙", 45, "%", "使敌方施加的所有伤害与所有特殊效果数值一律削减该比例（10重仅发挥55%效果）"),
        ],
        "002": [
            ("beiming_drain", "北冥纳海", 25, "%", "交锋命中时吸取对手当前内力的该比例补充自身内力（超出自身上限部分溢出作废）"),
        ],
        "003": [
            ("taixuan_amp", "诗仙太玄", 35, "%", "装配为主运内功时，所有出战招式的威力提升该比例"),
        ],
        "004": [
            ("jiuyin_heal", "九阴疗伤", 10, "%", "每回合结束时自动回复自身气血上限的该比例"),
            ("jiuyin_pierce", "摧坚破甲", 25, "%", "出战招式无视对手该比例的抗性与护体减伤"),
        ],
        "005": [
            ("xianglong_stun", "亢龙震慑", 30, "%", "命中时有该概率震慑对手，使其下一回合无法【出招】只能【防御】"),
        ],
        "006": [
            ("liumai_pierce", "无形气剑", 80, "%", "出招时无视对手该比例的物理防御与护体减伤"),
        ],
        "007": [
            ("dugu_interrupt", "料敌机先", 35, "%", "当对手本回合也选择【出招】时无视身法必定先手结算，并有该概率直接看破打断其出招"),
        ],
        "008": [
            ("douzhuan_high", "移星换斗（内力≥对手）", 50, "%", "装配为主运内功时，对手【出招】且自身内力≥对手，减免该比例伤害并将减免伤害与特效一并反击对手"),
            ("douzhuan_low", "移星换斗（内力<对手）", 20, "%", "装配为主运内功时，对手【出招】且自身内力<对手，减免该比例伤害并将减免伤害与特效一并反击对手"),
        ],
        "009": [
            ("bahuang_dom", "唯我独尊（优势增伤）", 45, "%", "当自身当前气血高于对手时，造成的所有伤害提升该比例且免疫无法出招/封穴/逃跑拦截控制"),
            ("bahuang_base", "唯我独尊（劣势保底）", 20, "%", "当自身当前气血不高于对手时，造成的基础伤害依然提升该比例"),
        ],
        "010": [
            ("lingbo_dodge", "片叶不沾（常态闪避）", 20, "%", "受对手【出招】攻击时有该概率完全闪避本次伤害与附带特效"),
            ("lingbo_def_dodge", "片叶不沾（防御翻倍）", 40, "%", "若本回合自身选择【防御】，完全闪避率翻倍提升至该比例"),
        ],
        # === 天阶中品 (011 ~ 022) ===
        "011": [
            ("xisui_ward", "诸邪辟易", 75, "%", "所受毒性/音律/暗器伤害减免该比例，且敌方施加的一切负面异常与扣内效果削减该比例"),
        ],
        "012": [
            ("xiaowuxiang_amp", "无相催招（增威）", 25, "%", "装配为主运内功时，所有出战招式威力提升该比例"),
            ("xiaowuxiang_save", "无相催招（省内）", 50, "%", "施展任何武学招式时的内力消耗降低该比例"),
        ],
        "013": [
            ("xiantian_mp", "生生不息（回内）", 15, "%", "每回合结束自动恢复内力上限的该比例"),
            ("xiantian_hp", "生生不息（回血）", 6, "%", "每回合结束自动恢复气血上限的该比例"),
            ("xiantian_antipoison", "先天破邪", 50, "%", "面对使用毒功或吸内/化功类对手时，自身抗性额外提升该比例"),
        ],
        "014": [
            ("zhemeishou_amp", "学无止境（每层增伤）", 7, "%", "每次施展后看破路数，对同一对手伤害永久叠加该比例（最多叠5层至+35%）"),
            ("zhemeishou_red", "学无止境（每层减伤）", 5, "%", "每次施展后所受该对手招式伤害永久叠加减免该比例（最多叠5层至25%）"),
        ],
        "015": [
            ("liuyang_leech", "阴阳相济", 30, "%", "将本次实际造成伤害的该比例转化为自身气血恢复，并驱散自身所有毒/封穴异常状态"),
        ],
        "016": [
            ("dagou_slow", "绊缠八诀（降身法禁逃）", 35, "%", "命中使对手2回合内身法降低该比例且无法【逃跑】"),
            ("dagou_bonus", "绊缠八诀（追击增伤）", 30, "%", "对已处于【绊缠】状态的对手造成的伤害额外提升该比例"),
        ],
        "017": [
            ("taiji_guard", "柔云剑圈（减伤）", 25, "%", "施展此剑法时本回合获得剑圈守御，所受伤害减免该比例"),
            ("taiji_sap", "化劲卸力（削内）", 5, "%", "命中后卸去对手该比例的当前内力"),
        ],
        "018": [
            ("jingang_phys_red", "不坏金身（物理减伤）", 35, "%", "所受物理伤害直接减免该比例，且10重完全免疫敌方无视防御/破甲效果"),
            ("jingang_rebound", "不动明王（防御反震）", 30, "%", "当自身本回合选择【防御】时，将对手物理出招伤害的该比例震回给对手"),
        ],
        "019": [
            ("huoyan_pen", "无形焰气（穿防）", 50, "%", "无视对手【防御】姿态的该比例额外减伤"),
            ("huoyan_burn", "灼脉内伤", 25, "%", "额外附加本次物理伤害该比例的燥火内伤（仅受抗性减免，不受物理护体减免）"),
        ],
        "020": [
            ("anran_despair", "黯然销魂", 6, "%", "自身每损失10%气血，此掌法伤害便提升该比例（残血最高+54%，低于八荒六合与太玄）"),
        ],
        "021": [
            ("tanzhi_disarm", "惊雷震腕", 22, "%", "命中时有该概率弹出劲风打断敌手腕力，使其下一回合无法使用暗器与指法类武学"),
        ],
        "022": [
            ("shenxing_dodge", "泥鳅滑步（常态闪避）", 12, "%", "受对手【出招】攻击时有该概率滑开完全闪避（低于凌波微步20%）"),
            ("shenxing_escape", "溜之大吉（逃跑加成）", 35, "%", "选择【逃跑】时脱身成功率额外提升该比例"),
        ],
        # === 天阶下品 (023 ~ 037，数值严格低于天上/天中) ===
        "023": [
            ("yiyang_seal", "纯阳截脉", 15, "%", "命中时有该概率点穴使对手下一回合无法【出招】只能【防御】（低于降龙30%），并驱散自身1个中毒状态"),
        ],
        "024": [
            ("xiangmo_crush", "雷霆破架", 28, "%", "若对手本回合选择【防御】，重杵砸穿架势使其受到的本次伤害提升该比例"),
        ],
        "025": [
            ("canhe_pierce", "冷峭透甲", 35, "%", "无声指风透甲穿石，出招时无视对手该比例的物理防御与护体减伤（低于六脉神剑80%）"),
        ],
        "026": [
            ("huagong_burn", "化散真气", 15, "%", "装配为主运内功时，交锋命中以奇毒焚毁化散对手当前内力的该比例（受对手抗性削减，低于北冥25%）"),
            ("huagong_weak", "筋酥骨软", 15, "%", "装配为主运内功时，交锋命中使对手2回合内造成的所有伤害降低该比例"),
        ],
        "027": [
            ("baihong_curve", "曲直如意", 60, "%", "掌力半途诡异转折，无视对手该比例的闪避率"),
        ],
        "028": [
            ("longxiang_might", "龙象巨力", 18, "%", "装配为主运内功时，拳掌/刀法/枪法/棍棒招式威力提升该比例（低于小无相25%与太玄35%）"),
        ],
        "029": [
            ("xuantie_crush", "重剑无锋", 24, "%", "当自身当前内力高于对手时，本次剑法伤害提升该比例（无保底加成）"),
        ],
        "030": [
            ("zixia_stack", "紫气东来", 3, "%", "每回合蓄积1层紫霞真气，每层使招式伤害与护体减伤各提升该比例（最多叠5层至+15%）"),
        ],
        "031": [
            ("yunv_double", "双剑合璧", 35, "%", "命中后有该概率紧接刺出第二剑（造成40%剑法伤害）"),
        ],
        "032": [
            ("baoyu_lock", "梨花封路", 25, "%", "无视对手50%闪避率；若对手本回合选择【逃跑】，拦截其逃跑并额外造成该比例伤害"),
        ],
        "033": [
            ("qixian_sap", "五音乱脉", 10, "%", "无形琴音直透耳膜，命中时震散对手该比例当前内力并无视【防御】姿态25%减伤"),
        ],
        "034": [
            ("hujia_gap", "乘隙切脉", 22, "%", "专抓出招换气破绽——若对手本回合也选择【出招】，本次刀法伤害提升该比例"),
        ],
        "035": [
            ("tiezhang_palm", "踏波掌势", 15, "%", "装配于轻功槽时，施展所有【拳掌】类武学的伤害提升该比例"),
        ],
        "036": [
            ("kuihua_haste", "鬼魅电闪", 18, "%", "装配于轻功槽时，战斗中实战身法额外提升该比例（专注抢夺先手）"),
        ],
        "037": [
            ("yangjia_carbine", "绝命回马枪", 25, "%", "当自身当前气血低于对手时触发回马枪，本次枪法伤害提升该比例"),
        ],
    }

    effects_cfg = tian_effects_map.get(code, [])

    level_ratios = [0.15, 0.22, 0.30, 0.39, 0.49, 0.60, 0.71, 0.82, 0.91, 1.00]
    base_exp_steps = [100, 160, 240, 350, 500, 700, 980, 1380, 2000, 0]
    exp_mult = exp_tier_mult[sub_key]

    levels: list[dict[str, Any]] = []
    for idx, lv in enumerate(range(1, 11)):
        ratio = level_ratios[idx]
        exp_needed = round(base_exp_steps[idx] * exp_mult / 10.0) * 10 if lv < 10 else 0
        entry: dict[str, Any] = {
            "level": lv,
            "expRequired": exp_needed,
        }
        if base_max_mp:
            entry["maxMp"] = max(1, round(base_max_mp * ratio))
        if base_max_hp:
            entry["maxHp"] = max(1, round(base_max_hp * ratio))
        if base_agility:
            entry["agility"] = max(1, round(base_agility * ratio))
        if base_resistance:
            entry["resistance"] = max(1, round(base_resistance * ratio))
        if base_constitution:
            entry["constitution"] = max(1, round(base_constitution * ratio))
        if base_charm:
            entry["charm"] = max(1, round(base_charm * ratio))
        if base_phys:
            entry["physicalDamage"] = max(1, round(base_phys * ratio))
        if base_poison:
            entry["poisonDamage"] = max(1, round(base_poison * ratio))
        if base_sound:
            entry["soundDamage"] = max(1, round(base_sound * ratio))
        if base_hidden:
            entry["hiddenWeaponDamage"] = max(1, round(base_hidden * ratio))
        if effects_cfg:
            entry["specialEffects"] = [
                {
                    "id": eid,
                    "name": ename,
                    "value": max(1, round(eval_max * ratio)),
                    "unit": unit,
                    "desc": edesc,
                }
                for eid, ename, eval_max, unit, edesc in effects_cfg
            ]
        levels.append(entry)
    return levels

def parse_martial_arts() -> list[dict[str, Any]]:
    ma_path = DOCS_DIR / "MARTIAL_ARTS_COMPENDIUM.md"
    lines = ma_path.read_text(encoding="utf-8").splitlines()

    current_tier = ""
    current_sub_tier = ""
    arts: list[dict[str, Any]] = []

    sub_heading_re = re.compile(r"^###\s+\d+\.\d+\s+(天阶|地阶|良品|凡品)(上品|中品|下品)")
    table_row_re = re.compile(
        r"^\|\s*(\d{3})\s*\|\s*\*\*([^*]+)\*\*\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|"
    )
    bullet_row_re = re.compile(
        r"^\*\s*\*\*(\d{3})\.\s*([^*]+?)\*\*（([^·]+)·([^）]+)）：(.+)$"
    )
    req_token_re = re.compile(r"`([^`]+?)≥(\d+)`")

    for ln in lines:
        m_sub = sub_heading_re.match(ln)
        if m_sub:
            current_tier = m_sub.group(1)
            current_sub_tier = m_sub.group(2)
            continue

        m_tbl = table_row_re.match(ln)
        if m_tbl:
            code, raw_name, cat, origin, desc, prereq_raw = m_tbl.groups()
            clean_name = strip_art_book_marks(raw_name)
            stat_reqs = [
                {"stat": k.strip(), "min": int(v)}
                for k, v in req_token_re.findall(prereq_raw)
            ]
            arts.append(
                {
                    "id": f"MA-{code}",
                    "code": code,
                    "name": raw_name.strip(),
                    "cleanName": clean_name,
                    "tier": current_tier,
                    "subTier": current_sub_tier,
                    "fullTier": f"{current_tier}{current_sub_tier}",
                    "category": cat.strip(),
                    "origin": origin.strip(),
                    "sectId": resolve_sect_for_origin(origin),
                    "description": desc.strip(),
                    "prerequisitesText": prereq_raw.strip(),
                    "statRequirements": stat_reqs,
                }
            )
            continue

        m_bul = bullet_row_re.match(ln)
        if m_bul:
            code, raw_name, cat, origin, desc = m_bul.groups()
            clean_name = strip_art_book_marks(raw_name)
            arts.append(
                {
                    "id": f"MA-{code}",
                    "code": code,
                    "name": raw_name.strip(),
                    "cleanName": clean_name,
                    "tier": current_tier,
                    "subTier": current_sub_tier,
                    "fullTier": f"{current_tier}{current_sub_tier}",
                    "category": cat.strip(),
                    "origin": origin.strip(),
                    "sectId": resolve_sect_for_origin(origin),
                    "description": desc.strip(),
                    "prerequisitesText": None,
                    "statRequirements": [],
                }
            )

    for art in arts:
        art["levels"] = compute_martial_art_levels(art)

    arts.sort(key=lambda x: int(x["code"]))
    if len(arts) != 218:
        raise AssertionError(f"Expected 218 martial arts, got {len(arts)}")
    return arts


# ==============================================================================
# 4b. [M1-3] 解析 100 种武器披挂 (EQUIPMENT_COMPENDIUM.md)
# ==============================================================================

TEN_SKILLS_SET = {"算术", "经义", "策论", "诗词", "琴", "棋", "书", "画", "辩才"}


def parse_equip_bonus_tokens(raw_bonus: str) -> dict[str, Any]:
    bonus: dict[str, Any] = {}
    skills: dict[str, int] = {}
    for token_key, val_str in re.findall(r"`([^`+]+)\+(\d+)`", raw_bonus):
        k = token_key.strip()
        v = int(val_str)
        if k == "攻":
            bonus["attack"] = v
        elif k == "防":
            bonus["defense"] = v
        elif k == "气血":
            bonus["maxHp"] = v
        elif k == "内力":
            bonus["maxMp"] = v
        elif k == "体能":
            bonus["maxStamina"] = v
        elif k == "身法":
            bonus["agility"] = v
        elif k == "抗性":
            bonus["res"] = v
        elif k == "骑术":
            bonus["riding"] = v
        elif k in TEN_SKILLS_SET or k == "颜值":
            skills[k] = v
        else:
            raise ValueError(f"Unknown equipBonus token: {k!r} in {raw_bonus!r}")
    if skills:
        bonus["skills"] = skills
    return bonus


def parse_weapons() -> list[dict[str, Any]]:
    eq_path = DOCS_DIR / "EQUIPMENT_COMPENDIUM.md"
    lines = eq_path.read_text(encoding="utf-8").split("## 十、 天地阶孤品归属总录", 1)[0].splitlines()

    current_tier = ""
    current_sub_tier = ""
    weapons: list[dict[str, Any]] = []

    sub_heading_re = re.compile(r"^###\s+\d+\.\d+\s+(天阶|地阶|良阶|凡阶)(上品|中品|下品)")
    req_token_re = re.compile(r"`([^`]+?)≥(\d+)`")
    syn_pair_re = re.compile(r"([\u4e00-\u9fa5]+)\+(\d+)%")
    ma_id_re = re.compile(r"`(MA-\d{3})`")
    effect_title_re = re.compile(r"^(【[^】]+】)")

    for ln in lines:
        m_sub = sub_heading_re.match(ln)
        if m_sub:
            current_tier = m_sub.group(1)
            current_sub_tier = m_sub.group(2)
            continue

        if not re.match(r"^\|\s*`WPN-\d{3}`\s*\|", ln):
            continue

        cols = [c.strip() for c in ln.strip().strip("|").split("|")]
        if len(cols) not in (9, 10):
            raise ValueError(f"Unexpected column count ({len(cols)}) in weapon row: {ln}")

        wpn_id = cols[0].strip("`").strip()
        code = wpn_id.split("-")[1]
        name = cols[1].replace("**", "").strip()
        wtype = cols[2].strip()
        origin_full = cols[3].strip()
        force_rng = cols[4].strip()
        val = int(cols[5].strip())
        bonus_raw = cols[6].strip()
        syn_raw = cols[7].strip()
        desc_raw = cols[8].strip()
        prereq_raw = cols[9].strip() if len(cols) == 10 else None

        # Resolve regionId + origin detail
        if "·" in origin_full:
            loc_part, origin_detail = origin_full.split("·", 1)
        else:
            loc_part, origin_detail = origin_full, origin_full
        loc_part = loc_part.strip()
        if loc_part not in LOCATION_RESOLUTION_MAP:
            raise ValueError(f"[{wpn_id}] Unknown weapon origin location: {loc_part!r}")
        region_id, canonical_loc_label, _ = LOCATION_RESOLUTION_MAP[loc_part]
        sect_id = resolve_sect_for_origin(origin_full)

        # Parse forceTrait & attackRange (e.g. "刚猛·1格")
        m_fr = re.match(r"^([^·]+)·(\d+)格$", force_rng)
        if not m_fr:
            raise ValueError(f"[{wpn_id}] Invalid force/range cell: {force_rng!r}")
        force_trait = m_fr.group(1).strip()
        attack_range = int(m_fr.group(2))

        equip_bonus = parse_equip_bonus_tokens(bonus_raw)
        synergies = [
            {"category": cat_name, "bonusPct": int(pct)}
            for cat_name, pct in syn_pair_re.findall(syn_raw)
        ]
        sig_art_ids = ma_id_re.findall(syn_raw)

        m_eff = effect_title_re.match(desc_raw)
        special_tag = m_eff.group(1) if m_eff else None

        stat_reqs = (
            [{"stat": k.strip(), "min": int(v)} for k, v in req_token_re.findall(prereq_raw)]
            if prereq_raw
            else []
        )

        weapons.append(
            {
                "id": wpn_id,
                "code": code,
                "name": name,
                "slot": "weapon",
                "weaponType": wtype,
                "tier": current_tier,
                "subTier": current_sub_tier,
                "fullTier": f"{current_tier}{current_sub_tier}",
                "regionId": region_id,
                "locationLabel": canonical_loc_label,
                "origin": origin_detail.strip(),
                "originFull": origin_full,
                "sectId": sect_id,
                "forceTrait": force_trait,
                "attackRange": attack_range,
                "value": val,
                "equipBonus": equip_bonus,
                "synergies": synergies,
                "signatureArtIds": sig_art_ids,
                "specialTag": special_tag,
                "description": desc_raw,
                "prerequisitesText": prereq_raw,
                "statRequirements": stat_reqs,
            }
        )

    weapons.sort(key=lambda x: int(x["code"]))
    if len(weapons) != 100:
        raise AssertionError(f"Expected 100 weapons, got {len(weapons)}")
    tier_counts = Counter(w["tier"] for w in weapons)
    expected_tiers = {"天阶": 10, "地阶": 20, "良阶": 30, "凡阶": 40}
    if dict(tier_counts) != expected_tiers:
        raise AssertionError(f"Weapon tier counts mismatch: {dict(tier_counts)} != {expected_tiers}")
    return weapons


MOUNT_TERRAIN_TRAIT_MAP: dict[str, str | None] = {
    "踏平川": "official",
    "驰大漠": "steppe",
    "逾险峰": "mountain",
    "渡烟波": "water",
    "全地形": "all",
}


def parse_mounts() -> list[dict[str, Any]]:
    eq_path = DOCS_DIR / "EQUIPMENT_COMPENDIUM.md"
    lines = eq_path.read_text(encoding="utf-8").split("## 十、 天地阶孤品归属总录", 1)[0].splitlines()

    current_tier = ""
    current_sub_tier = ""
    mounts: list[dict[str, Any]] = []

    sub_heading_re = re.compile(r"^###\s+5\.\d+\s+(天阶|地阶|良阶|凡阶)(上品|中品|下品)")
    req_token_re = re.compile(r"`([^`]+?)≥(\d+)`")
    effect_title_re = re.compile(r"^【([^】]+)】")

    for ln in lines:
        m_sub = sub_heading_re.match(ln)
        if m_sub:
            current_tier = m_sub.group(1)
            current_sub_tier = m_sub.group(2)
            continue

        if not re.match(r"^\|\s*`MNT-\d{3}`\s*\|", ln):
            continue

        cols = [c.strip() for c in ln.strip().strip("|").split("|")]
        if len(cols) not in (8, 9):
            raise ValueError(f"Unexpected column count ({len(cols)}) in mount row: {ln}")

        mnt_id = cols[0].strip("`").strip()
        code = mnt_id.split("-")[1]
        name = cols[1].replace("**", "").strip()
        breed_category = cols[2].strip()
        origin_full = cols[3].strip()
        speed_trait_raw = cols[4].strip()
        val = int(cols[5].strip())
        bonus_raw = cols[6].strip()
        desc_raw = cols[7].strip()
        prereq_raw = cols[8].strip() if len(cols) == 9 else None

        if "·" in origin_full:
            loc_part, origin_detail = origin_full.split("·", 1)
        else:
            loc_part, origin_detail = origin_full, origin_full
        loc_part = loc_part.strip()
        if loc_part not in LOCATION_RESOLUTION_MAP:
            raise ValueError(f"[{mnt_id}] Unknown mount origin location: {loc_part!r}")
        region_id, canonical_loc_label, _ = LOCATION_RESOLUTION_MAP[loc_part]
        sect_id = resolve_sect_for_origin(origin_full)

        # Parse speed & terrain trait (e.g. "380里·全地形+18%")
        m_st = re.match(r"^(\d+)里·([^+]+)\+(\d+)%$", speed_trait_raw)
        if not m_st:
            raise ValueError(f"[{mnt_id}] Invalid speed/terrain trait cell: {speed_trait_raw!r}")
        base_speed = int(m_st.group(1))
        terrain_trait = m_st.group(2).strip()
        terrain_bonus_pct = int(m_st.group(3))
        if terrain_trait not in MOUNT_TERRAIN_TRAIT_MAP:
            raise ValueError(f"[{mnt_id}] Unknown terrain trait: {terrain_trait!r}")
        favored_terrain = MOUNT_TERRAIN_TRAIT_MAP[terrain_trait]

        equip_bonus = parse_equip_bonus_tokens(bonus_raw)
        m_eff = effect_title_re.match(desc_raw)
        special_tag = m_eff.group(1) if m_eff else None

        stat_reqs = (
            [{"stat": k.strip(), "min": int(v)} for k, v in req_token_re.findall(prereq_raw)]
            if prereq_raw
            else []
        )

        mounts.append(
            {
                "id": mnt_id,
                "code": code,
                "name": name,
                "slot": "mount",
                "breedCategory": breed_category,
                "tier": current_tier,
                "subTier": current_sub_tier,
                "fullTier": f"{current_tier}{current_sub_tier}",
                "regionId": region_id,
                "locationLabel": canonical_loc_label,
                "origin": origin_detail.strip(),
                "originFull": origin_full,
                "sectId": sect_id,
                "baseSpeed": base_speed,
                "terrainTrait": terrain_trait,
                "favoredTerrain": favored_terrain,
                "terrainBonusPct": terrain_bonus_pct,
                "value": val,
                "equipBonus": equip_bonus,
                "specialTag": special_tag,
                "description": desc_raw,
                "prerequisitesText": prereq_raw,
                "statRequirements": stat_reqs,
            }
        )

    mounts.sort(key=lambda x: int(x["code"]))
    if len(mounts) != 28:
        raise AssertionError(f"Expected 28 mounts, got {len(mounts)}")
    tier_counts = Counter(m["tier"] for m in mounts)
    expected_tiers = {"天阶": 3, "地阶": 5, "良阶": 8, "凡阶": 12}
    if dict(tier_counts) != expected_tiers:
        raise AssertionError(f"Mount tier counts mismatch: {dict(tier_counts)} != {expected_tiers}")
    return mounts



# ==============================================================================
# 5. [M0-3] 解析 38 地区风貌与生成 SVG 室内兜底热区
# ==============================================================================

def parse_region_doc_lore() -> dict[int, str]:
    """提取 REGIONAL_MAPS_AND_BUILDINGS.md 中 01~38 号地区的风貌描述文本"""
    rmd = (DOCS_DIR / "REGIONAL_MAPS_AND_BUILDINGS.md").read_text(encoding="utf-8")
    lore_by_num: dict[int, str] = {}

    for m in re.finditer(
        r"###\s+(\d+)\.\s+[^\n]+\n\*\s+\*\*地区地图风貌\*\*：([^\n]+)",
        rmd,
    ):
        lore_by_num[int(m.group(1))] = m.group(2).strip()

    for m in re.finditer(
        r"^\|\s*(\d+)\s*\|\s*\*\*[^*]+\*\*\s*\|\s*([^|]+?)\s*\|",
        rmd,
        flags=re.M,
    ):
        lore_by_num[int(m.group(1))] = m.group(2).strip()

    return lore_by_num


def generate_svg_fallback_interior(
    bldg_id: str,
    bldg_name: str,
    kind: str,
    tag: str,
    desc: str,
    act_label: str,
    cost: int,
    effect: dict[str, Any],
    region_name: str,
) -> dict[str, Any]:
    """
    为暂未生成独立 JPG 内景原画的 65 座特殊建筑生成符合《营造法式》布局的
    SVG 矢量内景结构（含正殿/主位、偏厢/碑廊、演武/观景三处互动热区与山门/大门出口）。
    坐标系严格对齐 [1376, 768]。
    """
    custom_svg_spot_titles: dict[str, tuple[tuple[str, str], tuple[str, str], tuple[str, str]]] = {
        "sl_luohan": (("罗汉堂演武正殿", "百僧拆招"), ("十八铜人木桩廊", "刚猛淬骨"), ("东庑碑帖武库院", "拳棒参修")),
        "wt_staff": (("五郎八卦演棍主台", "棍阵精要"), ("百兵石锁校武坪", "气血锤炼"), ("松风观云禅亭", "吐纳养气")),
        "ts_daoyuan": (("东岳三清正殿", "道藏参玄"), ("东厢丹房碑廊", "古籍经义"), ("苍松石坪演剑院", "剑理拆招")),
        "ts_18pan": (("升仙坊云梯主台", "盘道悟剑"), ("十八盘摩崖石刻廊", "观刻悟招"), ("南天门迎风剑坪", "轻身吐纳")),
        "yzw_huanshi": (("还施水阁藏书正楼", "百家武库"), ("临水曲廊抄经轩", "博闻强识"), ("太湖烟波观风露台", "斗转参悟")),
        "yzw_canhe": (("参合庄正堂议事厅", "世家威仪"), ("燕子坞书房秘档室", "兴复策论"), ("临湖九曲演武坪", "指剑拆招")),
        "yzw_tingxiang": (("听香水榭主阁", "易容奇巧"), ("琴韵小筑曲桥台", "丝竹清音"), ("曼陀山茶幽径", "轻身养气")),
        "jm_plank": (("猿猱鸟道悬空主栈", "蜀道天险"), ("绝壁索桥巡哨亭", "关防洞察"), ("临渊乱石试剑坪", "险峰炼胆")),
        "wd_golden": (("太和紫金正殿", "真武道统"), ("铜铸配殿签房廊", "道经护心"), ("天柱绝顶观云台", "阴阳吐纳")),
        "wd_zixiao": (("紫霄重檐主大殿", "太极参玄"), ("东庑丹鼎藏经阁", "医药道藏"), ("禹迹池畔太极坪", "以柔克刚")),
        "tz_hall": (("铁掌帮聚义正堂", "霸道立威"), ("东厢军资刑堂", "帮规策算"), ("前坪百斤铁沙场", "铁掌淬炼")),
        "nsl_wooden": (("百杰木人机关主巷", "破阵闯关"), ("东侧铜砂铁臂廊", "横练硬功"), ("九莲山门演武坪", "拳棍拆招")),
        # 5 New Cities (15 Special Buildings)
        "gz_nanhai": (("祝融大殿 · 祭海正堂", "南海宗祠"), ("韩碑诗廊 · 铜鼓轩", "唐宋碑刻"), ("章丘浴日亭 · 洪门桩坪", "硬桥硬马")),
        "gz_fanfang": (("番坊总署 · 香药奇珍堂", "万国互市"), ("怀圣光塔 · 望海台", "凭高观舶"), ("大食海商馆 · 译语轩", "四夷秘闻")),
        "gz_yaozhou": (("九曜石轩 · 经制帅堂", "经略岭表"), ("仙湖曲桥 · 题石廊", "摩崖品诗"), ("百草药圃 · 辟瘴亭", "岭南灵草")),
        "tzf_yuelu": (("岳麓讲堂 · 濂溪席", "太极理学"), ("御书藏经楼", "博通古今"), ("赫曦观江台", "潇湘吐纳")),
        "tzf_tianxin": (("天心主阁 · 瞰湘楼", "楚南形胜"), ("古堞飞廊 · 藏兵室", "城防兵策"), ("橘洲望风露台", "迎风练步")),
        "tzf_wuxi": (("五溪苗市 · 百草蛊堂", "苗疆奇货"), ("铜官窑彩绘坊", "丹青百工"), ("辰砂试毒石坪", "百毒淬体")),
        "hzf_tengwang": (("滕王主阁 · 临江诗席", "江右文宗"), ("秋水长天画廊", "丹青琴韵"), ("章江吹笛露台", "凭栏吐纳")),
        "hzf_xishan": (("玉隆正殿 · 净明道坛", "忠孝道脉"), ("许真君锁蛟铁柱井", "镇邪养气"), ("紫翠丹房松坪", "清心辟毒")),
        "hzf_poyang": (("章江钞关 · 都水厅", "赣鄱水枢"), ("万斛漕船栈桥", "水陆商旅"), ("鄱阳楼船演武坞", "踏浪排枪")),
        "qzf_chama": (("茶马榷场 · 勘合正堂", "川茶易马"), ("吐蕃青唐验马阑", "相马骑术"), ("丝路驼队行栈", "西域风闻")),
        "qzf_maijishan": (("散花楼 · 凌空飞栈", "绝壁天梯"), ("千佛泥塑瑞应龛", "禅心佛艺"), ("东崖云雾试身台", "险崖轻身")),
        "qzf_longyou": (("古塞石堡 · 金环聚义堂", "边关刀宗"), ("断碑烽火望夏台", "塞上军情"), ("黄沙校刀演武坪", "大环劈风")),
        "lyf_yamen": (("东京留守正堂", "辽东军政"), ("渤海高丽四方宾馆", "东夷折冲"), ("铁林骁骑后校场", "弓马铁骑")),
        "lyf_baita": (("广佑正殿 · 白塔地宫", "辽左佛刹"), ("八角密檐浮雕回廊", "契丹梵刻"), ("太子河望雪石坪", "朔气炼体")),
        "lyf_ginseng": (("山参紫貂交易大堂", "关东奇珍"), ("海东青驯鹰场", "女真猎艺"), ("长白雪林试剑坪", "寒锋吐纳")),
        # 9 Minor-Sect Headquarters & Branch Halls (SECT-21 ~ SECT-30)
        "ly_zhenwu": (("振武讲堂 · 考刀正厅", "金刀外院"), ("百刃刀谱碑廊", "刀理筑基"), ("九环大刀石锁坪", "河洛演武")),
        "dm_baji": (("八极忠义讲武正堂", "刚猛护院"), ("千斤铁锁秘传室", "桩功心要"), ("铁山靠木桩校场", "跺脚震州")),
        "qz_zhenyuan": (("威远正堂 · 签押总厅", "红货承镖"), ("四海镖银账房库", "海陆走镖"), ("金钱镖梅花靶坪", "百步穿杨")),
        "jn_chaquan": (("查拳正堂 · 授艺厅", "开门授徒"), ("齐鲁拳谱藏书厢", "长拳宗风"), ("九宫梅花桩沙袋坪", "燕子抄水")),
        "hz_nuchao": (("怒潮聚义水香堂", "弄潮义气"), ("铁锚纤索器械房", "海港讨生"), ("扛鼎石锁撒网坪", "踏浪练胆")),
        "gz_hongmen": (("五羊洪门忠义正堂", "护港团练"), ("南拳铁桥药酒房", "跌打壮骨"), ("狮头高桩木人坪", "硬桥硬马")),
        "qzf_jinhuan": (("金环刀堂议事厅", "丝路护马"), ("茶马镖旗兵甲房", "边塞整备"), ("朴刀马步黄沙坪", "饮酒演刀")),
        "cd_baicao": (("百草悬壶问诊正堂", "医武济世"), ("千味川药晾晒廊", "本草炮制"), ("五禽导引点穴院", "认穴养气")),
        "tzf_wuxidojo": (("五溪苗汉聚义讲堂", "南楚奇门"), ("朱砂雄黄百草厢", "辟瘴炼药"), ("飞蝗石奇门演武坪", "飞石猎兽")),
    }

    kind_spot_titles: dict[str, tuple[tuple[str, str], tuple[str, str], tuple[str, str]]] = {
        "temple": (("大雄正殿 · 佛前蒲团", "禅心参悟"), ("东厢碑廊 · 藏经橱", "古籍经义"), ("钟鼓禅院 · 演武坪", "桩功吐纳")),
        "pagoda": (("宝塔底层 · 舍利地宫", "护体参修"), ("中层回廊 · 浮雕壁画", "观图悟道"), ("绝顶佛龛 · 凭栏远眺", "登高吐纳")),
        "paloda_gold": (("金顶正殿 · 密乘坛城", "密印参修"), ("转经长廊 · 唐卡壁画", "经义护心"), ("雪域露台 · 迎风吐纳", "高原炼气")),
        "palace": (("正殿丹墀 · 议政堂", "庙堂威仪"), ("东阁书房 · 秘档库", "兵略策论"), ("禁苑角楼 · 校射坪", "守御演武")),
        "yamen": (("升堂正衙 · 明镜高悬", "缉捕公案"), ("架阁案牍库", "刑名策论"), ("后衙演武校场", "捕快拆招")),
        "pavilion": (("主阁讲席 · 抚琴台", "琴书雅集"), ("曲水回廊 · 藏书楼", "博古通今"), ("临风观景轩", "清谈悟道")),
        "garden": (("名园主榭 · 赏芳亭", "诗词风雅"), ("奇石曲桥 · 琴棋台", "纹枰品茗"), ("竹影幽径 · 吐纳坪", "清心养气")),
        "tower": (("高楼雅座 · 凭栏席", "江湖风闻"), ("飞桥灯廊 · 琴歌台", "音律辩才"), ("临街望楼 · 观风处", "洞察四方")),
        "manor": (("正堂议事厅", "世家礼法"), ("内院书斋 · 秘藏室", "家传图谱"), ("后园演武石坪", "实战拆招")),
        "camp": (("中军帅帐 · 沙盘台", "兵法策论"), ("点将高台 · 旌旗阵", "军阵气血"), ("辕门骑射场", "弓马骑术")),
        "fort": (("雄关箭楼 · 望胡台", "边塞军情"), ("瓮城屯兵校场", "铁血演武"), ("古碑烽燧台", "苍凉悟境")),
        "cave": (("幽谷石室 · 寒玉榻", "闭关吐纳"), ("绝壁石刻 · 剑痕崖", "观刻悟招"), ("飞瀑深潭 · 试炼涧", "淬体抗性")),
        "dock": (("水寨望楼 · 钞关厅", "漕运风闻"), ("千帆栈桥 · 装卸埠", "水陆豪客"), ("临江演武船坞", "踏浪轻身")),
        "boat": (("画舫主舱 · 丝竹席", "雅集唱和"), ("船头望江台", "烟波吐纳"), ("画桥渡口 · 停泊埠", "江南风物")),
        "forge": (("神炉主坊 · 铸剑台", "百炼精钢"), ("淬火寒泉池", "刚猛锤炼"), ("兵甲陈列架", "品鉴利器")),
        "market": (("番坊正市 · 奇货堂", "四海商贸"), ("斗茶品香轩", "风雅博闻"), ("车马行栈 · 镖局坪", "江湖交游")),
    }

    t1, t2, t3 = custom_svg_spot_titles.get(
        bldg_id,
        kind_spot_titles.get(
            kind,
            (("正堂核心区", tag or "秘境探索"), ("东侧偏殿廊庑", "博闻研习"), ("前庭演武坪", "吐纳修历")),
        ),
    )

    # Secondary gentle effects for side spots (purely M0 exploration scaffold)
    side_effect_2: dict[str, Any] = {"skill": ["经义", 1], "mp": 12}
    if kind in ("camp", "fort", "forge"):
        side_effect_2 = {"skill": ["策论", 1], "hp": 15}
    elif kind in ("pavilion", "garden", "boat", "tower"):
        side_effect_2 = {"skill": ["诗词", 1], "skill2": ["琴", 1]}
    elif kind in ("market", "dock"):
        side_effect_2 = {"skill": ["算术", 1], "skill2": ["辩才", 1]}

    side_effect_3: dict[str, Any] = {"hp": 16, "agi": 1}

    return {
        "subtitle": f"宋式营造矢量内景《{bldg_name}》— 点击院内殿堂、回廊或石坪热区互动，或由正门返回{region_name}全景",
        "exitGate": {
            "label": f"步出正门（返回{region_name}全景）",
            "x": 688,
            "y": 698,
            "poly": "530,645 846,645 880,748 496,748",
        },
        "spots": [
            {
                "id": f"{bldg_id}_main",
                "name": t1[0],
                "tag": tag or t1[1],
                "x": 688,
                "y": 272,
                "poly": "470,155 906,155 942,355 434,355",
                "desc": desc,
                "actLabel": act_label,
                "cost": cost,
                "effect": effect,
            },
            {
                "id": f"{bldg_id}_east",
                "name": t2[0],
                "tag": t2[1],
                "x": 1072,
                "y": 438,
                "poly": "935,345 1215,345 1235,525 915,525",
                "desc": f"位于【{bldg_name}】侧翼的幽静廊庑与藏卷之所，可在此观摩碑刻图谱、静心吐纳。",
                "actLabel": "观摩古刻潜修一日（轻度进益）",
                "cost": 0,
                "effect": side_effect_2,
            },
            {
                "id": f"{bldg_id}_west",
                "name": t3[0],
                "tag": t3[1],
                "x": 304,
                "y": 438,
                "poly": "160,345 440,345 460,525 140,525",
                "desc": f"位于【{bldg_name}】前庭偏侧的开阔石坪，往来门人豪客常在此活动筋骨、切磋步法。",
                "actLabel": "演练步法调匀呼吸（气血+16 / 身法+1）",
                "cost": 0,
                "effect": side_effect_3,
            },
        ],
    }


# ==============================================================================
# 6. [M0-3 / M1] 解析 1,000 名人物并关联立绘、武学 ID、最末层驻留建筑与全量属性
# ==============================================================================

TEN_ARTS_CANONICAL_KEYS: tuple[str, ...] = (
    "骑术",
    "算术",
    "经义",
    "策论",
    "诗词",
    "琴",
    "棋",
    "书",
    "画",
    "辩才",
)


def pick_template_for_npc(faction_id: str, gender: str, role: str, category: str) -> str:
    if faction_id in ("SECT-01", "SECT-03", "SECT-04") or "僧" in role or "禅" in role or "喇嘛" in role:
        return "/assets/characters/templates/tpl_shaolin_monk_fb.jpg"
    if faction_id in ("ORG-05", "SECT-29") or "医" in role or "药" in role:
        return "/assets/characters/templates/tpl_song_physician_fb.jpg"
    if faction_id == "ORG-08":
        return "/assets/characters/templates/tpl_dali_prince_fb.jpg"
    if faction_id in ("ORG-06", "ORG-07", "ORG-09", "ORG-11", "SECT-20") and gender == "男":
        return "/assets/characters/templates/tpl_khitan_warrior_fb.jpg"
    if gender == "女":
        if faction_id in ("ORG-02", "ORG-06", "ORG-07", "ORG-08") and (
            "后" in role or "妃" in role or "主" in role or "贵女" in role
        ):
            return "/assets/characters/templates/tpl_song_empress_fb.jpg"
        if "将" in role or "帅" in role or "捕" in role or faction_id in ("SECT-17", "SECT-18", "SECT-22", "SECT-24"):
            return "/assets/characters/templates/tpl_woman_general_fb.jpg"
        return "/assets/characters/templates/tpl_emei_heroine_fb.jpg"
    if category == "历史名人" or faction_id in ("ORG-02", "ORG-03", "ORG-04"):
        if "将" in role or "帅" in role or "军" in role or "指挥" in role:
            return "/assets/characters/templates/tpl_greenwood_hero_fb.jpg"
        return "/assets/characters/templates/tpl_song_scholar_fb.jpg"
    if faction_id in ("SECT-06", "SECT-08", "SECT-11", "SECT-14"):
        return "/assets/characters/templates/tpl_taoist_master_fb.jpg"
    if faction_id in ("SECT-09", "SECT-10", "SECT-12"):
        return "/assets/characters/templates/tpl_taohua_master_fb.jpg"
    if faction_id in ("SECT-13", "SECT-19", "SECT-20", "SECT-30"):
        return "/assets/characters/templates/tpl_unorthodox_master_fb.jpg"
    return "/assets/characters/templates/tpl_greenwood_hero_fb.jpg"


def resolve_npc_leaf_location(
    npc_id: str,
    raw_loc: str,
    buildings_by_region: dict[str, list[dict[str, Any]]],
) -> tuple[str, str, str | None, str, str, str | None, str | None, str]:
    """
    Parse `地区 > 基础建筑` or `地区 > 特殊建筑 > 子建筑` from CHARACTER_COMPENDIUM.md
    and validate strictly against compiled leaf buildings/spots.
    Returns:
      (region_id, canonical_region_name, sub_loc, bldg_id, bldg_name, spot_id, spot_name, full_loc_label)
    """
    parts = [p.strip() for p in raw_loc.split(" > ") if p.strip()]
    if len(parts) < 2 or len(parts) > 3:
        raise ValueError(
            f"[{npc_id}] Location must specify leaf building (`地区 > 基础建筑` or `地区 > 特殊建筑 > 子建筑`), got: {raw_loc!r}"
        )

    reg_raw = parts[0]
    if reg_raw not in LOCATION_RESOLUTION_MAP:
        raise ValueError(f"[{npc_id}] Unknown region {reg_raw!r} in {raw_loc!r}")
    region_id, canonical_loc_label, sub_loc = LOCATION_RESOLUTION_MAP[reg_raw]
    clean_region_name = re.sub(r"（华山）|（潼关）|（青城山）|（唐家堡）$", "", canonical_loc_label)

    reg_bldgs = buildings_by_region.get(region_id, [])
    bldg_name_target = parts[1]
    matched_bldg: dict[str, Any] | None = None
    for b in reg_bldgs:
        if b["name"] == bldg_name_target:
            matched_bldg = b
            break
    if matched_bldg is None:
        raise ValueError(
            f"[{npc_id}] Building {bldg_name_target!r} not found in region {region_id} ({clean_region_name})"
        )

    # Infer sub_loc for composite regions
    if region_id == "tongguan":
        sub_loc = "潼关" if matched_bldg["id"] == "tg_fort" else "西岳华山"
    elif region_id == "qingcheng":
        sub_loc = "青城山" if matched_bldg["id"] == "qc_shangqing" else "唐家堡"

    has_sub_spots = (
        matched_bldg["interior"] is not None
        and len(matched_bldg["interior"].get("spots", [])) > 0
    )

    if has_sub_spots:
        if len(parts) != 3:
            raise ValueError(
                f"[{npc_id}] Building {matched_bldg['name']!r} has interior sub-buildings; NPC must be assigned to a sub-building!"
            )
        spot_name_target = parts[2]
        matched_spot: dict[str, Any] | None = None
        for sp in matched_bldg["interior"]["spots"]:
            if sp["name"] == spot_name_target:
                matched_spot = sp
                break
        if matched_spot is None:
            valid_names = [s["name"] for s in matched_bldg["interior"]["spots"]]
            raise ValueError(
                f"[{npc_id}] Sub-building {spot_name_target!r} not found in {matched_bldg['name']!r} (valid: {valid_names})"
            )
        full_label = f"{clean_region_name} > {matched_bldg['name']} > {matched_spot['name']}"
        return (
            region_id,
            clean_region_name,
            sub_loc,
            matched_bldg["id"],
            matched_bldg["name"],
            matched_spot["id"],
            matched_spot["name"],
            full_label,
        )
    else:
        if len(parts) != 2:
            raise ValueError(
                f"[{npc_id}] Building {matched_bldg['name']!r} has no interior sub-buildings, got extra path in {raw_loc!r}"
            )
        full_label = f"{clean_region_name} > {matched_bldg['name']}"
        return (
            region_id,
            clean_region_name,
            sub_loc,
            matched_bldg["id"],
            matched_bldg["name"],
            None,
            None,
            full_label,
        )


def parse_npcs(
    martial_arts: list[dict[str, Any]],
    buildings_by_region: dict[str, list[dict[str, Any]]],
) -> list[dict[str, Any]]:
    cc_path = DOCS_DIR / "CHARACTER_COMPENDIUM.md"
    lines = cc_path.read_text(encoding="utf-8").splitlines()

    # Build martial art name lookup (clean name -> artId)
    art_by_clean: dict[str, str] = {}
    for ma in martial_arts:
        cname = ma["cleanName"]
        art_by_clean[cname] = ma["id"]
        # Also register base name before parenthetical note, e.g. 洪拳（岭南/闽南初传） -> 洪拳
        base_no_paren = re.sub(r"（.*?）|\(.*?\)", "", cname).strip()
        if base_no_paren and base_no_paren not in art_by_clean:
            art_by_clean[base_no_paren] = ma["id"]
        # Also register inner parenthetical alternate name if >= 4 chars, e.g. 常山龙胆枪
        for inner in re.findall(r"[（(]([^）)]+)[）)]", cname):
            if len(inner) >= 4 and "/" not in inner and "初传" not in inner and inner not in art_by_clean:
                art_by_clean[inner] = ma["id"]

    # Common short-name aliases in NPC rows -> canonical cleanName
    art_short_aliases = {
        "金刚不坏体神功": "金刚不坏体",
        "金刚不坏神功": "金刚不坏体",
        "少林九阳": "少林九阳功",
        "八荒六合功": "八荒六合唯我独尊功",
        "枯荣禅功": "枯荣禅意功",
        "葵花残卷（大内秘藏）": "葵花残卷（大内秘藏前本）",
        "生死符": "天山六阳掌",
    }
    for alias, target in art_short_aliases.items():
        if target in art_by_clean:
            art_by_clean[alias] = art_by_clean[target]

    existing_avatars = {
        p.stem for p in (PUBLIC_DIR / "assets" / "characters" / "avatars").glob("*.jpg")
    }
    existing_fullbody = {
        p.stem for p in (PUBLIC_DIR / "assets" / "characters" / "fullbody").glob("*.jpg")
    }

    npcs: list[dict[str, Any]] = []

    for ln in lines:
        if not re.match(r"^\|\s*`?NPC-\d{4}`?\s*\|", ln):
            continue
        cols = [c.strip() for c in ln.strip().strip("|").split("|")]
        npc_id = cols[0].strip("`").strip()
        num_idx = int(npc_id.split("-")[1])
        name = cols[1].replace("**", "").strip()
        title = cols[2].strip()
        gender = cols[3].strip()
        age = int(cols[4].strip())
        faction_name = cols[5].strip()
        role = cols[6].strip()
        raw_loc = cols[7].strip()
        realm = cols[8].replace("**", "").strip()

        (
            region_id,
            clean_region_name,
            sub_loc,
            assigned_bldg_id,
            assigned_bldg_name,
            assigned_spot_id,
            assigned_spot_name,
            full_loc_label,
        ) = resolve_npc_leaf_location(npc_id, raw_loc, buildings_by_region)

        if faction_name not in FACTION_BY_NAME:
            raise ValueError(f"[{npc_id}] Unknown faction: {faction_name!r}")
        fac_obj = FACTION_BY_NAME[faction_name]
        faction_id = fac_obj["id"]

        if realm not in REALM_BENCHMARKS:
            raise ValueError(f"[{npc_id}] Unknown realm: {realm!r}")
        _, _, _, _, realm_rank = REALM_BENCHMARKS[realm]
        major_realm = "不入流" if realm == "不入流" else realm[:-2]
        minor_realm = None if realm == "不入流" else realm[-2:]

        stat_parts = [int(x) for x in cols[9].strip("`").split("/")]
        if len(stat_parts) != 4:
            raise ValueError(f"[{npc_id}] Expected 4 combat stats, got {cols[9]!r}")
        stats = {
            "hp": stat_parts[0],
            "mp": stat_parts[1],
            "agi": stat_parts[2],
            "res": stat_parts[3],
            "isBenchmark": False,
        }

        talent_parts = [int(x) for x in cols[10].strip("`").split("/")]
        if len(talent_parts) != 3:
            raise ValueError(f"[{npc_id}] Expected 3 innate talents, got {cols[10]!r}")
        for tv in talent_parts:
            if not (1 <= tv <= 100):
                raise ValueError(f"[{npc_id}] Talent value out of [1,100]: {tv}")
        talents = {
            "bone": talent_parts[0],
            "comprehension": talent_parts[1],
            "charm": talent_parts[2],
        }

        ten_art_parts = [int(x) for x in cols[11].strip("`").split("/")]
        if len(ten_art_parts) != 10:
            raise ValueError(f"[{npc_id}] Expected 10 arts values, got {cols[11]!r}")
        for av in ten_art_parts:
            if not (0 <= av <= 100):
                raise ValueError(f"[{npc_id}] Ten-art value out of [0,100]: {av}")
        ten_arts = {
            TEN_ARTS_CANONICAL_KEYS[idx]: ten_art_parts[idx]
            for idx in range(10)
        }

        if num_idx <= 100:
            category = "历史名人"
            arts_raw = cols[12]
            bio = cols[13]
        elif num_idx <= 240:
            category = "武林群侠"
            arts_raw = cols[12]
            bio = cols[13]
        else:
            category = "武林群侠"
            arts_raw = cols[12]
            bio = f"{faction_name}{role}，常驻【{full_loc_label}】，武道修为居【{realm}】，主修{arts_raw}。"

        # Resolve known martial art IDs vs Ten-Arts / specialty tags
        raw_tokens = [
            t.strip()
            for t in re.split(r"[、，,/]+", arts_raw)
            if t.strip()
        ]
        known_art_ids: list[str] = []
        specialty_tags: list[str] = []
        for tok in raw_tokens:
            clean_tok = strip_art_book_marks(tok)
            clean_no_paren = re.sub(r"（.*?）|\(.*?\)", "", clean_tok).strip()
            matched_id = art_by_clean.get(clean_tok) or art_by_clean.get(clean_no_paren)
            if not matched_id:
                # Substring prefix match if unambiguous >= 3 chars
                probe = clean_no_paren if len(clean_no_paren) >= 3 else clean_tok
                for cname, aid in art_by_clean.items():
                    if len(probe) >= 3 and (probe == cname or cname.startswith(probe)):
                        matched_id = aid
                        break
            if matched_id:
                if matched_id not in known_art_ids:
                    known_art_ids.append(matched_id)
            else:
                if tok != "无":
                    specialty_tags.append(tok)

        avatar_url = f"/assets/characters/avatars/{npc_id}.jpg" if npc_id in existing_avatars else None
        fullbody_url = f"/assets/characters/fullbody/{npc_id}.jpg" if npc_id in existing_fullbody else None
        template_url = pick_template_for_npc(faction_id, gender, role, category)

        npcs.append(
            {
                "id": npc_id,
                "name": name,
                "title": title,
                "category": category,
                "gender": gender,
                "age": age,
                "factionId": faction_id,
                "factionName": faction_name,
                "role": role,
                "regionId": region_id,
                "locationLabel": clean_region_name,
                "subLocation": sub_loc,
                "assignedBuildingId": assigned_bldg_id,
                "assignedBuildingName": assigned_bldg_name,
                "assignedSpotId": assigned_spot_id,
                "assignedSpotName": assigned_spot_name,
                "fullLocationLabel": full_loc_label,
                "realm": realm,
                "majorRealm": major_realm,
                "minorRealm": minor_realm,
                "realmRank": realm_rank,
                "stats": stats,
                "talents": talents,
                "tenArts": ten_arts,
                "artsText": arts_raw,
                "knownArtIds": known_art_ids,
                "specialtyTags": specialty_tags,
                "bio": bio,
                "avatarUrl": avatar_url,
                "fullbodyUrl": fullbody_url,
                "templateUrl": template_url,
            }
        )

    if len(npcs) != 1000:
        raise AssertionError(f"Expected 1000 NPCs, got {len(npcs)}")
    return npcs


# ==============================================================================
# 7. 主编译流水线
# ==============================================================================

def parse_gear() -> list[dict[str, Any]]:
    text = (DOCS_DIR / "EQUIPMENT_COMPENDIUM.md").read_text(encoding="utf-8").split("## 十、 天地阶孤品归属总录", 1)[0]
    gear_list: list[dict[str, Any]] = []
    seen_ids: set[str] = set()

    slot_map = {
        "ARM": "armor",
        "BOT": "shoes",
        "BOW": "bow",
        "ACC": "accessory",
    }

    for line in text.splitlines():
        s = line.strip()
        m = re.match(r"^\|\s*`((?:ARM|BOT|BOW|ACC)-\d{3})`\s*\|", s)
        if not m:
            continue
        cells = [c.strip() for c in s.strip("|").split("|")]
        if len(cells) < 10:
            continue

        item_id = cells[0].strip("`").strip()
        if item_id in seen_ids:
            raise AssertionError(f"Duplicate gear ID: {item_id}")
        seen_ids.add(item_id)

        prefix = item_id.split("-")[0]
        slot = slot_map[prefix]
        name = re.sub(r"\*\*", "", cells[1]).strip()
        tier = cells[2]
        grade = cells[3]
        sub_type = cells[4]
        origin = cells[5]
        val_m = re.search(r"(\d+)", cells[6])
        value = int(val_m.group(1)) if val_m else 100
        bonus_cell = cells[7]
        desc_cell = cells[8]
        req_cell = cells[9]

        loc_part = origin.split("·", 1)[0].strip() if "·" in origin else origin.strip()
        if loc_part not in LOCATION_RESOLUTION_MAP:
            raise ValueError(f"[{item_id}] Unknown gear origin location: {loc_part!r}")
        region_id, _, _ = LOCATION_RESOLUTION_MAP[loc_part]
        sect_id = resolve_sect_for_origin(origin)
        equip_bonus = parse_equip_bonus_tokens(bonus_cell)

        tag_m = re.match(r"^【([^】]+)】(.*)$", desc_cell)
        special_tag = tag_m.group(1).strip() if tag_m else None
        description = tag_m.group(2).strip() if tag_m else desc_cell

        prereq_text = None if req_cell in ("无", "-", "") else req_cell
        stat_reqs = (
            [{"stat": k.strip(), "min": int(v)} for k, v in re.findall(r"`([^`≥]+)≥(\d+)`", prereq_text)]
            if prereq_text
            else []
        )

        gear_list.append(
            {
                "id": item_id,
                "name": name,
                "slot": slot,
                "tier": tier,
                "grade": grade,
                "subType": sub_type,
                "origin": origin,
                "regionId": region_id,
                "sectId": sect_id,
                "value": value,
                "equipBonus": equip_bonus,
                "specialTag": special_tag,
                "description": description,
                "prerequisitesText": prereq_text,
                "statRequirements": stat_reqs,
            }
        )

    assert len(gear_list) == 168, f"Expected 168 gear items, got {len(gear_list)}"
    return gear_list


def parse_unique_artifacts(npcs_by_id: dict[str, dict[str, Any]]) -> list[dict[str, Any]]:
    text = (DOCS_DIR / "EQUIPMENT_COMPENDIUM.md").read_text(encoding="utf-8")
    marker = "## 十、 天地阶孤品归属总录"
    if marker not in text:
        raise AssertionError("Missing section 十、 天地阶孤品归属总录 in EQUIPMENT_COMPENDIUM.md")
    sec_text = text.split(marker, 1)[1]

    records: list[dict[str, Any]] = []
    seen_ids: set[str] = set()

    for line in sec_text.splitlines():
        s = line.strip()
        m = re.match(r"^\|\s*`((?:WPN|ARM|BOT|BOW|ACC|MNT|ITM-SCR|ITM-MED|ITM-CUR)-\d{3})`\s*\|", s)
        if not m:
            continue
        cells = [c.strip() for c in s.strip("|").split("|")]
        if len(cells) < 7:
            continue

        item_id = cells[0].strip("`").strip()
        if item_id in seen_ids:
            raise AssertionError(f"Duplicate unique artifact ID: {item_id}")
        seen_ids.add(item_id)

        item_name = re.sub(r"\*\*", "", cells[1]).strip()
        tier = cells[2]
        if tier not in ("天阶", "地阶"):
            raise AssertionError(f"Invalid tier {tier!r} on unique artifact {item_id}")
        category_label = cells[3]
        owner_spec = cells[4].strip("`").strip()
        note = cells[6]

        if owner_spec == "UNOWNED":
            records.append(
                {
                    "itemId": item_id,
                    "itemName": item_name,
                    "tier": tier,
                    "categoryLabel": category_label,
                    "ownerType": "unowned",
                    "ownerNpcId": None,
                    "ownerNpcName": None,
                    "ownerNpcTitle": None,
                    "ownerFactionName": None,
                    "ownerRegionId": None,
                    "ownerLocationLabel": None,
                    "note": note,
                }
            )
        elif owner_spec == "PLAYER":
            records.append(
                {
                    "itemId": item_id,
                    "itemName": item_name,
                    "tier": tier,
                    "categoryLabel": category_label,
                    "ownerType": "player",
                    "ownerNpcId": None,
                    "ownerNpcName": "少侠（主角）",
                    "ownerNpcTitle": "初入江湖",
                    "ownerFactionName": None,
                    "ownerRegionId": None,
                    "ownerLocationLabel": "随身持有",
                    "note": note,
                }
            )
        else:
            if owner_spec not in npcs_by_id:
                raise AssertionError(f"Unknown ownerNpcId {owner_spec!r} for unique artifact {item_id}")
            npc = npcs_by_id[owner_spec]
            records.append(
                {
                    "itemId": item_id,
                    "itemName": item_name,
                    "tier": tier,
                    "categoryLabel": category_label,
                    "ownerType": "npc",
                    "ownerNpcId": owner_spec,
                    "ownerNpcName": npc["name"],
                    "ownerNpcTitle": npc["title"],
                    "ownerFactionName": npc["factionName"],
                    "ownerRegionId": npc["regionId"],
                    "ownerLocationLabel": npc["fullLocationLabel"],
                    "note": note,
                }
            )

    assert len(records) == 141, f"Expected 141 unique Heaven/Earth artifacts, got {len(records)}"
    return records


def populate_npc_loadouts(
    npcs: list[dict[str, Any]],
    martial_arts: list[dict[str, Any]],
    weapons: list[dict[str, Any]],
    gear: list[dict[str, Any]],
    mounts: list[dict[str, Any]],
) -> None:
    """
    为所有 1,000 名 NPC 配齐：
    1) 6 个武学槽位 (neigong, qinggong, move1~move4) 与对应的 learnedArts (含 1~10 重火候)
       - 优先使用自身 knownArtIds；空缺优先从所属门派(factionId)武学中补，不足再从通用武学(sectId=None)补
    2) 7 个披挂槽位 (weapon, armor, shoes, bow, accessory1, accessory2, mount)
       - 优先佩戴 ownedArtifactIds 中的天/地阶孤品
       - 空缺：一流及以上(realmRank <= 9)从【良阶】补，二流及以下(realmRank >= 10)从【凡阶】补
    """
    art_by_id = {a["id"]: a for a in martial_arts}
    if "MA-102" in art_by_id:
        art_by_id["MA-102"]["tier"] = "地阶"
        art_by_id["MA-102"]["subTier"] = "下品"
        art_by_id["MA-102"]["fullTier"] = "地阶下品"
    if "MA-060" in art_by_id:
        art_by_id["MA-060"]["tier"] = "地阶"
        art_by_id["MA-060"]["subTier"] = "上品"
        art_by_id["MA-060"]["fullTier"] = "地阶上品"
    tier_rank = {"天阶": 4, "地阶": 3, "良品": 2, "凡品": 1}

    def allowed_art_tiers(realm_rank: int) -> list[str]:
        if realm_rank <= 3:
            return ["天阶", "地阶", "良品", "凡品"]
        if realm_rank <= 6:
            return ["地阶", "天阶", "良品", "凡品"]
        if realm_rank <= 9:
            return ["良品", "地阶", "凡品"]
        if realm_rank <= 12:
            return ["良品", "凡品"]
        return ["凡品", "良品"]

    def default_art_level(realm_rank: int, art_tier: str, npc_num: int) -> int:
        if realm_rank == 1:  # 大宗师上品
            return 10
        if realm_rank == 2:  # 大宗师中品
            return 9 if art_tier == "天阶" else 10
        if realm_rank == 3:  # 大宗师下品
            return 9 if art_tier in ("天阶", "地阶") else 10
        if realm_rank == 4:  # 宗师上品
            if art_tier == "天阶":
                return 8
            if art_tier == "地阶":
                return 9
            return 10
        if realm_rank == 5:  # 宗师中品
            return 8 if art_tier in ("天阶", "地阶") else 10
        if realm_rank == 6:  # 宗师下品
            if art_tier == "天阶":
                return 7
            if art_tier == "地阶":
                return 8
            if art_tier == "良品":
                return 9
            return 10
        if realm_rank == 7:  # 一流上品
            return 7 if art_tier in ("天阶", "地阶") else 9
        if realm_rank == 8:  # 一流中品
            if art_tier == "天阶":
                return 6
            if art_tier == "地阶":
                return 7
            if art_tier == "良品":
                return 8
            return 9
        if realm_rank == 9:  # 一流下品
            if art_tier == "天阶":
                return 5
            if art_tier == "地阶":
                return 7
            return 8
        if realm_rank == 10:  # 二流上品
            if art_tier == "天阶":
                return 3
            if art_tier == "地阶":
                return 6
            if art_tier == "良品":
                return 7
            return 8
        if realm_rank == 11:  # 二流中品
            if art_tier == "天阶":
                return 1
            if art_tier == "地阶":
                return 5
            if art_tier == "良品":
                return 6
            return 7
        if realm_rank == 12:  # 二流下品
            if art_tier == "天阶":
                return 1
            if art_tier in ("地阶", "良品"):
                return 5
            return 6
        if realm_rank == 13:  # 三流上品
            if art_tier in ("天阶", "地阶"):
                return 1
            if art_tier == "良品":
                return 4
            return 5
        if realm_rank == 14:  # 三流中品
            if art_tier in ("天阶", "地阶"):
                return 1
            if art_tier == "良品":
                return 3
            return 4
        if realm_rank == 15:  # 三流下品
            if art_tier in ("天阶", "地阶"):
                return 1
            if art_tier == "良品":
                return 2
            return 3
        # 不入流 (realm_rank == 16)
        return 2 if art_tier == "凡品" else 1

    def pick_from_pool(
        pool: list[dict[str, Any]],
        preferred_tiers: list[str],
        exclude_ids: set[str],
        seed: int,
    ) -> dict[str, Any] | None:
        avail = [x for x in pool if x["id"] not in exclude_ids]
        if not avail:
            return None
        for t in preferred_tiers:
            t_list = [x for x in avail if x["tier"] == t]
            if t_list:
                return t_list[seed % len(t_list)]
        return avail[seed % len(avail)]

    def pick_gear_for_slot(
        pool: list[dict[str, Any]],
        target_tier: str,
        faction_id: str,
        region_id: str,
        seed: int,
        exclude_ids: set[str] | None = None,
        preferred_weapon_type: str | None = None,
    ) -> str:
        excl = exclude_ids or set()
        tiered = [x for x in pool if x["tier"] == target_tier and x["id"] not in excl]
        if not tiered:
            tiered = [x for x in pool if x["id"] not in excl] or pool

        # 武器优先匹配外功兵种
        if preferred_weapon_type:
            typed = [x for x in tiered if x.get("weaponType") == preferred_weapon_type]
            if typed:
                tiered = typed

        # 优先匹配门派或地区
        sect_match = [x for x in tiered if x.get("sectId") == faction_id]
        if sect_match:
            return sect_match[seed % len(sect_match)]["id"]
        reg_match = [x for x in tiered if x.get("regionId") == region_id]
        if reg_match:
            return reg_match[seed % len(reg_match)]["id"]
        return tiered[seed % len(tiered)]["id"]

    cat_to_weapon_type = {
        "剑法": "剑",
        "刀法": "刀",
        "枪法": "枪",
        "棍棒": "棍棒",
        "拳掌": "拳掌护手",
        "指法": "拳掌护手",
        "暗器": "暗器",
        "音功": "奇门音兵",
    }

    gear_by_slot = {
        "armor": [g for g in gear if g["slot"] == "armor"],
        "shoes": [g for g in gear if g["slot"] == "shoes"],
        "bow": [g for g in gear if g["slot"] == "bow"],
        "accessory": [g for g in gear if g["slot"] == "accessory"],
    }

    for npc in npcs:
        npc_num = int(npc["id"].split("-")[1])
        realm_rank = int(npc.get("realmRank", 16))
        faction_id = npc.get("factionId", "")
        region_id = npc.get("regionId", "")
        pref_tiers = allowed_art_tiers(realm_rank)

        # 1) 6 槽武学选配
        known_arts = [art_by_id[aid] for aid in npc.get("knownArtIds", []) if aid in art_by_id]
        known_arts.sort(key=lambda a: tier_rank.get(a["tier"], 1), reverse=True)

        neigong_id: str | None = None
        qinggong_id: str | None = None
        move_ids: list[str] = []

        for a in known_arts:
            if a["category"] == "内功" and neigong_id is None:
                neigong_id = a["id"]
            elif a["category"] == "轻功" and qinggong_id is None:
                qinggong_id = a["id"]
            elif a["category"] not in ("内功", "轻功") and len(move_ids) < 4:
                move_ids.append(a["id"])

        sect_arts = [a for a in martial_arts if a.get("sectId") == faction_id]
        generic_arts = [a for a in martial_arts if a.get("sectId") is None]

        used_ids: set[str] = set()
        if neigong_id:
            used_ids.add(neigong_id)
        if qinggong_id:
            used_ids.add(qinggong_id)
        used_ids.update(move_ids)

        if neigong_id is None:
            picked = pick_from_pool(
                [a for a in sect_arts if a["category"] == "内功"],
                pref_tiers,
                used_ids,
                npc_num,
            ) or pick_from_pool(
                [a for a in generic_arts if a["category"] == "内功"],
                pref_tiers,
                used_ids,
                npc_num,
            )
            if picked:
                neigong_id = picked["id"]
                used_ids.add(neigong_id)

        if qinggong_id is None:
            picked = pick_from_pool(
                [a for a in sect_arts if a["category"] == "轻功"],
                pref_tiers,
                used_ids,
                npc_num + 1,
            ) or pick_from_pool(
                [a for a in generic_arts if a["category"] == "轻功"],
                pref_tiers,
                used_ids,
                npc_num + 1,
            )
            if picked:
                qinggong_id = picked["id"]
                used_ids.add(qinggong_id)

        sect_moves = [a for a in sect_arts if a["category"] not in ("内功", "轻功")]
        generic_moves = [a for a in generic_arts if a["category"] not in ("内功", "轻功")]
        while len(move_ids) < 4:
            seed = npc_num + len(move_ids) * 7
            picked = pick_from_pool(sect_moves, pref_tiers, used_ids, seed) or pick_from_pool(
                generic_moves, pref_tiers, used_ids, seed
            )
            if not picked:
                break
            move_ids.append(picked["id"])
            used_ids.add(picked["id"])

        equipped_arts = {
            "neigong": neigong_id,
            "qinggong": qinggong_id,
            "move1": move_ids[0] if len(move_ids) > 0 else None,
            "move2": move_ids[1] if len(move_ids) > 1 else None,
            "move3": move_ids[2] if len(move_ids) > 2 else None,
            "move4": move_ids[3] if len(move_ids) > 3 else None,
        }
        all_npc_art_ids = list(dict.fromkeys([*npc.get("knownArtIds", []), *used_ids]))
        learned_arts = [
            {
                "artId": aid,
                "level": min(10, max(1, default_art_level(realm_rank, art_by_id[aid]["tier"], npc_num))),
                "exp": 0,
            }
            for aid in all_npc_art_ids
            if aid in art_by_id
        ]

        npc["equippedArts"] = equipped_arts
        npc["learnedArts"] = learned_arts

        # 2) 7 槽披挂选配
        equipped: dict[str, str | None] = {
            "weapon": None,
            "armor": None,
            "shoes": None,
            "bow": None,
            "accessory1": None,
            "accessory2": None,
            "mount": None,
        }
        for oid in npc.get("ownedArtifactIds", []):
            if oid.startswith("WPN-") and equipped["weapon"] is None:
                equipped["weapon"] = oid
            elif oid.startswith("ARM-") and equipped["armor"] is None:
                equipped["armor"] = oid
            elif oid.startswith("BOT-") and equipped["shoes"] is None:
                equipped["shoes"] = oid
            elif oid.startswith("BOW-") and equipped["bow"] is None:
                equipped["bow"] = oid
            elif oid.startswith("ACC-"):
                if equipped["accessory1"] is None:
                    equipped["accessory1"] = oid
                elif equipped["accessory2"] is None:
                    equipped["accessory2"] = oid
            elif oid.startswith("MNT-") and equipped["mount"] is None:
                equipped["mount"] = oid

        fill_tier = "良阶" if realm_rank <= 9 else "凡阶"
        move1_cat = art_by_id[move_ids[0]]["category"] if move_ids and move_ids[0] in art_by_id else ""
        pref_wpn_type = cat_to_weapon_type.get(move1_cat)

        if equipped["weapon"] is None:
            equipped["weapon"] = pick_gear_for_slot(
                weapons, fill_tier, faction_id, region_id, npc_num, preferred_weapon_type=pref_wpn_type
            )
        if equipped["armor"] is None:
            equipped["armor"] = pick_gear_for_slot(
                gear_by_slot["armor"], fill_tier, faction_id, region_id, npc_num + 2
            )
        if equipped["shoes"] is None:
            equipped["shoes"] = pick_gear_for_slot(
                gear_by_slot["shoes"], fill_tier, faction_id, region_id, npc_num + 3
            )
        if equipped["bow"] is None:
            equipped["bow"] = pick_gear_for_slot(
                gear_by_slot["bow"], fill_tier, faction_id, region_id, npc_num + 4
            )
        if equipped["accessory1"] is None:
            equipped["accessory1"] = pick_gear_for_slot(
                gear_by_slot["accessory"], fill_tier, faction_id, region_id, npc_num + 5
            )
        if equipped["accessory2"] is None:
            excl = {equipped["accessory1"]} if equipped["accessory1"] else set()
            equipped["accessory2"] = pick_gear_for_slot(
                gear_by_slot["accessory"], fill_tier, faction_id, region_id, npc_num + 6, exclude_ids=excl
            )
        if equipped["mount"] is None:
            equipped["mount"] = pick_gear_for_slot(
                mounts, fill_tier, faction_id, region_id, npc_num + 7
            )

        npc["equipped"] = equipped

        # 3) 内功重数校准：若实算气血与内力平均高于预设 >= 2000 降 2 重，>= 1000 降 1 重
        item_bonus_map = {
            **{w["id"]: w.get("equipBonus", {}) for w in weapons},
            **{g["id"]: g.get("equipBonus", {}) for g in gear},
            **{m["id"]: m.get("equipBonus", {}) for m in mounts},
        }
        lv_map = {e["artId"]: e["level"] for e in learned_arts}
        calc_hp, calc_mp = 250, 50
        for slot_k in ("neigong", "qinggong"):
            aid = equipped_arts.get(slot_k)
            if aid and aid in art_by_id:
                lv_val = lv_map.get(aid, 1)
                st = art_by_id[aid]["levels"][lv_val - 1]
                calc_hp += st.get("maxHp", 0)
                calc_mp += st.get("maxMp", 0)
        for iid in equipped.values():
            if iid and iid in item_bonus_map:
                b = item_bonus_map[iid]
                calc_hp += b.get("maxHp", 0)
                calc_mp += b.get("maxMp", 0)

        preset_hp = npc.get("stats", {}).get("hp", 0)
        preset_mp = npc.get("stats", {}).get("mp", 0)
        avg_excess = ((calc_hp - preset_hp) + (calc_mp - preset_mp)) / 2.0
        drop_lv = 2 if avg_excess >= 2000 else (1 if avg_excess >= 1000 else 0)
        if drop_lv > 0 and neigong_id:
            for e in learned_arts:
                if e["artId"] == neigong_id:
                    e["level"] = max(1, e["level"] - drop_lv)
                    break

        # 4) 指定宗师内功微调
        if npc["id"] == "NPC-0105":  # 萧远山：少林九阳功 10 重
            equipped_arts["neigong"] = "MA-038"
            found = False
            for e in learned_arts:
                if e["artId"] == "MA-038":
                    e["level"] = 10
                    found = True
                    break
            if not found:
                learned_arts.append({"artId": "MA-038", "level": 10, "exp": 0})
        elif npc["id"] in ("NPC-0108", "NPC-0119", "NPC-0116", "NPC-0117", "NPC-0125", "NPC-0132") and neigong_id:
            for e in learned_arts:
                if e["artId"] == neigong_id:
                    e["level"] = min(10, e["level"] + 1)
                    break
        elif npc["id"] in ("NPC-0124", "NPC-0121", "NPC-0127", "NPC-0126", "NPC-0112", "NPC-0123") and neigong_id:
            for e in learned_arts:
                if e["artId"] == neigong_id:
                    e["level"] = max(1, e["level"] - 1)
                    break


def compile_all(do_normalize_docs: bool) -> None:
    if do_normalize_docs:
        norm_stats = normalize_markdown_docs()
        print(
            f"[M0-2] Docs normalized: {norm_stats['npc_locations_updated']} NPC location cells updated, "
            f"{norm_stats['doc_links_updated']} cross-branch links fixed."
        )

    world_graph = json.loads((DATA_DIR / "worldGraph.json").read_text(encoding="utf-8"))
    regional_configs = json.loads((DATA_DIR / "regionalConfigs.json").read_text(encoding="utf-8"))
    building_panoramas = json.loads((DATA_DIR / "buildingPanoramas.json").read_text(encoding="utf-8"))
    lore_by_num = parse_region_doc_lore()

    wg_node_by_id = {n["id"]: n for n in world_graph["nodes"]}
    if len(wg_node_by_id) != 43:
        raise AssertionError(f"Expected 43 worldGraph nodes, got {len(wg_node_by_id)}")

    # 1) Compile Martial Arts (216), Weapons (100) & Mounts (28)
    martial_arts = parse_martial_arts()
    weapons = parse_weapons()
    mounts = parse_mounts()
    gear = parse_gear()

    # 2) Compile Buildings (147 Specials + 121 City Bases = 268)
    buildings: list[dict[str, Any]] = []
    buildings_by_region: dict[str, list[dict[str, Any]]] = defaultdict(list)

    for reg_std_id, num_code, region_id in CANONICAL_REGION_ORDER:
        node = wg_node_by_id[region_id]
        cfg = regional_configs[region_id]
        region_name = node["name"]

        # Specials
        for idx, sp in enumerate(cfg.get("specials", []), start=1):
            bid = sp["id"]
            b_pano = building_panoramas.get(bid)
            has_pano_img = b_pano is not None
            if has_pano_img:
                spots_copy = [{**s, "residentNpcIds": []} for s in b_pano["spots"]]
                interior_data = {
                    "mode": "image",
                    "panoramaUri": b_pano["panoramaUri"],
                    "subtitle": b_pano["subtitle"],
                    "exitGate": b_pano["exitGate"],
                    "spots": spots_copy,
                }
            else:
                fb = generate_svg_fallback_interior(
                    bldg_id=bid,
                    bldg_name=sp["name"],
                    kind=sp["kind"],
                    tag=sp.get("tag", "秘境探索"),
                    desc=sp["desc"],
                    act_label=sp["actLabel"],
                    cost=sp.get("cost", 0),
                    effect=sp["effect"],
                    region_name=region_name,
                )
                spots_copy = [{**s, "residentNpcIds": []} for s in fb["spots"]]
                interior_data = {
                    "mode": "svg_fallback",
                    "panoramaUri": None,
                    "subtitle": fb["subtitle"],
                    "exitGate": fb["exitGate"],
                    "spots": spots_copy,
                }

            b_record = {
                "id": bid,
                "regionId": region_id,
                "regionCode": reg_std_id,
                "regionName": region_name,
                "name": sp["name"],
                "kind": sp["kind"],
                "isSpecial": True,
                "order": idx,
                "x": sp["x"],
                "y": sp["y"],
                "poly": sp.get("poly"),
                "tag": sp.get("tag", ""),
                "desc": sp["desc"],
                "actLabel": sp["actLabel"],
                "cost": sp.get("cost", 0),
                "effect": sp["effect"],
                "hasPanoramaImage": has_pano_img,
                "interior": interior_data,
                "residentNpcIds": [],
            }
            buildings.append(b_record)
            buildings_by_region[region_id].append(b_record)

        # City Base Buildings (121 total across 26 cities; tavern & inn have single-hall interiors with spots=[])
        if node["type"] == "city" and cfg.get("bases"):
            is_foreign = bool(node.get("regime") and node.get("regime") != "song")
            meta_map = CITY_BASE_META_FOREIGN if is_foreign else CITY_BASE_META_SONG
            base_offset = len(cfg.get("specials", []))
            for idx, base in enumerate(cfg["bases"], start=1):
                bkey = base["key"]
                default_name, bkind, btag, bdesc, bact, bcost, beff = meta_map[bkey]
                bid = f"{region_id}_base_{bkey}"
                bname = base.get("customName") or default_name
                base_interior: dict[str, Any] | None = None
                if bkey == "tavern":
                    base_interior = {
                        "mode": "svg_fallback",
                        "panoramaUri": None,
                        "subtitle": f"市井酒肆大堂《{bname}》— 独堂实景（暂不设子建筑），可在堂内痛饮论道、探听风闻或寻访座上群侠",
                        "exitGate": {
                            "label": f"步出酒肆（返回{region_name}全景）",
                            "x": 688,
                            "y": 698,
                            "poly": "530,645 846,645 880,748 496,748",
                        },
                        "spots": [],
                    }
                elif bkey == "inn":
                    base_interior = {
                        "mode": "svg_fallback",
                        "panoramaUri": None,
                        "subtitle": f"车马客栈大堂《{bname}》— 独堂实景（暂不设子建筑），可在堂内投宿调息、药浴疗伤或结交歇脚豪客",
                        "exitGate": {
                            "label": f"步出客栈（返回{region_name}全景）",
                            "x": 688,
                            "y": 698,
                            "poly": "530,645 846,645 880,748 496,748",
                        },
                        "spots": [],
                    }
                b_record = {
                    "id": bid,
                    "regionId": region_id,
                    "regionCode": reg_std_id,
                    "regionName": region_name,
                    "name": bname,
                    "kind": bkind,
                    "isSpecial": False,
                    "order": base_offset + idx,
                    "x": base["x"],
                    "y": base["y"],
                    "poly": base.get("poly"),
                    "tag": btag,
                    "desc": bdesc,
                    "actLabel": bact,
                    "cost": bcost,
                    "effect": beff,
                    "hasPanoramaImage": False,
                    "interior": base_interior,
                    "residentNpcIds": [],
                }
                buildings.append(b_record)
                buildings_by_region[region_id].append(b_record)

    # 3) Compile NPCs (1,000)
    npcs = parse_npcs(martial_arts, buildings_by_region)

    # Back-populate residentNpcIds into buildings, interior spots, and regions
    bldg_by_id = {b["id"]: b for b in buildings}
    spot_by_id: dict[str, dict[str, Any]] = {}
    for b in buildings:
        if b["interior"] is not None:
            for sp in b["interior"]["spots"]:
                spot_by_id[sp["id"]] = sp

    npcs_by_region: dict[str, list[str]] = defaultdict(list)
    for npc in npcs:
        npcs_by_region[npc["regionId"]].append(npc["id"])
        abid = npc["assignedBuildingId"]
        asid = npc["assignedSpotId"]
        b_rec = bldg_by_id[abid]
        b_rec["residentNpcIds"].append(npc["id"])
        if b_rec["interior"] is not None and len(b_rec["interior"]["spots"]) > 0:
            assert asid is not None and asid in spot_by_id, (
                f"NPC {npc['id']} in multi-spot building {abid} lacks valid assignedSpotId"
            )
            spot_by_id[asid]["residentNpcIds"].append(npc["id"])
        else:
            assert asid is None, f"NPC {npc['id']} in single-hall/base building {abid} must have assignedSpotId=None"

    # 4) Compile Regions (38)
    aliases_by_region: dict[str, list[str]] = defaultdict(list)
    for raw_alias, (rid, _, _) in LOCATION_RESOLUTION_MAP.items():
        aliases_by_region[rid].append(raw_alias)

    regions: list[dict[str, Any]] = []
    for reg_std_id, num_code, region_id in CANONICAL_REGION_ORDER:
        node = wg_node_by_id[region_id]
        cfg = regional_configs[region_id]
        num_int = int(num_code)
        reg_bldgs = buildings_by_region[region_id]
        regions.append(
            {
                "id": region_id,
                "standardCode": reg_std_id,
                "numericCode": num_code,
                "name": node["name"],
                "type": node["type"],
                "regime": node.get("regime", "wild"),
                "circuit": node["circuit"],
                "worldCoord": {"x": node["x"], "y": node["y"]},
                "desc": node["desc"],
                "windscapeLore": lore_by_num.get(num_int, cfg.get("sceneSubtitle", "")),
                "rumor": node.get("rumor", ""),
                "alert": bool(node.get("alert", False)),
                "factionType": node.get("factionType", "orthodox"),
                "landmarks": node.get("landmarks", []),
                "sects": node.get("sects", []),
                "panoramaUri": cfg["panoramaUri"],
                "isoViewBox": cfg.get("isoViewBox", [1376, 768]),
                "sceneSubtitle": cfg["sceneSubtitle"],
                "gate": {
                    "label": cfg["gateLabel"],
                    "pos": cfg["gatePos"],
                    "poly": cfg.get("gatePoly"),
                },
                "specialBuildingIds": [b["id"] for b in reg_bldgs if b["isSpecial"]],
                "baseBuildingIds": [b["id"] for b in reg_bldgs if not b["isSpecial"]],
                "residentNpcIds": npcs_by_region[region_id],
                "legacyAliases": sorted(set(aliases_by_region[region_id]) - {node["name"]}),
            }
        )

    # 5) Parse rich Sect & Organization lore from docs/MARTIAL_ARTS_SECTS.md & Compile idRegistry.json
    sects_md_text = (DOCS_DIR / "MARTIAL_ARTS_SECTS.md").read_text(encoding="utf-8")
    sect_table_meta: dict[str, dict[str, str]] = {}
    org_table_meta: dict[str, dict[str, str]] = {}

    for line in sects_md_text.splitlines():
        raw_line = line.strip()
        if raw_line.startswith("| `SECT-"):
            cols = [c.strip() for c in raw_line.strip("|").split("|")]
            if len(cols) >= 10:
                sid_m = re.search(r"SECT-\d+", cols[0])
                if sid_m:
                    sect_table_meta[sid_m.group(0)] = {
                        "tableStance": cols[4],
                        "hqDisplay": cols[5].replace("`", ""),
                        "buildingsRaw": cols[6],
                        "leadersRaw": cols[7],
                        "highestArtTier": cols[9],
                    }
        elif raw_line.startswith("| `ORG-"):
            cols = [c.strip() for c in raw_line.strip("|").split("|")]
            if len(cols) >= 6:
                oid_m = re.search(r"ORG-\d+", cols[0])
                if oid_m:
                    org_table_meta[oid_m.group(0)] = {
                        "hqDisplay": cols[3].replace("`", ""),
                        "summaryRaw": cols[5],
                    }

    # Parse detailed markdown sections for SECT-01..30
    sect_section_meta: dict[str, dict[str, Any]] = {}
    sec_heading_re = re.compile(r"^#{3,4}\s+\d+\.\s+`(SECT-\d+)`\s+(.+)$", re.MULTILINE)
    sec_matches = list(sec_heading_re.finditer(sects_md_text))
    for idx_m, m_obj in enumerate(sec_matches):
        sid = m_obj.group(1)
        start_pos = m_obj.end()
        end_pos = (
            sec_matches[idx_m + 1].start()
            if idx_m + 1 < len(sec_matches)
            else sects_md_text.find("## 五、", start_pos)
        )
        block = sects_md_text[start_pos : end_pos if end_pos != -1 else len(sects_md_text)]

        positioning = ""
        hq_detail = ""
        feature_lines: list[str] = []
        in_features = False
        bldg_ids_in_sec: list[str] = []

        for bline in block.splitlines():
            sline = bline.strip()
            if not sline or sline == "---":
                continue
            is_sub_bullet = bline.startswith("  ")
            if not is_sub_bullet and sline.startswith("* **门派品级与立场**："):
                positioning = sline.split("：", 1)[1].strip()
                in_features = False
            elif not is_sub_bullet and sline.startswith("* **总舵驻地**："):
                hq_detail = re.sub(r"[`*]", "", sline.split("：", 1)[1]).strip()
                in_features = False
            elif not is_sub_bullet and sline.startswith("* **专属") and "建筑" in sline:
                in_features = False
                for bm in re.findall(r"`([a-z0-9_]+)`", sline):
                    if bm in bldg_by_id and bm not in bldg_ids_in_sec:
                        bldg_ids_in_sec.append(bm)
            elif not is_sub_bullet and "入门条件" in sline and sline.startswith("* **"):
                in_features = True
                after_colon = sline.split("：", 1)[1].strip() if "：" in sline else ""
                if after_colon:
                    feature_lines.append(re.sub(r"[`*]", "", after_colon))
            elif not is_sub_bullet and sline.startswith("* **"):
                in_features = False
            elif is_sub_bullet:
                for bm in re.findall(r"`([a-z0-9_]+)`", sline):
                    if bm in bldg_by_id and bm not in bldg_ids_in_sec:
                        bldg_ids_in_sec.append(bm)
                if in_features:
                    cleaned_sub = re.sub(r"^\*\s*", "", sline)
                    cleaned_sub = re.sub(r"[`*]", "", cleaned_sub).strip()
                    if cleaned_sub:
                        feature_lines.append(cleaned_sub)

        sect_section_meta[sid] = {
            "positioning": re.sub(r"[`*]", "", positioning).strip(),
            "hqDetail": hq_detail,
            "buildingIds": bldg_ids_in_sec,
            "entryAndFeatures": " ".join(feature_lines).strip(),
        }

    npc_count_by_faction = Counter(n["factionId"] for n in npcs)
    npcs_by_faction: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for n in npcs:
        npcs_by_faction[n["factionId"]].append(n)

    arts_by_sect: dict[str, list[str]] = defaultdict(list)
    for ma in martial_arts:
        if ma["sectId"]:
            arts_by_sect[ma["sectId"]].append(ma["id"])

    weapons_by_sect: dict[str, list[str]] = defaultdict(list)
    for wpn in weapons:
        if wpn["sectId"]:
            weapons_by_sect[wpn["sectId"]].append(wpn["id"])

    reg_by_id = {r["id"]: r for r in regions}

    factions_enriched = []
    for fac in CANONICAL_FACTIONS:
        fid = fac["id"]
        hq_reg = reg_by_id.get(fac["hqRegionId"]) if fac["hqRegionId"] else None

        if fid in sect_table_meta:
            tmeta = sect_table_meta[fid]
            smeta = sect_section_meta.get(fid, {})
            leader_ids = [
                nid for nid in re.findall(r"NPC-\d{4}", tmeta["leadersRaw"])
                if any(x["id"] == nid for x in npcs)
            ]
            b_ids = list(smeta.get("buildingIds", []))
            for bm in re.findall(r"`([a-z0-9_]+)`", tmeta["buildingsRaw"]):
                if bm in bldg_by_id and bm not in b_ids:
                    b_ids.append(bm)
            summary_txt = smeta.get("positioning") or f"{fac['sectTier']} · {fac['group']}（{tmeta['tableStance']}）"
            features_txt = smeta.get("entryAndFeatures") or (
                "常规不可拜入，仅限特殊卧底线或历史奇遇交互。"
                if fid == "SECT-20"
                else summary_txt
            )
            hq_disp = smeta.get("hqDetail") or tmeta["hqDisplay"]
            highest_tier = tmeta["highestArtTier"]
            stance_motto = tmeta["tableStance"]
        else:
            ometa = org_table_meta.get(fid, {})
            raw_sum = ometa.get("summaryRaw", "")
            leader_ids = [
                nid for nid in re.findall(r"NPC-\d{4}", raw_sum)
                if any(x["id"] == nid for x in npcs)
            ]
            if not leader_ids:
                fac_npcs_sorted = sorted(
                    npcs_by_faction[fid], key=lambda x: (x["realmRank"], x["id"])
                )
                leader_ids = [x["id"] for x in fac_npcs_sorted[:3]]
            b_ids = []
            if hq_reg:
                for bid in hq_reg["specialBuildingIds"][:2]:
                    b_ids.append(bid)
            clean_org_sum = re.sub(r"[`*]", "", raw_sum).strip()
            summary_txt = f"{fac['group']} · {fac['stance']}"
            features_txt = clean_org_sum or summary_txt
            hq_disp = ometa.get("hqDisplay") or (
                f"{hq_reg['standardCode']} {hq_reg['name']}" if hq_reg else "散居天下四十三地"
            )
            # Compute highest martial art tier known by members of this organization
            best_ma_tier = "庙堂雅艺"
            tier_rank_order = [
                "天阶上品", "天阶中品", "天阶下品",
                "地阶上品", "地阶中品", "地阶下品",
                "良品上品", "良品中品", "良品下品",
                "凡品上品", "凡品中品", "凡品下品",
            ]
            ma_by_id_local = {m["id"]: m for m in martial_arts}
            known_tiers = {
                ma_by_id_local[aid]["fullTier"]
                for m_npc in npcs_by_faction[fid]
                for aid in m_npc["knownArtIds"]
                if aid in ma_by_id_local
            }
            for tr in tier_rank_order:
                if tr in known_tiers:
                    best_ma_tier = tr
                    break
            highest_tier = best_ma_tier
            stance_motto = fac["stance"]

        factions_enriched.append(
            {
                **fac,
                "stanceMotto": stance_motto,
                "hqDisplay": hq_disp,
                "leaderNpcIds": leader_ids,
                "coreBuildingIds": b_ids,
                "highestArtTier": highest_tier,
                "summary": summary_txt,
                "entryAndFeatures": features_txt,
                "memberCount": npc_count_by_faction[fid],
                "martialArtIds": arts_by_sect[fid],
                "weaponIds": weapons_by_sect[fid],
            }
        )

    special_count = sum(1 for b in buildings if b["isSpecial"])
    pano_img_count = sum(1 for b in buildings if b["isSpecial"] and b["hasPanoramaImage"])
    svg_fallback_count = sum(1 for b in buildings if b["isSpecial"] and not b["hasPanoramaImage"])

    id_registry = {
        "schemaVersion": "M1.1.0",
        "counts": {
            "regions": len(regions),
            "majorSects": sum(1 for f in factions_enriched if f["isMajorSect"]),
            "minorSects": sum(1 for f in factions_enriched if f["isMinorSect"]),
            "totalSects": sum(1 for f in factions_enriched if f["isMajorSect"] or f["isMinorSect"]),
            "otherOrganizations": sum(1 for f in factions_enriched if not f["isMajorSect"] and not f["isMinorSect"]),
            "totalFactions": len(factions_enriched),
            "specialBuildings": special_count,
            "specialBuildingsWithImage": pano_img_count,
            "specialBuildingsWithSvgFallback": svg_fallback_count,
            "cityBaseBuildings": len(buildings) - special_count,
            "totalBuildings": len(buildings),
            "interiorSubBuildings": len(spot_by_id),
            "martialArts": len(martial_arts),
            "weapons": len(weapons),
            "mounts": len(mounts),
            "npcs": len(npcs),
            "npcsWithAvatar": sum(1 for n in npcs if n["avatarUrl"]),
            "npcsWithFullbody": sum(1 for n in npcs if n["fullbodyUrl"]),
        },
        "regions": [
            {
                "id": r["id"],
                "standardCode": r["standardCode"],
                "numericCode": r["numericCode"],
                "name": r["name"],
                "type": r["type"],
                "regime": r["regime"],
                "legacyAliases": r["legacyAliases"],
                "npcCount": len(r["residentNpcIds"]),
                "specialBuildingCount": len(r["specialBuildingIds"]),
            }
            for r in regions
        ],
        "factions": factions_enriched,
        "locationAliasMap": {
            k: {"regionId": v[0], "canonicalLabel": v[1], "subLocation": v[2]}
            for k, v in sorted(LOCATION_RESOLUTION_MAP.items())
        },
        "martialArtIndex": [
            {
                "id": ma["id"],
                "code": ma["code"],
                "name": ma["name"],
                "cleanName": ma["cleanName"],
                "fullTier": ma["fullTier"],
                "category": ma["category"],
                "sectId": ma["sectId"],
            }
            for ma in martial_arts
        ],
        "weaponIndex": [
            {
                "id": w["id"],
                "code": w["code"],
                "name": w["name"],
                "fullTier": w["fullTier"],
                "weaponType": w["weaponType"],
                "regionId": w["regionId"],
                "sectId": w["sectId"],
            }
            for w in weapons
        ],
        "mountIndex": [
            {
                "id": m["id"],
                "code": m["code"],
                "name": m["name"],
                "fullTier": m["fullTier"],
                "breedCategory": m["breedCategory"],
                "baseSpeed": m["baseSpeed"],
                "regionId": m["regionId"],
                "sectId": m["sectId"],
            }
            for m in mounts
        ],
    }

    # Verify zero unresolved references & zero Base64 strings
    region_id_set = {r["id"] for r in regions}
    faction_id_set = {f["id"] for f in factions_enriched}
    bldg_id_set = {b["id"] for b in buildings}
    art_id_set = {m["id"] for m in martial_arts}

    for npc in npcs:
        assert npc["regionId"] in region_id_set, f"Invalid regionId on {npc['id']}"
        assert npc["factionId"] in faction_id_set, f"Invalid factionId on {npc['id']}"
        assert npc["assignedBuildingId"] in bldg_id_set, f"Invalid assignedBuildingId on {npc['id']}"
        b_inter = bldg_by_id[npc["assignedBuildingId"]]["interior"]
        if b_inter is not None and len(b_inter.get("spots", [])) > 0:
            assert npc["assignedSpotId"] in spot_by_id, f"Invalid assignedSpotId on {npc['id']}"
        else:
            assert npc["assignedSpotId"] is None, f"Unexpected assignedSpotId on base/single-hall building for {npc['id']}"
        for aid in npc["knownArtIds"]:
            assert aid in art_id_set, f"Invalid artId {aid} on {npc['id']}"

    for wpn in weapons:
        assert wpn["regionId"] in region_id_set, f"Invalid regionId on {wpn['id']}"
        if wpn["sectId"] is not None:
            assert wpn["sectId"] in faction_id_set, f"Invalid sectId on {wpn['id']}"
        for sig_aid in wpn["signatureArtIds"]:
            assert sig_aid in art_id_set, f"Invalid signatureArtId {sig_aid} on {wpn['id']}"

    for mnt in mounts:
        assert mnt["regionId"] in region_id_set, f"Invalid regionId on {mnt['id']}"
        if mnt["sectId"] is not None:
            assert mnt["sectId"] in faction_id_set, f"Invalid sectId on {mnt['id']}"

    for g in gear:
        assert g["regionId"] in region_id_set, f"Invalid regionId on {g['id']}"
        if g["sectId"] is not None:
            assert g["sectId"] in faction_id_set, f"Invalid sectId on {g['id']}"

    npcs_by_id = {n["id"]: n for n in npcs}
    for n in npcs:
        n["ownedArtifactIds"] = []
    unique_artifacts = parse_unique_artifacts(npcs_by_id)
    for ua in unique_artifacts:
        if ua["ownerType"] == "npc" and ua["ownerNpcId"]:
            npcs_by_id[ua["ownerNpcId"]]["ownedArtifactIds"].append(ua["itemId"])

    populate_npc_loadouts(npcs, martial_arts, weapons, gear, mounts)

    outputs = {
        "idRegistry.json": id_registry,
        "regions.json": regions,
        "buildings.json": buildings,
        "martial_arts.json": martial_arts,
        "weapons.json": weapons,
        "mounts.json": mounts,
        "gear.json": gear,
        "uniqueArtifacts.json": unique_artifacts,
        "npcs.json": npcs,
    }

    for filename, payload in outputs.items():
        out_path = DATA_DIR / filename
        serialized = json.dumps(payload, ensure_ascii=False, indent=2) + "\n"
        if "data:image/" in serialized:
            raise AssertionError(f"Base64 data URI detected in {filename}!")
        out_path.write_text(serialized, encoding="utf-8")
        size_kb = os.path.getsize(out_path) / 1024
        print(f"[M0-3] Wrote src/data/{filename:18s} ({size_kb:7.1f} KB)")

    # Sync portraitCatalog.json character metadata for 0001..0240 + minor sect leaders / regional anchors
    pc_path = DATA_DIR / "portraitCatalog.json"
    if pc_path.exists():
        pc_data = json.loads(pc_path.read_text(encoding="utf-8"))
        extra_pc_ids = {
            "NPC-0264",
            "NPC-0275",
            "NPC-0286",
            "NPC-0305",
            "NPC-0306",
            "NPC-0307",
            "NPC-0313",
            "NPC-0316",
            "NPC-0337",
        }
        synced_chars = []
        for npc in npcs:
            n_num = int(npc["id"].split("-")[1])
            if n_num <= 240 or npc["id"] in extra_pc_ids:
                ch_entry: dict[str, Any] = {
                    "id": npc["id"],
                    "name": npc["name"],
                    "title": npc["title"],
                    "cat": npc["category"],
                    "gender": npc["gender"],
                    "age": npc["age"],
                    "faction": npc["factionName"],
                    "role": npc["role"],
                    "loc": npc["locationLabel"],
                    "realm": npc["realm"],
                    "arts": npc["artsText"],
                    "bio": npc["bio"],
                }
                if npc["avatarUrl"]:
                    ch_entry["avatarUrl"] = npc["avatarUrl"]
                if npc["fullbodyUrl"]:
                    ch_entry["fullbodyUrl"] = npc["fullbodyUrl"]
                synced_chars.append(ch_entry)
        pc_data["characters"] = synced_chars
        pc_path.write_text(json.dumps(pc_data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"[M0-3] Synced src/data/portraitCatalog.json ({len(synced_chars)} characters)")

    enterable_base_count = sum(
        1 for b in buildings if not b["isSpecial"] and b["interior"] is not None
    )
    major_cnt = sum(1 for f in factions_enriched if f["isMajorSect"])
    minor_cnt = sum(1 for f in factions_enriched if f["isMinorSect"])
    print(
        f"[OK] Summary: {len(regions)} regions | "
        f"30 sects ({major_cnt} major + {minor_cnt} minor) + 11 orgs | "
        f"{special_count} special buildings ({len(spot_by_id)} sub-spots) + "
        f"{len(buildings) - special_count} base buildings ({enterable_base_count} single-hall taverns/inns) | "
        f"{len(martial_arts)} martial arts | "
        f"{len(weapons)} weapons (10天/20地/30良/40凡) | "
        f"{len(mounts)} mounts (3天/5地/8良/12凡) | "
        f"{len(npcs)} NPCs (100% leaf-assigned & full stats)"
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="Compile Northern Song Chronicles static DB")
    parser.add_argument(
        "--normalize-docs",
        action="store_true",
        help="Normalize legacy city names in docs/CHARACTER_COMPENDIUM.md and fix doc links before compiling",
    )
    args = parser.parse_args()
    compile_all(do_normalize_docs=args.normalize_docs)
    return 0


if __name__ == "__main__":
    sys.exit(main())
