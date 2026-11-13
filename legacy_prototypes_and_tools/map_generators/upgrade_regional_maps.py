#!/usr/bin/env python3
"""
Upgrades northern_song_map.html so that entering ANY of the 38 enterable locations
(21 cities + 17 sect mountains / passes) seamlessly switches the main map viewport
from the Grand World Map to a bespoke, high-contrast Interactive Regional Map with
custom regional scenery backgrounds and prominent, clickable special & base buildings.
"""
import re

ARTIFACT_HTML = "/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/165aeb2d-47c6-4ae8-9373-51acdcc9d87b/northern_song_map.html"

with open(ARTIFACT_HTML, "r", encoding="utf-8") as f:
    src = f.read()

# 1. Inject CSS for regional map building animations & highlights
CSS_INSERT = """    .active-route-glow {
      stroke-dasharray: 9 5;
      animation: routeFlow 1.05s linear infinite;
    }
    @keyframes routeFlow {
      to { stroke-dashoffset: -28; }
    }
    @keyframes landmarkGlow {
      0%, 100% { filter: drop-shadow(0 0 5px rgba(217, 119, 6, 0.72)); }
      50% { filter: drop-shadow(0 0 12px rgba(245, 158, 11, 0.96)); }
    }
    .special-bldg-glow {
      animation: landmarkGlow 2.4s infinite ease-in-out;
    }
    .bldg-node {
      transition: transform 0.16s ease;
      transform-box: fill-box;
      transform-origin: center;
    }
    .bldg-node:hover {
      transform: translateY(-4px) scale(1.06);
    }"""

assert "    .active-route-glow {" in src, "CSS anchor not found"
src = re.sub(
    r"    \.active-route-glow \{.*?@keyframes routeFlow \{\s*to \{ stroke-dashoffset: -28; \}\s*\}",
    CSS_INSERT,
    src,
    flags=re.S,
)

# 2. Update top-left & bottom-left HUD + add Regional Map SVG canvas & Top Return Banner inside #map-viewport
VIEWPORT_OLD = """      <!-- 左上角：战略情报开关（纯实色面板） -->
      <div class="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-1.5 bg-[#f8f1e1] text-[#2a1f16] border border-[#6e5539] rounded-md px-2.5 py-1.5 shadow-md text-xs">"""

VIEWPORT_NEW = """      <!-- 地区互动地图顶部横幅（进入任一地区后显示，可一键返回天下舆图或速览切换） -->
      <div id="region-top-hud" class="hidden absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div class="pointer-events-auto flex items-center gap-2.5 bg-[#261a10] text-[#fbf3e2] border-2 border-[#c89d54] rounded-md px-3.5 py-2 shadow-xl">
          <button onclick="exitToWorldMap()" class="px-3 py-1 rounded bg-[#9c2a22] hover:bg-[#b8342b] text-[#fff9ef] font-bold song-serif text-xs border border-[#f2c97d]/60 shadow transition flex items-center gap-1">
            <span>←</span><span>出城 · 返回天下舆图</span>
          </button>
          <div class="h-5 w-px bg-[#8c6e46]/60"></div>
          <div>
            <div class="flex items-center gap-2">
              <span id="region-hud-title" class="song-serif font-bold text-sm text-amber-300 tracking-wide">东京汴梁 · 地区互动舆图</span>
              <span id="region-hud-badge" class="px-2 py-0.5 rounded bg-[#4a3520] text-[#f5dfb5] text-[11px] border border-[#9e7b47]/50">北宋 · 京畿路</span>
            </div>
            <div id="region-hud-subtitle" class="text-[11px] text-[#dfcfb0] mt-0.5">三重方城、汴河虹桥巨舟、御街州桥夜市灯火 — 点击图中高亮建筑即可拜访修习</div>
          </div>
        </div>

        <div class="pointer-events-auto flex items-center gap-2 bg-[#f8f1e1] text-[#2a1f16] border-2 border-[#6e5539] rounded-md px-2.5 py-1.5 shadow-lg text-xs">
          <span class="song-serif font-bold text-[#52391e]">舆图巡览(38地)：</span>
          <select id="region-quick-jump" onchange="previewOrEnterRegion(this.value)" class="px-2 py-1 rounded bg-[#fffaf0] border border-[#8c6e46] text-[#23180f] font-medium text-xs cursor-pointer">
          </select>
        </div>
      </div>

      <!-- 左上角：战略情报开关（纯实色面板，仅天下舆图显示） -->
      <div id="world-top-hud" class="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-1.5 bg-[#f8f1e1] text-[#2a1f16] border border-[#6e5539] rounded-md px-2.5 py-1.5 shadow-md text-xs">"""

assert VIEWPORT_OLD in src, "VIEWPORT_OLD anchor not found"
src = src.replace(VIEWPORT_OLD, VIEWPORT_NEW, 1)

LEGEND_OLD = """      <!-- 左下角：图例与缩放复位（纯实色面板） -->
      <div class="absolute bottom-3 left-3 z-10 flex items-end gap-2">"""

LEGEND_NEW = """      <!-- 左下角：地区内景图例（进入地区后显示） -->
      <div id="region-bottom-hud" class="hidden absolute bottom-3 left-3 z-20 flex items-end gap-2">
        <div class="bg-[#f8f1e1] text-[#2a1f16] border-2 border-[#6e5539] rounded-md px-3 py-2 shadow-lg text-xs space-y-1">
          <div class="font-bold song-serif text-[#52391e] border-b border-[#8c7353]/40 pb-0.5 mb-1">地区互动建筑图例（点击建筑移步入内）</div>
          <div class="flex flex-wrap items-center gap-3.5">
            <span class="flex items-center gap-1.5 font-semibold text-[#8f241e]"><span class="inline-block w-3 h-3 rounded-sm bg-[#9e221b] border-2 border-[#f3c65f]"></span> ★ 独有特殊建筑（机缘/绝学/十艺）</span>
            <span class="flex items-center gap-1.5"><span class="inline-block w-3 h-3 rounded-sm bg-[#355263] border border-[#d8cbb2]"></span> 城池基础建筑（官署/酒馆/武馆/书院/客栈）</span>
            <span class="flex items-center gap-1.5"><span class="inline-block w-3 h-3 rotate-45 bg-[#2d5a43] border border-[#e6f4ec]"></span> 城门 / 山门出口（返回天下舆图）</span>
          </div>
        </div>
      </div>

      <!-- 左下角：图例与缩放复位（纯实色面板，仅天下舆图显示） -->
      <div id="world-bottom-hud" class="absolute bottom-3 left-3 z-10 flex items-end gap-2">"""

assert LEGEND_OLD in src, "LEGEND_OLD anchor not found"
src = src.replace(LEGEND_OLD, LEGEND_NEW, 1)

# Add Regional SVG right after </svg> of #song-map-svg
SVG_END_OLD = """      </svg>
    </main>"""

SVG_END_NEW = """      </svg>

      <!-- 独立地区互动地图 SVG 画布（进入任一城池/名山/雄关后全屏接管主视口） -->
      <svg id="region-map-svg" viewBox="0 0 1600 1000" class="hidden w-full h-full block select-none"></svg>
    </main>"""

assert SVG_END_OLD in src, "SVG_END_OLD anchor not found"
src = src.replace(SVG_END_OLD, SVG_END_NEW, 1)

# 3. Remove the old #city-modal HTML block (or keep hidden unused, better remove cleanly)
src = re.sub(
    r"  <!-- 城内建筑 / 塞外王庭 / 宗门秘境 探索弹窗 -->.*?  <script>",
    "  <script>",
    src,
    flags=re.S,
)

