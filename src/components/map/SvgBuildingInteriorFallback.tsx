import type { CompiledBuildingRecord } from '../../types/game'

interface SvgBuildingInteriorFallbackProps {
  building: CompiledBuildingRecord
  width: number
  height: number
}

interface InteriorTheme {
  skyTop: string
  skyBottom: string
  courtyardFill: string
  courtyardTile: string
  roofPrimary: string
  roofTrim: string
  wallFill: string
  pillarFill: string
  accentLabel: string
  isNatural: boolean
}

function getThemeForKind(kind: string): InteriorTheme {
  switch (kind) {
    case 'palace':
    case 'paloda_gold':
      return {
        skyTop: '#233845',
        skyBottom: '#d9c69e',
        courtyardFill: '#cbb792',
        courtyardTile: '#a68f68',
        roofPrimary: '#8c2318',
        roofTrim: '#e5b95c',
        wallFill: '#f2e6cf',
        pillarFill: '#9e261b',
        accentLabel: '皇家宫阙 · 丹墀重檐规制',
        isNatural: false,
      }
    case 'temple':
    case 'pagoda':
      return {
        skyTop: '#263f38',
        skyBottom: '#d8ceb4',
        courtyardFill: '#cfc2a6',
        courtyardTile: '#9f8f72',
        roofPrimary: '#364945',
        roofTrim: '#d2a857',
        wallFill: '#ebd9bc',
        pillarFill: '#7d291e',
        accentLabel: '古刹禅林 · 晨钟暮鼓梵宇',
        isNatural: false,
      }
    case 'camp':
    case 'fort':
    case 'forge':
      return {
        skyTop: '#332922',
        skyBottom: '#bfa582',
        courtyardFill: '#b89f7d',
        courtyardTile: '#876f51',
        roofPrimary: '#3b332b',
        roofTrim: '#c48f45',
        wallFill: '#cbb698',
        pillarFill: '#5c3c24',
        accentLabel: '雄关军塞 · 辕门校场规制',
        isNatural: false,
      }
    case 'cave':
      return {
        skyTop: '#1d3138',
        skyBottom: '#8ea89d',
        courtyardFill: '#98a89e',
        courtyardTile: '#687d73',
        roofPrimary: '#2f4c46',
        roofTrim: '#a8d5ba',
        wallFill: '#c7d3cb',
        pillarFill: '#3b5249',
        accentLabel: '名山绝壑 · 幽谷石室秘境',
        isNatural: true,
      }
    case 'dock':
    case 'boat':
      return {
        skyTop: '#203d4c',
        skyBottom: '#b8cfd4',
        courtyardFill: '#b9c8c4',
        courtyardTile: '#7c9496',
        roofPrimary: '#2e4752',
        roofTrim: '#d4af63',
        wallFill: '#eae2cf',
        pillarFill: '#694429',
        accentLabel: '烟波津渡 · 水榭漕埠长卷',
        isNatural: false,
      }
    default:
      return {
        skyTop: '#243b35',
        skyBottom: '#dfd3b8',
        courtyardFill: '#d6c8ab',
        courtyardTile: '#a89676',
        roofPrimary: '#354b45',
        roofTrim: '#cfa355',
        wallFill: '#f3ead6',
        pillarFill: '#6e3a20',
        accentLabel: '宋式营造 · 青绿庭院规制',
        isNatural: false,
      }
  }
}

function isForeignRegion(regionId: string): boolean {
  return (
    regionId.endsWith('_liao') ||
    regionId === 'xingqing_xixia' ||
    regionId === 'lhasa_tubo' ||
    regionId === 'dali_city'
  )
}

