import json, base64, io, os, glob
from PIL import Image

art_dir = "/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p/165aeb2d-47c6-4ae8-9373-51acdcc9d87b"
html_path = os.path.join(art_dir, "northern_song_map.html")
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# 1. Load all 38 region specs + calibrated region manifests
with open("/home/antigravity/panoramas/all_regions_spec.json", "r", encoding="utf-8") as f:
    spec_list = json.load(f)

reg_batches = {}
for i in range(1, 5):
    with open(f"/home/antigravity/panoramas/manifests/regions_batch{i}.json", "r", encoding="utf-8") as f:
        reg_batches.update(json.load(f))

# Build unified REGIONAL_CONFIG for all 38 regions with WebP data URIs (1152x648 WebP q=56 -> sharp & compact, while keeping viewBox 1376x768 so all calibrated polygons match 1:1!)
def encode_webp_uri(jpg_path, size=(1152, 648), quality=58):
    im = Image.open(jpg_path).convert("RGB")
    if im.size != size:
        im = im.resize(size, Image.Resampling.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "WEBP", quality=quality, method=4)
    return "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode("ascii")

regional_config = {}
for r in spec_list:
    rid = r["id"]
    jpg_path = f"/home/antigravity/panoramas/regions/{rid}.jpg"
    uri = encode_webp_uri(jpg_path, size=(1152, 648), quality=58)
    if rid == "bianliang":
        regional_config[rid] = {
            "theme": "iso_panorama_image",
            "isoViewBox": [1376, 768],
            "panoramaUri": uri,
            "sceneSubtitle": r["sceneSubtitle"],
            "gateLabel": r["gateLabel"],
            "gatePos": [767, 685],
            "gatePoly": "635,667 761,559 899,677 890,766 641,766",
            "specials": r["specials"],
            "bases": r["bases"],
        }
    else:
        m = reg_batches[rid]
        regional_config[rid] = {
            "theme": "iso_panorama_image",
            "isoViewBox": [1376, 768],
            "panoramaUri": uri,
            "sceneSubtitle": m.get("sceneSubtitle") or r["sceneSubtitle"],
            "gateLabel": m.get("gateLabel") or r["gateLabel"],
            "gatePos": m["gatePos"],
            "gatePoly": m["gatePoly"],
            "specials": m["specials"],
            "bases": m.get("bases", []),
        }

print("Encoded 38 regional panoramas!")

# 2. Load all 58 calibrated Level-3 special building manifests + encode WebP data URIs
bldg_config = {}
for p in sorted(glob.glob("/home/antigravity/panoramas/manifests/buildings_batch*.json")):
    with open(p, "r", encoding="utf-8") as f:
        batch = json.load(f)
    for bid, entry in batch.items():
        jpg_path = f"/home/antigravity/panoramas/buildings/{bid}.jpg"
        b_copy = dict(entry)
        b_copy["panoramaUri"] = encode_webp_uri(jpg_path, size=(1152, 648), quality=58)
        b_copy.pop("imageFile", None)
        bldg_config[bid] = b_copy

print("Encoded", len(bldg_config), "Level-3 special building panoramas!")

# 3. Replace KAIFENG_PANORAMA_URI + REGIONAL_CONFIG in northern_song_map.html
start_marker = "    const KAIFENG_PANORAMA_URI ="
end_marker = "    // =========================================================================\n    // 3. 状态与邻接表"
s_idx = html.index(start_marker)
e_idx = html.index(end_marker)

data_injection = (
    "    const REGIONAL_CONFIG = " + json.dumps(regional_config, ensure_ascii=False) + ";\n\n"
    "    const BUILDING_PANORAMAS = " + json.dumps(bldg_config, ensure_ascii=False) + ";\n\n"
)

html = html[:s_idx] + data_injection + html[e_idx:]

# 4. Update region-top-hud back button to support returning from Tier-3 building -> Tier-2 region, or Tier-2 region -> Tier-1 world
old_top_btn = '''          <button onclick="exitToWorldMap()" class="px-3 py-1 rounded bg-[#9c2a22] hover:bg-[#b8342b] text-[#fff9ef] font-bold song-serif text-xs border border-[#f2c97d]/60 shadow transition flex items-center gap-1">
            <span>←</span><span>出城 · 返回天下舆图</span>
          </button>'''

new_top_btn = '''          <button id="region-back-btn" onclick="handleUpperLevelBack()" class="px-3 py-1 rounded bg-[#9c2a22] hover:bg-[#b8342b] text-[#fff9ef] font-bold song-serif text-xs border border-[#f2c97d]/60 shadow transition flex items-center gap-1">
            <span>←</span><span id="region-back-btn-label">出城 · 返回天下舆图</span>
          </button>'''

assert old_top_btn in html, "old_top_btn not found"
html = html.replace(old_top_btn, new_top_btn, 1)