# 4. Now inject comprehensive REGIONAL_SCENES data + procedural custom SVG scenery & building renderer + seamless view mode logic!
REGIONAL_JS = r"""
    // =========================================================================
    // 2B. 天下 38 处可进入地点：专属互动地图布局、风貌主题与可互动特殊建筑全录
    // =========================================================================
    const REGIONAL_CONFIG = {
      // ---------------- 北宋 15 城 ----------------
      bianliang: {
        theme: 'imperial_canal',
        sceneSubtitle: '三重方城、汴河虹桥巨舟、御街州桥夜市灯火',
        gateLabel: '南薰城门（出东京返天下舆图）', gatePos: [800, 915],
        specials: [
          { id: 'bl_palace', name: '大内皇宫（宣德门秘库）', kind: 'palace', x: 800, y: 195, tag: '皇城禁地', desc: '大宋皇城宣德门与文思院秘库，禁军重重把守；绝顶身法可夜探《葵花残卷》线索。', actLabel: '夜探皇城秘库（身法+2 / 悟武机缘）', effect: { agi: 2, mp: 30 } },
          { id: 'bl_kaifengfu', name: '开封府衙（六扇门总捕司）', kind: 'yamen', x: 455, y: 390, tag: '包公断案', desc: '包拯升堂断案与南侠展昭驻守之所，执掌京畿缉捕与六扇门追凶铁牌。', actLabel: '协办六扇门奇案（纹银+25两 / 策论+2）', effect: { silver: 25, skill: ['策论', 2] } },
          { id: 'bl_fanlou', name: '樊楼（御街第一风雅楼）', kind: 'tower', x: 1035, y: 355, tag: '词乐雅集', desc: '三层五楼飞桥相向的京师第一酒楼，词宗名伎抚琴填词，灯火彻夜不绝。', actLabel: '登楼抚琴填词（诗词+3 / 琴+3，耗银3两）', cost: 3, effect: { skill: ['诗词', 3], skill2: ['琴', 3] } },
          { id: 'bl_xiangguosi', name: '大相国寺（万姓交易市）', kind: 'temple', x: 1095, y: 585, tag: '皇家禅林', desc: '京城最大皇家佛刹兼书画奇珍庙会，高僧讲经、墨客品鉴碑帖古画。', actLabel: '品鉴碑帖听经（经义+2 / 书+2 / 画+2）', effect: { skill: ['经义', 2], skill2: ['书', 2], skill3: ['画', 2] } },
          { id: 'bl_jinjun', name: '禁军八十万大教场', kind: 'camp', x: 355, y: 655, tag: '周侗授枪', desc: '殿前司诸班直演武巨场，枪棒都教头周侗在此操练军阵沥泉大枪。', actLabel: '讨教军阵大枪（气血+35 / 骑术+3）', effect: { hp: 35, riding: 3 } }
        ],
        bases: [
          { key: 'tavern', x: 740, y: 545 },
          { key: 'academy', x: 605, y: 305 },
          { key: 'dojo', x: 545, y: 725 },
          { key: 'yamen', x: 645, y: 470 },
          { key: 'inn', x: 935, y: 745 }
        ]
      },
      luoyang: {
        theme: 'river_garden',
        sceneSubtitle: '北邙南洛、天津晓月长桥卧波、牡丹名园与古刹交辉',
        gateLabel: '洛阳定鼎门（返天下舆图）', gatePos: [800, 910],
        specials: [
          { id: 'ly_baimasi', name: '白马寺（释源祖庭）', kind: 'temple', x: 340, y: 255, tag: '华夏第一刹', desc: '东汉释源祖庭，梵音清越，高僧译经说法可化解高深武学知见障。', actLabel: '译经堂参禅涤虑（经义+3 / 内力+25）', effect: { skill: ['经义', 3], mp: 25 } },
          { id: 'ly_shuyuan', name: '白马书院（洛学讲席）', kind: 'pavilion', x: 650, y: 245, tag: '司马讲史', desc: '司马光等洛阳名儒编史讲学圣地，纵论历代治乱兴衰。', actLabel: '研读史鉴策论（策论+3 / 经义+2）', effect: { skill: ['策论', 3], skill2: ['经义', 2] } },
          { id: 'ly_peony', name: '洛阳牡丹园（国色芳苑）', kind: 'garden', x: 1085, y: 315, tag: '国色天香', desc: '姚黄魏紫冠绝天下，洛阳花会期间名士才女对弈丹青、吟诗唱和。', actLabel: '花会纹枰丹青（棋+3 / 画+3 / 诗词+2）', effect: { skill: ['棋', 3], skill2: ['画', 3] } },
          { id: 'ly_gaibang', name: '丐帮中原总舵（杏子林坛）', kind: 'fort', x: 1215, y: 590, tag: '天下第一帮', desc: '汪剑通帮主坐镇之中原抗辽情报中枢，十万帮众飞鸽传书汇集于此。', actLabel: '与丐帮豪杰痛饮论武（气血+30 / 辩才+3）', effect: { hp: 30, skill: ['辩才', 3] } },
          { id: 'ly_jindao', name: '金刀王家大宅', kind: 'manor', x: 450, y: 560, tag: '河洛世家', desc: '威震中原的金刀世家府邸，广交天下正道豪杰，演武厅刀光霍霍。', actLabel: '金刀厅以武会友（内力+25 / 身法+2）', effect: { mp: 25, agi: 2 } }
        ],
        bases: [
          { key: 'yamen', x: 780, y: 425 },
          { key: 'tavern', x: 895, y: 555 },
          { key: 'inn', x: 645, y: 715 },
          { key: 'dojo', x: 430, y: 755 },
          { key: 'academy', x: 965, y: 735 }
        ]
      },
      daming: {
        theme: 'fortress_river',
        sceneSubtitle: '黄河北岸抗辽陪都巨防、铁索浮桥惊涛拍岸',
        gateLabel: '大名南瓮城（返天下舆图）', gatePos: [800, 910],
        specials: [
          { id: 'dm_palace', name: '北京留守行宫', kind: 'palace', x: 790, y: 245, tag: '河北陪都', desc: '真宗澶渊亲征驻跸行宫，北方抗辽军政大计皆汇于此。', actLabel: '献河北防辽军策（策论+3 / 纹银+18两）', effect: { skill: ['策论', 3], silver: 18 } },
          { id: 'dm_ferry', name: '黄河铁索渡口', kind: 'dock', x: 350, y: 700, tag: '水陆险津', desc: '巨型铁索横锁黄河浊浪，夜间常有绿林好汉与官军水上争锋。', actLabel: '铁索踏浪练功（身法+3 / 气血+25）', effect: { agi: 3, hp: 25 } },
          { id: 'dm_drill', name: '河北枪棒大校场', kind: 'camp', x: 1165, y: 435, tag: '枪棒甲天下', desc: '河北清河卢氏与各路枪棒宗师比武擂台，长枪大戟寒光耀日。', actLabel: '登擂切磋六合枪棒（气血+35 / 内力+25）', effect: { hp: 35, mp: 25 } }
        ],
        bases: [
          { key: 'yamen', x: 560, y: 365 },
          { key: 'tavern', x: 830, y: 525 },
          { key: 'dojo', x: 1030, y: 660 },
          { key: 'academy', x: 515, y: 540 },
          { key: 'inn', x: 745, y: 725 }
        ]
      },
      zhending: {
        theme: 'border_fort',
        sceneSubtitle: '西屏太行苍翠、北望辽境白沟河、边境榷场驼马如云',
        gateLabel: '真定南关门（返天下舆图）', gatePos: [800, 910],
        specials: [
          { id: 'zd_longxing', name: '隆兴大佛寺（千手观音阁）', kind: 'temple', x: 430, y: 295, tag: '七丈铜佛', desc: '宋太祖敕建北方巨刹，悲智铜佛俯瞰燕赵风云，高僧护佑边民。', actLabel: '观音阁静参禅功（经义+3 / 内力+25）', effect: { skill: ['经义', 3], mp: 25 } },
          { id: 'zd_market', name: '宋辽边境榷场', kind: 'market', x: 1095, y: 250, tag: '胡汉互市', desc: '宋辽唯一官设边境贸易大集，良驹皮货云集，亦潜伏契丹南院密探。', actLabel: '榷场相马盘算（骑术+3 / 算术+3）', effect: { riding: 3, skill: ['算术', 3] } },
          { id: 'zd_spear', name: '常山演武堂', kind: 'manor', x: 1150, y: 580, tag: '常山枪脉', desc: '常山枪派宗祠武堂，枪法灵动迅捷如银龙出渊。', actLabel: '演练龙胆快枪（身法+3 / 气血+25）', effect: { agi: 3, hp: 25 } }
        ],
        bases: [
          { key: 'yamen', x: 745, y: 390 },
          { key: 'tavern', x: 880, y: 540 },
          { key: 'inn', x: 580, y: 690 },
          { key: 'dojo', x: 410, y: 545 },
          { key: 'academy', x: 960, y: 740 }
        ]
      },
      taiyuan: {
        theme: 'iron_citadel',
        sceneSubtitle: '汾水晋阳雄镇、官营铁冶炉火冲天、古柏忠祠凛然',
        gateLabel: '太原迎泽南门（返天下舆图）', gatePos: [800, 910],
        specials: [
          { id: 'ty_jinci', name: '晋祠古柏圣境', kind: 'temple', x: 345, y: 495, tag: '三晋名祠', desc: '周柏唐槐掩映难老清泉，历代名碑林立，最宜临帖养气。', actLabel: '临摹唐碑吐纳（书+3 / 内力+25）', effect: { skill: ['书', 3], mp: 25 } },
          { id: 'ty_iron', name: '河东官营铁冶监', kind: 'forge', x: 1145, y: 325, tag: '神兵炉火', desc: '天下精铁名刃尽出河东，百座高炉烈焰炙天，可淬兵刃与火抗。', actLabel: '炉火锻兵淬体（抗性+3 / 气血+30）', effect: { res: 3, hp: 30 } },
          { id: 'ty_yang', name: '天波杨家旧祠', kind: 'manor', x: 685, y: 245, tag: '一门忠烈', desc: '供奉杨无敌父子金刀令箭之忠烈祠，狄青巡边常来凭吊参研战阵。', actLabel: '参悟杨家军阵枪意（策论+3 / 骑术+3）', effect: { skill: ['策论', 3], riding: 3 } }
        ],
        bases: [
          { key: 'yamen', x: 785, y: 455 },
          { key: 'tavern', x: 985, y: 560 },
          { key: 'dojo', x: 565, y: 655 },
          { key: 'academy', x: 495, y: 335 },
          { key: 'inn', x: 895, y: 745 }
        ]
      },
      changan: {
        theme: 'ancient_capital',
        sceneSubtitle: '汉唐故都宏阔坊市、南望秦岭终南云海、西市丝路驼铃',
        gateLabel: '长安明德门（返天下舆图）', gatePos: [800, 910],
        specials: [
          { id: 'ca_dayanta', name: '慈恩寺大雁塔', kind: 'pagoda', x: 1090, y: 300, tag: '七级浮屠', desc: '玄奘译经祖庭，雁塔题名碑刻冠绝古今，登顶可揽秦川万里。', actLabel: '登塔摹碑参经（书+3 / 经义+3）', effect: { skill: ['书', 3], skill2: ['经义', 3] } },
          { id: 'ca_caotang', name: '终南草堂（隐逸别业）', kind: 'pavilion', x: 1165, y: 660, tag: '纯阳琴剑', desc: '城南翠竹清溪畔的道门隐庐，关中剑仙常在此抚琴对弈。', actLabel: '清溪抚琴论剑（琴+3 / 棋+3 / 内力+20）', effect: { skill: ['琴', 3], skill2: ['棋', 3], mp: 20 } },
          { id: 'ca_xishi', name: '西市胡商坊（丝路起点）', kind: 'market', x: 355, y: 375, tag: '西域奇珍', desc: '高昌、波斯与天竺胡商汇聚之所，流通西域解毒奇药与昆仑秘闻。', actLabel: '淘换西域灵药筹算（抗性+2 / 算术+3，耗银3两）', cost: 3, effect: { res: 2, skill: ['算术', 3] } }
        ],
        bases: [
          { key: 'yamen', x: 775, y: 325 },
          { key: 'tavern', x: 645, y: 515 },
          { key: 'academy', x: 895, y: 495 },
          { key: 'dojo', x: 460, y: 665 },
          { key: 'inn', x: 740, y: 725 }
        ]
      },
      yanan: {
        theme: 'loess_frontier',
        sceneSubtitle: '黄土高原延水交汇、嘉岭宝塔孤峙、鄜延边军烽燧连天',
        gateLabel: '延州南关道（返天下舆图）', gatePos: [800, 910],
        specials: [
          { id: 'ya_pagoda', name: '嘉岭山宝塔', kind: 'pagoda', x: 1065, y: 270, tag: '范公赋词', desc: '耸立延水东岸嘉岭山巅，“胸中自有数万甲兵”边塞词魂所系。', actLabel: '登塔感怀赋边塞词（诗词+3 / 策论+3）', effect: { skill: ['诗词', 3], skill2: ['策论', 3] } },
          { id: 'ya_camp', name: '鄜延边军大营', kind: 'camp', x: 415, y: 320, tag: '抗夏铁军', desc: '种家军戍边重营，鹿角拒马森严，日夜演练破夏战刀与劲弩。', actLabel: '随边军巡哨演武（气血+35 / 内力+25）', effect: { hp: 35, mp: 25 } },
          { id: 'ya_blackmkt', name: '塞上番马黑市', kind: 'market', x: 375, y: 635, tag: '良驹毒草', desc: '横山脚下党项牧民与星宿毒客暗中交易战马与毒药之地下黑市。', actLabel: '黑市驯马辨毒（骑术+3 / 抗性+2）', effect: { riding: 3, res: 2 } }
        ],
        bases: [
          { key: 'yamen', x: 750, y: 415 },
          { key: 'tavern', x: 925, y: 560 },
          { key: 'dojo', x: 625, y: 615 },
          { key: 'inn', x: 865, y: 745 },
          { key: 'academy', x: 1145, y: 525 }
        ]
      },
      jinan: {
        theme: 'springs_lake',
        sceneSubtitle: '四面荷花三面柳、趵突清泉石上流、南枕泰岱东望渤海',
        gateLabel: '济南历山门（返天下舆图）', gatePos: [800, 910],
        specials: [
          { id: 'jn_baotu', name: '趵突泉（观澜榭）', kind: 'pavilion', x: 495, y: 545, tag: '天下第一泉', desc: '三窟突起雪涛数尺，泉水冬温夏冽，吐纳泉灵最益内息。', actLabel: '观澜亭汲泉吐纳（内力+30 / 抗性+2）', effect: { mp: 30, res: 2 } },
          { id: 'jn_daminghu', name: '大明湖画舫水榭', kind: 'boat', x: 790, y: 255, tag: '荷柳雅集', desc: '烟波画舫穿行万顷荷塘，富弼与齐鲁名士常泛舟论政抚琴。', actLabel: '画舫抚琴唱和（诗词+3 / 琴+3）', effect: { skill: ['诗词', 3], skill2: ['琴', 3] } },
          { id: 'jn_daimiao', name: '泰山岱庙行祠', kind: 'temple', x: 1165, y: 625, tag: '东岳祖庭', desc: '汉柏唐槐掩映天贶宏殿，藏有秦李斯碑刻与泰山道门剑谱算经。', actLabel: '参研碑刻数理（算术+3 / 书+3）', effect: { skill: ['算术', 3], skill2: ['书', 3] } }
        ],
        bases: [
          { key: 'yamen', x: 755, y: 460 },
          { key: 'tavern', x: 1030, y: 415 },
          { key: 'academy', x: 415, y: 335 },
          { key: 'dojo', x: 565, y: 745 },
          { key: 'inn', x: 925, y: 740 }
        ]
      },
      yangzhou: {
        theme: 'canal_water',
        sceneSubtitle: '南北运河千帆竞渡、二十四桥明月红灯、两淮盐栈林立',
        gateLabel: '扬州通泗门（返天下舆图）', gatePos: [800, 910],
        specials: [
          { id: 'yz_chaoguan', name: '运河钞关（江淮漕帮码头）', kind: 'dock', x: 895, y: 495, tag: '漕运咽喉', desc: '万艘漕船过闸核算之地，江淮漕帮总舵楼船在此列阵巡河。', actLabel: '核算漕账演练水战（算术+3 / 身法+2 / 银+15）', effect: { skill: ['算术', 3], agi: 2, silver: 15 } },
          { id: 'yz_24bridge', name: '二十四桥明月坊', kind: 'boat', x: 425, y: 295, tag: '春风十里', desc: '瘦西湖畔画桥玉栏，欧阳修平山词会流风余韵，箫琴声动淮左。', actLabel: '月夜桥畔品箫赋词（琴+3 / 诗词+3，耗银3两）', cost: 3, effect: { skill: ['琴', 3], skill2: ['诗词', 3] } },
          { id: 'yz_salt', name: '淮南盐帮总堂', kind: 'manor', x: 1185, y: 365, tag: '两淮豪商', desc: '富甲天下的两淮盐商与盐帮护院总堂，高手云集、重金聘侠。', actLabel: '调停盐漕纷争（辩才+3 / 纹银+22两）', effect: { skill: ['辩才', 3], silver: 22 } }
        ],
        bases: [
          { key: 'yamen', x: 645, y: 395 },
          { key: 'tavern', x: 695, y: 635 },
          { key: 'academy', x: 430, y: 565 },
          { key: 'dojo', x: 1145, y: 655 },
          { key: 'inn', x: 975, y: 755 }
        ]
      },
      jiangning: {
        theme: 'river_garden',
        sceneSubtitle: '钟山龙蟠石城虎踞、十里秦淮灯影画舫、栖霞丹枫古刹',
        gateLabel: '江宁聚宝南门（返天下舆图）', gatePos: [800, 910],
        specials: [
          { id: 'jn2_qinhuai', name: '十里秦淮画舫', kind: 'boat', x: 775, y: 560, tag: '六朝烟水', desc: '朱雀桥边、乌衣巷口，江南才子名姝画舫抚琴丹青之风雅圣地。', actLabel: '秦淮夜泛丹青抚琴（画+3 / 琴+3 / 诗词+2）', effect: { skill: ['画', 3], skill2: ['琴', 3] } },
          { id: 'jn2_qixia', name: '栖霞山古刹（千佛岩）', kind: 'temple', x: 1195, y: 265, tag: '丹枫禅林', desc: '钟山东麓漫山红枫掩映南朝石窟千佛，高僧精研三论般若禅功。', actLabel: '千佛岩静参般若（经义+3 / 内力+28）', effect: { skill: ['经义', 3], mp: 28 } },
          { id: 'jn2_shitou', name: '石头城遗址（江南剑庐）', kind: 'fort', x: 315, y: 350, tag: '临江剑意', desc: '大江拍岸的赤石古垒，江南散人剑豪结庐听涛、淬炼名剑。', actLabel: '临江听涛试剑（身法+3 / 内力+25）', effect: { agi: 3, mp: 25 } }
        ],
        bases: [
          { key: 'yamen', x: 660, y: 345 },
          { key: 'academy', x: 965, y: 375 },
          { key: 'tavern', x: 525, y: 655 },
          { key: 'dojo', x: 1105, y: 645 },
          { key: 'inn', x: 895, y: 760 }
        ]
      },
      suzhou: {
        theme: 'water_town',
        sceneSubtitle: '小桥流水粉墙黛瓦、虎丘斜塔剑池幽寒、西南烟波通太湖',
        gateLabel: '苏州盘门水陆关（返天下舆图）', gatePos: [800, 910],
        specials: [
          { id: 'sz_huqiu', name: '虎丘剑池', kind: 'pavilion', x: 420, y: 245, tag: '吴王葬剑', desc: '云岩斜塔下裂崖幽潭，相传阖闾扁诸鱼肠三千宝剑埋藏潭底。', actLabel: '剑池观壁悟剑（书+3 / 身法+3 / 内力+20）', effect: { skill: ['书', 3], agi: 3, mp: 20 } },
          { id: 'sz_hanshan', name: '枫桥寒山寺', kind: 'temple', x: 335, y: 545, tag: '夜半钟声', desc: '姑苏城外古运河畔名刹，钟声清越悠远，范仲淹常访寺中禅师。', actLabel: '听钟论禅咏诗（经义+3 / 诗词+3）', effect: { skill: ['经义', 3], skill2: ['诗词', 3] } },
          { id: 'sz_taihu', name: '太湖烟波渡口', kind: 'dock', x: 1175, y: 700, tag: '通燕子坞', desc: '三万六千顷太湖水路码头，芦苇深处画舫可通姑苏慕容氏水榭。', actLabel: '泛舟太湖踏波习武（身法+3 / 气血+25）', effect: { agi: 3, hp: 25 } }
        ],
        bases: [
          { key: 'yamen', x: 775, y: 365 },
          { key: 'academy', x: 1055, y: 315 },
          { key: 'tavern', x: 830, y: 565 },
          { key: 'dojo', x: 565, y: 710 },
          { key: 'inn', x: 965, y: 505 }
        ]
      },
      hangzhou: {
        theme: 'westlake_port',
        sceneSubtitle: '西子湖光三面云山、钱塘怒潮卷雪、市舶海港通高丽扶桑',
        gateLabel: '杭州凤山南门（返天下舆图）', gatePos: [800, 910],
        specials: [
          { id: 'hz_lingyin', name: '西湖灵隐飞来峰', kind: 'temple', x: 315, y: 365, tag: '东南佛国', desc: '飞来奇峰石刻造像林立，冷泉亭畔高僧名儒常设纹枰清谈。', actLabel: '冷泉亭对弈参禅（棋+3 / 经义+3）', effect: { skill: ['棋', 3], skill2: ['经义', 3] } },
          { id: 'hz_tide', name: '钱塘江观潮台', kind: 'tower', x: 1185, y: 665, tag: '怒潮排空', desc: '钱塘大潮声若奔雷、势如万马，迎潮击掌可激荡全身经脉真气！', actLabel: '迎潮击浪练气（内力+38 / 气血+25）', effect: { mp: 38, hp: 25 } },
          { id: 'hz_port', name: '两浙市舶司海港', kind: 'dock', x: 1215, y: 355, tag: '万国海舶', desc: '停泊日本博多商船、高丽青瓷船及东海桃花岛渡船的繁华海港。', actLabel: '海舶互市筹算（算术+3 / 纹银+20两）', effect: { skill: ['算术', 3], silver: 20 } }
        ],
        bases: [
          { key: 'yamen', x: 785, y: 385 },
          { key: 'tavern', x: 645, y: 515 },
          { key: 'academy', x: 515, y: 265 },
          { key: 'dojo', x: 945, y: 575 },
          { key: 'inn', x: 715, y: 735 }
        ]
      },
      chengdu: {
        theme: 'bamboo_basin',
        sceneSubtitle: '锦江碧水绕天府、翠竹掩映古寺道宫、交子茶肆通滇藏',
        gateLabel: '成都锦官南门（返天下舆图）', gatePos: [800, 910],
        specials: [
          { id: 'cd_dacisi', name: '大慈寺（唐宋壁画阁）', kind: 'temple', x: 1065, y: 310, tag: '丹青冠世', desc: '震旦第一丛林，藏吴道子及唐宋名家壁画千堵，笔意入神。', actLabel: '临摹古壁佛画（画+4 / 书+2）', effect: { skill: ['画', 4], skill2: ['书', 2] } },
          { id: 'cd_qingyang', name: '青羊道宫', kind: 'pavilion', x: 355, y: 415, tag: '川西道祖', desc: '老子乘青羊讲经圣地，与青城山、峨眉山道脉气息相通。', actLabel: '青羊宫周天吐纳（内力+30 / 经义+2）', effect: { mp: 30, skill: ['经义', 2] } },
          { id: 'cd_teahouse', name: '锦江万里桥茶肆', kind: 'tower', x: 765, y: 625, tag: '川藏茶马', desc: '蜀中袍哥、唐门毒客与吐蕃大理马帮品茗议事之热闹水岸茶楼。', actLabel: '品盖碗茶探巴蜀秘闻（辩才+3 / 抗性+2）', effect: { skill: ['辩才', 3], res: 2 } }
        ],
        bases: [
          { key: 'yamen', x: 735, y: 355 },
          { key: 'academy', x: 545, y: 270 },
          { key: 'tavern', x: 995, y: 560 },
          { key: 'dojo', x: 465, y: 695 },
          { key: 'inn', x: 1065, y: 745 }
        ]
      },
      xiangyang: {
        theme: 'fortress_river',
        sceneSubtitle: '汉水铁打孤城横锁南北、城西隆中翠竹幽深、千帆竞渡',
        gateLabel: '襄阳南门岘山道（返天下舆图）', gatePos: [800, 910],
        specials: [
          { id: 'xy_wall', name: '襄阳铁打雄城楼', kind: 'fort', x: 790, y: 240, tag: '七省锁钥', desc: '临汉水而筑的巍峨瓮城谯楼，历代兵家必争之南北第一巨防。', actLabel: '登谯楼推演守城兵略（策论+3 / 气血+25）', effect: { skill: ['策论', 3], hp: 25 } },
          { id: 'xy_longzhong', name: '古隆中草庐（八阵石迹）', kind: 'pavilion', x: 325, y: 540, tag: '武侯遗韵', desc: '卧龙先生躬耕隐庐，松竹清幽，遗存八阵兵棋推演石盘。', actLabel: '推演八阵兵棋（棋+3 / 算术+3）', effect: { skill: ['棋', 3], skill2: ['算术', 3] } },
          { id: 'xy_dock', name: '汉水大码头', kind: 'dock', x: 1175, y: 455, tag: '荆襄水道', desc: '武当道人与洞庭铁掌帮船队水陆交会大埠，豪侠云集。', actLabel: '江船踏浪拆招（身法+3 / 内力+25）', effect: { agi: 3, mp: 25 } }
        ],
        bases: [
          { key: 'yamen', x: 745, y: 465 },
          { key: 'tavern', x: 945, y: 580 },
          { key: 'dojo', x: 565, y: 685 },
          { key: 'academy', x: 525, y: 350 },
          { key: 'inn', x: 965, y: 755 }
        ]
      },
      quanzhou: {
        theme: 'maritime_port',
        sceneSubtitle: '闽山苍翠刺桐红砖、双石塔镇海、隔海东望台湾流求宝岛',
        gateLabel: '刺桐涂门关（返天下舆图）', gatePos: [800, 910],
        specials: [
          { id: 'qz_kaiyuan', name: '泉州开元寺东西双塔', kind: 'pagoda', x: 430, y: 295, tag: '镇国石塔', desc: '紫云大殿与东西双石塔巍然镇海，与莆田南少林禅武一脉相承。', actLabel: '双塔下参修禅门硬功（经义+3 / 气血+30）', effect: { skill: ['经义', 3], hp: 30 } },
          { id: 'qz_tea', name: '武夷斗茶雅市', kind: 'pavilion', x: 765, y: 330, tag: '蔡公茶录', desc: '知州蔡襄倡导之闽茶品鉴雅集，北苑龙团茶香伴书法墨韵。', actLabel: '斗茶临帖调息（书+3 / 诗词+2 / 内力+20）', effect: { skill: ['书', 3], mp: 20 } },
          { id: 'qz_port', name: '刺桐港万国番坊（望流求海道）', kind: 'dock', x: 1185, y: 590, tag: '东望台湾', desc: '万国海商云集，海船东渡流求（台湾岛）采灵药、南通交趾大食。', actLabel: '番坊辨识南海奇药（抗性+3 / 算术+2 / 银+15）', effect: { res: 3, silver: 15 } }
        ],
        bases: [
          { key: 'yamen', x: 660, y: 525 },
          { key: 'tavern', x: 925, y: 495 },
          { key: 'dojo', x: 455, y: 635 },
          { key: 'academy', x: 895, y: 725 },
          { key: 'inn', x: 645, y: 745 }
        ]
      },

      // ---------------- 四夷列国 6 城 ----------------
      xijin_liao: {
        theme: 'liao_capital',
        sceneSubtitle: '燕山古幽州汉唐坊市与契丹毡帐军营交错、城外榷马尘飞',
        gateLabel: '幽州安远南门（返天下舆图）', gatePos: [800, 910],
        specials: [
          { id: 'xj_minzhong', name: '幽州悯忠寺', kind: 'temple', x: 410, y: 345, tag: '燕云遗民', desc: '唐建古刹高阁，幽州汉人义士常借礼佛暗聚，秘藏燕京城防图。', actLabel: '密会燕云遗老（策论+3 / 经义+2）', effect: { skill: ['策论', 3], skill2: ['经义', 2] } },
          { id: 'xj_marshal', name: '辽南京兵马元帅府', kind: 'palace', x: 815, y: 235, tag: '南院兵枢', desc: '萧氏南院大王帅帐重地，契丹铁骑与辽国南院武林高手森严护卫。', actLabel: '潜探帅府军情拆招（身法+3 / 内力+30）', effect: { agi: 3, mp: 30 } },
          { id: 'xj_horse', name: '燕京榷马大市', kind: 'camp', x: 1185, y: 465, tag: '塞北良驹', desc: '草原骏马南下第一大集，契丹牧骑在此比试套马与骑射绝技。', actLabel: '草原赛马驯驹（骑术+4 / 气血+20）', effect: { riding: 4, hp: 20 } }
        ],
        bases: [
          { key: 'yamen', x: 685, y: 465 },
          { key: 'tavern', x: 965, y: 565 },
          { key: 'dojo', x: 485, y: 665 },
          { key: 'academy', x: 1085, y: 275 },
          { key: 'inn', x: 825, y: 735 }
        ]
      },
      dading_liao: {
        theme: 'liao_steppe_city',
        sceneSubtitle: '老哈河汉城长街、八角十三层大明巨塔凌云、北郊松漠围场',
        gateLabel: '大定府朱夏门（返天下舆图）', gatePos: [800, 910],
        specials: [
          { id: 'dd_pagoda', name: '大定府大明宝塔', kind: 'pagoda', x: 785, y: 245, tag: '塞北巨塔', desc: '八角密檐巨塔高耸入云，八面浮雕密宗护法天王，气势雄浑。', actLabel: '登塔参悟天王护体劲（内力+30 / 抗性+2）', effect: { mp: 30, res: 2 } },
          { id: 'dd_envoy', name: '宋辽国信大同驿', kind: 'manor', x: 435, y: 465, tag: '四国使馆', desc: '接待北宋国信使、高丽使团与女真贡使之礼宾馆驿，舌战风云。', actLabel: '与各国使臣纵横论辩（辩才+4 / 诗词+2）', effect: { skill: ['辩才', 4], skill2: ['诗词', 2] } },
          { id: 'dd_hunt', name: '松漠皇家围场', kind: 'camp', x: 1175, y: 315, tag: '射雕搏虎', desc: '城北千里松林猎苑，女真猎手与契丹武士放海东青、弯弓射虎。', actLabel: '塞外围猎驰射（骑术+4 / 身法+2 / 气血+25）', effect: { riding: 4, agi: 2, hp: 25 } }
        ],
        bases: [
          { key: 'yamen', x: 745, y: 485 },
          { key: 'tavern', x: 995, y: 555 },
          { key: 'dojo', x: 545, y: 695 },
          { key: 'academy', x: 465, y: 270 },
          { key: 'inn', x: 895, y: 745 }
        ]
      },
      linhuang_liao: {
        theme: 'golden_tent_steppe',
        sceneSubtitle: '西拉木伦潢水草原、大辽金帐斡耳朵连绵、木叶圣山铁骑如云',
        gateLabel: '临潢南捺钵山口（返天下舆图）', gatePos: [800, 910],
        specials: [
          { id: 'lh_goldtent', name: '大辽皇都金帐大内（捺钵御营）', kind: 'palace', x: 800, y: 235, tag: '契丹龙庭', desc: '辽兴宗耶律宗真四时捺钵核心金帐，北院第一护国国师坐镇帐前。', actLabel: '金帐王庭论武博弈（棋+3 / 内力+35）', effect: { skill: ['棋', 3], mp: 35 } },
          { id: 'lh_altar', name: '潢水木叶山祭天坛', kind: 'pagoda', x: 355, y: 315, tag: '长生圣坛', desc: '契丹始祖圣山祭坛，朔风暴雪呼啸，萨满秘仪淬炼精神与寒抗。', actLabel: '朔风祭坛抗寒试炼（抗性+4 / 气血+25）', effect: { res: 4, hp: 25 } },
          { id: 'lh_ironcav', name: '北院铁林军大营', kind: 'camp', x: 1195, y: 420, tag: '天下铁骑', desc: '人马俱披重甲的契丹王牌铁林军大营，狼牙棒与重骑冲锋震天动地。', actLabel: '重骑冲阵锤炼（骑术+4 / 气血+35）', effect: { riding: 4, hp: 35 } }
        ],
        bases: [
          { key: 'yamen', x: 645, y: 465 },
          { key: 'tavern', x: 955, y: 560 },
          { key: 'dojo', x: 480, y: 650 },
          { key: 'academy', x: 1065, y: 250 },
          { key: 'inn', x: 835, y: 740 }
        ]
      },
      xingqing_xixia: {
        theme: 'desert_kingdom',
        sceneSubtitle: '西倚巍峨贺兰山阙、东引黄河灌渠、党项白塔与大漠孤烟辉映',
        gateLabel: '兴庆府光化门（返天下舆图）', gatePos: [800, 910],
        specials: [
          { id: 'xq_yipin', name: '西夏一品堂总堂', kind: 'palace', x: 810, y: 245, tag: '恶人云集', desc: '西夏网罗番僧恶客与西域奇士的最高武学总坛，藏有诸多中原秘籍。', actLabel: '闯一品堂校技夺谱（内力+35 / 气血+30）', effect: { mp: 35, hp: 30 } },
          { id: 'xq_icecellar', name: '西夏皇宫寒玉冰窖', kind: 'cave', x: 1135, y: 280, tag: '逍遥旧迹', desc: '皇宫深处神秘地下玄冰石室，曾留逍遥派天山支脉白虹掌力真迹！', actLabel: '潜入冰窖悟掌练抗（抗性+4 / 身法+3 / 内力+25）', effect: { res: 4, agi: 3, mp: 25 } },
          { id: 'xq_tombs', name: '贺兰山皇家王陵', kind: 'pagoda', x: 315, y: 315, tag: '塞上秘陵', desc: '贺兰山麓雄浑夯土王陵群，石碑刻满党项番文与西域星象阵图。', actLabel: '破译王陵星图碑文（算术+3 / 画+3）', effect: { skill: ['算术', 3], skill2: ['画', 3] } },
          { id: 'xq_tieyaozi', name: '铁鹞子重骑大营', kind: 'camp', x: 1175, y: 605, tag: '西夏战马', desc: '党项皇家重装骑兵大营，专育奔行塞漠如履平地的西夏良驹。', actLabel: '演练铁鹞骑术（骑术+4 / 气血+25）', effect: { riding: 4, hp: 25 } }
        ],
        bases: [
          { key: 'yamen', x: 645, y: 455 },
          { key: 'tavern', x: 895, y: 545 },
          { key: 'dojo', x: 465, y: 635 },
          { key: 'academy', x: 565, y: 285 },
          { key: 'inn', x: 755, y: 745 }
        ]
      },
      luoxie_tubo: {
        theme: 'snow_plateau',
        sceneSubtitle: '世界屋脊连绵雪峰、红山布达拉古宫矗立苍穹、大昭金顶梵音',
        gateLabel: '逻些河谷唐蕃古道口（返天下舆图）', gatePos: [800, 910],
        specials: [
          { id: 'lx_potala', name: '红山布达拉古宫', kind: 'palace', x: 790, y: 215, tag: '雪域圣宫', desc: '高踞玛布日红山之巅的吐蕃赞普古堡，高原罡风凛冽，最砺气血根基。', actLabel: '红山绝顶吐纳罡风（气血+40 / 抗性+3）', effect: { hp: 40, res: 3 } },
          { id: 'lx_jokhang', name: '大昭圣寺金顶', kind: 'temple', x: 425, y: 430, tag: '火焰刀脉', desc: '雪域朝圣核心古寺，吐蕃密宗大轮明王脉高僧在此闭关修炼无上火焰刀。', actLabel: '观摩密宗护法神功（内力+38 / 经义+2）', effect: { mp: 38, skill: ['经义', 2] } },
          { id: 'lx_debate', name: '雪域密宗辩经大坛', kind: 'pavilion', x: 1155, y: 445, tag: '击掌辩经', desc: '古柏庭院内百名高僧班智达击掌问难，辩才与佛理缺一不可。', actLabel: '登坛梵汉辩经（经义+3 / 辩才+4）', effect: { skill: ['经义', 3], skill2: ['辩才', 4] } }
        ],
        bases: [
          { key: 'yamen', x: 765, y: 475 },
          { key: 'tavern', x: 965, y: 645 },
          { key: 'dojo', x: 515, y: 685 },
          { key: 'academy', x: 1065, y: 265 },
          { key: 'inn', x: 745, y: 750 }
        ]
      },
      dali_city: {
        theme: 'cangshan_erhai',
        sceneSubtitle: '西倚点苍十九峰积雪、东临洱海万顷明月、崇圣三塔映繁花',
        gateLabel: '阳苴咩龙尾南关（返天下舆图）', gatePos: [800, 910],
        specials: [
          { id: 'dl_tianlong', name: '点苍崇圣寺三塔（天龙寺）', kind: 'pagoda', x: 355, y: 280, tag: '六脉圣地', desc: '大理段氏皇家寺院，牟尼堂高僧参修《枯荣禅功》《一阳指》与《六脉神剑》！', actLabel: '牟尼堂听禅参悟指劲（内力+40 / 经义+3）', effect: { mp: 40, skill: ['经义', 3] } },
          { id: 'dl_palace', name: '大理国皇宫·镇南王府', kind: 'palace', x: 755, y: 375, tag: '段氏皇族', desc: '大理段氏礼贤下士之王府，庭植极品茶花，常邀高士纹枰论武。', actLabel: '王府品茶纹枰讨教（棋+3 / 诗词+2 / 身法+2）', effect: { skill: ['棋', 3], agi: 2 } },
          { id: 'dl_chama', name: '洱海茶马古道总集', kind: 'market', x: 1095, y: 630, tag: '滇藏花市', desc: '洱海西岸商帮集市，汇集普洱贡茶、滇马与南疆百草解蛊灵药。', actLabel: '采买百草解蛊灵药（抗性+3 / 骑术+2，耗银2两）', cost: 2, effect: { res: 3, riding: 2 } }
        ],
        bases: [
          { key: 'yamen', x: 645, y: 555 },
          { key: 'tavern', x: 925, y: 465 },
          { key: 'dojo', x: 435, y: 645 },
          { key: 'academy', x: 865, y: 235 },
          { key: 'inn', x: 765, y: 750 }
        ]
      },

      // ---------------- 17 处名山宗门与战略雄关 ----------------
      kunlun: {
        theme: 'kunlun_glacier',
        sceneSubtitle: '万山之祖千仞雪巅、翡翠瑶池寒玉冰川、西谷星宿紫雾毒泉',
        gateLabel: '昆仑东麓玉门古道口（返天下舆图）', gatePos: [800, 915],
        specials: [
          { id: 'kl_yaochi', name: '昆仑瑶池万年冰窟', kind: 'cave', x: 785, y: 335, tag: '千年寒玉', desc: '西王母瑶池冰湖深处的玄冰晶窟，奇寒刺骨，可淬炼绝顶抗性与北冥寒劲。', actLabel: '寒玉冰床周天苦修（抗性+5 / 内力+40）', effect: { res: 5, mp: 40 } },
          { id: 'kl_swordvalley', name: '三圣剑仙幽谷', kind: 'pavilion', x: 1155, y: 295, tag: '上古剑刻', desc: '云海绝壁隐匿前代剑仙遗留琴剑棋盘石刻，唯高悟性通琴棋者可解。', actLabel: '参悟绝壁琴棋古剑意（琴+3 / 棋+3 / 身法+3）', effect: { skill: ['琴', 3], skill2: ['棋', 3], agi: 3 } },
          { id: 'kl_poison', name: '星宿海毒泉外脉', kind: 'forge', x: 355, y: 585, tag: '冰蚕奇毒', desc: '昆仑南麓紫雾蒸腾的毒泉沼泽，青年丁春秋在此培育雪山冰蚕与化功奇毒。', actLabel: '涉毒泉试炼百毒不侵（抗性+4 / 气血+25）', effect: { res: 4, hp: 25 } },
          { id: 'kl_summit', name: '万神封禅雪台', kind: 'pagoda', x: 475, y: 215, tag: '万山绝顶', desc: '俯瞰西域瀚海与华夏九州的昆仑最高峰，天地罡气灌顶洗髓。', actLabel: '绝顶啸天贯通天地桥（气血+45 / 内力+35）', effect: { hp: 45, mp: 35 } }
        ],
        bases: []
      },
      shaolin: {
        theme: 'zen_mountain',
        sceneSubtitle: '少室山叠翠千峰、红墙古柏掩映巍峨禅院、晨钟暮鼓震群山',
        gateLabel: '少林寺山门牌坊（返天下舆图）', gatePos: [800, 915],
        specials: [
          { id: 'sl_cangjing', name: '少林藏经阁', kind: 'tower', x: 800, y: 220, tag: '七十二绝技', desc: '收藏《易筋经》与七十二绝技之武学圣阁，无名灰衣老僧在此默然扫叶。', actLabel: '藏经阁研读禅武典籍（经义+4 / 内力+35）', effect: { skill: ['经义', 4], mp: 35 } },
          { id: 'sl_damo', name: '达摩面壁石洞', kind: 'cave', x: 365, y: 245, tag: '九年面壁', desc: '五乳峰巅天然石洞，达摩祖师面壁影石犹存，最宜勘破武学障。', actLabel: '面壁洞静坐参禅（内力+40 / 抗性+3）', effect: { mp: 40, res: 3 } },
          { id: 'sl_luohan', name: '十八铜人罗汉堂', kind: 'camp', x: 1175, y: 495, tag: '闯阵试炼', desc: '玄苦大师执掌之护寺武僧演阵大殿，棍阵掌风密不透风。', actLabel: '勇闯罗汉大阵（气血+40 / 身法+3）', effect: { hp: 40, agi: 3 } },
          { id: 'sl_daxiong', name: '大雄宝殿方丈院', kind: 'temple', x: 785, y: 525, tag: '泰山北斗', desc: '灵门方丈与玄慈首座议决中原抗辽大事之庄严主殿。', actLabel: '拜谒方丈共商抗辽（策论+3 / 辩才+3）', effect: { skill: ['策论', 3], skill2: ['辩才', 3] } }
        ],
        bases: []
      },
      yanmenguan: {
        theme: 'cliff_pass',
        sceneSubtitle: '勾注山千仞绝壁夹峙如门、长城烽燧蜿蜒、关外朔风黄沙漫天',
        gateLabel: '雁门南口代州道（返天下舆图）', gatePos: [800, 915],
        specials: [
          { id: 'ym_cliff', name: '雁门关外乱石绝壁', kind: 'cave', x: 375, y: 275, tag: '胡汉恩仇', desc: '深不见底的云雾绝壁与乱石伏击谷，石壁残留惊心动魄的掌印与剑痕。', actLabel: '绝壁辨认武学遗痕（书+3 / 身法+3 / 内力+25）', effect: { skill: ['书', 3], agi: 3, mp: 25 } },
          { id: 'ym_limu', name: '镇边李牧武安君祠', kind: 'temple', x: 1145, y: 345, tag: '千古名将', desc: '祭祀战国大破匈奴十万骑之李牧古祠，边关将士出征必来酹酒。', actLabel: '祭拜武安君推演边策（策论+4 / 气血+25）', effect: { skill: ['策论', 4], hp: 25 } },
          { id: 'ym_tower', name: '雁门雄关城楼', kind: 'fort', x: 795, y: 505, tag: '天下九塞首', desc: '横截勾注山脊的铁瓮城楼，北望辽境析津府，烽火台日夜瞭望。', actLabel: '协助守军巡关御敌（气血+35 / 纹银+18两）', effect: { hp: 35, silver: 18 } }
        ],
        bases: []
      },
      wutaishan: {
        theme: 'zen_mountain',
        sceneSubtitle: '五峰如台高耸云表、盛夏犹存清凉瑞雪、梵宇金瓦护佑河东',
        gateLabel: '五台山南山口（返天下舆图）', gatePos: [800, 915],
        specials: [
          { id: 'wt_main', name: '清凉寺大雄主殿', kind: 'temple', x: 790, y: 285, tag: '文殊道场', desc: '神山上人驻锡主殿，钟声雄浑，专修不动明王护体与降魔杵法。', actLabel: '听讲文殊般若护体功（经义+3 / 内力+35）', effect: { skill: ['经义', 3], mp: 35 } },
          { id: 'wt_staff', name: '杨五郎演棍石台', kind: 'camp', x: 395, y: 485, tag: '五郎八卦棍', desc: '天波杨五郎挂搭五台山时以铁棍击石演武之苍岩平台。', actLabel: '石台苦练伏魔棍杖（气血+38 / 身法+2）', effect: { hp: 38, agi: 2 } },
          { id: 'wt_orphan', name: '边关遗孤慈济院', kind: 'manor', x: 1145, y: 545, tag: '菩萨心肠', desc: '寺僧收养宋辽边境战乱孤儿之善院，兼授医理药石。', actLabel: '捐银抚孤习医（抗性+3 / 辩才+2，耗银3两）', cost: 3, effect: { res: 3, skill: ['辩才', 2] } }
        ],
        bases: []
      },
      taihang: {
        theme: 'cliff_pass',
        sceneSubtitle: '八百里太行奇峰断涧、飞瀑铁索之上木石山寨高悬替天行道大旗',
        gateLabel: '太行山寨下山暗道（返天下舆图）', gatePos: [800, 915],
        specials: [
          { id: 'th_hall', name: '聚义忠义大堂', kind: 'fort', x: 800, y: 295, tag: '替天行道', desc: '虎皮交椅分列两侧，河北山东十八寨绿林豪杰在此大碗喝酒、共抗酷吏。', actLabel: '聚义厅慷慨陈词（辩才+4 / 气血+30）', effect: { skill: ['辩才', 4], hp: 30 } },
          { id: 'th_bridge', name: '飞狐断魂索桥', kind: 'dock', x: 375, y: 515, tag: '千丈深涧', desc: '两峰绝壁间仅靠三条寒铁链悬空相连，山风呼啸，极练胆魄身法。', actLabel: '寒铁索桥飞渡练功（身法+4 / 内力+20）', effect: { agi: 4, mp: 20 } },
          { id: 'th_vault', name: '太行藏金义仓', kind: 'cave', x: 1175, y: 535, tag: '劫富济贫', desc: '存放绿林好汉截获贪官污吏不义官银与粮草的山腹秘库。', actLabel: '清点义仓筹算分饷（算术+3 / 纹银+20两）', effect: { skill: ['算术', 3], silver: 20 } }
        ],
        bases: []
      },
      tongguan: {
        theme: 'cliff_pass',
        sceneSubtitle: '黄河咆哮东折撞击潼关雄城、南侧西岳华山五峰如削苍龙悬空',
        gateLabel: '华山脚下玉泉院口（返天下舆图）', gatePos: [800, 915],
        specials: [
          { id: 'tg_summit', name: '华山绝顶论剑台', kind: 'pagoda', x: 805, y: 195, tag: '天下第一', desc: '落雁、朝阳绝顶云海之上，群雄争夺“天下第一”名号之最高武道圣坛！', actLabel: '绝顶迎风演剑（内力+40 / 身法+3）', effect: { mp: 40, agi: 3 } },
          { id: 'tg_zixia', name: '玉女峰紫霞道观', kind: 'pavilion', x: 430, y: 385, tag: '华山剑宗', desc: '华山派掌门驻地，晨曦紫气东来时全派弟子吐纳《紫霞神功》。', actLabel: '朝阳吐纳紫霞真气（内力+35 / 经义+2）', effect: { mp: 35, skill: ['经义', 2] } },
          { id: 'tg_siguoya', name: '思过崖古山洞', kind: 'cave', x: 1165, y: 355, tag: '秘洞石刻', desc: '华山绝壁隐秘山洞，石壁刻有奇拔险峻的古剑招与破招图谱。', actLabel: '石洞拆解古剑招（画+3 / 身法+3）', effect: { skill: ['画', 3], agi: 3 } },
          { id: 'tg_fort', name: '潼关天险瓮城', kind: 'fort', x: 765, y: 665, tag: '秦晋咽喉', desc: '北临黄河惊涛、南依华岳峭壁的天下雄关，铁骑难越。', actLabel: '登潼关察山河形势（策论+3 / 气血+25）', effect: { skill: ['策论', 3], hp: 25 } }
        ],
        bases: []
      },
      zhongnanshan: {
        theme: 'misty_valley',
        sceneSubtitle: '秦岭太乙幽谷云海清溪、苍松古柏掩映道观与活死人墓石门',
        gateLabel: '终南山翠微山口（返天下舆图）', gatePos: [800, 915],
        specials: [
          { id: 'zn_tomb', name: '活死人墓幽谷石室', kind: 'cave', x: 415, y: 310, tag: '寒玉秘室', desc: '断龙石后的清冷地下石宫，藏有昆仑寒玉床与捕雀轻功秘法。', actLabel: '卧寒玉床调息练轻功（内力+38 / 抗性+3 / 身法+2）', effect: { mp: 38, res: 3, agi: 2 } },
          { id: 'zn_tao', name: '重阳古观前脉道院', kind: 'temple', x: 845, y: 265, tag: '道门清修', desc: '终南山道家清修仙观，松风鹤影，参研天罡北斗步法与玄门经义。', actLabel: '道院参研玄门北斗阵（经义+3 / 算术+3）', effect: { skill: ['经义', 3], skill2: ['算术', 3] } },
          { id: 'zn_stream', name: '终南后山寒玉涧', kind: 'pavilion', x: 1125, y: 555, tag: '琴剑幽涧', desc: '繁花幽涧清泉泠泠，终南白衣剑仙于此抚琴吟诗、双剑合璧。', actLabel: '幽涧抚琴咏词（琴+4 / 诗词+3）', effect: { skill: ['琴', 4], skill2: ['诗词', 3] } }
        ],
        bases: []
      },
      taishan: {
        theme: 'zen_mountain',
        sceneSubtitle: '十八盘千级云梯直通南天门、东海日出金光万丈、五岳独尊',
        gateLabel: '泰山红门山口（返天下舆图）', gatePos: [800, 915],
        specials: [
          { id: 'ts_yuhuang', name: '玉皇顶古封禅台', kind: 'pagoda', x: 800, y: 205, tag: '五岳独尊', desc: '秦皇汉武真宗封禅祭天圣坛，东望沧海日出，浩然正气充塞天地。', actLabel: '观沧海日出壮气魄（气血+35 / 策论+3）', effect: { hp: 35, skill: ['策论', 3] } },
          { id: 'ts_daoyuan', name: '泰山派东岳道院', kind: 'temple', x: 425, y: 390, tag: '岱宗如何', desc: '泰山派宿老演剑道场，以左手屈指筹算丈量敌我方位之奇剑闻名。', actLabel: '推演算术剑诀（算术+4 / 内力+28）', effect: { skill: ['算术', 4], mp: 28 } },
          { id: 'ts_18pan', name: '十八盘云梯石阶', kind: 'camp', x: 785, y: 585, tag: '千级石阶', desc: '仰视如天门垂练的陡峭石阶，泰山弟子每日负铁登阶锤炼根基。', actLabel: '负重飞登十八盘（身法+3 / 气血+30）', effect: { agi: 3, hp: 30 } },
          { id: 'ts_pine', name: '五大夫松观云亭', kind: 'pavilion', x: 1165, y: 445, tag: '松涛抚琴', desc: '古松虬枝悬崖孤亭，齐鲁高士常聚此抚琴写松。', actLabel: '观云写松抚琴（画+3 / 琴+3）', effect: { skill: ['画', 3], skill2: ['琴', 3] } }
        ],
        bases: []
      },
      yanziwu: {
        theme: 'water_town',
        sceneSubtitle: '烟波太湖万顷荷叶芦洲、江南水榭画桥相连、暗藏百家武库',
        gateLabel: '燕子坞芦苇水津渡（返天下舆图）', gatePos: [800, 915],
        specials: [
          { id: 'yzw_huanshi', name: '还施水阁（百家武学库）', kind: 'tower', x: 805, y: 245, tag: '百家典籍', desc: '四面环水之精雅藏书楼，姑苏慕容氏搜罗天下各门各派武功秘籍尽在于此！', actLabel: '水阁博览群书拆招（书+3 / 内力+38 / 身法+2）', effect: { skill: ['书', 3], mp: 38, agi: 2 } },
          { id: 'yzw_canhe', name: '参合庄议事正厅', kind: 'palace', x: 435, y: 485, tag: '斗转星移', desc: '慕容世家主厅，青年慕容博在此接待四方名宿，暗筹大燕霸业。', actLabel: '与慕容氏切磋借力打力（内力+30 / 辩才+3）', effect: { mp: 30, skill: ['辩才', 3] } },
          { id: 'yzw_tingxiang', name: '听香水榭与曼陀花坞', kind: 'garden', x: 1165, y: 495, tag: '茶花琴韵', desc: '遍植江南名种茶花的临水精舍，琴棋书画雅器俱全。', actLabel: '水榭品茗抚琴作画（琴+3 / 画+3 / 诗词+2）', effect: { skill: ['琴', 3], skill2: ['画', 3] } }
        ],
        bases: []
      },
      taohuadao: {
        theme: 'peach_island',
        sceneSubtitle: '东海碧波惊涛环抱奇礁仙岛、漫山绯红桃林暗合九宫八卦',
        gateLabel: '桃花岛白沙海滩渡船（返天下舆图）', gatePos: [800, 915],
        specials: [
          { id: 'thd_maze', name: '奇门八卦桃林大阵', kind: 'garden', x: 795, y: 355, tag: '五行奇门', desc: '依伏羲八卦与奇门遁甲栽种的千树桃林，生克变幻无穷，不通算术必困其中。', actLabel: '推演洛书破桃林大阵（算术+5 / 身法+3）', effect: { skill: ['算术', 5], agi: 3 } },
          { id: 'thd_tanzhi', name: '弹指试剑海亭', kind: 'pavilion', x: 1205, y: 465, tag: '惊涛试指', desc: '伸入东海怒涛之礁石孤亭，迎狂风巨浪屈指弹石，声若霹雳。', actLabel: '迎东海惊涛练指劲（内力+40 / 身法+2）', effect: { mp: 40, agi: 2 } },
          { id: 'thd_qinlu', name: '听涛碧海琴庐', kind: 'tower', x: 415, y: 435, tag: '琴箫合道', desc: '翠竹桃影间的雅致琴庐，藏上古瑶琴玉箫与书画棋谱。', actLabel: '奏碧海潮生修四艺（琴+4 / 棋+3 / 书+2）', effect: { skill: ['琴', 4], skill2: ['棋', 3] } }
        ],
        bases: []
      },
      jianmenguan: {
        theme: 'cliff_pass',
        sceneSubtitle: '大剑山七十二峰如剑攒天、绝壁隘口一夫当关、翠云古柏苍茫',
        gateLabel: '剑门南口入蜀驿道（返天下舆图）', gatePos: [800, 915],
        specials: [
          { id: 'jm_plank', name: '剑阁鸟道悬空栈', kind: 'dock', x: 385, y: 305, tag: '猿猱愁度', desc: '凿绝壁而架的千尺悬空木栈，云海在脚下翻涌，最考轻功胆色。', actLabel: '悬栈飞纵锤炼轻功（身法+4 / 气血+25）', effect: { agi: 4, hp: 25 } },
          { id: 'jm_gate', name: '剑门雄关箭楼', kind: 'fort', x: 800, y: 455, tag: '一夫当关', desc: '扼守大小剑山断崖缺口的巨石关楼，守关独臂剑客隐居楼上。', actLabel: '向守关隐侠讨教快剑（内力+30 / 身法+2）', effect: { mp: 30, agi: 2 } },
          { id: 'jm_pine', name: '翠云廊古柏驿亭', kind: 'pavilion', x: 1165, y: 585, tag: '蜀道诗魂', desc: '三百里古柏参天蔽日，历代迁客剑豪入蜀题诗刻石之古亭。', actLabel: '咏《蜀道难》临碑感怀（诗词+4 / 书+2）', effect: { skill: ['诗词', 4], skill2: ['书', 2] } }
        ],
        bases: []
      },
      qingcheng: {
        theme: 'bamboo_basin',
        sceneSubtitle: '前山青城幽林道观蔽日、后谷唐家堡黑瓦碉楼机关毒涧密布',
        gateLabel: '青城山麓灌口道（返天下舆图）', gatePos: [800, 915],
        specials: [
          { id: 'qc_shangqing', name: '青城山上清宫松风殿', kind: 'temple', x: 410, y: 295, tag: '青城天下幽', desc: '青城派道家主殿，古银杏参天，弟子演练迅疾奇诡的松风快剑。', actLabel: '松风殿切磋快剑（身法+3 / 内力+30）', effect: { agi: 3, mp: 30 } },
          { id: 'qc_tang', name: '唐家堡天机机关阁', kind: 'tower', x: 1145, y: 315, tag: '暴雨梨花', desc: '蜀中唐门核心机括秘楼，布满连弩翻板，精算机簧方能组装绝世暗器。', actLabel: '精研机簧暗器图谱（算术+4 / 身法+3）', effect: { skill: ['算术', 4], agi: 3 } },
          { id: 'qc_poison', name: '唐门万毒试炼涧', kind: 'cave', x: 835, y: 605, tag: '五毒瘴谷', desc: '竹海深处五彩毒瘴弥漫之幽涧，遍生断肠蚀骨奇草。', actLabel: '入涧辨毒淬炼抗性（抗性+4 / 气血+20）', effect: { res: 4, hp: 20 } }
        ],
        bases: []
      },
      emeishan: {
        theme: 'zen_mountain',
        sceneSubtitle: '万丈金顶浮于云海之上、佛光宝相庄严、古寺修竹飞瀑清音',
        gateLabel: '峨眉山报国山口（返天下舆图）', gatePos: [800, 915],
        specials: [
          { id: 'em_jinding', name: '峨眉金顶睹光台', kind: 'pagoda', x: 800, y: 205, tag: '云海佛光', desc: '万仞绝壁之上云海翻腾，七彩佛光映照天地，静坐吐纳事半功倍。', actLabel: '睹光台沐佛光吐纳（内力+40 / 经义+3）', effect: { mp: 40, skill: ['经义', 3] } },
          { id: 'em_wannian', name: '万年古寺禅院', kind: 'temple', x: 435, y: 455, tag: '峨眉剑掌', desc: '峨眉派掌门驻锡主院，佛道兼修，剑法轻灵飘逸如回风拂柳。', actLabel: '讨教回风拂柳剑掌（身法+3 / 气血+30）', effect: { agi: 3, hp: 30 } },
          { id: 'em_pond', name: '洗象池灵猴剑坪', kind: 'pavilion', x: 1155, y: 525, tag: '月夜清音', desc: '皓月澄池映冷杉，山间通灵白猿常跃出与习剑侠客拆解身法。', actLabel: '月夜与灵猿拆招抚琴（身法+3 / 琴+3）', effect: { agi: 3, skill: ['琴', 3] } }
        ],
        bases: []
      },
      wuliangshan: {
        theme: 'misty_valley',
        sceneSubtitle: '澜沧大峡谷白练飞瀑直泻、千丈光滑玉壁映剑影、谷底秘洞藏仙踪',
        gateLabel: '无量山澜沧古栈口（返天下舆图）', gatePos: [800, 915],
        specials: [
          { id: 'wl_langhuan', name: '琅嬛福地神仙玉洞', kind: 'cave', x: 415, y: 605, tag: '逍遥秘传', desc: '无量山谷底藤蔓后的隐秘石室，神仙姐姐玉像前藏《北冥神功》与《凌波微步》线索！', actLabel: '瞻玉像参悟凌波步理（身法+4 / 内力+40 / 棋+2）', effect: { agi: 4, mp: 40, skill: ['棋', 2] } },
          { id: 'wl_yubi', name: '无量玉壁观剑崖', kind: 'pavilion', x: 445, y: 255, tag: '玉壁仙影', desc: '月光借瀑布水雾将舞剑仙影投射于千丈平整白玉峭壁之上。', actLabel: '临摹玉壁剑影舞姿（画+3 / 身法+3）', effect: { skill: ['画', 3], agi: 3 } },
          { id: 'wl_palace', name: '无量剑湖宫', kind: 'palace', x: 1125, y: 395, tag: '东西剑宗', desc: '无量剑派东西二宗五年一度比剑夺宫之大殿，西南群豪汇聚。', actLabel: '剑湖宫登台试剑（气血+30 / 内力+30）', effect: { hp: 30, mp: 30 } }
        ],
        bases: []
      },
      wudangshan: {
        theme: 'zen_mountain',
        sceneSubtitle: '七十二峰朝大顶、天柱峰真武金殿凌虚、松涛云海尽显阴阳至理',
        gateLabel: '武当山玄岳石坊（返天下舆图）', gatePos: [800, 915],
        specials: [
          { id: 'wd_golden', name: '太和绝顶真武金殿', kind: 'paloda_gold', x: 800, y: 205, tag: '万山来朝', desc: '天柱峰巅铜铸鎏金道殿，云鹤真人在此以阴阳动静至理参悟内家太极意。', actLabel: '金殿参悟阴阳圆转劲（内力+42 / 经义+3）', effect: { mp: 42, skill: ['经义', 3] } },
          { id: 'wd_zixiao', name: '紫霄道宫丹房', kind: 'temple', x: 425, y: 465, tag: '道藏丹鼎', desc: '展旗峰下宏伟道宫，丹炉紫烟袅袅，藏万卷道藏与辟毒培元丹方。', actLabel: '服培元丹研读道藏（气血+35 / 抗性+3）', effect: { hp: 35, res: 3 } },
          { id: 'wd_nanyan', name: '南岩绝壁试剑崖', kind: 'cave', x: 1175, y: 485, tag: '梯云纵步', desc: '龙头香悬伸万丈深渊绝壁，真武弟子在此演练左脚踏右脚之《梯云纵》。', actLabel: '绝壁提纵锤炼轻功（身法+4 / 书+2）', effect: { agi: 4, skill: ['书', 2] } }
        ],
        bases: []
      },
      tiezhangfeng: {
        theme: 'fortress_river',
        sceneSubtitle: '八百里洞庭浩渺接天、五指奇峰如巨掌插云、水陆连营旌旗蔽日',
        gateLabel: '洞庭湖铁掌渡口（返天下舆图）', gatePos: [800, 915],
        specials: [
          { id: 'tz_hall', name: '铁掌帮聚义总堂', kind: 'fort', x: 795, y: 345, tag: '刚猛霸掌', desc: '第一指峰黑石巨堂，铁砂火盆通红，帮主以刚猛无俦《铁掌功》震慑两湖。', actLabel: '铁砂赤火淬炼双掌（气血+38 / 抗性+3 / 内力+25）', effect: { hp: 38, res: 3, mp: 25 } },
          { id: 'tz_tomb', name: '五指中峰禁地秘冢', kind: 'cave', x: 805, y: 175, tag: '帮主禁地', desc: '中指峰顶云雾缭绕之历代帮主秘洞，暗藏前代兵书策论与武学遗篇。', actLabel: '夜探中峰秘洞遗书（策论+3 / 画+3 / 身法+2）', effect: { skill: ['策论', 3], skill2: ['画', 3], agi: 2 } },
          { id: 'tz_water', name: '洞庭水陆连环寨', kind: 'dock', x: 1165, y: 655, tag: '铁掌水上漂', desc: '洞庭湖面百艘战船连环成寨，帮中好手踏波如飞演练《水上漂》。', actLabel: '洞庭烟波踏浪疾行（身法+4 / 纹银+15两）', effect: { agi: 4, silver: 15 } }
        ],
        bases: []
      },
      nanshaolin: {
        theme: 'zen_mountain',
        sceneSubtitle: '闽中九莲山苍翠盆地、古刹演武坪铁鼎矗立、东瞰台湾海峡沧波',
        gateLabel: '九莲山南少林山门（返天下舆图）', gatePos: [800, 915],
        specials: [
          { id: 'nsl_main', name: '九莲大雄宝殿', kind: 'temple', x: 800, y: 245, tag: '南宗祖庭', desc: '至善前祖升座说法大殿，南北少林禅武同源而拳脚硬功尤显刚烈。', actLabel: '参修南宗禅理与金刚指（经义+3 / 内力+35）', effect: { skill: ['经义', 3], mp: 35 } },
          { id: 'nsl_tripod', name: '千斤铁鼎炼体坪', kind: 'forge', x: 405, y: 505, tag: '金刚不坏', desc: '青石广场陈列百斤石锁与赤红千斤铜鼎，武僧抱鼎烙臂苦修护体神功。', actLabel: '抱千斤铁鼎淬炼金身（气血+45 / 抗性+4）', effect: { hp: 45, res: 4 } },
          { id: 'nsl_wooden', name: '南少林百杰木人巷', kind: 'camp', x: 1185, y: 515, tag: '机关木人', desc: '三十六尊精铁机簧木人夹道排布，拳脚疾如骤雨，考验实战拆招与身法。', actLabel: '闯木人巷拆招（身法+3 / 内力+30 / 算术+2）', effect: { agi: 3, mp: 30, skill: ['算术', 2] } }
        ],
        bases: []
      }
    };
"""

