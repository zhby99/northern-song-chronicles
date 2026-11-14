export interface SpotShopItemEntry {
  itemId: string
  price: number
  note?: string
}

export interface SpotShopConfig {
  spotId: string
  regionId: string
  title: string
  subtitle: string
  requiredSectId?: string
  items: SpotShopItemEntry[]
}

export const SPOT_SHOPS: SpotShopConfig[] = [
  {
    spotId: 'zd_sp_hall',
    regionId: 'zhending',
    title: '常山枪派军械库',
    subtitle: '本门弟子专属 · 边军制式弓甲枪械内部平价采办',
    requiredSectId: 'SECT-22',
    items: [
      { itemId: 'BOW-009', price: 15, note: '弓箭 · 边军制式克敌强弓' },
      { itemId: 'BOT-009', price: 25, note: '鞋履 · 禁军牛皮战靴' },
      { itemId: 'ARM-017', price: 50, note: '服饰 · 禁军铁叶重甲' },
      { itemId: 'WPN-053', price: 25, note: '兵器 · 南北作坊精锻点钢枪' },
    ],
  },
  {
    spotId: 'bl_kf_liushan',
    regionId: 'bianliang',
    title: '六扇门甲仗库',
    subtitle: '开封府/六扇门成员专属 · 官府制式披挂兵器采办',
    requiredSectId: 'SECT-17',
    items: [
      { itemId: 'BOW-009', price: 25, note: '弓箭 · 大宋边军克敌弓' },
      { itemId: 'BOT-009', price: 35, note: '鞋履 · 大宋禁军牛皮战靴' },
      { itemId: 'ARM-017', price: 70, note: '服饰 · 大宋禁军铁叶甲' },
      { itemId: 'WPN-053', price: 35, note: '兵器 · 南北作坊点钢枪' },
      { itemId: 'ACC-020', price: 35, note: '配饰 · 汴京精钢护心镜' },
    ],
  },
  {
    spotId: 'zd_mk_horse',
    regionId: 'zhending',
    title: '塞北良驹互市马栏',
    subtitle: '宋辽榷场官市 · 江湖群侠皆可购置良驹与华北/大辽凡阶坐骑',
    items: [
      { itemId: 'MNT-015', price: 100, note: '良阶 · 官道急脚快马' },
      { itemId: 'MNT-013', price: 150, note: '良阶 · 塞外黄骠战马' },
      { itemId: 'MNT-012', price: 200, note: '良阶 · 沙苑群牧精骑' },
      { itemId: 'MNT-017', price: 50, note: '凡阶上品 · 华北（汴京）' },
      { itemId: 'MNT-019', price: 50, note: '凡阶上品 · 华北（太原）' },
      { itemId: 'MNT-020', price: 50, note: '凡阶上品 · 大辽（析津）' },
      { itemId: 'MNT-021', price: 30, note: '凡阶中品 · 华北（太行）' },
      { itemId: 'MNT-027', price: 15, note: '凡阶下品 · 华北（齐鲁）' },
      { itemId: 'MNT-028', price: 15, note: '凡阶下品 · 华北（洛阳）' },
    ],
  },
]

export const SPOT_SHOPS_BY_SPOT_ID: Record<string, SpotShopConfig> = Object.fromEntries(
  SPOT_SHOPS.map((s) => [s.spotId, s]),
)
