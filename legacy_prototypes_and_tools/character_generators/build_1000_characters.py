#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Master Compiler for 《北宋立志传》 1,000 Characters Roster (100 Historical Celebrities + 900 Martial Artists)
Validates uniqueness, naming purity, realm hierarchy, and exports:
1. /home/antigravity/northern_song/characters_1000.json
2. CHARACTER_COMPENDIUM.md (Artifact & Workspace copy)
"""

import json
import os
import random
from collections import Counter

from part1_hist_and_top import HISTORICAL_FIGURES, TOP_MARTIAL_ARTISTS
from part2_first_rate import FIRST_RATE_ARTISTS
from part3_mid_and_lower import generate_part3

REALM_ORDER = [
    "大宗师上品",
    "大宗师中品",
    "大宗师下品",
    "宗师上品",
    "宗师中品",
    "宗师下品",
    "一流上品",
    "一流中品",
    "一流下品",
    "二流上品",
    "二流中品",
    "二流下品",
    "三流上品",
    "三流中品",
    "三流下品",
    "不入流",
]

# Combat & Base Stat Ranges per Realm (气血 HP, 内力 Qi, 身法 Agility, 抗性 Resist, 根骨/悟性 Base Floor)
REALM_STAT_RANGES = {
    "大宗师上品": {"hp": (9800, 9999), "qi": (9800, 9999), "agi": (96, 99), "res": (96, 99), "base": (92, 99)},
    "大宗师中品": {"hp": (8600, 9000), "qi": (8700, 9100), "agi": (93, 96), "res": (90, 94), "base": (88, 96)},
    "大宗师下品": {"hp": (7800, 8200), "qi": (7900, 8300), "agi": (91, 94), "res": (86, 90), "base": (86, 95)},
    "宗师上品":   {"hp": (6400, 7200), "qi": (6200, 7200), "agi": (85, 92), "res": (78, 86), "base": (82, 96)},
    "宗师中品":   {"hp": (5200, 6100), "qi": (5000, 6000), "agi": (80, 87), "res": (72, 80), "base": (78, 92)},
    "宗师下品":   {"hp": (4300, 5000), "qi": (4100, 4900), "agi": (75, 83), "res": (66, 75), "base": (74, 88)},
    "一流上品":   {"hp": (3400, 4100), "qi": (3100, 3900), "agi": (69, 77), "res": (58, 68), "base": (68, 85)},
    "一流中品":   {"hp": (2700, 3300), "qi": (2400, 3000), "agi": (63, 71), "res": (50, 60), "base": (62, 80)},
    "一流下品":   {"hp": (2100, 2650), "qi": (1800, 2350), "agi": (57, 65), "res": (43, 53), "base": (58, 76)},
    "二流上品":   {"hp": (1600, 2050), "qi": (1300, 1750), "agi": (50, 58), "res": (36, 45), "base": (52, 72)},
    "二流中品":   {"hp": (1250, 1580), "qi": (950, 1280),  "agi": (44, 52), "res": (30, 39), "base": (48, 68)},
    "二流下品":   {"hp": (950, 1220),  "qi": (680, 930),   "agi": (38, 46), "res": (24, 33), "base": (44, 65)},
    "三流上品":   {"hp": (700, 920),   "qi": (420, 650),   "agi": (32, 40), "res": (18, 26), "base": (38, 60)},
    "三流中品":   {"hp": (500, 680),   "qi": (240, 400),   "agi": (26, 34), "res": (13, 21), "base": (34, 56)},
    "三流下品":   {"hp": (340, 490),   "qi": (100, 230),   "agi": (20, 28), "res": (8, 16),  "base": (30, 52)},
    "不入流":     {"hp": (150, 320),   "qi": (0, 80),      "agi": (10, 22), "res": (3, 12),  "base": (22, 55)},
}


def compute_stats(rng: random.Random, category: str, realm: str, name: str):
    cfg = REALM_STAT_RANGES[realm]
    hp = rng.randint(*cfg["hp"])
    qi = rng.randint(*cfg["qi"])
    agi = rng.randint(*cfg["agi"])
    res = rng.randint(*cfg["res"])

    if category == "历史名人" and realm == "不入流":
        # Civil historical figures have high comprehension/charm despite unranked martial realm
        bone = rng.randint(35, 68)
        comp = rng.randint(78, 99)
        charm = rng.randint(65, 96)
        qi = rng.randint(0, 40)
    else:
        bone = rng.randint(*cfg["base"])
        comp = rng.randint(*cfg["base"])
        charm = rng.randint(42, 95)

    # Specific iconic overrides
    if name == "法空":  # 少林扫地僧
        bone, comp, charm, hp, qi, agi, res = 99, 99, 88, 9999, 9999, 98, 99
    elif name == "巫行云":  # 天山童姥
        bone, comp, charm, hp, qi, agi, res = 95, 94, 86, 8900, 9050, 96, 93
    elif name == "李秋水":
        bone, comp, charm, hp, qi, agi, res = 90, 93, 98, 8100, 8250, 94, 89
    elif name == "慕容博":
        bone, comp, charm, hp, qi, agi, res = 89, 96, 91, 6950, 7050, 90, 84
    elif name == "萧远山":
        bone, comp, charm, hp, qi, agi, res = 96, 90, 86, 7180, 6980, 91, 85
    elif name == "无崖子":
        bone, comp, charm, hp, qi, agi, res = 88, 98, 99, 6500, 7150, 89, 83
    elif name == "黄裳":
        bone, comp, charm, hp, qi, agi, res = 91, 99, 87, 6800, 7100, 88, 85
    elif name == "乔峰":
        bone, comp, charm, hp, qi, agi, res = 95, 89, 92, 6080, 5960, 86, 80
    elif name == "慕容复":
        bone, comp, charm, hp, qi, agi, res = 85, 91, 95, 4920, 4850, 83, 74
    elif name == "苏轼":
        bone, comp, charm = 68, 99, 92
    elif name == "包拯":
        bone, comp, charm = 65, 95, 85
    elif name == "范仲淹":
        bone, comp, charm = 72, 96, 93
    elif name == "狄青":
        bone, comp, charm = 90, 86, 94

    return {
        "bone": bone,
        "comprehension": comp,
        "charm": charm,
        "hp": hp,
        "qi": qi,
        "agility": agi,
        "resist": res,
    }


def main():
    stat_rng = random.Random(20261112)

    # Check uniqueness across Part 1 & Part 2 first
    seen_names = set()
    for row in HISTORICAL_FIGURES:
        assert row[0] not in seen_names, f"Duplicate name in Hist: {row[0]}"
        seen_names.add(row[0])
    for row in TOP_MARTIAL_ARTISTS:
        assert row[0] not in seen_names, f"Duplicate name in Top: {row[0]}"
        seen_names.add(row[0])
    for row in FIRST_RATE_ARTISTS:
        assert row[0] not in seen_names, f"Duplicate name in First-rate: {row[0]}"
        seen_names.add(row[0])

    part3_rows = generate_part3(seen_names)

    all_records = []
    idx = 1

    # 1. Historical Figures (0001 - 0100)
    for r in HISTORICAL_FIGURES:
        name, title, gender, age, faction, role, loc, realm, arts, bio = r
        stats = compute_stats(stat_rng, "历史名人", realm, name)
        all_records.append({
            "id": f"NPC-{idx:04d}",
            "num": idx,
            "name": name,
            "title": title,
            "category": "历史名人",
            "gender": gender,
            "age": age,
            "faction": faction,
            "role": role,
            "location": loc,
            "realm": realm,
            "stats": stats,
            "signature_arts": arts,
            "bio": bio,
        })
        idx += 1

    # 2. Martial Artists (0101 - 1000) sorted strictly by REALM_ORDER
    martial_raw = list(TOP_MARTIAL_ARTISTS) + list(FIRST_RATE_ARTISTS) + list(part3_rows)
    realm_rank_map = {rm: i for i, rm in enumerate(REALM_ORDER)}
    martial_raw.sort(key=lambda x: realm_rank_map[x[7]])

    for r in martial_raw:
        name, title, gender, age, faction, role, loc, realm, arts, bio = r
        stats = compute_stats(stat_rng, "武林人士", realm, name)
        all_records.append({
            "id": f"NPC-{idx:04d}",
            "num": idx,
            "name": name,
            "title": title,
            "category": "武林人士",
            "gender": gender,
            "age": age,
            "faction": faction,
            "role": role,
            "location": loc,
            "realm": realm,
            "stats": stats,
            "signature_arts": arts,
            "bio": bio,
        })
        idx += 1

    # Validations
    assert len(all_records) == 1000, f"Expected 1000 characters, got {len(all_records)}"
    hist_cnt = sum(1 for x in all_records if x["category"] == "历史名人")
    mart_cnt = sum(1 for x in all_records if x["category"] == "武林人士")
    assert hist_cnt == 100 and mart_cnt == 900, f"Counts mismatch: {hist_cnt} vs {mart_cnt}"
    assert len({x["name"] for x in all_records}) == 1000, "Names are not 100% unique!"

    # Ensure zero placeholder words like 先人 / 某甲 / 弟子甲 / (
    forbidden = ["先人", "先祖", "某", "路人", "弟子甲", "弟子乙", "(", "（", "·"]
    for x in all_records:
        for fb in forbidden:
            assert fb not in x["name"], f"Forbidden token '{fb}' found in name: {x['name']}"

    # Save JSON to workspace
    os.makedirs("/home/antigravity/northern_song", exist_ok=True)
    json_path = "/home/antigravity/northern_song/characters_1000.json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(all_records, f, ensure_ascii=False, indent=2)

    # Print statistics
    martial_realms = Counter(x["realm"] for x in all_records if x["category"] == "武林人士")
    hist_realms = Counter(x["realm"] for x in all_records if x["category"] == "历史名人")
    factions = Counter(x["faction"] for x in all_records)
    locs = Counter(x["location"] for x in all_records)

    print("=== VALIDATION PASSED: 1,000 UNIQUE CHARACTERS ===")
    print("Martial Artists (900) by Realm:")
    for rm in REALM_ORDER:
        print(f"  {rm}: {martial_realms[rm]}")
    print("\nHistorical Figures (100) by Realm:")
    for rm in REALM_ORDER:
        if hist_realms[rm]:
            print(f"  {rm}: {hist_realms[rm]}")
    print(f"\nTotal Factions covered: {len(factions)}")
    print(f"Total Map Locations populated: {len(locs)}")

    # Build Markdown Compendium
    md_lines = []
    md_lines.append("# 《北宋立志传》— 天下群英谱（皇祐二年 · 1000 人物全录）")
    md_lines.append("")
    md_lines.append("> “八荒争凑，庙堂有柱石名臣；四海咸通，江湖藏龙虎奇侠。皇祐二年（公元 1050 年）岁次庚寅，凡朝野名流百人、武林豪杰九百辈，尽录于此谱。”")
    md_lines.append("")
    md_lines.append("---")
    md_lines.append("")
    md_lines.append("## 一、 武道境界体系与天下人物总览")
    md_lines.append("")
    md_lines.append("### 1.1 武林六境十六品阶设定")
    md_lines.append("天下习武之人依内功修为、实战四维（气血、内力、身法、抗性）及武学造诣，共分 **【大宗师】、【宗师】、【一流】、【二流】、【三流】、【不入流】** 六大境界；除【不入流】外，其余五大境界各细分 **上、中、下** 三品，合计 **六境十六阶**：")
    md_lines.append("")
    md_lines.append("| 境界大类 | 细分品阶 | 900名武林人士数量 | 100名历史名人兼修分布 | 气血基准区间 | 内力基准区间 | 身法区间 | 抗性区间 | 江湖地位与实力标尺 |")
    md_lines.append("| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |")

    tier_desc = {
        "大宗师上品": ("大宗师", "武道通神，三尺气墙无形不破；**少林扫地僧（法空）**为当世唯一"),
        "大宗师中品": ("大宗师", "返老还童，六合独尊；**天山童姥（巫行云）**独居此位"),
        "大宗师下品": ("大宗师", "无相神功，白虹惊天；**李秋水**独居此位"),
        "宗师上品": ("宗师", "绝顶大豪，半步通神；**慕容博、萧远山**（皆名义身死，潜伏少林偷师）、无崖子、黄裳、枯荣、玄澄并列"),
        "宗师中品": ("宗师", "开宗掌教，威震九州；**乔峰（北乔峰）**、汪剑通、玄慈、鸠摩智、林朝瑶、冯默岚等十强"),
        "宗师下品": ("宗师", "一派宗主，名动四方；**慕容复（南慕容）**、丁春秋、道清、元苦、唐鹤轩、玛尔巴（历史）等"),
        "一流上品": ("一流", "名动天下之绝顶名宿、首座大将；如展昭、白玉堂、苏星河、狄青（历史）"),
        "一流中品": ("一流", "名门护法长老、边军名帅；如玄悲、康广陵、薛慕华、杨文广（历史）"),
        "一流下品": ("一流", "江湖成名豪侠、各派执事长老、总捕头领；如风波恶、冷凌弃、折继闵（历史）"),
        "二流上品": ("二流", "江湖好手、名门真传翘楚、陷空五鼠、大镖局总镖头、禁军宿将"),
        "二流中品": ("二流", "门派中坚精锐、地方分舵主、六扇门银章捕头"),
        "二流下品": ("二流", "初露峥嵘之内门高足、水陆堂主、边关骁果校尉"),
        "三流上品": ("三流", "门派熟手弟子、州府缉盗都头、绿林山寨头目"),
        "三流中品": ("三流", "常规入室弟子、镖局趟子手头领、军中虞候"),
        "三流下品": ("三流", "初通内息之门人、拳馆教习、采药医徒"),
        "不入流": ("不入流", "初习粗浅把式之杂役、山野樵猎、市井商贩及无武功之朝堂文臣大儒"),
    }

    for rm in REALM_ORDER:
        grp, desc = tier_desc[rm]
        cfg = REALM_STAT_RANGES[rm]
        md_lines.append(
            f"| **{grp}** | **{rm}** | {martial_realms[rm]} 人 | {hist_realms[rm]} 人 | "
            f"`{cfg['hp'][0]}~{cfg['hp'][1]}` | `{cfg['qi'][0]}~{cfg['qi'][1]}` | "
            f"`{cfg['agi'][0]}~{cfg['agi'][1]}` | `{cfg['res'][0]}~{cfg['res'][1]}` | {desc} |"
        )

    md_lines.append("")
    md_lines.append("> [!IMPORTANT]")
    md_lines.append("> **命名规范与史实融合说明**：全谱 **1,000 人姓名 100% 独立不重名**，杜绝任何“某某先人”“弟子甲”等出戏代称。北宋皇祐二年（1050 年）在世的 100 位帝王将相、文豪大儒、科技医家及辽夏吐蕃大理风云人物均按真实生卒年龄还原（如 41 岁的宋仁宗赵祯、62 岁的范仲淹、52 岁的包拯、43 岁的狄青、15 岁的少年苏轼）；900 位武林人士皆赋以符合宋代门派辈分或地域风貌的真实姓名与字号。")
    md_lines.append("")
    md_lines.append("---")
    md_lines.append("")

    # Section 2: 100 Historical Celebrities
    md_lines.append("## 二、 庙堂与四夷：历史名人百杰录（编号 0001 ~ 0100）")
    md_lines.append("")
    md_lines.append("| 编号 | 姓名 | 字号/尊称 | 性别 | 年龄 | 所属政权/阶层 | 身份官职 | 常驻地点 | 武道境界 | 武学/十艺专长 | 皇祐二年（1050）人物志 |")
    md_lines.append("| :--- | :--- | :--- | :---: | :---: | :--- | :--- | :--- | :---: | :--- | :--- |")
    for x in all_records[:100]:
        md_lines.append(
            f"| `{x['id']}` | **{x['name']}** | {x['title']} | {x['gender']} | {x['age']} | {x['faction']} | "
            f"{x['role']} | {x['location']} | {x['realm']} | {x['signature_arts']} | {x['bio']} |"
        )

    md_lines.append("")
    md_lines.append("---")
    md_lines.append("")

    # Section 3: 900 Martial Artists grouped by Major Realm
    md_lines.append("## 三、 江湖群侠：九百武林人士全录（编号 0101 ~ 1000）")
    md_lines.append("")

    martial_records = all_records[100:]
    realm_groups = [
        ("3.1 大宗师之境（共 3 人：上品 1 · 中品 1 · 下品 1）", ["大宗师上品", "大宗师中品", "大宗师下品"], True),
        ("3.2 宗师之境（共 30 人：上品 6 · 中品 10 · 下品 14）", ["宗师上品", "宗师中品", "宗师下品"], True),
        ("3.3 一流高手之境（共 107 人：上品 22 · 中品 35 · 下品 50）", ["一流上品", "一流中品", "一流下品"], True),
        ("3.4 二流好手之境（共 240 人：上品 60 · 中品 80 · 下品 100）", ["二流上品", "二流中品", "二流下品"], False),
        ("3.5 三流门人之境（共 390 人：上品 110 · 中品 130 · 下品 150）", ["三流上品", "三流中品", "三流下品"], False),
        ("3.6 不入流草莽市井（共 130 人）", ["不入流"], False),
    ]

    for title_sec, r_list, include_full_bio in realm_groups:
        md_lines.append(f"### {title_sec}")
        md_lines.append("")
        subset = [x for x in martial_records if x["realm"] in r_list]
        if include_full_bio:
            md_lines.append("| 编号 | 姓名 | 江湖名号 | 性别 | 年龄 | 所属门派/势力 | 职位身份 | 常驻地点 | 境界品阶 | 四维(血/内/身/抗) | 代表武学 | 人物生平与定位 |")
            md_lines.append("| :--- | :--- | :--- | :---: | :---: | :--- | :--- | :--- | :---: | :---: | :--- | :--- |")
            for x in subset:
                st = x["stats"]
                stat_str = f"{st['hp']}/{st['qi']}/{st['agility']}/{st['resist']}"
                md_lines.append(
                    f"| `{x['id']}` | **{x['name']}** | {x['title']} | {x['gender']} | {x['age']} | {x['faction']} | "
                    f"{x['role']} | {x['location']} | **{x['realm']}** | `{stat_str}` | {x['signature_arts']} | {x['bio']} |"
                )
        else:
            md_lines.append("| 编号 | 姓名 | 江湖名号 | 性别 | 年龄 | 所属门派/势力 | 职位身份 | 常驻地点 | 境界品阶 | 四维(血/内/身/抗) | 主修武学 |")
            md_lines.append("| :--- | :--- | :--- | :---: | :---: | :--- | :--- | :--- | :---: | :---: | :--- |")
            for x in subset:
                st = x["stats"]
                stat_str = f"{st['hp']}/{st['qi']}/{st['agility']}/{st['resist']}"
                md_lines.append(
                    f"| `{x['id']}` | **{x['name']}** | {x['title']} | {x['gender']} | {x['age']} | {x['faction']} | "
                    f"{x['role']} | {x['location']} | {x['realm']} | `{stat_str}` | {x['signature_arts']} |"
                )
        md_lines.append("")

    md_content = "\n".join(md_lines)
    ws_md_path = "/home/antigravity/northern_song/CHARACTER_COMPENDIUM.md"
    with open(ws_md_path, "w", encoding="utf-8") as f:
        f.write(md_content)

    print(f"Wrote JSON ({os.path.getsize(json_path)} bytes) -> {json_path}")
    print(f"Wrote MD ({os.path.getsize(ws_md_path)} bytes, {len(md_lines)} lines) -> {ws_md_path}")


if __name__ == "__main__":
    main()