# Insert REGIONAL_CONFIG right after ROAMING_MASTERS array
ANCHOR_ROAMING = """      { id: 'yipintang_ace', name: '一品堂四大恶首', sect: '兴庆府一品堂', nodeId: 'xingqing_xixia', realm: '地阶上品' }
    ];"""

assert ANCHOR_ROAMING in src, "ANCHOR_ROAMING not found"
src = src.replace(ANCHOR_ROAMING, ANCHOR_ROAMING + "\n" + REGIONAL_JS, 1)

# 5. Update state object to track viewMode, activeRegionNodeId, selectedBuildingId, playerRegionalPos
STATE_OLD = """      traveling: null,
      pan: { x: 0, y: 0, scale: 1, dragging: false, startX: 0, startY: 0 }
    };"""

STATE_NEW = """      traveling: null,
      viewMode: 'world', // 'world' | 'region'
      activeRegionId: 'bianliang',
      selectedBuildingId: null,
      playerRegionPos: null,
      pan: { x: 0, y: 0, scale: 1, dragging: false, startX: 0, startY: 0 }
    };"""

assert STATE_OLD in src, "STATE_OLD not found"
src = src.replace(STATE_OLD, STATE_NEW, 1)

# 6. Update node click behavior & inspector button so clicking current node or clicking "进入地区互动地图" switches the main viewport!
NODE_CLICK_OLD = """        group.addEventListener('click', (ev) => {
          ev.stopPropagation();
          selectNode(n.id);
        });"""