# 5. Add activeBuildingInteriorId and selectedSpotId to state
html = html.replace(
    "      activeRegionId: 'bianliang',\n      selectedBuildingId: null,",
    "      activeRegionId: 'bianliang',\n      activeBuildingInteriorId: null,\n      selectedSpotId: null,\n      selectedBuildingId: null,",
    1
)

# 6. Upgrade navigation & SVG rendering & inspector & pan/zoom to 3-tier ('world' <-> 'region' <-> 'building')
old_enter_block_start = "    function enterRegionMap(nodeId) {"
old_enter_block_end = "    // 根据每个地区的独特地理与历史风貌"
eb_s = html.index(old_enter_block_start)
eb_e = html.index(old_enter_block_end)

new_enter_block = '''    function handleUpperLevelBack() {
      if (state.viewMode === 'building') {
        exitBuildingMap();
      } else {
        exitToWorldMap();
      }
    }

    function enterRegionMap(nodeId) {
      if (state.traveling) return;
      const node = nodeMap[nodeId];
      const cfg = REGIONAL_CONFIG[nodeId];
      if (!node || !cfg) return;

      hideTooltip();
      const lblPanel = document.getElementById('labels-dropdown-panel');
      if (lblPanel) lblPanel.classList.add('hidden');
      state.viewMode = 'region';
      state.activeRegionId = nodeId;
      state.activeBuildingInteriorId = null;
      state.selectedSpotId = null;
      state.currentNodeId = nodeId;
      state.selectedNodeId = nodeId;
      state.regionPan = { x: 0, y: 0, scale: 1, dragging: false };

      const buildings = getRegionAllBuildings(nodeId);
      state.selectedBuildingId = buildings.length > 0 ? buildings[0].id : null;
      state.playerRegionPos = buildings.length > 0
        ? { x: buildings[0].x, y: buildings[0].y + 52 }
        : { x: cfg.gatePos[0], y: cfg.gatePos[1] - 60 };

      document.getElementById('song-map-svg').classList.add('hidden');
      document.getElementById('world-top-hud').classList.add('hidden');
      document.getElementById('world-bottom-hud').classList.add('hidden');

      document.getElementById('region-map-svg').classList.remove('hidden');
      document.getElementById('region-top-hud').classList.remove('hidden');
      document.getElementById('region-bottom-hud').classList.remove('hidden');

      const backLbl = document.getElementById('region-back-btn-label');
      if (backLbl) backLbl.textContent = '出城 · 返回天下舆图';
      document.getElementById('region-hud-title').textContent = `${node.code ? node.code + ' · ' : ''}${node.name} — 半3D全景互动舆图`;
      document.getElementById('region-hud-badge').textContent = node.circuit;
      document.getElementById('region-hud-subtitle').textContent = `${cfg.sceneSubtitle}（滚轮缩放 · 左键拖拽平移 · 点击特殊建筑可切入建筑专属半3D全景）`;

      const sel = document.getElementById('region-quick-jump');
      if (sel) sel.value = nodeId;

      renderRegionSvg(node, cfg, buildings);
      applyRegionPanZoom();
      syncTopBar();
      renderRegionInspector();
    }

    function enterBuildingMap(bldgId) {
      const bPano = BUILDING_PANORAMAS[bldgId];
      const node = nodeMap[state.activeRegionId];
      const cfg = REGIONAL_CONFIG[state.activeRegionId];
      if (!bPano || !node || !cfg) return;

      hideTooltip();
      state.viewMode = 'building';
      state.activeBuildingInteriorId = bldgId;
      state.selectedBuildingId = bldgId;
      state.selectedSpotId = bPano.spots[0].id;
      state.regionPan = { x: 0, y: 0, scale: 1, dragging: false };

      const backLbl = document.getElementById('region-back-btn-label');
      if (backLbl) backLbl.textContent = `步出建筑 · 返回【${node.name}】全景`;
      document.getElementById('region-hud-title').textContent = `${node.name} > ★ ${bPano.name} — 建筑半3D全景图`;
      document.getElementById('region-hud-badge').textContent = '第三层级 · 建筑实景';
      document.getElementById('region-hud-subtitle').textContent = bPano.subtitle;

      renderBuildingInteriorSvg(node, bPano);
      applyRegionPanZoom();
      syncTopBar();
      renderRegionInspector();
      addLog('踏入建筑', `由【${node.name}】步入【${bPano.name}】专属半3D建筑全景图！`, true);
    }

    function exitBuildingMap() {
      if (state.viewMode !== 'building') return;
      const prevBldgName = BUILDING_PANORAMAS[state.activeBuildingInteriorId]?.name || '建筑';
      const node = nodeMap[state.activeRegionId];
      const cfg = REGIONAL_CONFIG[state.activeRegionId];
      hideTooltip();
      state.viewMode = 'region';
      state.activeBuildingInteriorId = null;
      state.selectedSpotId = null;
      state.regionPan = { x: 0, y: 0, scale: 1, dragging: false };

      const backLbl = document.getElementById('region-back-btn-label');
      if (backLbl) backLbl.textContent = '出城 · 返回天下舆图';
      document.getElementById('region-hud-title').textContent = `${node.code ? node.code + ' · ' : ''}${node.name} — 半3D全景互动舆图`;
      document.getElementById('region-hud-badge').textContent = node.circuit;
      document.getElementById('region-hud-subtitle').textContent = `${cfg.sceneSubtitle}（滚轮缩放 · 左键拖拽平移 · 点击特殊建筑可切入建筑专属半3D全景）`;

      const buildings = getRegionAllBuildings(node.id);
      renderRegionSvg(node, cfg, buildings);
      applyRegionPanZoom();
      syncTopBar();
      renderRegionInspector();
      addLog('步出建筑', `自【${prevBldgName}】步出，返回【${node.name}】地区半3D全景图。`);
    }

    function exitToWorldMap() {
      hideTooltip();
      state.viewMode = 'world';
      state.activeBuildingInteriorId = null;
      const vp = document.getElementById('map-viewport');
      if (vp) vp.style.backgroundColor = '';
      document.getElementById('region-map-svg').classList.add('hidden');
      document.getElementById('region-top-hud').classList.add('hidden');
      document.getElementById('region-bottom-hud').classList.add('hidden');

      document.getElementById('song-map-svg').classList.remove('hidden');
      document.getElementById('world-top-hud').classList.remove('hidden');
      document.getElementById('world-bottom-hud').classList.remove('hidden');

      syncTopBar();
      renderAllMapLayers();
      renderInspector();
      addLog('出城返图', `自【${nodeMap[state.currentNodeId].name}】步出城门，重展《华夏山海全景舆图》。`);
    }

'''

