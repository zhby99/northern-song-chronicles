import math, json

# Map ViewBox: 0 0 1600 1000
# Lon: 77.0E to 146.0E (covers Kunlun ~81E, Lhasa 91E, all of China, Vietnam 102-109E, Taiwan 120-122E, Korea 124-130E, Japan 129-145.5E)
# Lat: 11.5N to 49.5N (covers Southern Vietnam 12N, Hainan 18N, Taiwan 22-25.3N, Liao Linhuang 44N, Hokkaido 41.5-45.5N, Heilongjiang/Sakhalin)

LON_MIN, LON_MAX = 77.5, 146.2
LAT_MIN, LAT_MAX = 12.0, 48.8
W, H = 1600, 1000

def proj(lon, lat):
    lon0 = 112.0
    conv = math.cos(math.radians(lat)) / math.cos(math.radians(31.0))
    x_adj = ((lon - lon0) * (0.38 + 0.62 * conv) + (lon0 - LON_MIN)) / (LON_MAX - LON_MIN)
    y_norm = (LAT_MAX - lat) / (LAT_MAX - LAT_MIN)
    return round(x_adj * W, 1), round(y_norm * H, 1)

def smooth_svg_path(coords, closed=True):
    pts = [proj(lon, lat) for lon, lat in coords]
    if len(pts) < 3:
        return ""
    # Catmull-Rom to Cubic Bezier for natural organic coastlines without sharp artificial corners
    n = len(pts)
    parts = [f"M {pts[0][0]},{pts[0][1]}"]
    limit = n if closed else n - 1
    tension = 0.22
    for i in range(limit):
        p0 = pts[(i - 1) % n] if closed else pts[max(0, i - 1)]
        p1 = pts[i]
        p2 = pts[(i + 1) % n] if closed else pts[min(n - 1, i + 1)]
        p3 = pts[(i + 2) % n] if closed else pts[min(n - 1, i + 2)]
        c1x = round(p1[0] + (p2[0] - p0[0]) * tension, 1)
        c1y = round(p1[1] + (p2[1] - p0[1]) * tension, 1)
        c2x = round(p2[0] - (p3[0] - p1[0]) * tension, 1)
        c2y = round(p2[1] - (p3[1] - p1[1]) * tension, 1)
        parts.append(f"C {c1x},{c1y} {c2x},{c2y} {p2[0]},{p2[1]}")
    if closed:
        parts.append("Z")
    return " ".join(parts)