NODE_CLICK_NEW = """        group.addEventListener('click', (ev) => {
          ev.stopPropagation();
          if (state.currentNodeId === n.id && !state.traveling && state.selectedNodeId === n.id) {
            enterRegionMap(n.id);
          } else {
            selectNode(n.id);
          }
        });
        group.addEventListener('dblclick', (ev) => {
          ev.stopPropagation();
          if (state.currentNodeId === n.id && !state.traveling) {
            enterRegionMap(n.id);
          }
        });"""

assert NODE_CLICK_OLD in src, "NODE_CLICK_OLD not found"
src = src.replace(NODE_CLICK_OLD, NODE_CLICK_NEW, 1)

# Update tooltip hint for current node
TIP_CUR_OLD = """distHtml = `<div class="px-2 py-1 rounded bg-[#e5efe9] text-[#1c543e] font-bold">● 少侠当前驻留于此</div>`;"""
TIP_CUR_NEW = """distHtml = `<div class="px-2 py-1 rounded bg-[#e5efe9] text-[#1c543e] font-bold">● 当前驻留于此（再次点击或右侧按钮进入专属互动地图）</div>`;"""
assert TIP_CUR_OLD in src
src = src.replace(TIP_CUR_OLD, TIP_CUR_NEW, 1)

# Update inspector openCityModal calls to enterRegionMap, and make renderInspector adapt to viewMode === 'region'!
INSPECTOR_BTN_OLD = """          <div class="p-2.5 rounded bg-emerald-950/15 border border-emerald-700/30 flex items-center justify-between text-xs">
            <span class="text-emerald-800 dark:text-emerald-300 font-medium">少侠当前正在此地驻留</span>
            <button onclick="openCityModal('${node.id}')" class="px-3 py-1.5 rounded bg-amber-800 hover:bg-amber-700 text-amber-50 font-semibold song-serif transition">
              ${node.type === 'city' ? '入城查访建筑' : '踏入秘境 / 关城'}
            </button>
          </div>"""