function SingleHallTavernOrInnFallback({
  building,
  width,
  height,
}: SvgBuildingInteriorFallbackProps) {
  const isTavern = building.id.endsWith('_base_tavern')
  const isForeign = isForeignRegion(building.regionId)
  const colophonSubtitle = isTavern
    ? isForeign
      ? '塞外番坊酒肆 · 独堂实景（无子建筑）'
      : '大宋瓦肆酒楼 · 独堂实景（无子建筑）'
    : isForeign
      ? '四方国信馆驿 · 独堂实景（无子建筑）'
      : '大宋车马客栈 · 独堂实景（无子建筑）'

  return (
    <g id={`svg-single-hall-fallback-${building.id}`}>
      <defs>
        <linearGradient id="hall-wall-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={isTavern ? '#2a1a10' : '#241b13'} />
          <stop offset="52%" stopColor={isTavern ? '#52341e' : '#4a3522'} />
          <stop offset="100%" stopColor="#6c4d31" />
        </linearGradient>
        <linearGradient id="hall-floor-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={isTavern ? '#8f6b45' : '#9c8669'} />
          <stop offset="100%" stopColor={isTavern ? '#5e4227' : '#6c5941'} />
        </linearGradient>
        <radialGradient id="lantern-warm-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#f59e0b" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        <pattern id="hall-floor-tiles" width="72" height="42" patternUnits="userSpaceOnUse">
          <path
            d="M 36 0 L 72 21 L 36 42 L 0 21 Z"
            fill="none"
            stroke="#3b2615"
            strokeWidth="1"
            strokeOpacity="0.32"
          />
        </pattern>
      </defs>

      {/* 室内梁架与暖色背景 */}
      <rect x={0} y={0} width={width} height={height} fill="url(#hall-wall-grad)" />

      {/* 顶部大木梁架与椽条 */}
      <polygon points="0,0 1376,0 1240,142 136,142" fill="#22140b" stroke="#5e3e22" strokeWidth={2} />
      {[220, 454, 688, 922, 1156].map((bx) => (
        <line key={bx} x1={bx} y1={0} x2={bx} y2={142} stroke="#472d18" strokeWidth={8} />
      ))}
      <line x1={116} y1={142} x2={1260} y2={142} stroke="#c89d54" strokeWidth={3} strokeOpacity={0.65} />

      {/* 北面后山墙与粉墙木柱 */}
      <rect
        x={136}
        y={142}
        width={1104}
        height={216}
        fill={isForeign ? '#dfd0b4' : '#efe3ca'}
        stroke="#5c3d22"
        strokeWidth={3}
      />
      {/* 左右两侧透视厢壁 */}
      <polygon
        points="0,80 136,142 136,358 0,748"
        fill="#d9c7a6"
        stroke="#5c3d22"
        strokeWidth={2.5}
      />
      <polygon
        points="1376,80 1240,142 1240,358 1376,748"
        fill="#d9c7a6"
        stroke="#5c3d22"
        strokeWidth={2.5}
      />

      {/* 室内大堂地坪 */}
      <polygon
        points="136,358 1240,358 1376,748 0,748"
        fill="url(#hall-floor-grad)"
        stroke="#4a321b"
        strokeWidth={2.5}
      />
      <polygon points="136,358 1240,358 1376,748 0,748" fill="url(#hall-floor-tiles)" />

      {/* 立柱列 */}
      {[136, 412, 964, 1240].map((px) => (
        <rect
          key={px}
          x={px - 9}
          y={142}
          width={18}
          height={220}
          fill="#7d2218"
          stroke="#3d120c"
          strokeWidth={1.6}
        />
      ))}

      {/* 后墙支摘格子花窗（透出街市天光） */}
      {[215, 1025].map((wx) => (
        <g key={wx} transform={`translate(${wx}, 182)`}>
          <rect
            x={0}
            y={0}
            width={136}
            height={112}
            rx={3}
            fill={isForeign ? '#8fb3c9' : '#a9c7be'}
            fillOpacity={0.62}
            stroke="#5c3d22"
            strokeWidth={3}
          />
          <line x1={45} y1={0} x2={45} y2={112} stroke="#5c3d22" strokeWidth={2} />
          <line x1={91} y1={0} x2={91} y2={112} stroke="#5c3d22" strokeWidth={2} />
          <line x1={0} y1={37} x2={136} y2={37} stroke="#5c3d22" strokeWidth={2} />
          <line x1={0} y1={74} x2={136} y2={74} stroke="#5c3d22" strokeWidth={2} />
        </g>
      ))}

      {/* 悬梁红纱暖灯 */}
      {[360, 688, 1016].map((lx) => (
        <g key={lx} transform={`translate(${lx}, 142)`}>
          <circle cx={0} cy={48} r={96} fill="url(#lantern-warm-glow)" />
          <line x1={0} y1={0} x2={0} y2={28} stroke="#cfa355" strokeWidth={2.2} />
          <ellipse
            cx={0}
            cy={46}
            rx={22}
            ry={18}
            fill="#b92b1f"
            stroke="#f5cb5c"
            strokeWidth={2}
          />
          <rect x={-10} y={26} width={20} height={5} fill="#3d2312" />
          <rect x={-10} y={62} width={20} height={5} fill="#3d2312" />
          <line x1={0} y1={67} x2={0} y2={82} stroke="#f5cb5c" strokeWidth={2} />
        </g>
      ))}

      {isTavern ? (
        /* ==================== 酒馆独堂陈设：酒垆柜台 + 红泥酒坛 + 四席八仙桌 ==================== */
        <g id="tavern-hall-furnishings">
          {/* 中堂匾额与酒望幌子 */}
          <rect
            x={568}
            y={160}
            width={240}
            height={44}
            rx={4}
            fill="#2b190e"
            stroke="#e5b95c"
            strokeWidth={2.2}
          />
          <text
            x={688}
            y={188}
            textAnchor="middle"
            fontSize={18}
            fontWeight="bold"
            className="song-serif"
            fill="#f7d67c"
          >
            {isForeign ? '塞 外 佳 酿' : '太 白 遗 风'}
          </text>

          {/* 后侧酒架与红泥封坛 */}
          <rect
            x={476}
            y={222}
            width={424}
            height={128}
            fill="#3e2615"
            stroke="#6e4a2b"
            strokeWidth={2.2}
          />
          <line x1={476} y1={268} x2={900} y2={268} stroke="#6e4a2b" strokeWidth={3} />
          <line x1={476} y1={312} x2={900} y2={312} stroke="#6e4a2b" strokeWidth={3} />
          {[520, 586, 652, 724, 790, 856].map((jx) => (
            <g key={jx}>
              <ellipse cx={jx} cy={250} rx={17} ry={15} fill="#6b3e26" stroke="#2c180d" strokeWidth={1.5} />
              <rect x={jx - 9} y={231} width={18} height={6} rx={2} fill="#b91c1c" />
              <ellipse cx={jx} cy={294} rx={18} ry={16} fill="#75452b" stroke="#2c180d" strokeWidth={1.5} />
              <rect x={jx - 10} y={274} width={20} height={6} rx={2} fill="#b91c1c" />
            </g>
          ))}

          {/* 掌柜曲尺酒垆柜台 */}
          <polygon
            points="448,342 928,342 946,406 430,406"
            fill="#6b4426"
            stroke="#362010"
            strokeWidth={2.4}
          />
          <rect
            x={448}
            y={332}
            width={480}
            height={14}
            rx={2}
            fill="#8b5a34"
            stroke="#362010"
            strokeWidth={1.8}
          />

          {/* 堂内四张八仙酒桌与青瓷酒具（纯粹背景陈设，无子建筑切分） */}
          {[
            [310, 476],
            [1066, 476],
            [360, 590],
            [1016, 590],
          ].map(([tx, ty], idx) => (
            <g key={idx} transform={`translate(${tx}, ${ty})`}>
              {/* 左右条凳 */}
              <rect x={-94} y={-22} width={18} height={48} rx={2} fill="#5c3a1e" stroke="#2d1b0c" strokeWidth={1.5} />
              <rect x={76} y={-22} width={18} height={48} rx={2} fill="#5c3a1e" stroke="#2d1b0c" strokeWidth={1.5} />
              {/* 方桌面 */}
              <polygon
                points="-66,-30 66,-30 76,26 -76,26"
                fill="#7c4f2b"
                stroke="#38210f"
                strokeWidth={2}
              />
              {/* 青瓷执壶与酒盏 */}
              <ellipse cx={-14} cy={-4} rx={10} ry={12} fill="#a7c4bc" stroke="#36534c" strokeWidth={1.4} />
              <circle cx={16} cy={-8} r={6} fill="#dfece7" stroke="#4a6b63" strokeWidth={1.2} />
              <circle cx={24} cy={8} r={6} fill="#dfece7" stroke="#4a6b63" strokeWidth={1.2} />
              <circle cx={-26} cy={10} r={6} fill="#dfece7" stroke="#4a6b63" strokeWidth={1.2} />
            </g>
          ))}
        </g>
      ) : (
        /* ==================== 客栈独堂陈设：掌柜账台 + 客房木阶屏风 + 歇脚茶席 ==================== */
        <g id="inn-hall-furnishings">
          {/* 中堂安宿匾额 */}
          <rect
            x={560}
            y={160}
            width={256}
            height={44}
            rx={4}
            fill="#24332a"
            stroke="#e5b95c"
            strokeWidth={2.2}
          />
          <text
            x={688}
            y={188}
            textAnchor="middle"
            fontSize={18}
            fontWeight="bold"
            className="song-serif"
            fill="#f7d67c"
          >
            {isForeign ? '四 海 宾 归' : '宾 至 如 归'}
          </text>

          {/* 中央山水木雕屏风 */}
          <rect
            x={528}
            y={224}
            width={320}
            height={136}
            rx={3}
            fill="#efe5cf"
            stroke="#5a3b20"
            strokeWidth={4}
          />
          <path
            d="M 542 332 Q 605 268 668 312 T 834 282 L 834 348 L 542 348 Z"
            fill="#4d7263"
            fillOpacity={0.45}
          />

          {/* 左侧掌柜算盘账房台与客房号牌架 */}
          <g transform="translate(290, 368)">
            <polygon
              points="-110,-24 110,-24 122,38 -122,38"
              fill="#6a4528"
              stroke="#331e0e"
              strokeWidth={2.2}
            />
            <rect x={-96} y={-34} width={192} height={12} rx={2} fill="#8a5b36" stroke="#331e0e" strokeWidth={1.6} />
            {/* 账册与算盘 */}
            <rect x={-48} y={-32} width={38} height={16} fill="#fef3c7" stroke="#78532a" strokeWidth={1.2} />
            <rect x={14} y={-31} width={34} height={14} fill="#3d2512" stroke="#cfa355" strokeWidth={1.2} />
          </g>

          {/* 右侧通往二楼雅房与后院汤沐的木构折梯（纯装饰景深，不设子建筑热区） */}
          <g transform="translate(1056, 300)">
            {[0, 1, 2, 3, 4, 5].map((step) => (
              <rect
                key={step}
                x={-70 + step * 16}
                y={56 - step * 18}
                width={92}
                height={14}
                fill="#784e2d"
                stroke="#38210f"
                strokeWidth={1.5}
              />
            ))}
            <line x1={-72} y1={42} x2={22} y2={-52} stroke="#523118" strokeWidth={5} />
          </g>

          {/* 堂内两处旅人歇脚茶席与行囊架 */}
          {[
            [390, 536],
            [986, 536],
          ].map(([tx, ty], idx) => (
            <g key={idx} transform={`translate(${tx}, ${ty})`}>
              <rect x={-86} y={-18} width={16} height={42} rx={2} fill="#5c3a1e" stroke="#2d1b0c" strokeWidth={1.4} />
              <rect x={70} y={-18} width={16} height={42} rx={2} fill="#5c3a1e" stroke="#2d1b0c" strokeWidth={1.4} />
              <polygon
                points="-60,-26 60,-26 70,24 -70,24"
                fill="#7a5230"
                stroke="#38210f"
                strokeWidth={2}
              />
              <circle cx={0} cy={-2} r={10} fill="#b7794b" stroke="#472810" strokeWidth={1.4} />
              <circle cx={-22} cy={4} r={5.5} fill="#e6efe9" stroke="#4a6b63" strokeWidth={1.1} />
              <circle cx={22} cy={4} r={5.5} fill="#e6efe9" stroke="#4a6b63" strokeWidth={1.1} />
            </g>
          ))}
        </g>
      )}

      {/* 南侧临街大门出口（对齐 exitGate: x=688, y=698） */}
      <g id="single-hall-south-exit">
        <polygon
          points="518,652 858,652 882,746 494,746"
          fill="#1f352b"
          fillOpacity={0.86}
          stroke="#a7f3d0"
          strokeWidth={2}
        />
        <line x1={548} y1={638} x2={548} y2={746} stroke="#7d2218" strokeWidth={9} />
        <line x1={828} y1={638} x2={828} y2={746} stroke="#7d2218" strokeWidth={9} />
        <path
          d="M 510 648 Q 688 622 866 648"
          fill="none"
          stroke="#e5b95c"
          strokeWidth={4}
        />
      </g>

      {/* 右上角宋画题跋印记 */}
      <g transform="translate(1090, 28)">
        <rect
          x={0}
          y={0}
          width={254}
          height={54}
          rx={4}
          fill="#f8f1e1"
          fillOpacity={0.92}
          stroke="#8c6e46"
          strokeWidth={1.5}
        />
        <rect x={10} y={10} width={32} height={34} rx={3} fill={isTavern ? '#8f1d14' : '#1f5c3a'} />
        <text
          x={26}
          y={32}
          textAnchor="middle"
          fontSize={14}
          fontWeight="bold"
          className="song-serif"
          fill="#fff8eb"
        >
          {isTavern ? '酒肆' : '客栈'}
        </text>
        <text
          x={52}
          y={24}
          fontSize={12}
          fontWeight="bold"
          className="song-serif"
          fill="#23180f"
        >
          {building.name}
        </text>
        <text x={52} y={41} fontSize={10} fill="#6b5235">
          {colophonSubtitle}
        </text>
      </g>
    </g>
  )
}

