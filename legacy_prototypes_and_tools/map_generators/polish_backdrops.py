#!/usr/bin/env python3
"""
Enhances buildThemeBackdropSvg in northern_song_map.html so every single one of the 38
enterable locations has rich, unmistakable local landmarks & visual motifs in its
background canvas, while keeping interactive buildings crisp and unmistakable on top.
"""
import re

ARTIFACT_HTML = "/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/165aeb2d-47c6-4ae8-9373-51acdcc9d87b/northern_song_map.html"
src = open(ARTIFACT_HTML, "r", encoding="utf-8").read()

OLD_FN_START = "    // 根据每个地区的独特风貌主题，生成高辨识度宋画水墨设色地域背景\n    function buildThemeBackdropSvg(node, cfg) {"
OLD_FN_END = "    // 绘制醒目立体古风建筑图标"

NEW_FN = r"""    // 根据每个地区的独特地理与历史风貌，生成一地一景的宋画水墨设色背景
    function buildThemeBackdropSvg(node, cfg) {
      const t = cfg.theme;
      const id = node.id;
      let bg = '';

      if (t === 'imperial_canal') {
        // 东京汴梁：三重方城、穿城汴河、虹桥巨舟、南北御街与宣德皇城红墙
        bg = `
          <rect width="1600" height="1000" fill="#eadec3" />
          <rect x="75" y="75" width="1450" height="860" rx="14" fill="#efe5ce" stroke="#785c3c" stroke-width="12" />
          <rect x="88" y="88" width="1424" height="834" rx="10" fill="none" stroke="#b59b76" stroke-width="2" stroke-dasharray="10 6" />
          <!-- 大内皇城红墙金瓦宫城 -->
          <rect x="570" y="102" width="460" height="215" rx="6" fill="#dec8a4" stroke="#8f241e" stroke-width="8" />
          <line x1="570" y1="317" x2="1030" y2="317" stroke="#d49b35" stroke-width="3" />
          <!-- 千步廊与御街天街 -->
          <rect x="766" y="317" width="68" height="603" fill="#d7c6a5" stroke="#9e8462" stroke-width="2" />
          <line x1="800" y1="317" x2="800" y2="920" stroke="#b59a74" stroke-width="1.5" stroke-dasharray="12 8" />
          <rect x="95" y="425" width="1410" height="38" fill="#dccba9" />
          <!-- 汴河漕渠穿城 + 虹桥巨舟 -->
          <path d="M 82,535 Q 460,505 800,565 T 1518,655" fill="none" stroke="#5d8e99" stroke-width="58" stroke-opacity="0.85" />
          <path d="M 82,535 Q 460,505 800,565 T 1518,655" fill="none" stroke="#9ec4cc" stroke-width="26" stroke-opacity="0.45" stroke-dasharray="18 14" />
          <rect x="760" y="528" width="80" height="74" rx="6" fill="#9c6a3e" stroke="#4d3118" stroke-width="3" />
          <path d="M 1035,558 Q 1065,540 1095,606" fill="none" stroke="#8f4326" stroke-width="18" stroke-linecap="round" />
          <!-- 汴河漕船点缀 -->
          <polygon points="270,520 335,520 320,536 285,536" fill="#6b4423" opacity="0.75" />
          <polygon points="1240,625 1305,625 1290,641 1255,641" fill="#6b4423" opacity="0.75" />
          <g fill="#e2d4b5" stroke="#bca682" stroke-width="1.2" opacity="0.72">
            <rect x="150" y="155" width="160" height="105" rx="3" /><rect x="340" y="155" width="175" height="105" rx="3" />
            <rect x="1090" y="155" width="170" height="105" rx="3" /><rect x="1290" y="155" width="150" height="105" rx="3" />
            <rect x="155" y="645" width="150" height="120" rx="3" /><rect x="1245" y="725" width="185" height="115" rx="3" />
          </g>
          <text x="800" y="498" text-anchor="middle" class="song-serif" fill="#5e452a" fill-opacity="0.55" font-size="17" font-weight="bold" letter-spacing="10">天街御路 · 州桥夜市</text>
          <text x="385" y="535" text-anchor="middle" class="song-serif" fill="#1e424a" fill-opacity="0.75" font-size="15" font-weight="bold" letter-spacing="8">汴 河 虹 桥 漕 渠</text>
        `;
      } else if (t === 'river_garden') {
        // 西京洛阳（邙山洛水牡丹园） vs 江宁府（钟山长江秦淮丹枫）
        const isLuoyang = id === 'luoyang';
        bg = `
          <rect width="1600" height="1000" fill="#ebe2ca" />
          <path d="M 0,210 Q 220,95 450,185 T 920,155 T 1360,190 L 1600,120 L 1600,0 L 0,0 Z" fill="${isLuoyang ? '#cbd4bd' : '#bfccb8'}" stroke="#7d8f72" stroke-width="2" />
          ${!isLuoyang ? `<path d="M 0,165 Q 240,265 360,445 L 0,520 Z" fill="#6b96a0" fill-opacity="0.78" />
          <text x="130" y="295" class="song-serif" fill="#1f444d" fill-opacity="0.65" font-size="18" font-weight="bold" letter-spacing="8">万里长江</text>` : ''}
          <path d="M 0,605 C 380,555 680,645 1060,590 C 1310,555 1460,585 1600,575" fill="none" stroke="#68959e" stroke-width="62" stroke-opacity="0.82" />
          <rect x="145" y="175" width="1310" height="725" rx="16" fill="none" stroke="#755a3b" stroke-width="9" stroke-opacity="0.8" />
          <rect x="760" y="562" width="76" height="92" rx="6" fill="#a87c4f" stroke="#4f351b" stroke-width="3" />
          ${isLuoyang ? `
            <ellipse cx="1095" cy="325" rx="160" ry="95" fill="#e8c8ce" fill-opacity="0.58" stroke="#b87d87" stroke-dasharray="6 4" />
            <circle cx="1040" cy="300" r="18" fill="#d98292" opacity="0.48" /><circle cx="1145" cy="340" r="22" fill="#de8d9c" opacity="0.48" />
            <text x="530" y="612" class="song-serif" fill="#1f464f" fill-opacity="0.72" font-size="16" font-weight="bold" letter-spacing="10">洛 水 天 津 桥</text>
          ` : `
            <ellipse cx="1210" cy="260" rx="145" ry="85" fill="#e3bfb0" fill-opacity="0.55" stroke="#b56953" stroke-dasharray="6 4" />
            <text x="550" y="612" class="song-serif" fill="#1f464f" fill-opacity="0.72" font-size="16" font-weight="bold" letter-spacing="10">十 里 秦 淮 烟 水</text>
          `}
          <line x1="798" y1="185" x2="798" y2="895" stroke="#c2ae8b" stroke-width="24" opacity="0.6" />
          <line x1="155" y1="435" x2="1445" y2="435" stroke="#c2ae8b" stroke-width="20" opacity="0.6" />
        `;
      } else if (t === 'water_town' || t === 'canal_water') {
        // 苏州平江 / 扬州运河 / 太湖燕子坞
        const waterLabel = id === 'yangzhou' ? '京杭大运河 · 瘦西湖' : (id === 'yanziwu' ? '三万六千顷烟波太湖' : '姑苏水巷 · 太湖烟波');
        bg = `
          <rect width="1600" height="1000" fill="#e4eadb" />
          <path d="M 980,550 C 1120,490 1380,515 1600,465 L 1600,1000 L 890,1000 C 920,820 910,630 980,550 Z" fill="#7eaab2" fill-opacity="0.76" />
          <path d="M 0,365 Q 480,345 920,395 T 1600,360" fill="none" stroke="#6a9ca6" stroke-width="38" />
          <path d="M 595,0 Q 625,440 565,1000" fill="none" stroke="#6a9ca6" stroke-width="34" />
          <path d="M 180,685 Q 580,645 1040,705" fill="none" stroke="#6a9ca6" stroke-width="28" />
          <rect x="572" y="345" width="52" height="46" rx="8" fill="#d9d2c0" stroke="#57534a" stroke-width="2.5" />
          <rect x="815" y="372" width="48" height="46" rx="8" fill="#d9d2c0" stroke="#57534a" stroke-width="2.5" />
          <!-- 粉墙黛瓦江南民居群衬景 -->
          <g fill="#f5f3ec" stroke="#4a4e4d" stroke-width="1.5" opacity="0.72">
            <rect x="210" y="420" width="75" height="45" /><rect x="295" y="430" width="65" height="42" />
            <rect x="675" y="210" width="80" height="46" /><rect x="1220" y="215" width="85" height="48" />
          </g>
          <g fill="#5d8c68" opacity="0.48">
            <circle cx="1140" cy="790" r="22" /><circle cx="1195" cy="820" r="16" /><circle cx="1320" cy="760" r="25" />
            <circle cx="1410" cy="835" r="19" /><circle cx="1075" cy="865" r="18" />
          </g>
          <text x="1275" y="885" text-anchor="middle" class="song-serif" fill="#1d444b" fill-opacity="0.72" font-size="18" font-weight="bold" letter-spacing="8">${waterLabel}</text>
        `;
      } else if (t === 'westlake_port' || t === 'maritime_port' || t === 'springs_lake') {
        // 杭州临安 / 泉州刺桐港 / 济南清泉大明湖
        const isSpring = t === 'springs_lake';
        const isQuanzhou = id === 'quanzhou';
        bg = `
          <rect width="1600" height="1000" fill="#e8e3cc" />
          ${!isQuanzhou ? `<ellipse cx="${isSpring ? 790 : 300}" cy="${isSpring ? 245 : 465}" rx="${isSpring ? 360 : 230}" ry="${isSpring ? 135 : 265}" fill="#78a6b0" fill-opacity="0.74" stroke="#4f7c85" stroke-width="2" />` : `
          <path d="M 0,235 Q 280,95 580,195 T 1080,175 L 1080,0 L 0,0 Z" fill="#bfd1b8" stroke="#688062" stroke-width="2" />`}
          ${!isSpring ? `<path d="M 1085,0 L 1600,0 L 1600,1000 L 1145,1000 C 1075,760 1125,480 1085,0 Z" fill="#64919c" fill-opacity="0.85" />
          <path d="M 1125,120 Q 1165,320 1135,520 T 1175,920" fill="none" stroke="#eef6f7" stroke-width="6" stroke-dasharray="18 12" opacity="0.78" />
          ${isQuanzhou ? `<ellipse cx="1495" cy="520" rx="52" ry="135" fill="#d9dfc2" stroke="#5c6b4d" stroke-width="2" />
          <text x="1495" y="525" text-anchor="middle" class="song-serif" fill="#354228" font-size="14" font-weight="bold" writing-mode="tb">遥望流求宝岛</text>` : `
          <text x="1365" y="520" text-anchor="middle" class="song-serif" fill="#eef6f7" fill-opacity="0.75" font-size="20" font-weight="bold" writing-mode="tb" letter-spacing="10">钱塘大潮 · 东海航道</text>`}` : `
          <ellipse cx="495" cy="560" rx="85" ry="55" fill="#70a7b5" fill-opacity="0.78" />
          <text x="790" y="165" text-anchor="middle" class="song-serif" fill="#1d464f" fill-opacity="0.72" font-size="17" font-weight="bold" letter-spacing="8">四面荷花三面柳 · 大明湖</text>`}
          <rect x="210" y="155" width="910" height="735" rx="16" fill="none" stroke="#6e563a" stroke-width="8" stroke-opacity="0.68" />
          <line x1="220" y1="495" x2="1110" y2="495" stroke="#cbb997" stroke-width="22" opacity="0.62" />
          <line x1="755" y1="165" x2="755" y2="885" stroke="#cbb997" stroke-width="22" opacity="0.62" />
        `;
      } else if (t === 'peach_island') {
        bg = `
          <rect width="1600" height="1000" fill="#65919b" />
          <g stroke="#a8ccd4" stroke-width="1.6" opacity="0.5" fill="none">
            <path d="M 90,140 Q 160,120 230,140 T 370,140" /><path d="M 1260,180 Q 1330,160 1400,180 T 1540,180" />
            <path d="M 110,830 Q 180,810 250,830 T 390,830" /><path d="M 1240,840 Q 1310,820 1380,840 T 1520,840" />
          </g>
          <path d="M 275,490 C 265,245 510,125 815,135 C 1135,145 1345,275 1335,515 C 1325,755 1105,925 800,930 C 485,935 285,735 275,490 Z"
                fill="#efe4c6" stroke="#dcebed" stroke-width="14" />
          <path d="M 305,490 C 295,275 525,160 815,168 C 1105,175 1305,295 1295,515 C 1285,735 1085,890 800,895 C 515,900 315,705 305,490 Z"
                fill="#e2e8cf" stroke="#8a7452" stroke-width="2" />
          <polygon points="800,210 980,285 1055,465 980,645 800,720 620,645 545,465 620,285" fill="#f2ced5" fill-opacity="0.52" stroke="#b85d72" stroke-width="2.2" stroke-dasharray="10 6" />
          <g fill="#e38da0" opacity="0.65">
            <circle cx="670" cy="330" r="24" /><circle cx="925" cy="325" r="26" /><circle cx="635" cy="520" r="25" />
            <circle cx="955" cy="535" r="24" /><circle cx="795" cy="265" r="22" /><circle cx="805" cy="635" r="24" />
            <circle cx="480" cy="340" r="20" /><circle cx="1115" cy="355" r="22" />
          </g>
          <text x="1480" y="500" text-anchor="middle" class="song-serif" fill="#eef7f8" fill-opacity="0.7" font-size="20" font-weight="bold" writing-mode="tb" letter-spacing="10">东海碧波 · 奇门仙岛</text>
        `;
      } else if (t === 'bamboo_basin') {
        // 成都府（锦江竹林天府） vs 青城山/唐家堡（幽林道观与万毒深涧）
        const isChengdu = id === 'chengdu';
        bg = `
          <rect width="1600" height="1000" fill="#dfe8d2" />
          <path d="M 0,235 Q 260,85 520,195 T 1060,165 T 1600,205 L 1600,0 L 0,0 Z" fill="#acc4a6" stroke="#5b7855" stroke-width="2" />
          <!-- 锦江绕城 / 万毒紫涧 -->
          <path d="M 0,685 C 420,615 860,725 1600,615" fill="none" stroke="${isChengdu ? '#6498a3' : '#6c658c'}" stroke-width="44" stroke-opacity="0.78" />
          ${isChengdu ? `<rect x="205" y="175" width="1190" height="715" rx="16" fill="#ece6cf" fill-opacity="0.58" stroke="#66583e" stroke-width="8" />` : ''}
          <!-- 苍翠修竹林带 -->
          <g stroke="#446e48" stroke-width="3.5" opacity="0.55">
            <line x1="145" y1="320" x2="145" y2="460" /><line x1="162" y1="305" x2="162" y2="460" /><line x1="178" y1="330" x2="178" y2="460" />
            <line x1="1415" y1="340" x2="1415" y2="490" /><line x1="1432" y1="320" x2="1432" y2="490" /><line x1="1448" y1="350" x2="1448" y2="490" />
          </g>
          <text x="800" y="135" text-anchor="middle" class="song-serif" fill="#2f4a31" fill-opacity="0.65" font-size="18" font-weight="bold" letter-spacing="10">${isChengdu ? '西川天府 · 锦水修竹' : '青城幽林 · 唐门机括竹海'}</text>
        `;
      } else if (t === 'liao_capital' || t === 'liao_steppe_city' || t === 'golden_tent_steppe') {
        const isSteppeTent = t === 'golden_tent_steppe';
        const liaoTitle = id === 'xijin_liao' ? '燕山幽州 · 契丹南京军府' : (id === 'dading_liao' ? '松漠陪都 · 老哈河大定汉城' : '西拉木伦潢水 · 契丹龙兴捺钵金帐');
        bg = `
          <rect width="1600" height="1000" fill="#e2d5b3" />
          <path d="M 0,215 L 185,95 L 365,195 L 580,85 L 810,185 L 1060,75 L 1310,190 L 1600,95 L 1600,0 L 0,0 Z" fill="#c7b896" stroke="#786548" stroke-width="2" />
          <path d="M 0,635 Q 440,575 860,645 T 1600,595" fill="none" stroke="#6c969e" stroke-width="38" stroke-opacity="0.76" />
          ${!isSteppeTent ? `<rect x="205" y="175" width="1190" height="715" rx="10" fill="#ede2c7" fill-opacity="0.45" stroke="#5c436e" stroke-width="9" stroke-opacity="0.82" />` : `
          <circle cx="800" cy="265" r="145" fill="#ebd9aa" stroke="#b58328" stroke-width="3" stroke-dasharray="12 6" />`}
          <g fill="#f7f1e3" stroke="#7d6445" stroke-width="2" opacity="0.86">
            <path d="M 225,445 Q 255,408 285,445 Z" /><path d="M 295,460 Q 325,425 355,460 Z" />
            <path d="M 1285,515 Q 1318,475 1350,515 Z" /><path d="M 1360,535 Q 1388,502 1416,535 Z" />
          </g>
          <text x="800" y="138" text-anchor="middle" class="song-serif" fill="#432c52" fill-opacity="0.68" font-size="18" font-weight="bold" letter-spacing="10">${liaoTitle}</text>
        `;
      } else if (t === 'desert_kingdom' || t === 'loess_frontier' || t === 'border_fort' || t === 'iron_citadel' || t === 'ancient_capital' || t === 'fortress_river') {
        const isDesert = t === 'desert_kingdom';
        const isTiezhang = id === 'tiezhangfeng';
        bg = `
          <rect width="1600" height="1000" fill="${isDesert ? '#e6d2a8' : '#e8dec4'}" />
          <path d="M 0,260 L 145,105 L 295,235 L 445,95 L 620,225 L 820,125 L 1050,230 L 1320,110 L 1600,220 L 1600,0 L 0,0 Z"
                fill="${isDesert ? '#ceb282' : '#cfc2a3'}" stroke="#7a6242" stroke-width="2" />
          ${isTiezhang ? `
            <!-- 五指巨峰与八百里洞庭烟波 -->
            <path d="M 520,310 L 580,105 L 640,310 L 715,65 L 795,295 L 875,80 L 945,305 L 1015,125 L 1085,315 Z" fill="#9c8e75" stroke="#4f4330" stroke-width="2.5" />
            <path d="M 0,680 Q 480,620 980,695 T 1600,640 L 1600,1000 L 0,1000 Z" fill="#6997a1" fill-opacity="0.78" />
          ` : `
            <path d="M 1380,0 Q 1320,380 1420,690 T 1350,1000" fill="none" stroke="#6d969e" stroke-width="48" stroke-opacity="0.72" />
            <rect x="195" y="175" width="1140" height="720" rx="12" fill="#efe5cc" fill-opacity="0.62" stroke="#694d30" stroke-width="10" />
            <line x1="765" y1="175" x2="765" y2="895" stroke="#cab692" stroke-width="24" />
            <line x1="195" y1="485" x2="1335" y2="485" stroke="#cab692" stroke-width="22" />
          `}
        `;
      } else if (t === 'snow_plateau' || t === 'kunlun_glacier' || t === 'cangshan_erhai') {
        const isDali = t === 'cangshan_erhai';
        const snowTitle = id === 'kunlun' ? '万山之祖昆仑 · 瑶池玄冰雪巅' : (id === 'luoxie_tubo' ? '世界屋脊卫藏 · 红山圣城雪域' : '点苍十九峰雪 · 洱海万顷明月');
        bg = `
          <rect width="1600" height="1000" fill="${isDali ? '#e2ead8' : '#e4eaec'}" />
          <path d="M 0,310 L 165,85 L 325,265 L 515,65 L 710,255 L 915,75 L 1135,260 L 1365,90 L 1600,275 L 1600,0 L 0,0 Z"
                fill="#f7f9fa" stroke="#758894" stroke-width="2.5" />
          <path d="M 165,85 L 235,175 L 115,185 Z M 515,65 L 595,165 L 445,175 Z M 915,75 L 995,175 L 845,180 Z" fill="#d7e4ea" />
          ${isDali
            ? `<ellipse cx="1325" cy="545" rx="185" ry="335" fill="#6ea5b0" fill-opacity="0.82" stroke="#487b87" stroke-width="3" />
               <text x="1335" y="545" text-anchor="middle" class="song-serif" fill="#eef8fa" fill-opacity="0.82" font-size="20" font-weight="bold" writing-mode="tb" letter-spacing="10">洱海明月碧波</text>`
            : `<ellipse cx="785" cy="365" rx="185" ry="88" fill="#89c4d1" fill-opacity="0.78" stroke="#4f8b99" stroke-width="3" />
               <path d="M 0,725 Q 520,665 1040,735 T 1600,695" fill="none" stroke="#79aeb8" stroke-width="34" />`
          }
          ${t === 'kunlun_glacier' ? `<ellipse cx="355" cy="605" rx="125" ry="70" fill="#8b5ca8" fill-opacity="0.34" stroke="#6c3d8a" stroke-dasharray="6 4" />` : ''}
          <text x="800" y="132" text-anchor="middle" class="song-serif" fill="#2c4352" fill-opacity="0.7" font-size="18" font-weight="bold" letter-spacing="10">${snowTitle}</text>
        `;
      } else {
        const isCliff = t === 'cliff_pass';
        const isMisty = t === 'misty_valley';
        bg = `
          <rect width="1600" height="1000" fill="${isCliff ? '#e4d8be' : '#dfe6d5'}" />
          <path d="M 0,340 L 210,95 L 420,295 L 660,75 L 890,275 L 1140,85 L 1390,290 L 1600,125 L 1600,0 L 0,0 Z"
                fill="${isCliff ? '#cbb793' : '#b8ccb4'}" stroke="#5f6e58" stroke-width="2.2" />
          ${isCliff ? `
            <!-- 雄关长城城垛与绝壁峡谷 -->
            <path d="M 120,465 L 560,515 L 1040,515 L 1480,455" fill="none" stroke="#6e5539" stroke-width="16" stroke-dasharray="22 6" opacity="0.65" />
          ` : ''}
          ${isMisty ? `
            <!-- 千丈飞瀑白练与玉壁深潭 -->
            <path d="M 580,140 Q 595,380 565,640" fill="none" stroke="#eef7fa" stroke-width="22" opacity="0.85" />
            <ellipse cx="565" cy="655" rx="95" ry="38" fill="#77aeb8" opacity="0.78" />
          ` : ''}
          <ellipse cx="420" cy="295" rx="260" ry="48" fill="#faf8f2" fill-opacity="0.65" />
          <ellipse cx="1160" cy="275" rx="280" ry="52" fill="#faf8f2" fill-opacity="0.65" />
          <path d="M 800,910 Q 740,720 815,565 T 795,235" fill="none" stroke="#c9bc9c" stroke-width="26" stroke-linecap="round" />
          <path d="M 800,910 Q 740,720 815,565 T 795,235" fill="none" stroke="#857355" stroke-width="3" stroke-dasharray="6 8" />
          <path d="M 415,465 Q 610,510 805,495 T 1165,485" fill="none" stroke="#c9bc9c" stroke-width="18" stroke-linecap="round" />
        `;
      }
      return bg;
    }

"""

assert OLD_FN_START in src and OLD_FN_END in src
i1 = src.index(OLD_FN_START)
i2 = src.index(OLD_FN_END)
src = src[:i1] + NEW_FN + src[i2:]

open(ARTIFACT_HTML, "w", encoding="utf-8").write(src)
print("Updated buildThemeBackdropSvg! Total bytes:", len(src))