# 1. Asian Mainland polygon (Counter-clockwise from top-left inland -> Far East Russia coast -> Korea -> Bohai -> Shandong -> Jiangsu -> Hangzhou Bay -> Fujian -> Guangdong/Leizhou -> Beibu Gulf -> Vietnam S-curve -> Cambodia/Thailand south edge -> west border -> top-left)
mainland_coast = [
    (75.0, 50.0), (138.0, 50.0),
    # Russian Primorye coast down to Vladivostok / Tumen River
    (140.2, 48.2), (138.5, 46.2), (136.0, 44.6), (134.0, 43.2), (131.8, 42.9), (130.7, 42.3),
    # Korean Peninsula East Coast (East Sea / Sea of Japan)
    (129.8, 41.8), (129.3, 40.7), (128.0, 39.8), (127.5, 39.2), (128.4, 38.6), (129.1, 37.5),
    (129.4, 36.6), (129.5, 36.0), (129.3, 35.3), (129.0, 35.1),
    # Southern Korea Coast (Busan -> Haenam/Mokpo)
    (128.2, 34.8), (127.4, 34.6), (126.5, 34.3), (126.1, 34.8),
    # Korea West Coast (Incheon / Ganghwa -> Pyongyang Bay -> Yalu River)
    (126.5, 35.8), (126.3, 36.7), (126.7, 37.5), (126.1, 37.8), (125.0, 37.9), (125.4, 38.7),
    (125.2, 39.6), (124.4, 39.9),
    # Liaodong Peninsula (Dandong -> Lushun/Dalian -> Liaodong Bay -> Shanhaiguan)
    (123.3, 39.7), (122.2, 39.2), (121.2, 38.8), (121.5, 39.6), (122.1, 40.6), (121.0, 40.9),
    (119.8, 40.0), (119.2, 39.3),
    # Bohai Bay (Tianjin -> Yellow River Delta)
    (118.0, 39.1), (117.7, 38.6), (118.2, 38.1), (118.9, 37.8), (119.0, 37.2),
    # Shandong Peninsula (Yantai -> Weihai -> Chengshantou -> Qingdao -> Haizhou Bay)
    (120.2, 37.6), (121.4, 37.5), (122.6, 37.4), (122.4, 36.9), (120.5, 36.1), (119.5, 35.3),
    # Jiangsu Coast -> Yangtze Estuary
    (119.3, 34.6), (120.3, 33.8), (120.9, 32.8), (121.9, 31.8), (121.8, 31.0),
    # Hangzhou Bay & Zhejiang Coast
    (120.9, 30.6), (121.4, 30.2), (122.0, 29.9), (121.8, 29.0), (121.4, 28.2), (120.7, 27.3),
    # Fujian Coast (Fuzhou -> Putian -> Quanzhou -> Xiamen)
    (119.9, 26.5), (119.6, 25.8), (119.0, 25.1), (118.1, 24.4), (117.4, 23.6),
    # Guangdong Coast -> Pearl River Estuary -> Leizhou Peninsula
    (116.5, 23.1), (115.0, 22.7), (114.2, 22.3), (113.6, 22.7), (113.2, 22.0), (111.8, 21.6),
    (110.6, 21.3), (110.4, 20.3), (109.8, 20.3), (109.9, 21.4),
    # Beibu Gulf (Guangxi -> Vietnam Red River Delta / Haiphong)
    (108.6, 21.6), (107.2, 21.0), (106.6, 20.5), (105.9, 19.7),
    # Vietnam S-Curve Coast (Vinh -> Hue -> Da Nang -> Quy Nhon -> Nha Trang -> Mekong Delta -> Ca Mau)
    (106.5, 18.0), (107.6, 16.5), (108.3, 16.1), (108.9, 15.0), (109.3, 13.5), (109.2, 12.1),
    (108.2, 10.9), (106.8, 10.3), (105.2, 8.7), (104.8, 9.6), (104.4, 10.5),
    # Gulf of Thailand / South edge closing back west
    (102.5, 11.8), (100.5, 13.4), (99.0, 11.0), (75.0, 11.0)
]

# 2. Taiwan Island (真实番薯轮廓: Keelung -> Suao -> Hualien -> Taitung -> Kenting -> Kaohsiung -> Tainan -> Taichung -> Hsinchu -> Tamsui)
taiwan = [
    (121.65, 25.28), (122.00, 25.01), (121.86, 24.58), (121.62, 24.00),
    (121.35, 23.15), (120.92, 22.45), (120.85, 21.92), (120.68, 22.05),
    (120.26, 22.62), (120.12, 23.12), (120.18, 23.75), (120.52, 24.32),
    (120.92, 24.85), (121.38, 25.18)
]

# 3. Hainan Island (琼州真实轮廓)
hainan = [
    (110.35, 20.05), (110.98, 19.95), (111.05, 19.60), (110.55, 18.95),
    (109.95, 18.42), (109.52, 18.23), (108.92, 18.45), (108.63, 19.10),
    (109.18, 19.75), (109.82, 20.02)
]

# 4. Jeju Island (耽罗/济州岛)
jeju = [
    (126.55, 33.52), (126.95, 33.48), (126.85, 33.24), (126.22, 33.22), (126.18, 33.42)
]

# 5. Japanese Archipelago: Honshu, Kyushu, Shikoku, Hokkaido, Sakhalin-south
honshu = [
    (140.6, 41.5), (141.4, 41.2), (142.0, 39.6), (141.5, 38.3), (141.0, 37.0),
    (140.8, 35.8), (139.9, 35.0), (139.6, 35.3), (138.9, 34.6), (137.0, 34.6),
    (135.9, 33.5), (135.1, 34.2), (134.1, 34.6), (132.5, 34.2), (131.0, 34.0),
    (130.9, 34.4), (132.6, 35.4), (134.2, 35.5), (135.5, 35.6), (136.7, 36.8),
    (137.3, 37.5), (137.2, 36.8), (138.9, 37.9), (139.8, 39.2), (140.0, 40.6)
]

