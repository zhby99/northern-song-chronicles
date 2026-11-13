import json
import os
from PIL import Image, ImageDraw

with open('/home/antigravity/panoramas/all_regions_spec.json', 'r', encoding='utf-8') as f:
    specs = {item['id']: item for item in json.load(f)}

CALIBRATIONS = {
    "luoyang": {
        "gatePos": [718, 610],
        "gatePoly": "595,622 745,512 835,595 835,710 705,745 595,685",
        "specials": {
            "ly_baimasi": {
                "x": 1138, "y": 145,
                "poly": "855,172 1138,14 1372,115 1372,212 1142,315 855,198"
            },
            "ly_shuyuan": {
                "x": 672, "y": 135,
                "poly": "496,138 692,35 888,125 888,172 690,256 496,172"
            },
            "ly_peony": {
                "x": 465, "y": 318,
                "poly": "248,318 455,198 722,340 722,382 512,482 248,348"
            },
            "ly_gaibang": {
                "x": 1168, "y": 605,
                "poly": "965,585 1195,465 1372,535 1372,745 1135,762 965,675"
            },
            "ly_jindao": {
                "x": 205, "y": 465,
                "poly": "4,435 186,338 452,475 452,518 228,638 4,515"
            }
        },
        "bases": {
            "yamen": {
                "customName": "西京河南府衙",
                "x": 238, "y": 175,
                "poly": "125,188 308,82 465,155 252,272"
            },
            "tavern": {
                "customName": "洛水天津酒楼",
                "x": 822, "y": 292,
                "poly": "742,288 842,226 892,278 805,352"
            },
            "inn": {
                "customName": "定鼎门迎宾客栈",
                "x": 918, "y": 845 if False else 652,
                "poly": "838,635 925,582 1012,652 945,718"
            },
            "dojo": {
                "customName": "河洛振武拳馆",
                "x": 102, "y": 625,
                "poly": "12,615 138,538 228,608 98,698"
            },
            "academy": {
                "customName": "洛滨崇儒书院",
                "x": 952, "y": 48,
                "poly": "868,45 965,4 1052,45 958,108"
            }
        }
    },
    "daming": {
        "gatePos": [812, 615],
        "gatePoly": "695,625 812,522 905,598 898,745 732,705",
        "specials": {
            "dm_palace": {
                "x": 758, "y": 152,
                "poly": "380,175 650,15 865,10 1158,88 1158,125 802,368 380,210"
            },
            "dm_ferry": {
                "x": 225, "y": 592,
                "poly": "10,515 315,435 462,515 445,675 118,764 10,752"
            },
            "dm_drill": {
                "x": 1138, "y": 388,
                "poly": "850,425 1172,188 1372,275 1372,495 1205,605 850,455"
            }
        },
        "bases": {
            "yamen": {
                "customName": "大名府留守司衙",
                "x": 452, "y": 325,
                "poly": "312,282 415,222 562,302 475,405 342,338"
            },
            "tavern": {
                "customName": "黄河北岸临津酒楼",
                "x": 318, "y": 428,
                "poly": "210,378 288,332 442,415 375,488 232,422"
            },
            "inn": {
                "customName": "南瓮城悦来客栈",
                "x": 542, "y": 495,
                "poly": "455,455 552,395 668,488 598,558 472,498"
            },
            "dojo": {
                "customName": "清河六合拳馆",
                "x": 852, "y": 492,
                "poly": "728,485 848,408 985,482 895,568 748,518"
            },
            "academy": {
                "customName": "元城讲武书院",
                "x": 1158, "y": 628,
                "poly": "998,595 1108,522 1365,648 1235,738 1025,638"
            }
        }
    },
    "zhending": {
        "gatePos": [735, 622],
        "gatePoly": "612,638 748,535 868,625 868,712 725,764 612,712",
        "specials": {
            "zd_longxing": {
                "x": 322, "y": 175,
                "poly": "105,212 318,12 498,62 662,198 512,335 378,382 125,258"
            },
            "zd_market": {
                "x": 1142, "y": 152,
                "poly": "852,68 1025,4 1372,4 1372,335 1235,342 852,128"
            },
            "zd_spear": {
                "x": 1152, "y": 578,
                "poly": "915,612 1212,422 1372,512 1372,685 1178,764 915,642"
            }
        },
        "bases": {
            "yamen": {
                "customName": "真定府都部署衙",
                "x": 272, "y": 438,
                "poly": "92,442 248,322 498,462 312,568 98,472"
            },
            "tavern": {
                "customName": "燕赵悲歌大酒楼",
                "x": 565, "y": 438,
                "poly": "448,398 538,342 632,408 552,502 465,452"
            },
            "inn": {
                "customName": "南关迎客驿栈",
                "x": 688, "y": 502,
                "poly": "565,522 725,428 825,495 655,585"
            },
            "dojo": {
                "customName": "滹沱河畔演武馆",
                "x": 135, "y": 588,
                "poly": "25,552 132,482 285,578 168,662 35,595"
            },
            "academy": {
                "customName": "恒阳儒林书院",
                "x": 435, "y": 608,
                "poly": "342,612 458,522 542,588 422,685"
            }
        }
    },
    "taiyuan": {
        "gatePos": [692, 608],
        "gatePoly": "595,668 692,518 808,595 798,742 595,698",
        "specials": {
            "ty_jinci": {
                "x": 318, "y": 405,
                "poly": "4,358 248,198 662,388 662,422 348,602 4,422"
            },
            "ty_iron": {
                "x": 1152, "y": 175,
                "poly": "908,142 1142,4 1372,98 1372,225 1175,335 908,195"
            },
            "ty_yang": {
                "x": 662, "y": 195,
                "poly": "438,162 642,35 885,182 885,218 682,332 438,202"
            }
        },
        "bases": {
            "yamen": {
                "customName": "河东经略安抚使衙",
                "x": 918, "y": 352,
                "poly": "715,375 935,252 1125,358 998,465 715,408"
            },
            "tavern": {
                "customName": "晋阳杏花村酒楼",
                "x": 885, "y": 475,
                "poly": "798,468 908,395 968,468 868,548"
            },
            "inn": {
                "customName": "迎泽门商旅大客栈",
                "x": 1075, "y": 542,
                "poly": "968,552 1098,462 1235,552 1105,655 968,578"
            },
            "dojo": {
                "customName": "并州刚烈武馆",
                "x": 1265, "y": 462,
                "poly": "1152,442 1272,378 1372,442 1285,548 1152,482"
            },
            "academy": {
                "customName": "汾水崇文书院",
                "x": 898, "y": 58,
                "poly": "795,52 895,4 1025,32 882,125 795,78"
            }
        }
    },
    "changan": {
        "gatePos": [638, 618],
        "gatePoly": "522,585 668,492 785,592 778,705 568,755 522,685",
        "specials": {
            "ca_dayanta": {
                "x": 1052, "y": 175,
                "poly": "745,188 1055,15 1372,155 1372,225 1055,378 745,212"
            },
            "ca_caotang": {
                "x": 1158, "y": 585,
                "poly": "898,605 1235,382 1372,415 1372,764 995,764 898,668"
            },
            "ca_xishi": {
                "x": 225, "y": 398,
                "poly": "8,285 152,218 508,432 458,528 195,532 8,425"
            }
        },
        "bases": {
            "yamen": {
                "customName": "永兴军路京兆府衙",
                "x": 455, "y": 212,
                "poly": "328,188 492,102 652,195 512,285 328,225"
            },
            "tavern": {
                "customName": "朱雀大街醉仙酒楼",
                "x": 675, "y": 318,
                "poly": "585,292 715,205 768,295 668,378"
            },
            "inn": {
                "customName": "明德门丝路迎宾栈",
                "x": 545, "y": 378,
                "poly": "465,358 575,282 632,368 532,442"
            },
            "dojo": {
                "customName": "关中振威演武馆",
                "x": 798, "y": 428,
                "poly": "668,412 885,308 998,395 798,498 668,438"
            },
            "academy": {
                "customName": "长安横渠关学书院",
                "x": 345, "y": 588,
                "poly": "225,585 348,512 465,595 348,668 225,612"
            }
        }
    },
    "yanan": {
        "gatePos": [698, 562],
        "gatePoly": "622,575 698,495 778,555 772,658 678,662 622,612",
        "specials": {
            "ya_pagoda": {
                "x": 1122, "y": 175,
                "poly": "935,235 1085,35 1168,35 1285,185 1235,345 965,305"
            },
            "ya_camp": {
                "x": 272, "y": 212,
                "poly": "18,195 338,18 605,168 605,232 285,382 18,248"
            },
            "ya_blackmkt": {
                "x": 258, "y": 598,
                "poly": "75,552 272,462 492,592 435,738 195,732 75,628"
            }
        },
        "bases": {
            "yamen": {
                "customName": "鄜延路经略安抚使司",
                "x": 632, "y": 352,
                "poly": "502,362 638,268 792,338 648,452 502,398"
            },
            "tavern": {
                "customName": "延水塞上风雪酒楼",
                "x": 752, "y": 482,
                "poly": "695,478 775,432 818,485 745,538"
            },
            "inn": {
                "customName": "边城驼铃安歇客栈",
                "x": 858, "y": 428,
                "poly": "788,415 882,362 932,428 845,492"
            },
            "dojo": {
                "customName": "延州铁血演武馆",
                "x": 1028, "y": 478,
                "poly": "932,478 1045,408 1138,468 1035,548 932,498"
            },
            "academy": {
                "customName": "嘉岭边策书院",
                "x": 918, "y": 552,
                "poly": "818,548 918,492 1005,548 908,615 818,568"
            }
        }
    },
    "jinan": {
        "gatePos": [698, 622],
        "gatePoly": "568,652 715,528 815,598 808,718 665,764 568,718",
        "specials": {
            "jn_baotu": {
                "x": 285, "y": 378,
                "poly": "8,382 275,222 562,368 562,392 272,535 8,415"
            },
            "jn_daminghu": {
                "x": 755, "y": 215,
                "poly": "362,145 555,8 1035,8 1148,158 935,295 688,342 465,268"
            },
            "jn_daimiao": {
                "x": 1135, "y": 552,
                "poly": "872,552 1152,382 1358,488 1345,625 1142,718 872,585"
            }
        },
        "bases": {
            "yamen": {
                "customName": "京东东路齐州府衙",
                "x": 362, "y": 568,
                "poly": "195,575 368,478 518,558 322,662 195,602"
            },
            "tavern": {
                "customName": "鹊华烟雨临湖酒楼",
                "x": 612, "y": 448,
                "poly": "512,418 618,355 738,432 632,518 512,455"
            },
            "inn": {
                "customName": "历下泉畔悦来客栈",
                "x": 838, "y": 398,
                "poly": "718,402 895,298 962,348 765,458"
            },
            "dojo": {
                "customName": "齐鲁秦琼故里武馆",
                "x": 82, "y": 648,
                "poly": "4,615 95,552 162,638 68,715 4,675"
            },
            "academy": {
                "customName": "泺源稷下书院",
                "x": 1075, "y": 298,
                "poly": "955,298 1128,218 1212,285 1038,378"
            }
        }
    },
    "xijin_liao": {
        "gatePos": [792, 622],
        "gatePoly": "648,648 828,505 948,618 948,708 758,764 648,722",
        "specials": {
            "xj_minzhong": {
                "x": 248, "y": 318,
                "poly": "18,332 225,95 528,325 528,358 252,485 18,368"
            },
            "xj_marshal": {
                "x": 798, "y": 168,
                "poly": "442,155 758,4 1142,128 1142,162 762,345 442,188"
            },
            "xj_horse": {
                "x": 1135, "y": 368,
                "poly": "795,365 1138,185 1372,278 1372,518 1245,585 1035,492 795,388"
            }
        },
        "bases": {
            "yamen": {
                "customName": "大辽南京析津府衙",
                "x": 172, "y": 552,
                "poly": "55,552 198,468 308,548 188,638 55,582"
            },
            "tavern": {
                "customName": "幽州胡姬羊酒楼",
                "x": 438, "y": 488,
                "poly": "295,508 448,402 498,468 358,572"
            },
            "inn": {
                "customName": "安远门南北商驿客栈",
                "x": 652, "y": 482,
                "poly": "575,452 632,402 798,502 738,568 575,485"
            },
            "dojo": {
                "customName": "燕云遗民义勇拳馆",
                "x": 438, "y": 622,
                "poly": "272,625 438,535 605,618 422,728 272,648"
            },
            "academy": {
                "customName": "蓟城崇文书院",
                "x": 348, "y": 68,
                "poly": "142,28 368,4 568,58 365,168 142,58"
            }
        }
    },
    "dading_liao": {
        "gatePos": [712, 622],
        "gatePoly": "578,645 732,535 828,622 828,708 665,764 578,708",
        "specials": {
            "dd_pagoda": {
                "x": 688, "y": 218,
                "poly": "442,272 648,18 738,18 928,258 928,315 712,408 442,328"
            },
            "dd_envoy": {
                "x": 288, "y": 438,
                "poly": "8,402 225,288 602,428 602,455 302,575 8,438"
            },
            "dd_hunt": {
                "x": 1125, "y": 148,
                "poly": "805,122 1055,4 1372,4 1372,338 1225,305 805,155"
            }
        },
        "bases": {
            "yamen": {
                "customName": "大辽中京大定府衙",
                "x": 1245, "y": 432,
                "poly": "1075,442 1225,365 1372,428 1265,522 1075,478"
            },
            "tavern": {
                "customName": "老哈河塞北马奶酒楼",
                "x": 668, "y": 488,
                "poly": "565,478 632,428 732,485 685,552 565,505"
            },
            "inn": {
                "customName": "朱夏门四方迎宾客栈",
                "x": 852, "y": 445,
                "poly": "722,458 865,382 918,438 765,525"
            },
            "dojo": {
                "customName": "契丹摔跤角抵武馆",
                "x": 1028, "y": 538,
                "poly": "862,532 1038,458 1185,542 1052,618 862,558"
            },
            "academy": {
                "customName": "中京汉城儒学书院",
                "x": 1038, "y": 362,
                "poly": "908,368 1075,288 1152,338 968,425"
            }
        }
    },
    "linhuang_liao": {
        "gatePos": [528, 608],
        "gatePoly": "448,595 518,538 625,602 605,698 448,645",
        "specials": {
            "lh_goldtent": {
                "x": 845, "y": 148,
                "poly": "502,195 728,18 1168,125 1168,145 948,332 502,212"
            },
            "lh_altar": {
                "x": 152, "y": 195,
                "poly": "32,165 152,62 348,165 332,305 128,332 32,235"
            },
            "lh_ironcav": {
                "x": 1158, "y": 425,
                "poly": "905,392 1238,218 1372,278 1372,515 1238,598 905,435"
            }
        },
        "bases": {
            "yamen": {
                "customName": "大辽上京临潢府衙",
                "x": 512, "y": 368,
                "poly": "355,382 498,292 668,352 528,452 355,402"
            },
            "tavern": {
                "customName": "潢水金杯烈酒楼",
                "x": 598, "y": 408,
                "poly": "542,398 618,348 662,402 595,468"
            },
            "inn": {
                "customName": "捺钵古道皮货客栈",
                "x": 732, "y": 495,
                "poly": "632,508 688,458 762,508 738,568 632,532"
            },
            "dojo": {
                "customName": "上京草原博克武馆",
                "x": 362, "y": 478,
                "poly": "228,478 338,395 502,468 392,555 228,498"
            },
            "academy": {
                "customName": "上京国子监汉学馆",
                "x": 775, "y": 438,
                "poly": "672,445 785,375 875,468 785,532 672,475"
            }
        }
    }
}

