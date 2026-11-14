import { TREASURE_COMPENDIUM_ITEMS, type TreasureVolumeKey } from '../../data/itemsDb'
import type {
  CompendiumTabKey,
  CompiledNpcRecord,
  EquipmentSlotKey,
  InventoryStack,
  MenuTabKey,
  WeaponSubCategory,
} from '../../types/game'

export const WEAPON_SUB_CATEGORIES: WeaponSubCategory[] = [
  '剑',
  '刀',
  '枪',
  '棍棒',
  '拳掌护手',
  '暗器',
  '奇门音兵',
]

export interface NavItemMeta<K extends string> {
  key: K
  numeral: string
  label: string
  seal: string
  subtitle: string
  badge: string
}

// 【行囊枢机】专属卷册（不含任何图鉴）
export const SYSTEM_NAV_ITEMS: Array<NavItemMeta<MenuTabKey>> = [
  {
    key: 'hero',
    numeral: '壹',
    label: '主角面板',
    seal: '侠',
    subtitle: '少侠全身立绘、生存气血体能、实战四维总览、先天三维禀赋、官道脚力与北宋十艺百工修为',
    badge: 'M1-0 已实装',
  },
  {
    key: 'loadout',
    numeral: '贰',
    label: '披挂与武学',
    seal: '武',
    subtitle: '7 槽位可视化随身披挂（含兵武共鸣）+ 6 槽位运使武学（主运内功 · 轻功身法 · 四门出战招式）与所习武学演练',
    badge: '百兵共鸣',
  },
  {
    key: 'bag',
    numeral: '叁',
    label: '行囊四库',
    seal: '囊',
    subtitle: '少侠随身四分类行囊（典籍书画 · 丹药毒物 · 雅器百工 · 行囊杂物）及银两粮草补给、展卷服食佩挂',
    badge: '随身行囊',
  },
  {
    key: 'quests',
    numeral: '肆',
    label: '江湖纪事',
    seal: '纪',
    subtitle: '进行中门派试炼与州府奇遇任务链追踪、目标舆图一键定位、已完结传记及江湖因果声名录',
    badge: '任务卷宗',
  },
  {
    key: 'engineering',
    numeral: '伍',
    label: '工程与字典',
    seal: '枢',
    subtitle: '静态资源按需懒加载遥测 + 跨分支标准 ID 字典（43地 / 30派+11组织 / 242功 / 100兵 / 28骑 / 180奇珍 / 1000人）',
    badge: 'M0-2 已实装',
  },
  {
    key: 'save',
    numeral: '陆',
    label: '存 档',
    seal: '录',
    subtitle: '多槽位 IndexedDB 卷宗持久化（含裸身根基、披挂、武学重数、门派与任务链状态）、手札批注与 JSON 导出',
    badge: 'M1.4 卷宗',
  },
  {
    key: 'load',
    numeral: '柒',
    label: '读 档',
    seal: '启',
    subtitle: '读取当前版本卷宗回溯三层空间、披挂武学与剧情任务现场，或从本地导入 .json 存档文件',
    badge: 'M1.4 卷宗',
  },
  {
    key: 'settings',
    numeral: '捌',
    label: '设 置',
    seal: '律',
    subtitle: '皇祐雅乐坊（《东京梦华》背景配乐控制）、舆图显示偏好与牌匾标注调校',
    badge: '雅乐已启',
  },
]