INSPECTOR_BTN_NEW = """          <div class="p-2.5 rounded bg-emerald-950/15 border border-emerald-700/30 flex items-center justify-between gap-2 text-xs">
            <span class="text-emerald-800 dark:text-emerald-300 font-medium">少侠正在此地驻留</span>
            <button onclick="enterRegionMap('${node.id}')" class="px-3 py-1.5 rounded bg-[#9c2a22] hover:bg-[#b8342b] text-amber-50 font-bold song-serif shadow transition">
              进入【${node.name}】互动地图 →
            </button>
          </div>"""

assert INSPECTOR_BTN_OLD in src, "INSPECTOR_BTN_OLD not found"
src = src.replace(INSPECTOR_BTN_OLD, INSPECTOR_BTN_NEW, 1)

src = src.replace(
    """<button onclick="openCityModal('${node.id}')" class="px-2 py-0.5 rounded border border-[var(--border)] hover:bg-[var(--card)] text-[11px]">拜会</button>""",
    """<button onclick="enterRegionMap('${node.id}')" class="px-2 py-0.5 rounded bg-amber-900/15 border border-amber-800/30 hover:bg-amber-900/25 text-amber-900 dark:text-amber-300 font-medium text-[11px]">入图拜会</button>""",
)

# Also show special buildings from REGIONAL_CONFIG in the World Map inspector!
LANDMARKS_INSPECTOR_OLD = """      const landmarksHtml = node.landmarks.map(l =>
        `<span class="px-2 py-0.5 rounded bg-[var(--background)] border border-[var(--border)] text-[11px]">${l}</span>`
      ).join('');"""

LANDMARKS_INSPECTOR_NEW = """      const regCfg = REGIONAL_CONFIG[node.id];
      const specialNames = regCfg ? regCfg.specials.map(s => s.name) : node.landmarks;
      const landmarksHtml = specialNames.map(l =>
        `<span class="px-2 py-0.5 rounded bg-amber-950/15 border border-amber-700/40 text-amber-900 dark:text-amber-200 font-medium text-[11px]">★ ${l}</span>`
      ).join('');"""

assert LANDMARKS_INSPECTOR_OLD in src
src = src.replace(LANDMARKS_INSPECTOR_OLD, LANDMARKS_INSPECTOR_NEW, 1)

# Auto-enter regional map upon arriving at destination!
FINISH_JOURNEY_OLD = """      if (reachedTarget) {
        addLog('抵达', `千里风霜，顺利抵达【${destName}】！`, true);
      }
      renderAllMapLayers();
      renderInspector();"""

