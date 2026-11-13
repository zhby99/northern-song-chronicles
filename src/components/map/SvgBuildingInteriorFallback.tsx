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

export function SvgBuildingInteriorFallback({
  building,
  width,
  height,
}: SvgBuildingInteriorFallbackProps) {
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
