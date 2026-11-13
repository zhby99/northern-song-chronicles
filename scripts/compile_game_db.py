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
# 1. [M0-2] 38 地区标准字典与旧地名归一表
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
}


# ==============================================================================
# 2. [M0-2] 20 大门派 + 11 朝堂/地域势力标准字典
# ==============================================================================

CANONICAL_FACTIONS: list[dict[str, Any]] = [
    # 20 个主要门派 (GAME_MECHANICS.md §4)
    {
        "id": "SECT-01",
        "name": "嵩山少林寺",
        "shortName": "北少林",
        "isMajorSect": True,
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
        "group": "地域世家·霸道强宗",
        "stance": "霸道绿林",
        "hqRegionId": "tiezhangfeng",
        "aliases": ["洞庭铁掌帮"],
    },
    {
        "id": "SECT-16",
        "name": "江淮漕帮",
        "shortName": "漕帮",
        "isMajorSect": True,
        "group": "地域世家·霸道强宗",
        "stance": "水陆商帮",
        "hqRegionId": "yangzhou",
        "aliases": ["漕帮", "淮南盐帮"],
    },
    {
        "id": "SECT-17",
        "name": "开封府 / 六扇门",
        "shortName": "六扇门",
        "isMajorSect": True,
        "group": "朝廷鹰犬·草莽与外邦渗透势力",
        "stance": "庙堂护法",
        "hqRegionId": "bianliang",
        "aliases": ["开封府 / 六扇门（含大内禁军武学）", "六扇门", "大内禁军"],
    },
    {
        "id": "SECT-18",
        "name": "太行/京东绿林盟",
        "shortName": "绿林盟",
        "isMajorSect": True,
        "group": "朝廷鹰犬·草莽与外邦渗透势力",
        "stance": "替天行道/反官",
        "hqRegionId": "taihang",
        "aliases": ["太行/京东绿林盟（反官义军潜流）", "太行绿林", "京东绿林"],
    },
    {
        "id": "SECT-19",
        "name": "星宿派",
        "shortName": "星宿",
        "isMajorSect": True,
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
        "group": "朝廷鹰犬·草莽与外邦渗透势力",
        "stance": "外邦敌对",
        "hqRegionId": "xingqing_xixia",
        "aliases": ["西夏一品堂", "辽国武林暗桩", "一品堂 / 辽国武林暗桩（外邦敌对势力）"],
    },
    # 11 个朝堂 / 士林 / 异域及散人阵营 (CHARACTER_COMPENDIUM.md)
    {
        "id": "ORG-01",
        "name": "隐世散人",
        "shortName": "散人",
        "isMajorSect": False,
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
        "group": "边裔诸部",
        "stance": "西南边裔",
        "hqRegionId": "dali_city",
        "aliases": ["广源州侬氏", "南疆诸洞"],
    },
    {
        "id": "ORG-11",
        "name": "塞外诸部",
        "shortName": "塞外",
        "isMajorSect": False,
        "group": "边裔诸部",
        "stance": "白山黑水",
        "hqRegionId": "linhuang_liao",
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
        (["唐门", "唐家堡"], "SECT-13"),
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

    arts.sort(key=lambda x: int(x["code"]))
    if len(arts) != 216:
        raise AssertionError(f"Expected 216 martial arts, got {len(arts)}")
    return arts


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

    t1, t2, t3 = kind_spot_titles.get(
        kind,
        (("正堂核心区", tag or "秘境探索"), ("东侧偏殿廊庑", "博闻研习"), ("前庭演武坪", "吐纳修历")),
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
                "name": f"{bldg_name} · {t1[0]}",
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
# 6. [M0-3] 解析 1,000 名人物并关联立绘、武学 ID 与驻留建筑
# ==============================================================================

def pick_template_for_npc(faction_id: str, gender: str, role: str, category: str) -> str:
    if faction_id in ("SECT-01", "SECT-03", "SECT-04") or "僧" in role or "禅" in role or "喇嘛" in role:
        return "/assets/characters/templates/tpl_shaolin_monk_fb.jpg"
    if faction_id == "ORG-05" or "医" in role or "药" in role:
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
        if "将" in role or "帅" in role or "捕" in role or faction_id in ("SECT-17", "SECT-18"):
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
    if faction_id in ("SECT-13", "SECT-19", "SECT-20"):
        return "/assets/characters/templates/tpl_unorthodox_master_fb.jpg"
    return "/assets/characters/templates/tpl_greenwood_hero_fb.jpg"


def assign_npc_building(
    npc_id: str,
    name: str,
    role: str,
    faction_id: str,
    sub_location: str | None,
    region_buildings: list[dict[str, Any]],
) -> str | None:
    if not region_buildings:
        return None

    by_id = {b["id"]: b for b in region_buildings}

    # Iconic named overrides first
    explicit_building_overrides = {
        "赵祯": "bl_palace",
        "曹丹姝": "bl_palace",
        "赵曙": "bl_palace",
        "张清窈": "bl_palace",
        "包拯": "bl_kaifeng",
        "展昭": "bl_kaifeng",
        "公孙策": "bl_kaifeng",
        "法空": "sl_cangjing",
        "慕容博": "sl_cangjing",
        "萧远山": "sl_cangjing",
        "玄慈": "sl_daxiong",
        "玄澄": "sl_luohan",
        "乔峰": "ly_gaibang",
        "汪剑通": "ly_gaibang",
        "无崖子": "wl_yudong",
        "巫行云": "kl_yaochi",
        "李秋水": "xq_bingjiao",
        "枯荣": "dl_chongsheng",
        "慕容复": "yz_canhe",
    }
    if name in explicit_building_overrides and explicit_building_overrides[name] in by_id:
        return explicit_building_overrides[name]

    # Sub-location routing for composite regions
    if sub_location == "潼关":
        for b in region_buildings:
            if "潼关" in b["name"]:
                return b["id"]
    elif sub_location == "西岳华山":
        cand = [b for b in region_buildings if "潼关" not in b["name"]]
        if cand:
            return cand[deterministic_int(npc_id, 0, len(cand) - 1)]["id"]
    elif sub_location == "青城山":
        for b in region_buildings:
            if "青城" in b["name"]:
                return b["id"]
    elif sub_location == "唐家堡":
        cand = [b for b in region_buildings if "唐" in b["name"]]
        if cand:
            return cand[deterministic_int(npc_id, 0, len(cand) - 1)]["id"]

    # Role / Faction keyword matching
    specials = [b for b in region_buildings if b["isSpecial"]]
    bases = [b for b in region_buildings if not b["isSpecial"]]

    if faction_id == "SECT-17" or "捕" in role or "知" in role or "府" in role:
        for b in region_buildings:
            if b["kind"] == "yamen" or "府衙" in b["name"]:
                return b["id"]
    if faction_id == "ORG-02" and ("皇" in role or "相" in role or "枢密" in role):
        for b in specials:
            if b["kind"] == "palace":
                return b["id"]
    if faction_id == "ORG-03" or "书院" in role or "儒" in role or "学" in role:
        for b in region_buildings:
            if "书院" in b["name"] or b["id"].endswith("_base_academy"):
                return b["id"]
    if "军" in role or "将" in role or "帅" in role or "骑" in role:
        for b in region_buildings:
            if b["kind"] in ("camp", "fort"):
                return b["id"]

    pool = specials if specials else bases
    idx = deterministic_int(npc_id, 0, len(pool) - 1)
    return pool[idx]["id"]


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

        if raw_loc not in LOCATION_RESOLUTION_MAP:
            raise ValueError(f"[{npc_id}] Unknown location: {raw_loc!r}")
        region_id, canonical_loc_label, sub_loc = LOCATION_RESOLUTION_MAP[raw_loc]

        if faction_name not in FACTION_BY_NAME:
            raise ValueError(f"[{npc_id}] Unknown faction: {faction_name!r}")
        fac_obj = FACTION_BY_NAME[faction_name]
        faction_id = fac_obj["id"]

        if realm not in REALM_BENCHMARKS:
            raise ValueError(f"[{npc_id}] Unknown realm: {realm!r}")
        hp_rng, mp_rng, agi_rng, res_rng, realm_rank = REALM_BENCHMARKS[realm]
        major_realm = (
            "不入流"
            if realm == "不入流"
            else realm[:-2]
        )
        minor_realm = None if realm == "不入流" else realm[-2:]

        if num_idx <= 100:
            category = "历史名人"
            arts_raw = cols[9]
            bio = cols[10]
            stats = {
                "hp": deterministic_int(f"{npc_id}:hp", hp_rng[0], hp_rng[1]),
                "mp": deterministic_int(f"{npc_id}:mp", mp_rng[0], mp_rng[1]),
                "agi": deterministic_int(f"{npc_id}:agi", agi_rng[0], agi_rng[1]),
                "res": deterministic_int(f"{npc_id}:res", res_rng[0], res_rng[1]),
                "isBenchmark": True,
            }
        elif num_idx <= 240:
            category = "武林群侠"
            stat_parts = [int(x) for x in cols[9].strip("`").split("/")]
            arts_raw = cols[10]
            bio = cols[11]
            stats = {
                "hp": stat_parts[0],
                "mp": stat_parts[1],
                "agi": stat_parts[2],
                "res": stat_parts[3],
                "isBenchmark": False,
            }
        else:
            category = "武林群侠"
            stat_parts = [int(x) for x in cols[9].strip("`").split("/")]
            arts_raw = cols[10]
            bio = f"{faction_name}{role}，常年驻留或活动于{canonical_loc_label}一带，武道修为居【{realm}】，主修{arts_raw}。"
            stats = {
                "hp": stat_parts[0],
                "mp": stat_parts[1],
                "agi": stat_parts[2],
                "res": stat_parts[3],
                "isBenchmark": False,
            }

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
                specialty_tags.append(tok)

        avatar_url = f"/assets/characters/avatars/{npc_id}.jpg" if npc_id in existing_avatars else None
        fullbody_url = f"/assets/characters/fullbody/{npc_id}.jpg" if npc_id in existing_fullbody else None
        template_url = pick_template_for_npc(faction_id, gender, role, category)
        assigned_bldg_id = assign_npc_building(
            npc_id,
            name,
            role,
            faction_id,
            sub_loc,
            buildings_by_region.get(region_id, []),
        )

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
                "locationLabel": canonical_loc_label,
                "subLocation": sub_loc,
                "assignedBuildingId": assigned_bldg_id,
                "realm": realm,
                "majorRealm": major_realm,
                "minorRealm": minor_realm,
                "realmRank": realm_rank,
                "stats": stats,
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
    if len(wg_node_by_id) != 38:
        raise AssertionError(f"Expected 38 worldGraph nodes, got {len(wg_node_by_id)}")

    # 1) Compile Martial Arts (216)
    martial_arts = parse_martial_arts()

    # 2) Compile Buildings (123 Specials + 105 City Bases = 228)
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
                interior_data = {
                    "mode": "image",
                    "panoramaUri": b_pano["panoramaUri"],
                    "subtitle": b_pano["subtitle"],
                    "exitGate": b_pano["exitGate"],
                    "spots": b_pano["spots"],
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
                interior_data = {
                    "mode": "svg_fallback",
                    "panoramaUri": None,
                    "subtitle": fb["subtitle"],
                    "exitGate": fb["exitGate"],
                    "spots": fb["spots"],
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

        # City Base Buildings (5 per city * 21 cities = 105)
        if node["type"] == "city" and cfg.get("bases"):
            is_foreign = bool(node.get("regime") and node.get("regime") != "song")
            meta_map = CITY_BASE_META_FOREIGN if is_foreign else CITY_BASE_META_SONG
            base_offset = len(cfg.get("specials", []))
            for idx, base in enumerate(cfg["bases"], start=1):
                bkey = base["key"]
                default_name, bkind, btag, bdesc, bact, bcost, beff = meta_map[bkey]
                bid = f"{region_id}_base_{bkey}"
                bname = base.get("customName") or default_name
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
                    "interior": None,
                    "residentNpcIds": [],
                }
                buildings.append(b_record)
                buildings_by_region[region_id].append(b_record)

    # 3) Compile NPCs (1,000)
    npcs = parse_npcs(martial_arts, buildings_by_region)

    # Back-populate residentNpcIds into buildings and regions
    bldg_by_id = {b["id"]: b for b in buildings}
    npcs_by_region: dict[str, list[str]] = defaultdict(list)
    for npc in npcs:
        npcs_by_region[npc["regionId"]].append(npc["id"])
        abid = npc["assignedBuildingId"]
        if abid and abid in bldg_by_id:
            bldg_by_id[abid]["residentNpcIds"].append(npc["id"])

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

    # 5) Compile Canonical ID Registry (idRegistry.json)
    npc_count_by_faction = Counter(n["factionId"] for n in npcs)
    arts_by_sect: dict[str, list[str]] = defaultdict(list)
    for ma in martial_arts:
        if ma["sectId"]:
            arts_by_sect[ma["sectId"]].append(ma["id"])

    factions_enriched = []
    for fac in CANONICAL_FACTIONS:
        fid = fac["id"]
        factions_enriched.append(
            {
                **fac,
                "memberCount": npc_count_by_faction[fid],
                "martialArtIds": arts_by_sect[fid],
            }
        )

    special_count = sum(1 for b in buildings if b["isSpecial"])
    pano_img_count = sum(1 for b in buildings if b["isSpecial"] and b["hasPanoramaImage"])
    svg_fallback_count = sum(1 for b in buildings if b["isSpecial"] and not b["hasPanoramaImage"])

    id_registry = {
        "schemaVersion": "M0.3.0",
        "counts": {
            "regions": len(regions),
            "majorSects": sum(1 for f in factions_enriched if f["isMajorSect"]),
            "otherOrganizations": sum(1 for f in factions_enriched if not f["isMajorSect"]),
            "totalFactions": len(factions_enriched),
            "specialBuildings": special_count,
            "specialBuildingsWithImage": pano_img_count,
            "specialBuildingsWithSvgFallback": svg_fallback_count,
            "cityBaseBuildings": len(buildings) - special_count,
            "totalBuildings": len(buildings),
            "martialArts": len(martial_arts),
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
        for aid in npc["knownArtIds"]:
            assert aid in art_id_set, f"Invalid artId {aid} on {npc['id']}"

    outputs = {
        "idRegistry.json": id_registry,
        "regions.json": regions,
        "buildings.json": buildings,
        "martial_arts.json": martial_arts,
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

    print(
        f"[OK] Summary: {len(regions)} regions | "
        f"20 sects + 11 orgs | "
        f"{special_count} special buildings ({pano_img_count} JPG + {svg_fallback_count} SVG fallback) + "
        f"{len(buildings) - special_count} base buildings | "
        f"{len(martial_arts)} martial arts | "
        f"{len(npcs)} NPCs (100% resolved)"
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