FINISH_JOURNEY_NEW = """      renderAllMapLayers();
      if (reachedTarget) {
        addLog('抵达入图', `千里风霜，顺利抵达【${destName}】！主视口已展开【${destName}】专属互动地图。`, true);
        enterRegionMap(state.currentNodeId);
      } else {
        renderInspector();
      }"""

assert FINISH_JOURNEY_OLD in src
src = src.replace(FINISH_JOURNEY_OLD, FINISH_JOURNEY_NEW, 1)

# Make renderInspector delegate to renderRegionInspector when state.viewMode === 'region'
RENDER_INSPECTOR_START = """    function renderInspector() {
      const box = document.getElementById('inspector-panel');"""

RENDER_INSPECTOR_HOOK = """    function renderInspector() {
      if (state.viewMode === 'region') {
        renderRegionInspector();
        return;
      }
      const box = document.getElementById('inspector-panel');"""

assert RENDER_INSPECTOR_START in src
src = src.replace(RENDER_INSPECTOR_START, RENDER_INSPECTOR_HOOK, 1)

# 7. Replace Section 9 (the old modal functions) with the full Regional Interactive SVG Map Engine + Building Inspector!
OLD_SEC9_PATTERN = r"    // =========================================================================\n    // 9\. 城市与秘境探索弹窗.*?(?=    // =========================================================================\n    // 10\. 控件联动)"