// 【图鉴】按钮专属卷册（统辖全部七大图鉴：地区 / 门派 / 群侠 / 武学 / 披挂 / 坐骑 / 博物）
export const COMPENDIUM_NAV_ITEMS: Array<NavItemMeta<CompendiumTabKey>> = [
  {
    key: 'regions',
    numeral: '壹',
    label: '地区图鉴',
    seal: '舆',
    subtitle: '皇祐山海舆地全鉴：26座州府王都 + 17处名山秘境与雄关（共43地）、268座城郭殿宇、驿路网与风物风闻',
    badge: '43地全录',
  },
  {
    key: 'sects',
    numeral: '贰',
    label: '门派图鉴',
    seal: '宗',
    subtitle: '天下三十武林门派三级金字塔（18一流大派 · 6二流武盟 · 6三流武馆）及 11 大庙堂儒林四夷组织全典',
    badge: '30派+11势力',
  },
  {
    key: 'portraits',
    numeral: '叁',
    label: '群侠图鉴',
    seal: '谱',
    subtitle: '全量 1,000 位皇祐人物档案、3:4 等比画轴全身像对齐与高清点击放大品鉴（头像/全身双视图）',
    badge: '1000人全录',
  },
  {
    key: 'martialArts',
    numeral: '肆',
    label: '武学总纲',
    seal: '典',
    subtitle: '四阶十二品共 242 门天下武学全录、天阶前置校验词条、门派归属索引与主角习得状态标记',
    badge: '242功全录',
  },
  {
    key: 'armory',
    numeral: '伍',
    label: '披挂总纲',
    seal: '兵',
    subtitle: '皇祐五卷披挂全录：百兵谱100 · 衣甲服饰谱56 · 履靴行缠谱28 · 强弓劲弩谱28 · 玉佩奇珍谱56 及兵武共鸣',
    badge: '268披挂全录',
  },
  {
    key: 'mounts',
    numeral: '陆',
    label: '坐骑图鉴',
    seal: '驹',
    subtitle: '第六卷《名驹鞍辔谱》28 种良驹全录（3天阶 · 5地阶 · 8良阶 · 12凡阶）、茶马榷场考据与专擅地貌脚力',
    badge: '28骑全录',
  },
  {
    key: 'treasures',
    numeral: '柒',
    label: '博物图鉴',
    seal: '鉴',
    subtitle: '皇祐三卷奇珍全录：卷壹《典籍书画》100卷 · 卷贰《丹药毒物》30品 · 卷叁《雅器百工》50件（共180品）',
    badge: '180品全录',
  },
]

export function formatSavedTime(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

export interface LightboxState {
  url: string
  title: string
  subtitle: string
  npc?: CompiledNpcRecord
  mode?: 'fullbody' | 'avatar'
}

export function buildNpcLightboxState(
  npc: CompiledNpcRecord,
  mode: 'fullbody' | 'avatar',
): LightboxState {
  const effectiveAvatar = npc.avatarUrl ?? npc.templateAvatarUrl
  const url =
    mode === 'avatar' && effectiveAvatar ? effectiveAvatar : (npc.fullbodyUrl ?? npc.templateUrl)
  const kindLabel =
    mode === 'avatar' && effectiveAvatar
      ? npc.avatarUrl
        ? '独立半身头像'
        : '门派母版半身头像'
      : npc.fullbodyUrl
        ? '独立全身立绘原画'
        : '门派身份母版全身像'
  return {
    url,
    title: `${npc.name} · ${npc.title}`,
    subtitle: `[${npc.id}] ${npc.factionName} · ${npc.role} · ${npc.realm} · 常驻【${npc.fullLocationLabel}】（${kindLabel}）`,
    npc,
    mode: mode === 'avatar' && effectiveAvatar ? 'avatar' : 'fullbody',
  }
}

export type TreasureCollectionStats = Record<
  'ALL' | TreasureVolumeKey,
  { total: number; owned: number }
>

export function computeTreasureCollectionStats(
  inventory: InventoryStack[],
  equipped: Record<EquipmentSlotKey, string | null>,
  consumedUniqueIds: string[] = [],
): TreasureCollectionStats {
  const ownedQtyMap = new Map<string, number>()
  for (const st of inventory) {
    ownedQtyMap.set(st.itemId, st.qty)
  }
  const equippedItemIdSet = new Set<string>()
  for (const id of Object.values(equipped)) {
    if (id) equippedItemIdSet.add(id)
  }
  const consumedSet = new Set<string>(consumedUniqueIds)

  const stats: TreasureCollectionStats = {
    ALL: { total: 0, owned: 0 },
    scrolls: { total: 0, owned: 0 },
    medicine: { total: 0, owned: 0 },
    tools: { total: 0, owned: 0 },
  }
  for (const item of TREASURE_COMPENDIUM_ITEMS) {
    const cat = item.category as TreasureVolumeKey
    const isOwned =
      (ownedQtyMap.get(item.id) ?? 0) > 0 ||
      equippedItemIdSet.has(item.id) ||
      consumedSet.has(item.id)
    stats.ALL.total += 1
    stats[cat].total += 1
    if (isOwned) {
      stats.ALL.owned += 1
      stats[cat].owned += 1
    }
  }
  return stats
}