CITY_ORDER = [
    "luoyang",
    "daming",
    "zhending",
    "taiyuan",
    "changan",
    "yanan",
    "jinan",
    "xijin_liao",
    "dading_liao",
    "linhuang_liao",
]

manifest = {}

for cid in CITY_ORDER:
    spec = specs[cid]
    cal = CALIBRATIONS[cid]
    specials_out = []
    for sp in spec["specials"]:
        sid = sp["id"]
        sc = cal["specials"][sid]
        item = dict(sp)
        item["x"] = sc["x"]
        item["y"] = sc["y"]
        item["poly"] = sc["poly"]
        specials_out.append(item)

    bases_out = []
    for bs in spec["bases"]:
        bkey = bs["key"]
        bc = cal["bases"][bkey]
        bitem = dict(bs)
        if "customName" in bc:
            bitem["customName"] = bc["customName"]
        bitem["x"] = bc["x"]
        bitem["y"] = bc["y"]
        bitem["poly"] = bc["poly"]
        bases_out.append(bitem)

    manifest[cid] = {
        "id": cid,
        "code": spec["code"],
        "name": spec["name"],
        "theme": "iso_panorama_image",
        "isoViewBox": [1376, 768],
        "imagePath": f"/home/antigravity/panoramas/regions/{cid}.jpg",
        "sceneSubtitle": spec["sceneSubtitle"],
        "gateLabel": spec["gateLabel"],
        "gatePos": cal["gatePos"],
        "gatePoly": cal["gatePoly"],
        "specials": specials_out,
        "bases": bases_out,
    }

    # Verify bounds and draw verification preview in scratch
    im = Image.open(f"/home/antigravity/panoramas/regions/{cid}.jpg").convert("RGBA")
    overlay = Image.new("RGBA", im.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    def parse_poly(pstr):
        pts = []
        for pair in pstr.strip().split():
            px, py = map(int, pair.split(","))
            assert 0 <= px <= 1376 and 0 <= py <= 768, f"{cid} out of bounds: {px},{py}"
            pts.append((px, py))
        assert len(pts) >= 4, f"{cid} poly too few points"
        return pts

    # Gate
    gpts = parse_poly(cal["gatePoly"])
    gx, gy = cal["gatePos"]
    draw.polygon(gpts, fill=(255, 215, 0, 65), outline=(255, 215, 0, 230))
    draw.ellipse((gx-6, gy-6, gx+6, gy+6), fill=(255, 215, 0, 255))

    # Specials
    for sp in specials_out:
        pts = parse_poly(sp["poly"])
        sx, sy = sp["x"], sp["y"]
        draw.polygon(pts, fill=(255, 60, 60, 65), outline=(255, 80, 80, 230))
        draw.ellipse((sx-6, sy-6, sx+6, sy+6), fill=(255, 50, 50, 255))

    # Bases
    for bs in bases_out:
        pts = parse_poly(bs["poly"])
        bx, by = bs["x"], bs["y"]
        draw.polygon(pts, fill=(60, 180, 255, 65), outline=(80, 200, 255, 230))
        draw.ellipse((bx-5, by-5, bx+5, by+5), fill=(60, 180, 255, 255))

    comp = Image.alpha_composite(im, overlay).convert("RGB")
    comp.save(f"/home/antigravity/.gemini/jetski/brain/af628ab615979de06aa203425f02e908/scratch/{cid}_verify.jpg", "JPEG", quality=82)

out_path = "/home/antigravity/panoramas/manifests/regions_batch1.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=2)

print("Successfully wrote manifest:", out_path, "with", len(manifest), "cities!")
