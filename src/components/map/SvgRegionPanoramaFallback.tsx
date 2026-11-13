import type { RegimeKey } from '../../types/game'

interface SvgRegionPanoramaFallbackProps {
  regionId: string
  regionName: string
  regime: RegimeKey
  circuit?: string
  width: number
  height: number
}

interface RegionThemePalette {
  skyTop: string
  skyMid: string
  groundBase: string
  groundInner: string
  mountainFar: string
  mountainNear: string
  waterMain: string
  waterHighlight: string
  wallBody: string
  wallStroke: string
  roadFill: string
  roadTrim: string
  roofSpecial: string
  roofBase: string
  roofTrim: string
  foliage: string
  scrollTag: string
  hasSnowPeaks: boolean
  hasHarborBoats: boolean
  isFrontier: boolean
}

function getRegionPalette(regionId: string, regime: RegimeKey): RegionThemePalette {
  if (regionId === 'liaoyang_liao' || regime === 'liao') {
    return {
      skyTop: '#1f3344',
      skyMid: '#8da6b5',
      groundBase: '#b8ae98',
      groundInner: '#cec4ae',
      mountainFar: '#4c6578',
      mountainNear: '#3b5362',
      waterMain: '#385d73',
      waterHighlight: '#8fb5c9',
      wallBody: '#7a7267',
      wallStroke: '#463f37',
      roadFill: '#b5a58a',
      roadTrim: '#87765c',
      roofSpecial: '#7d291f',
      roofBase: '#3c4a54',
      roofTrim: '#d8b265',
      foliage: '#355245',
      scrollTag: '大辽东京 · 白塔雪岭营造长卷',
      hasSnowPeaks: true,
      hasHarborBoats: false,
      isFrontier: true,
    }
  }

  if (regionId === 'qinzhou') {
    return {
      skyTop: '#332920',
      skyMid: '#c7a97e',
      groundBase: '#bfa27c',
      groundInner: '#d2ba98',
      mountainFar: '#7d563c',
      mountainNear: '#69442e',
      waterMain: '#476a6f',
      waterHighlight: '#96b8ba',
      wallBody: '#8a6f52',
      wallStroke: '#4f3a24',
      roadFill: '#c4aa84',
      roadTrim: '#8c6f4b',
      roofSpecial: '#8a2519',
      roofBase: '#4d4136',
      roofTrim: '#dca954',
      foliage: '#4b5e3c',
      scrollTag: '秦凤雄塞 · 麦积丹崖茶马长卷',
      hasSnowPeaks: false,
      hasHarborBoats: false,
      isFrontier: true,
    }
  }

  if (regionId === 'guangzhou') {
    return {
      skyTop: '#1b3e4b',
      skyMid: '#9bc4c2',
      groundBase: '#b8c4a8',
      groundInner: '#d5ceb4',
      mountainFar: '#39685f',
      mountainNear: '#285249',
      waterMain: '#23596d',
      waterHighlight: '#7ec0cf',
      wallBody: '#8a6d5b',
      wallStroke: '#4d3729',
      roadFill: '#cbbba0',
      roadTrim: '#948164',
      roofSpecial: '#8f2118',
      roofBase: '#2f4e48',
      roofTrim: '#e3b85b',
      foliage: '#25593f',
      scrollTag: '南海首府 · 扶胥千帆番坊长卷',
      hasSnowPeaks: false,
      hasHarborBoats: true,
      isFrontier: false,
    }
  }

  // 潭州府 / 洪州府 及江南荆湘水陆名城通用青绿山水设色
  return {
    skyTop: '#1f3b38',
    skyMid: '#a9c4b6',
    groundBase: '#bcc2a8',
    groundInner: '#d8ceb4',
    mountainFar: '#3c6359',
    mountainNear: '#2b4d44',
    waterMain: '#2c6068',
    waterHighlight: '#8bc1c4',
    wallBody: '#79756c',
    wallStroke: '#423e37',
    roadFill: '#cbbda2',
    roadTrim: '#948367',
    roofSpecial: '#8c2218',
    roofBase: '#354b47',
    roofTrim: '#dfb45c',
    foliage: '#2d5c43',
    scrollTag:
      regionId === 'tanzhou'
        ? '潇湘洙泗 · 岳麓橘洲青绿长卷'
        : '豫章胜境 · 秋水长天飞阁长卷',
    hasSnowPeaks: false,
    hasHarborBoats: true,
    isFrontier: false,
  }
}