html = html[:eb_s] + new_enter_block + html[eb_e:]

# 7. Update toggleRegionLabels, buildIsoPanoramaHotspotMarkup, renderRegionSvg, and add renderBuildingInteriorSvg
old_toggle_start = "    function toggleRegionLabels() {"
old_select_end = "    function renderRegionInspector() {"
ts_idx = html.index(old_toggle_start)
se_idx = html.index(old_select_end)

new_svg_and_select_block = '''    function toggleRegionLabels() {
      state.showRegionLabels = !state.showRegionLabels;
      const btn = document.getElementById('btn-toggle-region-labels');
      if (btn) {
        btn.textContent = state.showRegionLabels ? '建筑牌匾：显示' : '建筑牌匾：隐藏（纯赏景）';
        btn.className = state.showRegionLabels
          ? 'px-2 py-1 rounded bg-[#5c4024] text-[#fff8ee] border border-[#3d2812] font-medium text-xs hover:opacity-90 transition'
          : 'px-2 py-1 rounded bg-[#eadec6] text-[#3d2812] border border-[#8c6e46] font-medium text-xs hover:bg-[#dfd0b2] transition';
      }
      const node = nodeMap[state.activeRegionId];
      const cfg = REGIONAL_CONFIG[state.activeRegionId];
      if (!node || !cfg) return;
      if (state.viewMode === 'building' && state.activeBuildingInteriorId && BUILDING_PANORAMAS[state.activeBuildingInteriorId]) {
        renderBuildingInteriorSvg(node, BUILDING_PANORAMAS[state.activeBuildingInteriorId]);
      } else if (state.viewMode === 'region') {
        renderRegionSvg(node, cfg, getRegionAllBuildings(node.id));
      }
    }

    function buildIsoPanoramaHotspotMarkup(b, isSelected, showLabels) {
      const hasSubPano = b.isSpecial && Boolean(BUILDING_PANORAMAS[b.id]);
      const fillColor = b.isSpecial ? '#f59e0b' : '#38bdf8';
      const strokeColor = b.isSpecial ? '#fde047' : '#bae6fd';
      const baseFillOpacity = isSelected ? '0.24' : '0.02';
      const baseStrokeOpacity = isSelected ? '0.96' : (b.isSpecial ? '0.45' : '0.28');
      const baseStrokeWidth = isSelected ? '3.2' : (b.isSpecial ? '1.8' : '1.3');
      const dashAttr = isSelected ? '' : 'stroke-dasharray="8 4"';

      const polyMarkup = b.poly
        ? `<polygon points="${b.poly}" fill="${fillColor}" fill-opacity="${baseFillOpacity}" stroke="${strokeColor}" stroke-width="${baseStrokeWidth}" stroke-opacity="${baseStrokeOpacity}" stroke-linejoin="round" ${dashAttr} class="iso-poly-hotspot" />`
        : `<circle cx="${b.x}" cy="${b.y}" r="36" fill="${fillColor}" fill-opacity="${baseFillOpacity}" stroke="${strokeColor}" stroke-width="2" class="iso-poly-hotspot" />`;

      if (!showLabels && !isSelected) {
        return `<g data-bldg-id="${b.id}" class="cursor-pointer iso-hotspot-group">${polyMarkup}</g>`;
      }

      const labelText = (b.isSpecial ? '★ ' : '') + b.name;
      const plateW = Math.max(92, labelText.length * 11.2 + 22);
      const plateFill = isSelected ? '#2b180b' : (b.isSpecial ? '#8f1d14' : '#243a47');
      const plateStroke = isSelected ? '#fbbf24' : (b.isSpecial ? '#f6cf65' : '#cbd5e1');
      const textFill = isSelected ? '#fde68a' : '#fff9ed';
      const subTagText = hasSubPano ? `${b.tag} · 点击入内` : b.tag;
      const subTagW = Math.max(64, subTagText.length * 8.6 + 16);

      return `
        <g data-bldg-id="${b.id}" class="cursor-pointer iso-hotspot-group">
          ${polyMarkup}
          <g transform="translate(${b.x}, ${b.y})" class="iso-plaque">
            <line x1="0" y1="0" x2="0" y2="18" stroke="${plateStroke}" stroke-width="2" />
            <circle cx="0" cy="19" r="4" fill="${plateStroke}" stroke="#1f1209" stroke-width="1.2" />
            ${b.isSpecial ? `
              <rect x="${-subTagW / 2}" y="-31" width="${subTagW}" height="14" rx="7" fill="#fef3c7" stroke="#92400e" stroke-width="1.2" />
              <text x="0" y="-21" text-anchor="middle" font-size="8.6" font-weight="bold" fill="#781710">${subTagText}</text>
            ` : ''}
            <rect x="${-plateW / 2}" y="-15" width="${plateW}" height="21" rx="4" fill="${plateFill}" stroke="${plateStroke}" stroke-width="${isSelected ? 2.4 : 1.6}" />
            <text x="0" y="-0.5" text-anchor="middle" font-size="11" font-weight="bold" class="song-serif" fill="${textFill}">${labelText}</text>
          </g>
        </g>
      `;
    }

    function renderBuildingInteriorSvg(node, bPano) {
      const svg = document.getElementById('region-map-svg');
      const vp = document.getElementById('map-viewport');
      const rp = state.regionPan || { x: 0, y: 0, scale: 1 };
      const rootTransform = `translate(${rp.x}, ${rp.y}) scale(${rp.scale})`;
      const vw = 1376, vh = 768;
      svg.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      if (vp) vp.style.backgroundColor = '#1e1610';

      const spotsMarkup = bPano.spots.map(sp => {
        const isSelected = sp.id === state.selectedSpotId;
        const fillOp = isSelected ? '0.26' : '0.03';
        const strokeOp = isSelected ? '0.96' : '0.48';
        const strokeW = isSelected ? '3.2' : '1.9';
        const dashAttr = isSelected ? '' : 'stroke-dasharray="8 4"';
        const labelText = `★ ${sp.name}`;
        const plateW = Math.max(100, labelText.length * 11.2 + 22);
        const plateFill = isSelected ? '#2b180b' : '#8f1d14';
        const plateStroke = isSelected ? '#fbbf24' : '#f6cf65';
        const tagW = Math.max(66, sp.tag.length * 9.2 + 16);

        const plaque = (state.showRegionLabels || isSelected) ? `
          <g transform="translate(${sp.x}, ${sp.y})" class="iso-plaque">
            <line x1="0" y1="0" x2="0" y2="18" stroke="${plateStroke}" stroke-width="2" />
            <circle cx="0" cy="19" r="4" fill="${plateStroke}" stroke="#1f1209" stroke-width="1.2" />
            <rect x="${-tagW / 2}" y="-31" width="${tagW}" height="14" rx="7" fill="#fef3c7" stroke="#92400e" stroke-width="1.2" />
            <text x="0" y="-21" text-anchor="middle" font-size="8.8" font-weight="bold" fill="#781710">${sp.tag}</text>
            <rect x="${-plateW / 2}" y="-15" width="${plateW}" height="21" rx="4" fill="${plateFill}" stroke="${plateStroke}" stroke-width="${isSelected ? 2.4 : 1.6}" />
            <text x="0" y="-0.5" text-anchor="middle" font-size="11" font-weight="bold" class="song-serif" fill="${isSelected ? '#fde68a' : '#fff9ed'}">${labelText}</text>
          </g>
        ` : '';

        return `
          <g data-spot-id="${sp.id}" class="cursor-pointer iso-hotspot-group">
            <polygon points="${sp.poly}" fill="#f59e0b" fill-opacity="${fillOp}" stroke="#fde047" stroke-width="${strokeW}" stroke-opacity="${strokeOp}" stroke-linejoin="round" ${dashAttr} class="iso-poly-hotspot" />
            ${plaque}
          </g>
        `;
      }).join('');

      const eg = bPano.exitGate;
      const gateText = `← ${eg.label}`;
      const gateW = Math.max(120, gateText.length * 11 + 24);
      const gateMarkup = `
        <g id="building-exit-gate" class="cursor-pointer iso-hotspot-group">
          <polygon points="${eg.poly}" fill="#10b981" fill-opacity="0.07" stroke="#6ee7b7" stroke-width="1.9" stroke-dasharray="7 4" class="iso-poly-hotspot" />
          ${state.showRegionLabels ? `
            <g transform="translate(${eg.x}, ${eg.y})" class="iso-plaque">
              <rect x="${-gateW / 2}" y="-12" width="${gateW}" height="22" rx="4" fill="#183d2c" stroke="#a7f3d0" stroke-width="1.8" />
              <text x="0" y="3" text-anchor="middle" font-size="11" font-weight="bold" class="song-serif" fill="#ecfdf5">${gateText}</text>
            </g>
          ` : ''}
        </g>
      `;

      const activeSp = bPano.spots.find(s => s.id === state.selectedSpotId) || bPano.spots[0];
      const playerMarkup = `
        <g transform="translate(${activeSp.x + 50}, ${activeSp.y - 26})" pointer-events="none">
          <circle r="13" fill="none" stroke="#fbbf24" stroke-width="2.4" class="player-pulse" />
          <circle r="10.5" fill="#b45309" stroke="#fffbeb" stroke-width="2" />
          <text x="0" y="3.8" text-anchor="middle" font-size="10.5" font-weight="bold" class="song-serif" fill="#fffbeb">侠</text>
        </g>
      `;

      svg.innerHTML = `
        <g id="region-pan-zoom-root" transform="${rootTransform}">
          <rect x="-800" y="-500" width="${vw + 1600}" height="${vh + 1000}" fill="#1b130d" />
          <rect x="-4" y="-4" width="${vw + 8}" height="${vh + 8}" rx="4" fill="none" stroke="#c89d54" stroke-width="3" stroke-opacity="0.65" />
          <image href="${bPano.panoramaUri}" x="0" y="0" width="${vw}" height="${vh}" />
          ${gateMarkup}
          <g id="building-spots-layer">${spotsMarkup}</g>
          ${playerMarkup}
        </g>
      `;

      const exitEl = svg.querySelector('#building-exit-gate');
      if (exitEl) {
        exitEl.addEventListener('click', (ev) => {
          if (state.dragMoved) return;
          ev.stopPropagation();
          exitBuildingMap();
        });
      }

      const spMap = Object.fromEntries(bPano.spots.map(s => [s.id, s]));
      svg.querySelectorAll('[data-spot-id]').forEach(el => {
        const sid = el.getAttribute('data-spot-id');
        const spObj = spMap[sid];
        if (!spObj) return;
        el.addEventListener('mouseenter', (ev) => { if (!state.regionPan.dragging) showBuildingTooltip(ev, node, { ...spObj, isSpecial: true, isSpot: true }); });
        el.addEventListener('mousemove', (ev) => { if (!state.regionPan.dragging) moveTooltip(ev); });
        el.addEventListener('mouseleave', hideTooltip);
        el.addEventListener('click', (ev) => {
          if (state.dragMoved) return;
          ev.stopPropagation();
          state.selectedSpotId = sid;
          renderBuildingInteriorSvg(node, bPano);
          renderRegionInspector();
        });
      });
    }

    function renderRegionSvg(node, cfg, buildings) {
      const svg = document.getElementById('region-map-svg');
      const vp = document.getElementById('map-viewport');
      const rp = state.regionPan || { x: 0, y: 0, scale: 1 };
      const rootTransform = `translate(${rp.x}, ${rp.y}) scale(${rp.scale})`;

      if (cfg.theme === 'iso_panorama_image' && cfg.panoramaUri) {
        const [vw, vh] = cfg.isoViewBox || [1376, 768];
        svg.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        if (vp) vp.style.backgroundColor = '#1e1610';

        const sorted = [...buildings].sort((a, b) => Number(a.isSpecial) - Number(b.isSpecial));
        const hotspotsMarkup = sorted.map(b =>
          buildIsoPanoramaHotspotMarkup(b, b.id === state.selectedBuildingId, state.showRegionLabels)
        ).join('');

        const [gx, gy] = cfg.gatePos;
        const gateW = cfg.gateLabel.length * 11 + 24;
        const gatePolyMarkup = cfg.gatePoly
          ? `<polygon points="${cfg.gatePoly}" fill="#10b981" fill-opacity="0.06" stroke="#6ee7b7" stroke-width="1.8" stroke-dasharray="7 4" class="iso-poly-hotspot" />`
          : '';
        const gatePlaque = state.showRegionLabels ? `
          <g transform="translate(${gx}, ${gy})" class="iso-plaque">
            <rect x="${-gateW / 2}" y="-12" width="${gateW}" height="22" rx="4" fill="#183d2c" stroke="#a7f3d0" stroke-width="1.8" />
            <text x="0" y="3" text-anchor="middle" font-size="11" font-weight="bold" class="song-serif" fill="#ecfdf5">← ${cfg.gateLabel}</text>
          </g>
        ` : '';

        const activeB = buildings.find(b => b.id === state.selectedBuildingId);
        const px = activeB ? activeB.x + 48 : gx;
        const py = activeB ? activeB.y - 26 : gy - 26;
        const playerMarkup = `
          <g transform="translate(${px}, ${py})" pointer-events="none">
            <circle r="13" fill="none" stroke="#fbbf24" stroke-width="2.4" class="player-pulse" />
            <circle r="10.5" fill="#b45309" stroke="#fffbeb" stroke-width="2" />
            <text x="0" y="3.8" text-anchor="middle" font-size="10.5" font-weight="bold" class="song-serif" fill="#fffbeb">侠</text>
          </g>
        `;

        svg.innerHTML = `
          <g id="region-pan-zoom-root" transform="${rootTransform}">
            <rect x="-800" y="-500" width="${vw + 1600}" height="${vh + 1000}" fill="#1b130d" />
            <rect x="-4" y="-4" width="${vw + 8}" height="${vh + 8}" rx="4" fill="none" stroke="#c89d54" stroke-width="3" stroke-opacity="0.65" />
            <image href="${cfg.panoramaUri}" x="0" y="0" width="${vw}" height="${vh}" />
            <g id="region-exit-gate" class="cursor-pointer iso-hotspot-group">
              ${gatePolyMarkup}
              ${gatePlaque}
            </g>
            <g id="region-buildings-layer">${hotspotsMarkup}</g>
            ${playerMarkup}
          </g>
        `;

        const gateEl = svg.querySelector('#region-exit-gate');
        if (gateEl) {
          gateEl.addEventListener('click', (ev) => {
            if (state.dragMoved) return;
            ev.stopPropagation();
            exitToWorldMap();
          });
        }

        const bMap = Object.fromEntries(buildings.map(b => [b.id, b]));
        svg.querySelectorAll('[data-bldg-id]').forEach(el => {
          const bid = el.getAttribute('data-bldg-id');
          const bObj = bMap[bid];
          if (!bObj) return;
          el.addEventListener('mouseenter', (ev) => { if (!state.regionPan.dragging) showBuildingTooltip(ev, node, bObj); });
          el.addEventListener('mousemove', (ev) => { if (!state.regionPan.dragging) moveTooltip(ev); });
          el.addEventListener('mouseleave', hideTooltip);
          el.addEventListener('click', (ev) => {
            if (state.dragMoved) return;
            ev.stopPropagation();
            if (bObj.isSpecial && BUILDING_PANORAMAS[bid]) {
              enterBuildingMap(bid);
            } else {
              selectRegionBuilding(bid);
            }
          });
        });
        return;
      }
    }

    function showBuildingTooltip(ev, node, b) {
      const tip = document.getElementById('map-tooltip');
      const hasSubPano = !b.isSpot && b.isSpecial && Boolean(BUILDING_PANORAMAS[b.id]);
      tip.innerHTML = `
        <div class="flex items-center justify-between bg-[#efe3c8] -mx-3.5 -mt-3.5 px-3.5 py-2 mb-2 rounded-t border-b border-[#b8a27e]">
          <span class="song-serif font-bold text-sm text-[#2b1a0e]">${b.isSpecial ? '★ ' : ''}${b.name}</span>
          <span class="px-2 py-0.5 rounded ${b.isSpecial ? 'bg-[#8f1d14]' : 'bg-[#355263]'} text-[#fff9ed] text-[11px] font-medium">${b.isSpot ? '建筑内景热区' : (b.isSpecial ? '特殊建筑' : '基础建筑')}</span>
        </div>
        <div class="space-y-1.5 text-xs">
          <p class="text-[#3d2b19] leading-relaxed">${b.desc}</p>
          <div class="p-2 rounded bg-[#f2e8d2] border border-[#cbb997] text-[#781710] font-semibold">
            可互动机缘：${b.actLabel}
          </div>
          <div class="text-[11px] font-semibold ${hasSubPano ? 'text-[#8f1d14]' : 'text-[#5c4630]'}">
            ${hasSubPano ? `★ 点击直接切入【${b.name}】专属半3D全景图 →` : '点击热区即可驻足查访人物与执行修习'}
          </div>
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

    function selectBuildingSpot(spotId) {
      const node = nodeMap[state.activeRegionId];
      const bPano = BUILDING_PANORAMAS[state.activeBuildingInteriorId];
      if (!node || !bPano) return;
      state.selectedSpotId = spotId;
      renderBuildingInteriorSvg(node, bPano);
      renderRegionInspector();
    }

'''