shikoku = [
    (134.6, 34.2), (134.2, 33.3), (133.5, 33.5), (132.9, 32.8),
    (132.4, 33.4), (133.1, 34.0), (134.1, 34.3)
]

kyushu = [
    (131.0, 33.9), (131.7, 33.5), (131.6, 32.2), (131.1, 31.3),
    (130.3, 31.2), (130.1, 32.1), (129.6, 33.2), (130.3, 33.7)
]

hokkaido = [
    (141.7, 45.4), (143.2, 44.3), (145.3, 44.0), (145.6, 43.3),
    (144.2, 42.9), (143.2, 42.0), (141.2, 42.3), (140.9, 41.8),
    (140.0, 41.5), (139.9, 42.5), (140.5, 43.3), (141.4, 43.8), (141.6, 44.8)
]

zhoushan = [
    (122.10, 30.15), (122.42, 30.02), (122.35, 29.78), (121.98, 29.88)
]

ryukyu_okinawa = [
    (128.25, 26.85), (128.32, 26.55), (127.72, 26.10), (127.68, 26.42)
]

# Major Rivers (open paths)
yellow_river = [
    (96.5, 34.8), (99.8, 35.2), (101.2, 35.8), (103.8, 36.1), (105.5, 37.5),
    (106.5, 38.8), (107.2, 40.7), (110.2, 40.5), (111.3, 39.2), (110.4, 36.2),
    (110.3, 34.6), (112.5, 34.8), (114.4, 34.9), (115.6, 35.8), (116.8, 37.2), (118.2, 38.1)
]

yangtze_river = [
    (91.8, 33.6), (95.5, 32.5), (98.8, 29.5), (100.2, 26.9), (102.8, 26.6),
    (104.6, 28.7), (106.6, 29.6), (108.8, 30.8), (111.3, 30.7), (112.3, 29.8),
    (114.3, 30.6), (116.2, 29.9), (117.8, 31.2), (118.8, 32.1), (119.5, 32.2), (121.5, 31.6)
]

grand_canal = [
    (114.35, 34.79), (116.0, 34.2), (117.9, 33.5), (119.2, 33.1),
    (119.41, 32.39), (119.9, 31.8), (120.62, 31.30), (120.15, 30.27)
]

han_river = [
    (107.0, 33.1), (109.2, 32.8), (111.1, 32.5), (112.14, 32.01), (114.2, 30.6)
]

pearl_river = [
    (105.0, 25.0), (108.0, 23.8), (110.8, 23.4), (112.8, 23.1), (113.7, 22.5)
]

liao_river = [
    (118.2, 43.2), (120.8, 43.5), (123.5, 42.6), (122.6, 41.2), (121.8, 40.8)
]

mekong_lancang = [
    (94.5, 32.2), (97.5, 29.5), (99.1, 26.8), (100.3, 24.5), (100.8, 21.8),
    (102.2, 19.8), (104.8, 16.5), (105.8, 13.5), (105.2, 10.8), (106.5, 9.8)
]

yarlung_tsangpo = [
    (84.5, 29.8), (88.5, 29.3), (91.2, 29.3), (94.5, 29.6), (95.2, 28.2)
]

# Regime Borders in 1050 AD (open dashed lines)
border_song_liao = [
    (111.2, 39.2), (112.8, 39.25), (114.2, 39.0), (116.0, 39.05), (117.7, 39.0)
]
border_song_xixia = [
    (103.5, 36.2), (106.2, 36.4), (108.2, 37.1), (110.4, 38.2), (111.2, 39.2)
]
border_song_dali_viet = [
    (101.8, 29.2), (103.0, 27.6), (104.8, 25.2), (106.5, 22.8), (108.0, 21.6)
]
border_song_tubo = [
    (103.5, 36.2), (102.8, 34.0), (102.2, 31.5), (101.8, 29.2)
]