function IsoHall({
  cx,
  cy,
  scale = 1,
  roofFill,
  trimFill,
  isPagoda = false,
}: {
  cx: number
  cy: number
  scale?: number
  roofFill: string
  trimFill: string
  isPagoda?: boolean
}) {
  return (
    <g transform={`translate(${cx}, ${cy}) scale(${scale})`}>
      {/* 汉白玉/青石须弥台基 */}
      <polygon
        points="0,-38 78,0 0,38 -78,0"
        fill="#e6dac3"
        stroke="#7d694d"
        strokeWidth={1.8}
      />
      <polygon points="-78,0 0,38 0,50 -78,12" fill="#c7b698" stroke="#7d694d" strokeWidth={1.2} />
      <polygon points="78,0 0,38 0,50 78,12" fill="#b3a080" stroke="#7d694d" strokeWidth={1.2} />

      {/* 殿身木构墙柱 */}
      <rect
        x={-48}
        y={-34}
        width={96}
        height={42}
        rx={2}
        fill="#f2e6cf"
        stroke="#6e3a20"
        strokeWidth={1.8}
      />
      {[-34, -14, 14, 34].map((px) => (
        <line
          key={px}
          x1={px}
          y1={-32}
          x2={px}
          y2={8}
          stroke="#8c261b"
          strokeWidth={3}
        />
      ))}
      <rect x={-11} y={-16} width={22} height={24} fill="#4a2816" />

      {/* 宋式歇山飞檐重顶或高塔 */}
      <polygon
        points="-68,-28 0,-60 68,-28 52,-16 -52,-16"
        fill={roofFill}
        stroke={trimFill}
        strokeWidth={2}
      />
      <polygon
        points="-50,-44 0,-72 50,-44 38,-35 -38,-35"
        fill={roofFill}
        stroke={trimFill}
        strokeWidth={1.6}
      />
      {isPagoda && (
        <>
          <polygon
            points="-34,-62 0,-86 34,-62 25,-54 -25,-54"
            fill={roofFill}
            stroke={trimFill}
            strokeWidth={1.5}
          />
          <line x1={0} y1={-86} x2={0} y2={-104} stroke={trimFill} strokeWidth={3} />
          <circle cx={0} cy={-96} r={3.5} fill={trimFill} />
        </>
      )}
    </g>
  )
}