html = html[:ts_idx] + new_svg_and_select_block + html[se_idx:]

# 8. Upgrade renderRegionInspector to handle both Tier-2 ('region') and Tier-3 ('building')
ri_start = html.index("    function renderRegionInspector() {")
ri_end = html.index("    function doBuildingAction() {")

new_inspector_block = '''    function renderRegionInspector() {
      const box = document.getElementById('inspector-panel');
      const node = nodeMap[state.activeRegionId];
      const cfg = REGIONAL_CONFIG[state.activeRegionId];
      if (!node || !cfg) return;

      const roamingHere = ROAMING_MASTERS.filter(m => m.nodeId === node.id);
      const npcs = [
        ...(node.npcs || []),
        ...roamingHere.map(m => ({
          name: m.name,
          title: `${m.sect} · 游历至此`,
          realm: m.realm,
          talk: `“某游历至${node.name}，幸晤少侠，快哉！”`
        }))
      ];
      window.__currentModalNpcs = npcs;

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

      // Tier 3: 处于特殊建筑专属半3D内景图
      if (state.viewMode === 'building' && state.activeBuildingInteriorId && BUILDING_PANORAMAS[state.activeBuildingInteriorId]) {
        const bPano = BUILDING_PANORAMAS[state.activeBuildingInteriorId];
        const activeSpot = bPano.spots.find(s => s.id === state.selectedSpotId) || bPano.spots[0];
        window.__currentBuilding = activeSpot;

        const spotBtns = bPano.spots.map(sp => `
          <button onclick="selectBuildingSpot('${sp.id}')"
            class="w-full text-left px-2.5 py-1.5 rounded border text-xs transition flex items-center justify-between ${
              activeSpot && activeSpot.id === sp.id
                ? 'bg-[#8f241e] text-amber-50 border-[#f5cb5c] font-bold shadow'
                : 'bg-amber-950/10 hover:bg-amber-900/20 border-amber-800/35 text-[var(--foreground)]'
            }">
            <span class="truncate">★ ${sp.name}</span>
            <span class="text-[10px] opacity-85 shrink-0 ml-1">${sp.tag}</span>
          </button>
        `).join('');

        box.innerHTML = `
          <div class="p-2.5 rounded bg-amber-950/15 border border-amber-800/35 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="text-[11px] font-bold text-amber-800 dark:text-amber-300">建筑半3D全景 · ${bPano.name}</span>
              <button onclick="exitBuildingMap()" class="text-[11px] text-[#9c2a22] dark:text-amber-400 font-bold hover:underline">← 返回${node.name}</button>
            </div>
            <div class="song-serif font-bold text-base">★ ${activeSpot.name}</div>
            <p class="text-xs text-[var(--muted-foreground)] leading-relaxed">${activeSpot.desc}</p>
            <button onclick="doBuildingAction()" class="w-full mt-1.5 px-3 py-2 rounded bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold song-serif shadow transition">
              执行互动：${activeSpot.actLabel}
            </button>
          </div>

          <div id="region-action-feedback" class="p-2.5 rounded bg-[var(--background)] border border-[var(--border)] text-xs text-[var(--muted-foreground)] leading-relaxed">
            已进入【${bPano.name}】专属半3D全景图！滚轮无级缩放、左键拖拽平移，点击画中殿阁院落热区即可修习。
          </div>

          <div class="space-y-1.5">
            <div class="text-xs font-bold song-serif text-[var(--muted-foreground)]">建筑内可互动殿宇院落 (${bPano.spots.length})</div>
            <div class="space-y-1">${spotBtns}</div>
          </div>

          <div class="space-y-1.5">
            <div class="text-xs font-bold song-serif text-[var(--muted-foreground)]">本地区在场人物 (${npcs.length})</div>
            <div class="space-y-1.5">${npcCards}</div>
          </div>
        `;
        return;
      }

      // Tier 2: 处于地区半3D全景图
      const buildings = getRegionAllBuildings(node.id);
      const activeBldg = buildings.find(b => b.id === state.selectedBuildingId) || buildings[0];
      window.__currentBuilding = activeBldg;

      const specialBtns = buildings.filter(b => b.isSpecial).map(b => {
        const hasSub = Boolean(BUILDING_PANORAMAS[b.id]);
        return `
          <div class="flex items-center gap-1">
            <button onclick="selectRegionBuilding('${b.id}')"
              class="flex-1 text-left px-2.5 py-1.5 rounded border text-xs transition flex items-center justify-between ${
                activeBldg && activeBldg.id === b.id
                  ? 'bg-[#8f241e] text-amber-50 border-[#f5cb5c] font-bold shadow'
                  : 'bg-amber-950/10 hover:bg-amber-900/20 border-amber-800/35 text-[var(--foreground)]'
              }">
              <span class="truncate">★ ${b.name}</span>
              <span class="text-[10px] opacity-85 shrink-0 ml-1">${b.tag}</span>
            </button>
            ${hasSub ? `<button onclick="enterBuildingMap('${b.id}')" class="px-2 py-1.5 rounded bg-amber-800 hover:bg-amber-700 text-white text-[11px] font-bold shrink-0">入内全景→</button>` : ''}
          </div>
        `;
      }).join('');

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

      const activeHasSub = activeBldg && activeBldg.isSpecial && Boolean(BUILDING_PANORAMAS[activeBldg.id]);

      box.innerHTML = `
        <div class="p-2.5 rounded bg-amber-950/15 border border-amber-800/35 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-bold text-amber-800 dark:text-amber-300">当前所在建筑</span>
            <button onclick="exitToWorldMap()" class="text-[11px] text-[#9c2a22] dark:text-amber-400 font-bold hover:underline">← 返回天下舆图</button>
          </div>
          <div class="song-serif font-bold text-base">${activeBldg ? (activeBldg.isSpecial ? '★ ' : '') + activeBldg.name : node.name}</div>
          <p class="text-xs text-[var(--muted-foreground)] leading-relaxed">${activeBldg ? activeBldg.desc : node.desc}</p>
          ${activeHasSub ? `
          <button onclick="enterBuildingMap('${activeBldg.id}')" class="w-full mt-1.5 px-3 py-2 rounded bg-[#9c2a22] hover:bg-[#b53229] text-amber-50 text-xs font-bold song-serif shadow transition">
            进入【${activeBldg.name}】专属半3D全景图 →
          </button>` : ''}
          ${activeBldg ? `
          <button onclick="doBuildingAction()" class="w-full mt-1 px-3 py-2 rounded bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold song-serif shadow transition">
            执行互动：${activeBldg.actLabel}
          </button>` : ''}
        </div>

        <div id="region-action-feedback" class="p-2.5 rounded bg-[var(--background)] border border-[var(--border)] text-xs text-[var(--muted-foreground)] leading-relaxed">
          点击左侧半3D全景图中的高亮建筑或下方名录，即可进入建筑专属半3D实景或修习十艺武学。
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

'''