NEW_SEC9 = r"""    // =========================================================================
    // 9. 地区独特互动地图引擎（38处可进入地点：特色水墨设色背景 + 醒目立体可互动建筑）
    // =========================================================================
    function getCityBaseBuildingsMeta(regime) {
      const isForeign = regime && regime !== 'song';
      return {
        yamen: {
          name: isForeign ? '王庭牙帐 · 番邦官署' : '府州衙门 · 捕盗司',
          kind: 'yamen',
          tag: '官署悬赏',
          desc: isForeign ? '番邦王庭签发通关文牒、悬赏缉捕草原剧盗之官署。' : '州府升堂理事、张贴江湖海捕文书与发放赏银之官衙。',
          actLabel: '揭榜缉盗领赏（纹银+16两 / 策论+1）',
          cost: 0,
          effect: { silver: 16, skill: ['策论', 1] }
        },
        tavern: {
          name: isForeign ? '胡姬酒肆 · 马奶酒坊' : '临街酒楼 · 醉仙楼',
          kind: 'tower',
          tag: '江湖风闻',
          desc: isForeign ? '胡姬琵琶助兴，塞外刀客、番僧与马帮在此豪饮纵谈。' : '酒旗招展、座上豪客云集，打听《江湖风闻录》与磨砺辩才之地。',
          actLabel: '痛饮纵论天下（辩才+3，耗银2两）',
          cost: 2,
          effect: { skill: ['辩才', 3] }
        },
        inn: {
          name: isForeign ? '四方国信馆驿' : '悦来客栈 · 车马店',
          kind: 'manor',
          tag: '投宿调息',
          desc: '备有上房药浴与草料马厩，供远行侠客休整疗伤、淬炼寒暑抗性。',
          actLabel: '药浴静养调息（气血+30 / 抗性+1，耗银3两）',
          cost: 3,
          effect: { hp: 30, res: 1 }
        },
        dojo: {
          name: isForeign ? '王庭射猎演武场' : '演武拳馆 · 讲武堂',
          kind: 'camp',
          tag: '实战锤炼',
          desc: '设梅花桩、石锁箭垛与比武擂台，可锤炼实战气血、内力与身法。',
          actLabel: '桩功吐纳拆招（气血+28 / 内力+22 / 身法+1）',
          cost: 0,
          effect: { hp: 28, mp: 22, agi: 1 }
        },
        academy: {
          name: isForeign ? '皇家译经院 · 国子讲堂' : '州学书院 · 崇文讲堂',
          kind: 'pavilion',
          tag: '经义算学',
          desc: '书声琅琅、典籍浩瀚，可系统研习儒释道经义、兵书策论与九章算术。',
          actLabel: '潜心研读经史算学（经义+2 / 策论+2 / 算术+2）',
          cost: 0,
          effect: { skill: ['经义', 2], skill2: ['策论', 2], skill3: ['算术', 2] }
        }
      };
    }

    function getRegionAllBuildings(nodeId) {
      const node = nodeMap[nodeId];
      const cfg = REGIONAL_CONFIG[nodeId];
      if (!node || !cfg) return [];
      const list = [];
      cfg.specials.forEach((sp, idx) => {
        list.push({
          ...sp,
          isSpecial: true,
          order: idx + 1
        });
      });
      if (node.type === 'city' && cfg.bases) {
        const baseMeta = getCityBaseBuildingsMeta(node.regime);
        cfg.bases.forEach((b, idx) => {
          const m = baseMeta[b.key];
          if (m) {
            list.push({
              id: `${nodeId}_base_${b.key}`,
              name: m.name,
              kind: m.kind,
              tag: m.tag,
              desc: m.desc,
              actLabel: m.actLabel,
              cost: m.cost || 0,
              effect: m.effect,
              x: b.x,
              y: b.y,
              isSpecial: false,
              order: cfg.specials.length + idx + 1
            });
          }
        });
      }
      return list;
    }

    function populateRegionQuickJump() {
      const sel = document.getElementById('region-quick-jump');
      if (!sel) return;
      const citiesSong = NODES.filter(n => n.type === 'city' && n.regime === 'song');
      const citiesForeign = NODES.filter(n => n.type === 'city' && n.regime !== 'song');
      const sectsAndPasses = NODES.filter(n => n.type !== 'city');

      const buildOpts = (arr) => arr.map(n => `<option value="${n.id}">${n.code ? n.code + ' · ' : ''}${n.name}</option>`).join('');
      sel.innerHTML = `
        <optgroup label="北宋十五重镇">${buildOpts(citiesSong)}</optgroup>
        <optgroup label="辽·夏·吐蕃·大理六城">${buildOpts(citiesForeign)}</optgroup>
        <optgroup label="十七名山宗门与雄关">${buildOpts(sectsAndPasses)}</optgroup>
      `;
    }

    function previewOrEnterRegion(nodeId) {
      if (!nodeMap[nodeId]) return;
      if (state.traveling) {
        campStop();
      }
      // 允许玩家在预览巡览器中切换查看任意地区的专属互动地图（若非当前驻地，标注为舆图神游或可直接移驻体验）
      state.currentNodeId = nodeId;
      state.selectedNodeId = nodeId;
      enterRegionMap(nodeId);
      addLog('地区切换', `展卷踏入【${nodeMap[nodeId].name}】专属互动地图。`, true);
    }

    function enterRegionMap(nodeId) {
      if (state.traveling) return;
      const node = nodeMap[nodeId];
      const cfg = REGIONAL_CONFIG[nodeId];
      if (!node || !cfg) return;

      hideTooltip();
      state.viewMode = 'region';
      state.activeRegionId = nodeId;
      state.currentNodeId = nodeId;
      state.selectedNodeId = nodeId;

      const buildings = getRegionAllBuildings(nodeId);
      state.selectedBuildingId = buildings.length > 0 ? buildings[0].id : null;
      state.playerRegionPos = buildings.length > 0
        ? { x: buildings[0].x, y: buildings[0].y + 52 }
        : { x: cfg.gatePos[0], y: cfg.gatePos[1] - 60 };

      // 切换主视口画布与 HUD
      document.getElementById('song-map-svg').classList.add('hidden');
      document.getElementById('world-top-hud').classList.add('hidden');
      document.getElementById('world-bottom-hud').classList.add('hidden');

      document.getElementById('region-map-svg').classList.remove('hidden');
      document.getElementById('region-top-hud').classList.remove('hidden');
      document.getElementById('region-bottom-hud').classList.remove('hidden');

      document.getElementById('region-hud-title').textContent = `${node.code ? node.code + ' · ' : ''}${node.name} — 地区互动内景图`;
      document.getElementById('region-hud-badge').textContent = node.circuit;
      document.getElementById('region-hud-subtitle').textContent = `${cfg.sceneSubtitle}（共 ${cfg.specials.length} 座特殊建筑${node.type === 'city' ? ' + 5 座基础建筑' : ''}）`;

      const sel = document.getElementById('region-quick-jump');
      if (sel) sel.value = nodeId;

      renderRegionSvg(node, cfg, buildings);
      syncTopBar();
      renderRegionInspector();
    }

    function exitToWorldMap() {
      hideTooltip();
      state.viewMode = 'world';
      document.getElementById('region-map-svg').classList.add('hidden');
      document.getElementById('region-top-hud').classList.add('hidden');
      document.getElementById('region-bottom-hud').classList.add('hidden');

      document.getElementById('song-map-svg').classList.remove('hidden');
      document.getElementById('world-top-hud').classList.remove('hidden');
      document.getElementById('world-bottom-hud').classList.remove('hidden');

      renderAllMapLayers();
      renderInspector();
      addLog('出城返图', `自【${nodeMap[state.currentNodeId].name}】步出城门，重展《华夏山海全景舆图》。`);
    }

    // 根据每个地区的独特风貌主题，生成高辨识度宋画水墨设色地域背景
    function buildThemeBackdropSvg(node, cfg) {
      const t = cfg.theme;
      let bg = '';

      if (t === 'imperial_canal') {
        // 东京汴梁：三重方城、穿城汴河、虹桥巨舟、南北御街与宣德皇城红墙
        bg = `
          <rect width="1600" height="1000" fill="#eadec3" />
          <!-- 外城护城河与城郭 -->
          <rect x="75" y="75" width="1450" height="860" rx="14" fill="#efe5ce" stroke="#785c3c" stroke-width="12" />
          <rect x="88" y="88" width="1424" height="834" rx="10" fill="none" stroke="#b59b76" stroke-width="2" stroke-dasharray="10 6" />
          <!-- 皇城大内宫墙（朱红宫墙金瓦） -->
          <rect x="570" y="105" width="460" height="215" rx="6" fill="#dec8a4" stroke="#8f241e" stroke-width="8" />
          <line x1="570" y1="320" x2="1030" y2="320" stroke="#d49b35" stroke-width="3" />
          <!-- 天街御路（南北中轴宽阔石街） -->
          <rect x="766" y="320" width="68" height="600" fill="#d7c6a5" stroke="#9e8462" stroke-width="2" />
          <line x1="800" y1="320" x2="800" y2="920" stroke="#b59a74" stroke-width="1.5" stroke-dasharray="12 8" />
          <!-- 东西坊市十字长街 -->
          <rect x="95" y="425" width="1410" height="38" fill="#dccba9" />
          <!-- 汴河水道穿城而过 + 虹桥 -->
          <path d="M 82,535 Q 460,505 800,565 T 1518,655" fill="none" stroke="#5d8e99" stroke-width="58" stroke-opacity="0.85" />
          <path d="M 82,535 Q 460,505 800,565 T 1518,655" fill="none" stroke="#9ec4cc" stroke-width="26" stroke-opacity="0.45" stroke-dasharray="18 14" />
          <!-- 州桥与汴河虹桥 -->
          <rect x="760" y="528" width="80" height="74" rx="6" fill="#9c6a3e" stroke="#4d3118" stroke-width="3" />
          <path d="M 1035,558 Q 1065,540 1095,606" fill="none" stroke="#8f4326" stroke-width="18" stroke-linecap="round" />
          <!-- 街坊院落肌理 -->
          <g fill="#e2d4b5" stroke="#bca682" stroke-width="1.2" opacity="0.75">
            <rect x="150" y="155" width="160" height="105" rx="3" /><rect x="340" y="155" width="175" height="105" rx="3" />
            <rect x="1090" y="155" width="170" height="105" rx="3" /><rect x="1290" y="155" width="150" height="105" rx="3" />
            <rect x="155" y="645" width="150" height="120" rx="3" /><rect x="1245" y="725" width="185" height="115" rx="3" />
          </g>
          <text x="800" y="498" text-anchor="middle" class="song-serif" fill="#5e452a" fill-opacity="0.55" font-size="18" font-weight="bold" letter-spacing="10">御街 · 州桥夜市</text>
          <text x="385" y="535" text-anchor="middle" class="song-serif" fill="#234952" fill-opacity="0.72" font-size="16" font-weight="bold" letter-spacing="8">汴 河 漕 渠</text>
        `;
      } else if (t === 'river_garden') {
        // 洛阳 / 江宁：北山南水、长桥卧波、名园花木与六朝古刹
        bg = `
          <rect width="1600" height="1000" fill="#ebe2ca" />
          <!-- 远山青绿叠嶂（邙山 / 钟山） -->
          <path d="M 0,210 Q 220,95 450,185 T 920,155 T 1360,190 L 1600,120 L 1600,0 L 0,0 Z" fill="#cad4be" stroke="#7d8f72" stroke-width="2" />
          <path d="M 980,220 L 1160,95 L 1350,225 Z" fill="#b7c6ab" opacity="0.7" />
          <!-- 洛水 / 秦淮大江横贯 -->
          <path d="M 0,605 C 380,555 680,645 1060,590 C 1310,555 1460,585 1600,575" fill="none" stroke="#68959e" stroke-width="64" stroke-opacity="0.82" />
          <!-- 城池坊墙与天津长桥 -->
          <rect x="145" y="175" width="1310" height="725" rx="16" fill="none" stroke="#755a3b" stroke-width="9" stroke-opacity="0.8" />
          <rect x="760" y="562" width="76" height="92" rx="6" fill="#a87c4f" stroke="#4f351b" stroke-width="3" />
          <!-- 牡丹名园 / 丹枫林苑色块 -->
          <ellipse cx="1095" cy="325" rx="155" ry="95" fill="#e6ccd0" fill-opacity="0.55" stroke="#b87d87" stroke-dasharray="6 4" />
          <circle cx="1040" cy="300" r="18" fill="#d98a98" opacity="0.45" /><circle cx="1145" cy="340" r="22" fill="#de95a2" opacity="0.45" />
          <line x1="798" y1="185" x2="798" y2="895" stroke="#c2ae8b" stroke-width="26" opacity="0.65" />
          <line x1="155" y1="435" x2="1445" y2="435" stroke="#c2ae8b" stroke-width="22" opacity="0.65" />
        `;
      } else if (t === 'water_town' || t === 'canal_water') {
        // 苏州 / 扬州 / 太湖燕子坞：江南水网纵横、粉墙黛瓦、荷塘太湖烟波
        bg = `
          <rect width="1600" height="1000" fill="#e4eadb" />
          <!-- 太湖 / 瘦西湖浩渺烟波 -->
          <path d="M 980,560 C 1120,500 1380,520 1600,470 L 1600,1000 L 890,1000 C 920,820 910,630 980,560 Z" fill="#82aeb5" fill-opacity="0.72" />
          <!-- 纵横水巷河网 -->
          <path d="M 0,365 Q 480,345 920,395 T 1600,360" fill="none" stroke="#6a9ca6" stroke-width="36" />
          <path d="M 595,0 Q 625,440 565,1000" fill="none" stroke="#6a9ca6" stroke-width="34" />
          <path d="M 180,685 Q 580,645 1040,705" fill="none" stroke="#6a9ca6" stroke-width="28" />
          <!-- 江南拱桥点缀 -->
          <rect x="572" y="345" width="52" height="46" rx="8" fill="#d9d2c0" stroke="#57534a" stroke-width="2.5" />
          <rect x="815" y="372" width="48" height="46" rx="8" fill="#d9d2c0" stroke="#57534a" stroke-width="2.5" />
          <!-- 荷叶与园林翠竹 -->
          <g fill="#5d8c68" opacity="0.45">
            <circle cx="1140" cy="790" r="22" /><circle cx="1195" cy="820" r="16" /><circle cx="1320" cy="760" r="25" />
            <circle cx="1410" cy="835" r="19" /><circle cx="1075" cy="865" r="18" />
          </g>
        `;
      } else if (t === 'westlake_port' || t === 'maritime_port' || t === 'springs_lake') {
        // 杭州 / 泉州 / 济南：名湖清泉 + 沧海怒潮海港 / 海舶帆影
        const isSpring = t === 'springs_lake';
        bg = `
          <rect width="1600" height="1000" fill="#e8e3cc" />
          <!-- 西侧/北侧苍翠群山或大明荷湖 -->
          <ellipse cx="${isSpring ? 790 : 310}" cy="${isSpring ? 245 : 460}" rx="${isSpring ? 360 : 235}" ry="${isSpring ? 135 : 260}" fill="#7ca8b0" fill-opacity="0.72" stroke="#4f7c85" stroke-width="2" />
          ${!isSpring ? `<path d="M 1080,0 L 1600,0 L 1600,1000 L 1160,1000 C 1090,760 1140,480 1080,0 Z" fill="#68949e" fill-opacity="0.82" />
          <path d="M 1125,120 Q 1165,320 1135,520 T 1175,920" fill="none" stroke="#eef6f7" stroke-width="6" stroke-dasharray="18 12" opacity="0.75" />` : `
          <ellipse cx="495" cy="560" rx="85" ry="55" fill="#70a7b5" fill-opacity="0.75" />`}
          <rect x="210" y="155" width="940" height="735" rx="16" fill="none" stroke="#6e563a" stroke-width="8" stroke-opacity="0.68" />
          <line x1="220" y1="495" x2="1140" y2="495" stroke="#cbb997" stroke-width="24" opacity="0.65" />
          <line x1="755" y1="165" x2="755" y2="885" stroke="#cbb997" stroke-width="24" opacity="0.65" />
        `;
      } else if (t === 'peach_island') {
        // 东海桃花岛：碧海惊涛四面环岛 + 漫山绯红九宫八卦桃林
        bg = `
          <rect width="1600" height="1000" fill="#6a959f" />
          <g stroke="#9ec2c9" stroke-width="1.5" opacity="0.45" fill="none">
            <path d="M 90,140 Q 160,120 230,140 T 370,140" /><path d="M 1260,180 Q 1330,160 1400,180 T 1540,180" />
            <path d="M 110,830 Q 180,810 250,830 T 390,830" /><path d="M 1240,840 Q 1310,820 1380,840 T 1520,840" />
          </g>
          <!-- 仙岛轮廓与金色沙滩 -->
          <path d="M 275,490 C 265,245 510,125 815,135 C 1135,145 1345,275 1335,515 C 1325,755 1105,925 800,930 C 485,935 285,735 275,490 Z"
                fill="#efe4c6" stroke="#dcebed" stroke-width="14" />
          <path d="M 305,490 C 295,275 525,160 815,168 C 1105,175 1305,295 1295,515 C 1285,735 1085,890 800,895 C 515,900 315,705 305,490 Z"
                fill="#e2e8cf" stroke="#8a7452" stroke-width="2" />
          <!-- 八卦桃林阵纹与绯红桃树群 -->
          <polygon points="800,210 980,285 1055,465 980,645 800,720 620,645 545,465 620,285" fill="#f2ced5" fill-opacity="0.48" stroke="#b85d72" stroke-width="2" stroke-dasharray="10 6" />
          <g fill="#e38da0" opacity="0.62">
            <circle cx="670" cy="330" r="24" /><circle cx="925" cy="325" r="26" /><circle cx="635" cy="520" r="25" />
            <circle cx="955" cy="535" r="24" /><circle cx="795" cy="265" r="22" /><circle cx="805" cy="635" r="24" />
            <circle cx="480" cy="340" r="20" /><circle cx="1115" cy="355" r="22" />
          </g>
        `;
      } else if (t === 'liao_capital' || t === 'liao_steppe_city' || t === 'golden_tent_steppe') {
        // 大辽三京：塞北金黄草原、潢水/老哈河、契丹捺钵金帐纹饰与燕山松漠
        const isSteppeTent = t === 'golden_tent_steppe';
        bg = `
          <rect width="1600" height="1000" fill="#e2d5b3" />
          <!-- 阴山/燕山/木叶山苍茫远山 -->
          <path d="M 0,215 L 185,95 L 365,195 L 580,85 L 810,185 L 1060,75 L 1310,190 L 1600,95 L 1600,0 L 0,0 Z" fill="#c7b896" stroke="#786548" stroke-width="2" />
          <!-- 潢水 / 桑干河蜿蜒 -->
          <path d="M 0,635 Q 440,575 860,645 T 1600,595" fill="none" stroke="#6c969e" stroke-width="38" stroke-opacity="0.76" />
          ${!isSteppeTent ? `<rect x="205" y="175" width="1190" height="715" rx="10" fill="none" stroke="#5c436e" stroke-width="9" stroke-opacity="0.78" />` : `
          <circle cx="800" cy="265" r="145" fill="#ebd9aa" stroke="#b58328" stroke-width="3" stroke-dasharray="12 6" />`}
          <!-- 草原毡帐群点缀 -->
          <g fill="#f5efe0" stroke="#7d6445" stroke-width="1.8" opacity="0.8">
            <path d="M 235,445 Q 260,415 285,445 Z" /><path d="M 295,460 Q 320,430 345,460 Z" />
            <path d="M 1285,515 Q 1315,480 1345,515 Z" /><path d="M 1355,535 Q 1380,505 1405,535 Z" />
          </g>
        `;
      } else if (t === 'desert_kingdom' || t === 'loess_frontier' || t === 'border_fort' || t === 'iron_citadel' || t === 'ancient_capital' || t === 'fortress_river') {
        // 西夏兴庆府 / 延安 / 太原 / 长安 / 大名 / 襄阳：雄浑边塞山河、黄土贺兰大漠与铁瓮城垣
        const isDesert = t === 'desert_kingdom';
        bg = `
          <rect width="1600" height="1000" fill="${isDesert ? '#e6d2a8' : '#e8dec4'}" />
          <!-- 贺兰山 / 太行山 / 黄土山峁 -->
          <path d="M 0,260 L 145,105 L 295,235 L 445,95 L 620,225 L 820,125 L 1050,230 L 1320,110 L 1600,220 L 1600,0 L 0,0 Z"
                fill="${isDesert ? '#ceb282' : '#cfc2a3'}" stroke="#7a6242" stroke-width="2" />
          <!-- 黄河 / 汉水 / 延水河道 -->
          <path d="M 1380,0 Q 1320,380 1420,690 T 1350,1000" fill="none" stroke="#6d969e" stroke-width="48" stroke-opacity="0.72" />
          <!-- 雄城巨垣 -->
          <rect x="195" y="175" width="1140" height="720" rx="12" fill="#efe5cc" fill-opacity="0.65" stroke="#694d30" stroke-width="10" />
          <line x1="765" y1="175" x2="765" y2="895" stroke="#cab692" stroke-width="26" />
          <line x1="195" y1="485" x2="1335" y2="485" stroke="#cab692" stroke-width="24" />
        `;
      } else if (t === 'snow_plateau' || t === 'kunlun_glacier' || t === 'cangshan_erhai') {
        // 昆仑山 / 逻些 / 大理阳苴咩城：万仞雪山冰川、瑶池洱海圣湖
        const isDali = t === 'cangshan_erhai';
        bg = `
          <rect width="1600" height="1000" fill="${isDali ? '#e2ead8' : '#e4eaec'}" />
          <!-- 千仞连绵雪峰 -->
          <path d="M 0,310 L 165,85 L 325,265 L 515,65 L 710,255 L 915,75 L 1135,260 L 1365,90 L 1600,275 L 1600,0 L 0,0 Z"
                fill="#f7f9fa" stroke="#758894" stroke-width="2.5" />
          <path d="M 165,85 L 235,175 L 115,185 Z M 515,65 L 595,165 L 445,175 Z M 915,75 L 995,175 L 845,180 Z" fill="#d7e4ea" />
          <!-- 瑶池冰湖 / 洱海明月 / 雅鲁藏布圣河 -->
          ${isDali
            ? `<ellipse cx="1310" cy="540" rx="195" ry="335" fill="#6ea5b0" fill-opacity="0.8" stroke="#487b87" stroke-width="3" />`
            : `<ellipse cx="785" cy="365" rx="185" ry="88" fill="#89c4d1" fill-opacity="0.78" stroke="#4f8b99" stroke-width="3" />
               <path d="M 0,725 Q 520,665 1040,735 T 1600,695" fill="none" stroke="#79aeb8" stroke-width="34" />`
          }
          ${t === 'kunlun_glacier' ? `<ellipse cx="355" cy="605" rx="125" ry="70" fill="#8b5ca8" fill-opacity="0.32" stroke="#6c3d8a" stroke-dasharray="6 4" />` : ''}
        `;
      } else {
        // 名山宗门 / 幽谷竹海 / 绝壁雄关（少林、华山、武当、峨眉、青城、雁门关、剑门关、无量山等）
        const isCliff = t === 'cliff_pass';
        bg = `
          <rect width="1600" height="1000" fill="${isCliff ? '#e4d8be' : '#dfe6d5'}" />
          <!-- 层峦叠嶂与云海石阶 -->
          <path d="M 0,340 L 210,95 L 420,295 L 660,75 L 890,275 L 1140,85 L 1390,290 L 1600,125 L 1600,0 L 0,0 Z"
                fill="${isCliff ? '#cbb793' : '#b8ccb4'}" stroke="#5f6e58" stroke-width="2.2" />
          <!-- 云海缥缈带 -->
          <ellipse cx="420" cy="295" rx="260" ry="48" fill="#faf8f2" fill-opacity="0.65" />
          <ellipse cx="1160" cy="275" rx="280" ry="52" fill="#faf8f2" fill-opacity="0.65" />
          <!-- 盘山石阶古道自山门通向绝顶主殿 -->
          <path d="M 800,910 Q 740,720 815,565 T 795,235" fill="none" stroke="#c9bc9c" stroke-width="26" stroke-linecap="round" />
          <path d="M 800,910 Q 740,720 815,565 T 795,235" fill="none" stroke="#857355" stroke-width="3" stroke-dasharray="6 8" />
          <path d="M 415,465 Q 610,510 805,495 T 1165,485" fill="none" stroke="#c9bc9c" stroke-width="18" stroke-linecap="round" />
        `;
      }
      return bg;
    }

    // 绘制醒目立体古风建筑图标（按建筑类型区分飞檐宫殿、佛塔、楼阁、军帐、山洞、码头画舫等）
    function buildBuildingIconMarkup(b, isSelected) {
      const roofFill = b.isSpecial ? '#9e221b' : '#324d5c';
      const roofStroke = b.isSpecial ? '#f5cb5c' : '#e6dcc8';
      const wallFill = b.isSpecial ? '#fbf0d9' : '#f2ead9';
      const trimColor = b.isSpecial ? '#d99b26' : '#6e583f';

      let shape = '';
      if (b.kind === 'pagoda' || b.kind === 'paloda_gold') {
        // 多层飞檐宝塔 / 金殿
        shape = `
          <rect x="-18" y="-6" width="36" height="24" rx="2" fill="${wallFill}" stroke="${trimColor}" stroke-width="2" />
          <polygon points="-28,-6 28,-6 18,-16 -18,-16" fill="${roofFill}" stroke="${roofStroke}" stroke-width="1.8" />
          <polygon points="-23,-17 23,-17 14,-27 -14,-27" fill="${roofFill}" stroke="${roofStroke}" stroke-width="1.8" />
          <polygon points="-16,-28 16,-28 0,-40" fill="${roofFill}" stroke="${roofStroke}" stroke-width="1.8" />
          <line x1="0" y1="-40" x2="0" y2="-49" stroke="#f5cb5c" stroke-width="2.5" />
        `;
      } else if (b.kind === 'camp') {
        // 演武军帐 / 校场帅旗
        shape = `
          <polygon points="-30,18 -18,-14 0,-26 18,-14 30,18" fill="${wallFill}" stroke="${roofFill}" stroke-width="2.4" />
          <path d="M -30,-6 Q 0,-32 30,-6" fill="${roofFill}" stroke="${roofStroke}" stroke-width="2" />
          <polygon points="-8,18 0,2 8,18" fill="#4a2e16" />
          <line x1="24" y1="-26" x2="24" y2="16" stroke="#5c3a1e" stroke-width="2.2" />
          <polygon points="24,-26 42,-20 24,-13" fill="#c92a2a" />
        `;
      } else if (b.kind === 'cave') {
        // 秘境奇洞 / 寒玉冰窟 / 绝壁
        shape = `
          <path d="M -32,18 L -24,-18 L -6,-30 L 14,-24 L 32,18 Z" fill="#6b7a82" stroke="${roofStroke}" stroke-width="2.2" />
          <path d="M -14,18 Q 0,-12 14,18 Z" fill="#1e2d38" stroke="#9ad1de" stroke-width="1.8" />
        `;
      } else if (b.kind === 'dock' || b.kind === 'boat') {
        // 临水画舫 / 渡口楼船
        shape = `
          <path d="M -34,8 L 34,8 L 24,20 L -24,20 Z" fill="#6e4726" stroke="#f5e6c8" stroke-width="1.8" />
          <rect x="-20" y="-12" width="40" height="20" rx="2" fill="${wallFill}" stroke="${trimColor}" stroke-width="1.8" />
          <path d="M -28,-10 Q 0,-28 28,-10 Z" fill="${roofFill}" stroke="${roofStroke}" stroke-width="2" />
        `;
      } else {
        // 飞檐重檐宫阙 / 樊楼 / 古刹 / 府衙
        shape = `
          <rect x="-26" y="-8" width="52" height="26" rx="2" fill="${wallFill}" stroke="${trimColor}" stroke-width="2.2" />
          <rect x="-8" y="2" width="16" height="16" rx="1" fill="#5e2a1e" />
          <path d="M -36,-6 Q -18,-24 0,-24 Q 18,-24 36,-6 Z" fill="${roofFill}" stroke="${roofStroke}" stroke-width="2.2" />
          ${b.isSpecial ? `<path d="M -25,-19 Q 0,-34 25,-19 Z" fill="${roofFill}" stroke="${roofStroke}" stroke-width="1.8" />` : ''}
        `;
      }

      const selRing = isSelected
        ? `<circle cx="0" cy="-4" r="44" fill="none" stroke="#d97706" stroke-width="3" stroke-dasharray="7 4" />`
        : '';

      const badgeTag = b.isSpecial
        ? `<rect x="-34" y="-54" width="68" height="16" rx="8" fill="#8f1d14" stroke="#f7d374" stroke-width="1.3" />
           <text x="0" y="-42.5" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#fff7df">★ ${b.tag}</text>`
        : `<rect x="-28" y="-44" width="56" height="14" rx="7" fill="#2c4452" stroke="#dce8ee" stroke-width="1" />
           <text x="0" y="-34" text-anchor="middle" font-size="9" fill="#eef6fa">${b.tag}</text>`;

      const nameLen = b.name.length;
      const plateW = Math.max(96, nameLen * 12.2 + 20);
      const plateFill = isSelected ? '#362110' : (b.isSpecial ? '#fff6e0' : '#f7f1e3');
      const plateStroke = b.isSpecial ? '#9e221b' : '#5c4934';
      const textFill = isSelected ? '#fde68a' : (b.isSpecial ? '#781710' : '#24190e');

      return `
        ${selRing}
        <g class="${b.isSpecial ? 'special-bldg-glow' : ''}">
          ${shape}
        </g>
        ${badgeTag}
        <rect x="${-plateW / 2}" y="23" width="${plateW}" height="21" rx="4" fill="${plateFill}" stroke="${plateStroke}" stroke-width="${b.isSpecial ? 2 : 1.4}" />
        <text x="0" y="37.5" text-anchor="middle" font-size="11.5" font-weight="bold" class="song-serif" fill="${textFill}">${b.name}</text>
      `;
    }

    function renderRegionSvg(node, cfg, buildings) {
      const svg = document.getElementById('region-map-svg');
      const bgMarkup = buildThemeBackdropSvg(node, cfg);

      // 连接城门与各建筑的坊市青石板步道
      const [gx, gy] = cfg.gatePos;
      const pathsMarkup = buildings.map(b =>
        `<line x1="${gx}" y1="${gy - 18}" x2="${b.x}" y2="${b.y + 18}" stroke="#8c7352" stroke-width="2.2" stroke-dasharray="6 6" stroke-opacity="0.48" />`
      ).join('');

      // 城门 / 山门出口节点
      const gateW = cfg.gateLabel.length * 12 + 28;
      const gateMarkup = `
        <g id="region-exit-gate" class="cursor-pointer bldg-node" transform="translate(${gx}, ${gy})">
          <polygon points="0,-24 26,0 0,24 -26,0" fill="#23573f" stroke="#f3e9d2" stroke-width="2.5" />
          <text x="0" y="4.5" text-anchor="middle" font-size="11" font-weight="bold" class="song-serif" fill="#fffbeb">出口</text>
          <rect x="${-gateW / 2}" y="27" width="${gateW}" height="21" rx="4" fill="#243b2f" stroke="#d8c89e" stroke-width="1.5" />
          <text x="0" y="41.5" text-anchor="middle" font-size="11.2" font-weight="bold" class="song-serif" fill="#f7f2e4">${cfg.gateLabel}</text>
        </g>
      `;

      // 全部可互动建筑节点（基础建筑在下，★ 特殊建筑在上保证最醒目）
      const sorted = [...buildings].sort((a, b) => Number(a.isSpecial) - Number(b.isSpecial));
      const bldgMarkup = sorted.map(b => `
        <g data-bldg-id="${b.id}" class="cursor-pointer bldg-node" transform="translate(${b.x}, ${b.y})">
          ${buildBuildingIconMarkup(b, b.id === state.selectedBuildingId)}
        </g>
      `).join('');

      // 玩家当前在地区内的站位棋子
      const pp = state.playerRegionPos || { x: gx, y: gy - 55 };
      const playerMarkup = `
        <g transform="translate(${pp.x + 42}, ${pp.y - 54})" pointer-events="none">
          <circle r="13" fill="none" stroke="#d97706" stroke-width="2.2" class="player-pulse" />
          <circle r="11" fill="#b45309" stroke="#fffbeb" stroke-width="2" />
          <text x="0" y="4" text-anchor="middle" font-size="11" font-weight="bold" class="song-serif" fill="#fffbeb">侠</text>
        </g>
      `;

      svg.innerHTML = `
        ${bgMarkup}
        <g pointer-events="none">${pathsMarkup}</g>
        ${gateMarkup}
        <g id="region-buildings-layer">${bldgMarkup}</g>
        ${playerMarkup}
      `;

      // 绑定城门返回事件
      const gateEl = svg.querySelector('#region-exit-gate');
      if (gateEl) {
        gateEl.addEventListener('click', exitToWorldMap);
      }

      // 绑定每栋可互动建筑的实色悬停提示与点击移步入内事件
      const bMap = Object.fromEntries(buildings.map(b => [b.id, b]));
      svg.querySelectorAll('[data-bldg-id]').forEach(el => {
        const bid = el.getAttribute('data-bldg-id');
        const bObj = bMap[bid];
        if (!bObj) return;
        el.addEventListener('mouseenter', (ev) => showBuildingTooltip(ev, node, bObj));
        el.addEventListener('mousemove', (ev) => moveTooltip(ev));
        el.addEventListener('mouseleave', hideTooltip);
        el.addEventListener('click', (ev) => {
          ev.stopPropagation();
          selectRegionBuilding(bid);
        });
      });
    }

    function showBuildingTooltip(ev, node, b) {
      const tip = document.getElementById('map-tooltip');
      tip.innerHTML = `
        <div class="flex items-center justify-between bg-[#efe3c8] -mx-3.5 -mt-3.5 px-3.5 py-2 mb-2 rounded-t border-b border-[#b8a27e]">
          <span class="song-serif font-bold text-sm text-[#2b1a0e]">${b.isSpecial ? '★ ' : ''}${b.name}</span>
          <span class="px-2 py-0.5 rounded ${b.isSpecial ? 'bg-[#8f1d14]' : 'bg-[#355263]'} text-[#fff9ed] text-[11px] font-medium">${b.isSpecial ? '特殊建筑' : '基础建筑'}</span>
        </div>
        <div class="space-y-1.5 text-xs">
          <p class="text-[#3d2b19] leading-relaxed">${b.desc}</p>
          <div class="p-2 rounded bg-[#f2e8d2] border border-[#cbb997] text-[#781710] font-semibold">
            可互动机缘：${b.actLabel}
          </div>
          <div class="text-[11px] text-[#5c4630]">点击建筑即可移步入内查访人物与执行修习</div>
        </div>
      `;
      tip.classList.remove('hidden');
      moveTooltip(ev);
    }

    function selectRegionBuilding(bldgId) {
      const node = nodeMap[state.activeRegionId];
      const cfg = REGIONAL_CONFIG[state.activeRegionId];
      const buildings = getRegionAllBuildings(state.activeRegionId);
      const target = buildings.find(b => b.id === bldgId);
      if (!target) return;

      state.selectedBuildingId = bldgId;
      state.playerRegionPos = { x: target.x, y: target.y + 52 };
      renderRegionSvg(node, cfg, buildings);
      renderRegionInspector();
    }

    function renderRegionInspector() {
      const box = document.getElementById('inspector-panel');
      const node = nodeMap[state.activeRegionId];
      const cfg = REGIONAL_CONFIG[state.activeRegionId];
      if (!node || !cfg) return;

      const buildings = getRegionAllBuildings(node.id);
      const activeBldg = buildings.find(b => b.id === state.selectedBuildingId) || buildings[0];

      const roamingHere = ROAMING_MASTERS.filter(m => m.nodeId === node.id);
      const npcs = [
        ...(node.npcs || []),
        ...roamingHere.map(m => ({
          name: m.name,
          title: `${m.sect} · 游历至此`,
          realm: m.realm,
          talk: `“某游历至${node.name}，于【${activeBldg ? activeBldg.name : node.name}】得晤少侠，幸甚！”`
        }))
      ];
      window.__currentModalNpcs = npcs;
      window.__currentBuilding = activeBldg;

      const specialBtns = buildings.filter(b => b.isSpecial).map(b => `
        <button onclick="selectRegionBuilding('${b.id}')"
          class="w-full text-left px-2.5 py-1.5 rounded border text-xs transition flex items-center justify-between ${
            activeBldg && activeBldg.id === b.id
              ? 'bg-[#8f241e] text-amber-50 border-[#f5cb5c] font-bold shadow'
              : 'bg-amber-950/10 hover:bg-amber-900/20 border-amber-800/35 text-[var(--foreground)]'
          }">
          <span class="truncate">★ ${b.name}</span>
          <span class="text-[10px] opacity-85 shrink-0 ml-1">${b.tag}</span>
        </button>
      `).join('');

      const baseBtns = buildings.filter(b => !b.isSpecial).map(b => `
        <button onclick="selectRegionBuilding('${b.id}')"
          class="px-2 py-1 rounded border text-[11px] transition ${
            activeBldg && activeBldg.id === b.id
              ? 'bg-[#324d5c] text-white border-[#9ec4cc] font-bold'
              : 'bg-[var(--background)] hover:bg-[var(--card)] border-[var(--border)]'
          }">
          ${b.name.split(' · ')[0]}
        </button>
      `).join('');

      const npcCards = npcs.map((p, idx) => `
        <div class="p-2.5 rounded bg-[var(--background)] border border-[var(--border)] space-y-1.5 text-xs">
          <div class="flex items-center justify-between gap-1">
            <span class="font-bold song-serif">${p.name}</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-900/15 text-amber-800 dark:text-amber-300">${p.realm}</span>
          </div>
          <div class="text-[11px] text-[var(--muted-foreground)]">${p.title}</div>
          <div class="flex flex-wrap gap-1.5 pt-0.5">
            <button onclick="interactNpc(${idx}, 'talk')" class="px-2 py-1 rounded bg-amber-800 hover:bg-amber-700 text-white text-[11px]">交谈论道</button>
            <button onclick="interactNpc(${idx}, 'art')" class="px-2 py-1 rounded border border-[var(--border)] hover:bg-[var(--card)] text-[11px]">十艺唱和</button>
            <button onclick="interactNpc(${idx}, 'spar')" class="px-2 py-1 rounded border border-[var(--border)] hover:bg-[var(--card)] text-[11px]">武艺讨教</button>
          </div>
        </div>
      `).join('');

      box.innerHTML = `
        <div class="p-2.5 rounded bg-amber-950/15 border border-amber-800/35 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-bold text-amber-800 dark:text-amber-300">当前所在建筑</span>
            <button onclick="exitToWorldMap()" class="text-[11px] text-[#9c2a22] dark:text-amber-400 font-bold hover:underline">← 返回天下舆图</button>
          </div>
          <div class="song-serif font-bold text-base">${activeBldg ? (activeBldg.isSpecial ? '★ ' : '') + activeBldg.name : node.name}</div>
          <p class="text-xs text-[var(--muted-foreground)] leading-relaxed">${activeBldg ? activeBldg.desc : node.desc}</p>
          ${activeBldg ? `
          <button onclick="doBuildingAction()" class="w-full mt-1.5 px-3 py-2 rounded bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold song-serif shadow transition">
            执行互动：${activeBldg.actLabel}
          </button>` : ''}
        </div>

        <div id="region-action-feedback" class="p-2.5 rounded bg-[var(--background)] border border-[var(--border)] text-xs text-[var(--muted-foreground)] leading-relaxed">
          点击左侧地区地图中的高亮建筑或下方快捷名录，即可移步入内修习十艺、锤炼四维或寻访名宿。
        </div>

        <div class="space-y-1.5">
          <div class="text-xs font-bold song-serif text-[var(--muted-foreground)]">本地区可互动特殊建筑 (${buildings.filter(b => b.isSpecial).length})</div>
          <div class="space-y-1">${specialBtns}</div>
        </div>

        ${baseBtns ? `
        <div class="space-y-1.5">
          <div class="text-xs font-bold song-serif text-[var(--muted-foreground)]">城池五大基础建筑</div>
          <div class="flex flex-wrap gap-1.5">${baseBtns}</div>
        </div>` : ''}

        <div class="space-y-1.5">
          <div class="text-xs font-bold song-serif text-[var(--muted-foreground)]">本地区在场人物 (${npcs.length})</div>
          <div class="space-y-1.5">${npcCards}</div>
        </div>
      `;
    }

    function doBuildingAction() {
      const b = window.__currentBuilding;
      const fb = document.getElementById('region-action-feedback');
      if (!b || !fb) return;

      const cost = b.cost || 0;
      if (cost > 0 && state.silver < cost) {
        fb.innerHTML = `<span class="text-rose-600 font-semibold">囊中羞涩，纹银不足 ${cost} 两！可先去衙门揭榜领赏。</span>`;
        return;
      }
      state.silver -= cost;
      advanceOneDay(false);

      const eff = b.effect || {};
      const gains = [];
      if (eff.hp) { state.hp += eff.hp; gains.push(`气血 +${eff.hp}（现 ${state.hp}）`); }
      if (eff.mp) { state.mp += eff.mp; gains.push(`内力 +${eff.mp}（现 ${state.mp}）`); }
      if (eff.agi) {
        state.agility = Math.min(100, state.agility + eff.agi);
        document.getElementById('agi-slider').value = state.agility;
        document.getElementById('agi-val').textContent = `${state.agility} / 100`;
        gains.push(`身法 +${eff.agi}（现 ${state.agility}）`);
      }
      if (eff.res) { state.res = Math.min(100, state.res + eff.res); gains.push(`抗性 +${eff.res}（现 ${state.res}）`); }
      if (eff.riding) {
        state.ridingSkill = Math.min(100, state.ridingSkill + eff.riding);
        document.getElementById('riding-slider').value = state.ridingSkill;
        document.getElementById('riding-val').textContent = `${state.ridingSkill} / 100`;
        gains.push(`骑术 +${eff.riding}（现 ${state.ridingSkill}/100）`);
      }
      if (eff.silver) { state.silver += eff.silver; gains.push(`纹银 +${eff.silver} 两`); }

      ['skill', 'skill2', 'skill3'].forEach(k => {
        if (eff[k]) {
          const [sName, delta] = eff[k];
          state.skills[sName] = Math.min(100, (state.skills[sName] || 40) + delta);
          gains.push(`【${sName}】+${delta}（现 ${state.skills[sName]}/100）`);
        }
      });

      const summary = `于【${b.name}】潜心修历一日：<strong>${gains.join('、')}</strong>！`;
      fb.innerHTML = `<span class="text-emerald-800 dark:text-emerald-300">${summary}</span>`;
      addLog(nodeMap[state.activeRegionId].name, summary.replace(/<[^>]+>/g, ''));
      syncTopBar();
    }

    function interactNpc(idx, mode) {
      const p = window.__currentModalNpcs && window.__currentModalNpcs[idx];
      const fb = document.getElementById('region-action-feedback');
      if (!p || !fb) return;
      if (mode === 'talk') {
        fb.innerHTML = `<span class="font-bold text-amber-800 dark:text-amber-400">${p.name}：</span>${p.talk}`;
      } else if (mode === 'art') {
        state.skills.诗词 = Math.min(100, state.skills.诗词 + 2);
        state.skills.琴 = Math.min(100, state.skills.琴 + 1);
        fb.innerHTML = `与 <strong>${p.name}</strong> 抚琴唱和、对弈品茗，知音相惜（好感度上升，<strong>【诗词】${state.skills.诗词}/100、【琴】${state.skills.琴}/100</strong>）。`;
      } else {
        state.mp += 18;
        fb.innerHTML = `向 <strong>${p.name}</strong>（${p.realm}）请益实战拆招，周天真气精进 <strong>内力 +18</strong>！`;
        syncTopBar();
      }
    }

"""