export function SvgRegionPanoramaFallback({
  regionId,
  regionName,
  regime,
  circuit,
  width,
  height,
}: SvgRegionPanoramaFallbackProps) {
  const pal = getRegionPalette(regionId, regime)
  const gradSkyId = `region-sky-${regionId}`
  const gradGroundId = `region-ground-${regionId}`
  const gradWaterId = `region-water-${regionId}`

  return (
    <g id={`svg-region-panorama-${regionId}`} pointerEvents="none">
      <defs>
        <linearGradient id={gradSkyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={pal.skyTop} />
          <stop offset="42%" stopColor={pal.skyMid} />
          <stop offset="100%" stopColor={pal.groundBase} />
        </linearGradient>
        <linearGradient id={gradGroundId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={pal.groundBase} />
          <stop offset="55%" stopColor={pal.groundInner} />
          <stop offset="100%" stopColor={pal.groundBase} />
        </linearGradient>
        <linearGradient id={gradWaterId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={pal.waterMain} stopOpacity="0.92" />
          <stop offset="50%" stopColor={pal.waterHighlight} stopOpacity="0.78" />
          <stop offset="100%" stopColor={pal.waterMain} stopOpacity="0.92" />
        </linearGradient>
      </defs>

      {/* 天幕与大地宣纸青绿底色 */}
      <rect x={0} y={0} width={width} height={height} fill={`url(#${gradSkyId})`} />
      <rect x={0} y={195} width={width} height={height - 195} fill={`url(#${gradGroundId})`} />

      {/* 远山叠嶂（千里江山青绿皴染意象） */}
      <path
        d="M 0 210 L 130 112 L 265 168 L 410 88 L 560 162 L 690 74 L 835 156 L 990 92 L 1145 164 L 1280 106 L 1376 178 L 1376 250 L 0 250 Z"
        fill={pal.mountainFar}
        fillOpacity={0.78}
      />
      <path
        d="M 0 236 L 95 166 L 235 208 L 365 142 L 520 212 L 688 136 L 860 210 L 1030 144 L 1195 206 L 1376 158 L 1376 268 L 0 268 Z"
        fill={pal.mountainNear}
        fillOpacity={0.86}
      />

      {pal.hasSnowPeaks && (
        <g fill="#f4f7fa" fillOpacity={0.72}>
          <polygon points="410,88 380,115 412,108 442,118" />
          <polygon points="690,74 654,108 690,98 726,110" />
          <polygon points="990,92 960,120 992,110 1024,122" />
        </g>
      )}

      {/* 云气留白 */}
      <g fill="#f7f1e1" fillOpacity={0.32}>
        <ellipse cx={240} cy={148} rx={135} ry={18} />
        <ellipse cx={690} cy={126} rx={165} ry={20} />
        <ellipse cx={1120} cy={150} rx={140} ry={18} />
      </g>

      {/* 江海津渡 / 护城清流横贯中景 */}
      <path
        d="M 0 286 Q 340 254, 688 282 T 1376 274 L 1376 340 Q 1030 356, 688 332 T 0 344 Z"
        fill={`url(#${gradWaterId})`}
      />
      <path
        d="M 40 308 Q 360 282, 688 306 T 1336 298"
        fill="none"
        stroke="#eef7f8"
        strokeWidth={1.6}
        strokeDasharray="18 12"
        strokeOpacity={0.55}
      />

      {/* 宋式虹桥连接城北名胜与城内坊市 */}
      {[286, 688, 1090].map((bx) => (
        <g key={bx} transform={`translate(${bx}, 310)`}>
          <path
            d="M -34 26 Q 0 -8, 34 26"
            fill="#c9b38c"
            stroke="#5e462a"
            strokeWidth={3}
          />
          <line x1={-28} y1={18} x2={28} y2={18} stroke="#7c5d38" strokeWidth={2} />
        </g>
      ))}

      {/* 水面帆影（广州/潭州/洪州）或边塞烽火牧骑点缀 */}
      {pal.hasHarborBoats && (
        <g>
          {[165, 515, 885, 1235].map((sx, idx) => (
            <g key={sx} transform={`translate(${sx}, ${298 + (idx % 2) * 12})`}>
              <polygon points="-20,6 20,6 13,14 -13,14" fill="#5c3b20" />
              <polygon points="0,-18 16,4 0,4" fill="#f5ebd4" stroke="#8c714c" strokeWidth={1} />
            </g>
          ))}
        </g>
      )}

      {/* 等轴州府高垣女墙（围合中下坊市，正南门对齐 [688, 692]） */}
      <polygon
        points="118,358 1258,358 1316,668 790,694 688,694 586,694 60,668"
        fill={pal.groundInner}
        fillOpacity={0.55}
        stroke={pal.wallStroke}
        strokeWidth={2}
      />

      {/* 东西北三面城垣与南门瓮城 */}
      <path
        d="M 118 358 L 1258 358 L 1316 668 L 784 692 M 592 692 L 60 668 Z"
        fill="none"
        stroke={pal.wallBody}
        strokeWidth={14}
        strokeLinejoin="round"
      />
      <path
        d="M 118 358 L 1258 358 L 1316 668 L 784 692 M 592 692 L 60 668 Z"
        fill="none"
        stroke={pal.wallStroke}
        strokeWidth={2.5}
        strokeDasharray="12 6"
      />

      {/* 御街十字坊市青石官道（精准串联五座基础建筑与三大名胜地标） */}
      <g fill={pal.roadFill} stroke={pal.roadTrim} strokeWidth={1.6}>
        {/* 中轴南北天街 */}
        <polygon points="658,210 718,210 732,692 644,692" />
        {/* 城北名胜横街 */}
        <polygon points="256,214 1120,214 1130,242 246,242" />
        {/* 城中衙署酒楼客栈横街 */}
        <polygon points="180,424 1196,424 1208,458 168,458" />
        {/* 城南武馆书院横街 */}
        <polygon points="280,572 1096,572 1108,602 268,602" />
      </g>

      {/* 坊墙棋盘肌理与古树园林点景 */}
      <g fill={pal.foliage} fillOpacity={0.72}>
        {[
          [175, 250],
          [420, 246],
          [950, 246],
          [1200, 252],
          [165, 515],
          [530, 510],
          [845, 510],
          [1205, 515],
          [235, 635],
          [1140, 635],
        ].map(([tx, ty], i) => (
          <g key={i} transform={`translate(${tx}, ${ty})`}>
            <circle cx={0} cy={0} r={16} />
            <circle cx={12} cy={6} r={12} />
            <circle cx={-11} cy={7} r={11} />
          </g>
        ))}
      </g>

      {/* 上区三座特殊地标古建底座（对齐 [286,224] / [688,196] / [1090,226]） */}
      <IsoHall
        cx={286}
        cy={226}
        scale={0.96}
        roofFill={pal.roofSpecial}
        trimFill={pal.roofTrim}
      />
      <IsoHall
        cx={688}
        cy={196}
        scale={1.08}
        roofFill={pal.roofSpecial}
        trimFill={pal.roofTrim}
        isPagoda={
          regionId === 'liaoyang_liao' || regionId === 'guangzhou' || regionId === 'tanzhou'
        }
      />
      <IsoHall
        cx={1090}
        cy={226}
        scale={0.96}
        roofFill={pal.roofSpecial}
        trimFill={pal.roofTrim}
      />

      {/* 中下区五座基础坊市院落（对齐 [270,442] / [688,428] / [1102,442] / [388,585] / [988,585]） */}
      <IsoHall cx={270} cy={442} scale={0.82} roofFill={pal.roofBase} trimFill="#c8b08a" />
      <IsoHall cx={688} cy={428} scale={0.86} roofFill={pal.roofBase} trimFill={pal.roofTrim} />
      <IsoHall cx={1102} cy={442} scale={0.82} roofFill={pal.roofBase} trimFill="#c8b08a" />
      <IsoHall cx={388} cy={585} scale={0.8} roofFill={pal.roofBase} trimFill="#c8b08a" />
      <IsoHall cx={988} cy={585} scale={0.8} roofFill={pal.roofBase} trimFill="#c8b08a" />

      {/* 南门谯楼与出城通道（对齐 [688, 692]） */}
      <g transform="translate(688, 686)">
        <polygon
          points="-96,-14 96,-14 112,24 -112,24"
          fill={pal.wallBody}
          stroke={pal.wallStroke}
          strokeWidth={2.2}
        />
        <path d="M -22 24 L -22 -2 Q 0 -16, 22 -2 L 22 24 Z" fill="#23170f" />
        <polygon
          points="-64,-14 0,-38 64,-14"
          fill={pal.roofSpecial}
          stroke={pal.roofTrim}
          strokeWidth={1.8}
        />
      </g>

      {/* 右下角古籍题跋压角印记 */}
      <g transform={`translate(${width - 270}, ${height - 54})`} opacity={0.88}>
        <rect
          x={0}
          y={0}
          width={248}
          height={36}
          rx={4}
          fill="#23170e"
          fillOpacity={0.82}
          stroke="#c89d54"
          strokeWidth={1.2}
        />
        <text
          x={14}
          y={15}
          fontSize={11}
          fontWeight="bold"
          fill="#f6cf65"
          className="song-serif"
        >
          {regionName}
          {circuit ? ` · ${circuit}` : ''}
        </text>
        <text x={14} y={29} fontSize={9.5} fill="#e6d6b8" className="song-serif">
          {pal.scrollTag}
        </text>
      </g>
    </g>
  )
}