html = html[:ri_start] + new_inspector_block + html[ri_end:]

# 9. Update syncTopBar, getRegionViewBoxSize, focusSelectedBuilding, and wheel listener to also handle viewMode === 'building'
html = html.replace(
    ": (state.viewMode === 'region' ? `地区内景探索中（${currNode.name}）` : '天下舆图待命');",
    ": (state.viewMode === 'building' ? `建筑半3D内景（${BUILDING_PANORAMAS[state.activeBuildingInteriorId]?.name || currNode.name}）` : (state.viewMode === 'region' ? `地区半3D全景（${currNode.name}）` : '天下舆图待命'));",
    1
)

html = html.replace(
    '''    function getRegionViewBoxSize() {
      const cfg = REGIONAL_CONFIG[state.activeRegionId];
      if (cfg && cfg.theme === 'iso_panorama_image' && cfg.isoViewBox) {
        return cfg.isoViewBox;
      }
      return [1600, 1000];
    }''',
    '''    function getRegionViewBoxSize() {
      if (state.viewMode === 'building') return [1376, 768];
      const cfg = REGIONAL_CONFIG[state.activeRegionId];
      if (cfg && cfg.theme === 'iso_panorama_image' && cfg.isoViewBox) {
        return cfg.isoViewBox;
      }
      return [1376, 768];
    }''',
    1
)