out = {
    "mainland": smooth_svg_path(mainland_coast, True),
    "taiwan": smooth_svg_path(taiwan, True),
    "hainan": smooth_svg_path(hainan, True),
    "jeju": smooth_svg_path(jeju, True),
    "honshu": smooth_svg_path(honshu, True),
    "shikoku": smooth_svg_path(shikoku, True),
    "kyushu": smooth_svg_path(kyushu, True),
    "hokkaido": smooth_svg_path(hokkaido, True),
    "zhoushan": smooth_svg_path(zhoushan, True),
    "okinawa": smooth_svg_path(ryukyu_okinawa, True),
    "yellow_river": smooth_svg_path(yellow_river, False),
    "yangtze_river": smooth_svg_path(yangtze_river, False),
    "grand_canal": smooth_svg_path(grand_canal, False),
    "han_river": smooth_svg_path(han_river, False),
    "pearl_river": smooth_svg_path(pearl_river, False),
    "liao_river": smooth_svg_path(liao_river, False),
    "mekong": smooth_svg_path(mekong_lancang, False),
    "yarlung": smooth_svg_path(yarlung_tsangpo, False),
    "border_song_liao": smooth_svg_path(border_song_liao, False),
    "border_song_xixia": smooth_svg_path(border_song_xixia, False),
    "border_song_dali": smooth_svg_path(border_song_dali_viet, False),
    "border_song_tubo": smooth_svg_path(border_song_tubo, False),
}

nodes_geo = {
    # 15 Song Cities
    'bianliang': (114.35, 34.82),
    'luoyang': (112.15, 34.68),
    'daming': (115.25, 36.35),
    'zhending': (114.55, 38.15),
    'taiyuan': (112.45, 37.75),
    'changan': (108.92, 34.28),
    'yanan': (109.48, 36.65),
    'jinan': (117.05, 36.75),
    'yangzhou': (119.45, 32.65),
    'jiangning': (118.65, 31.95),
    'suzhou': (120.72, 31.35),
    'hangzhou': (120.15, 30.15),
    'chengdu': (104.12, 30.68),
    'xiangyang': (112.22, 32.05),
    'quanzhou': (118.58, 24.88),
    # 6 New Foreign Cities (Liao x3, Western Xia x1, Tubo x1, Dali x1)
    'xijin_liao': (116.38, 39.95),
    'dading_liao': (119.32, 41.62),
    'linhuang_liao': (119.38, 44.05),
    'xingqing_xixia': (106.22, 38.52),
    'luoxie_tubo': (91.12, 29.65),
    'dali_city': (100.16, 25.72),
    # 17 Special Mountains & Passes (incl. Kunlun)
    'kunlun': (82.20, 36.10),
    'shaolin': (113.08, 34.32),
    'yanmenguan': (112.82, 39.22),
    'wutaishan': (113.68, 38.92),
    'taihang': (113.65, 36.85),
    'tongguan': (110.32, 34.52),
    'zhongnanshan': (108.12, 33.72),
    'taishan': (117.22, 35.95),
    'yanziwu': (119.95, 31.18),
    'taohuadao': (122.35, 29.85),
    'jianmenguan': (105.55, 32.25),
    'qingcheng': (103.35, 31.05),
    'emeishan': (103.28, 29.42),
    'wuliangshan': (100.75, 24.25),
    'wudangshan': (110.92, 32.55),
    'tiezhangfeng': (112.35, 29.05),
    'nanshaolin': (119.05, 25.65),
}

out["nodes"] = {k: proj(lon, lat) for k, (lon, lat) in nodes_geo.items()}
out["labels"] = {
    "taiwan": proj(121.0, 23.6),
    "hainan": proj(109.8, 19.1),
    "goryeo": proj(127.4, 37.8),
    "vietnam": proj(106.8, 17.5),
    "japan": proj(137.5, 36.4),
    "hokkaido": proj(142.8, 43.5),
    "liao": proj(114.5, 43.2),
    "xixia": proj(103.5, 39.5),
    "tubo": proj(89.0, 32.5),
    "dali": proj(99.5, 24.5),
    "song": proj(114.8, 31.0),
    "east_sea": proj(125.8, 29.2),
    "south_sea": proj(114.5, 17.8),
    "sea_of_japan": proj(134.2, 39.5),
}

with open("/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/165aeb2d-47c6-4ae8-9373-51acdcc9d87b/scratch/geo_paths.json", "w") as f:
    json.dump(out, f, indent=2)

print("Generated geo_paths.json successfully!")
for k, v in out["nodes"].items():
    print(f"  {k:16s} -> {v}")