export function SvgBuildingInteriorFallback({
  building,
  width,
  height,
}: SvgBuildingInteriorFallbackProps) {
  if ((building.interior?.spots.length ?? 0) === 0) {
    return <SingleHallTavernOrInnFallback building={building} width={width} height={height} />
  }

  const theme = getThemeForKind(building.kind)

  return (
    <g id={`svg-interior-fallback-${building.id}`}>
      <defs>
        <linearGradient id="song-sky-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={theme.skyTop} />
          <stop offset="48%" stopColor={theme.skyBottom} />
          <stop offset="100%" stopColor={theme.courtyardFill} />
        </linearGradient>
        <pattern id="song-courtyard-grid" width="64" height="36" patternUnits="userSpaceOnUse">
          <path
            d="M 32 0 L 64 18 L 32 36 L 0 18 Z"
            fill="none"
            stroke={theme.courtyardTile}
            strokeWidth="0.9"
            strokeOpacity="0.42"
          />
        </pattern>
      </defs>

      {/* 远山云气宣纸底纹 */}
      <rect x={0} y={0} width={width} height={height} fill="url(#song-sky-grad)" />

      {/* 远景青绿层峦 */}
      <path
        d="M 0 245 Q 190 120 390 210 T 780 165 T 1140 215 T 1376 175 L 1376 340 L 0 340 Z"
        fill="#2b4c43"
        fillOpacity={0.35}
      />
      <path
        d="M 0 280 Q 260 185 520 250 T 980 205 T 1376 245 L 1376 360 L 0 360 Z"
        fill="#3e6458"
        fillOpacity={0.28}
      />

      {/* 庭院石砖地坪 */}
      <polygon
        points="90,310 1286,310 1356,748 20,748"
        fill={theme.courtyardFill}
        stroke={theme.courtyardTile}
        strokeWidth={2}
      />
      <polygon points="90,310 1286,310 1356,748 20,748" fill="url(#song-courtyard-grid)" />

      {/* 院墙与回廊围合 */}
      <polyline
        points="90,310 20,748 500,748"
        fill="none"
        stroke="#4a3723"
        strokeWidth={6}
        strokeOpacity={0.75}
      />
      <polyline
        points="1286,310 1356,748 876,748"
        fill="none"
        stroke="#4a3723"
        strokeWidth={6}
        strokeOpacity={0.75}
      />

      {/* 中轴御道 / 参道 */}
      <polygon
        points="612,355 764,355 818,655 558,655"
        fill="#e5d8bd"
        fillOpacity={0.72}
        stroke={theme.courtyardTile}
        strokeWidth={1.6}
      />
      {[395, 445, 495, 545, 595].map((yPos) => (
        <line
          key={yPos}
          x1={600 - (yPos - 355) * 0.14}
          y1={yPos}
          x2={776 + (yPos - 355) * 0.14}
          y2={yPos}
          stroke={theme.courtyardTile}
          strokeWidth={1.2}
          strokeOpacity={0.55}
        />
      ))}

      {/* 1. 北侧主殿 / 秘境主石室 (对应 main spot: x=688, y=272) */}
      {theme.isNatural ? (
        <g id="natural-sanctuary-center">
          <path
            d="M 435 352 Q 465 145 688 132 Q 911 145 941 352 Z"
            fill="#3a524a"
            stroke="#c5d8ce"
            strokeWidth={2.5}
          />
          <path
            d="M 565 352 Q 585 215 688 208 Q 791 215 811 352 Z"
            fill="#162622"
            stroke={theme.roofTrim}
            strokeWidth={2}
          />
          {/* 飞瀑流泉装饰 */}
          <path
            d="M 495 180 Q 512 260 488 345"
            fill="none"
            stroke="#d8f3ec"
            strokeWidth={3.5}
            strokeOpacity={0.65}
          />
        </g>
      ) : (
        <g id="song-main-hall">
          {/* 须弥座台基 */}
          <polygon
            points="442,315 934,315 958,358 418,358"
            fill="#dfd3bc"
            stroke="#7d684a"
            strokeWidth={2}
          />
          {/* 殿身木构与朱柱 */}
          <rect
            x={476}
            y={222}
            width={424}
            height={95}
            fill={theme.wallFill}
            stroke="#594028"
            strokeWidth={2}
          />
          {[500, 562, 624, 752, 814, 876].map((px) => (
            <line
              key={px}
              x1={px}
              y1={224}
              x2={px}
              y2={316}
              stroke={theme.pillarFill}
              strokeWidth={7}
            />
          ))}
          {/* 殿门隔扇 */}
          <rect
            x={644}
            y={242}
            width={88}
            height={74}
            fill="#3b2314"
            stroke={theme.roofTrim}
            strokeWidth={1.6}
          />
          {/* 宋式歇山飞檐屋顶 */}
          <path
            d="M 412 232 Q 550 205 688 152 Q 826 205 964 232 L 932 244 L 444 244 Z"
            fill={theme.roofPrimary}
            stroke={theme.roofTrim}
            strokeWidth={2.4}
          />
          <line x1={598} y1={164} x2={778} y2={164} stroke={theme.roofTrim} strokeWidth={4} />
        </g>
      )}

      {/* 2. 西侧演武石坪 / 偏厢 (对应 west spot: x=304, y=438) */}
      <g id="song-west-wing">
        <polygon
          points="158,365 442,365 462,522 138,522"
          fill={theme.wallFill}
          fillOpacity={0.78}
          stroke="#755d3f"
          strokeWidth={2}
        />
        <path
          d="M 136 372 Q 298 330 458 372 Z"
          fill={theme.roofPrimary}
          stroke={theme.roofTrim}
          strokeWidth={1.8}
        />
        <circle
          cx={300}
          cy={452}
          r={42}
          fill="none"
          stroke="#7c6343"
          strokeWidth={1.8}
          strokeDasharray="6 4"
        />
      </g>

      {/* 3. 东侧藏卷碑廊 / 偏殿 (对应 east spot: x=1072, y=438) */}
      <g id="song-east-wing">
        <polygon
          points="934,365 1218,365 1238,522 914,522"
          fill={theme.wallFill}
          fillOpacity={0.78}
          stroke="#755d3f"
          strokeWidth={2}
        />
        <path
          d="M 918 372 Q 1076 330 1240 372 Z"
          fill={theme.roofPrimary}
          stroke={theme.roofTrim}
          strokeWidth={1.8}
        />
        {[965, 1020, 1075, 1130, 1185].map((lx) => (
          <line
            key={lx}
            x1={lx}
            y1={392}
            x2={lx}
            y2={498}
            stroke={theme.pillarFill}
            strokeWidth={4}
            strokeOpacity={0.75}
          />
        ))}
      </g>

      {/* 庭院苍松古柏点景 */}
      {[
        [195, 595],
        [1175, 595],
        [485, 585],
        [890, 585],
      ].map(([tx, ty], idx) => (
        <g key={idx} transform={`translate(${tx}, ${ty})`}>
          <rect x={-4} y={0} width={8} height={26} fill="#593d23" />
          <ellipse cx={0} cy={-8} rx={28} ry={18} fill="#2d5240" fillOpacity={0.85} />
          <ellipse cx={-10} cy={-18} rx={20} ry={13} fill="#3a6650" fillOpacity={0.85} />
        </g>
      ))}

      {/* 4. 南侧仪门 / 山门出口牌坊 (对应 exitGate: x=688, y=698) */}
      <g id="song-south-gate">
        <polygon
          points="518,652 858,652 882,746 494,746"
          fill="#263d33"
          fillOpacity={0.82}
          stroke="#a7f3d0"
          strokeWidth={1.8}
        />
        <line x1={555} y1={642} x2={555} y2={742} stroke={theme.pillarFill} strokeWidth={8} />
        <line x1={821} y1={642} x2={821} y2={742} stroke={theme.pillarFill} strokeWidth={8} />
        <path
          d="M 512 650 Q 688 622 864 650"
          fill="none"
          stroke={theme.roofTrim}
          strokeWidth={4}
        />
      </g>

      {/* 右上角宋画题跋印记（标明当前为《营造法式》矢量内景兜底卷） */}
      <g transform="translate(1110, 32)">
        <rect
          x={0}
          y={0}
          width={234}
          height={54}
          rx={4}
          fill="#f8f1e1"
          fillOpacity={0.9}
          stroke="#8c6e46"
          strokeWidth={1.5}
        />
        <rect x={10} y={10} width={32} height={34} rx={3} fill="#8f1d14" />
        <text
          x={26}
          y={32}
          textAnchor="middle"
          fontSize={14}
          fontWeight="bold"
          className="song-serif"
          fill="#fff8eb"
        >
          营造
        </text>
        <text
          x={52}
          y={24}
          fontSize={12}
          fontWeight="bold"
          className="song-serif"
          fill="#23180f"
        >
          {building.name}
        </text>
        <text x={52} y={41} fontSize={10} fill="#6b5235">
          {theme.accentLabel}（矢量内景卷）
        </text>
      </g>
    </g>
  )
}