html = html.replace(
    '''    function focusSelectedBuilding() {
      const [vw, vh] = getRegionViewBoxSize();
      const buildings = getRegionAllBuildings(state.activeRegionId);
      const b = buildings.find(item => item.id === state.selectedBuildingId) || buildings[0];
      if (!b) return;''',
    '''    function focusSelectedBuilding() {
      const [vw, vh] = getRegionViewBoxSize();
      let b = null;
      if (state.viewMode === 'building' && state.activeBuildingInteriorId && BUILDING_PANORAMAS[state.activeBuildingInteriorId]) {
        const bPano = BUILDING_PANORAMAS[state.activeBuildingInteriorId];
        b = bPano.spots.find(s => s.id === state.selectedSpotId) || bPano.spots[0];
      } else {
        const buildings = getRegionAllBuildings(state.activeRegionId);
        b = buildings.find(item => item.id === state.selectedBuildingId) || buildings[0];
      }
      if (!b) return;''',
    1
)

html = html.replace(
    "} else if (state.viewMode === 'region') {",
    "} else if (state.viewMode === 'region' || state.viewMode === 'building') {",
    1
)

html = html.replace(
    "if (state.viewMode === 'region') {",
    "if (state.viewMode === 'region' || state.viewMode === 'building') {",
    1
)

with open("/home/antigravity/northern_song_map.html", "w", encoding="utf-8") as f:
    f.write(html)
with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Successfully built northern_song_map.html! Total file size:", len(html) / (1024 * 1024), "MB")