assert re.search(OLD_SEC9_PATTERN, src, flags=re.S), "OLD_SEC9_PATTERN not found"
src = re.sub(OLD_SEC9_PATTERN, lambda _: NEW_SEC9, src, flags=re.S)

# 8. Update syncTopBar & initMapInteractions so zoom/drag only affects world map when in world mode, and populate quick-jump on boot
SYNC_OLD = """      document.getElementById('header-status').textContent = state.traveling
        ? `策马远行 → ${nodeMap[state.traveling.targetId].name}`
        : '驻留待命';"""

SYNC_NEW = """      document.getElementById('header-status').textContent = state.traveling
        ? `策马远行 → ${nodeMap[state.traveling.targetId].name}`
        : (state.viewMode === 'region' ? `地区内景探索中（${currNode.name}）` : '天下舆图待命');"""

assert SYNC_OLD in src
src = src.replace(SYNC_OLD, SYNC_NEW, 1)

WHEEL_OLD = """      vp.addEventListener('wheel', (e) => {
        e.preventDefault();"""
WHEEL_NEW = """      vp.addEventListener('wheel', (e) => {
        if (state.viewMode !== 'world') return;
        e.preventDefault();"""
assert WHEEL_OLD in src
src = src.replace(WHEEL_OLD, WHEEL_NEW, 1)

MDOWN_OLD = """      vp.addEventListener('mousedown', (e) => {
        if (e.target.closest('button')) return;"""
MDOWN_NEW = """      vp.addEventListener('mousedown', (e) => {
        if (state.viewMode !== 'world') return;
        if (e.target.closest('button') || e.target.closest('select')) return;"""
assert MDOWN_OLD in src
src = src.replace(MDOWN_OLD, MDOWN_NEW, 1)

INIT_BOOT_OLD = """      onMountOrSkillChange();
      renderAllMapLayers();
      renderInspector();"""

INIT_BOOT_NEW = """      populateRegionQuickJump();
      onMountOrSkillChange();
      renderAllMapLayers();
      renderInspector();"""

assert INIT_BOOT_OLD in src
src = src.replace(INIT_BOOT_OLD, INIT_BOOT_NEW, 1)

with open(ARTIFACT_HTML, "w", encoding="utf-8") as f:
    f.write(src)

print("Successfully upgraded northern_song_map.html! Total bytes:", len(src))
