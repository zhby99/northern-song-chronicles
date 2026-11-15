import type { EquippedSlotsMap, ProtagonistGender } from '../types/game'

export interface ProtagonistPortraitPreset {
  id: string
  label: string
  gender: ProtagonistGender
  avatarUrl: string
  fullbodyUrl: string
}

export const PROTAGONIST_PORTRAITS: ProtagonistPortraitPreset[] = [
  {
    id: 'hero_01_assassin',
    label: '影刃游侠',
    gender: '男',
    avatarUrl: '/assets/characters/protagonists/hero_01_assassin_av.jpg',
    fullbodyUrl: '/assets/characters/protagonists/hero_01_assassin_fb.jpg',
  },
  {
    id: 'hero_02_shaolin',
    label: '少林佛子',
    gender: '男',
    avatarUrl: '/assets/characters/protagonists/hero_02_shaolin_av.jpg',
    fullbodyUrl: '/assets/characters/protagonists/hero_02_shaolin_fb.jpg',
  },
  {
    id: 'hero_03_spearman',
    label: '忠烈枪客',
    gender: '男',
    avatarUrl: '/assets/characters/protagonists/hero_03_spearman_av.jpg',
    fullbodyUrl: '/assets/characters/protagonists/hero_03_spearman_fb.jpg',
  },
  {
    id: 'hero_04_swordsman',
    label: '青衫剑客',
    gender: '男',
    avatarUrl: '/assets/characters/protagonists/hero_04_swordsman_av.jpg',
    fullbodyUrl: '/assets/characters/protagonists/hero_04_swordsman_fb.jpg',
  },
  {
    id: 'hero_05_sabre',
    label: '豪情刀客',
    gender: '男',
    avatarUrl: '/assets/characters/protagonists/hero_05_sabre_av.jpg',
    fullbodyUrl: '/assets/characters/protagonists/hero_05_sabre_fb.jpg',
  },
  {
    id: 'hero_06_physician',
    label: '悬壶医者',
    gender: '男',
    avatarUrl: '/assets/characters/protagonists/hero_06_physician_av.jpg',
    fullbodyUrl: '/assets/characters/protagonists/hero_06_physician_fb.jpg',
  },
  {
    id: 'hero_07_tangmen',
    label: '蜀中机关',
    gender: '男',
    avatarUrl: '/assets/characters/protagonists/hero_07_tangmen_av.jpg',
    fullbodyUrl: '/assets/characters/protagonists/hero_07_tangmen_fb.jpg',
  },
  {
    id: 'hero_08_guard',
    label: '御前带刀',
    gender: '男',
    avatarUrl: '/assets/characters/protagonists/hero_08_guard_av.jpg',
    fullbodyUrl: '/assets/characters/protagonists/hero_08_guard_fb.jpg',
  },
  {
    id: 'hero_09_scholar',
    label: '汴京儒生',
    gender: '男',
    avatarUrl: '/assets/characters/protagonists/hero_09_scholar_av.jpg',
    fullbodyUrl: '/assets/characters/protagonists/hero_09_scholar_fb.jpg',
  },
  {
    id: 'hero_10_noble',
    label: '世家公子',
    gender: '男',
    avatarUrl: '/assets/characters/protagonists/hero_10_noble_av.jpg',
    fullbodyUrl: '/assets/characters/protagonists/hero_10_noble_fb.jpg',
  },
  {
    id: 'hero_11_swordmaiden',
    label: '名门剑姬',
    gender: '女',
    avatarUrl: '/assets/characters/protagonists/hero_11_swordmaiden_av.jpg',
    fullbodyUrl: '/assets/characters/protagonists/hero_11_swordmaiden_fb.jpg',
  },
  {
    id: 'hero_12_general',
    label: '红妆女将',
    gender: '女',
    avatarUrl: '/assets/characters/protagonists/hero_12_general_av.jpg',
    fullbodyUrl: '/assets/characters/protagonists/hero_12_general_fb.jpg',
  },
  {
    id: 'hero_13_musician',
    label: '江南琴侠',
    gender: '女',
    avatarUrl: '/assets/characters/protagonists/hero_13_musician_av.jpg',
    fullbodyUrl: '/assets/characters/protagonists/hero_13_musician_fb.jpg',
  },
  {
    id: 'hero_14_noblewoman',
    label: '皇城千金',
    gender: '女',
    avatarUrl: '/assets/characters/protagonists/hero_14_noblewoman_av.jpg',
    fullbodyUrl: '/assets/characters/protagonists/hero_14_noblewoman_fb.jpg',
  },
  {
    id: 'hero_15_assassin',
    label: '玄衣女刺',
    gender: '女',
    avatarUrl: '/assets/characters/protagonists/hero_15_assassin_av.jpg',
    fullbodyUrl: '/assets/characters/protagonists/hero_15_assassin_fb.jpg',
  },
]

export function getProtagonistPortrait(id: string | null | undefined): ProtagonistPortraitPreset {
  return (
    PROTAGONIST_PORTRAITS.find((p) => p.id === id) ??
    PROTAGONIST_PORTRAITS[3] // 默认青衫剑客
  )
}

export function getProtagonistGender(id: string | null | undefined): ProtagonistGender {
  return getProtagonistPortrait(id).gender
}

/** 初始配装：市井粗布鞋、市井茶博士围裙衫、旧铜钱挂坠、粗麻平安绳 */
export const INITIAL_STARTER_EQUIPPED: EquippedSlotsMap = {
  weapon: null,
  armor: 'ARM-044', // 市井茶博士围裙衫
  shoes: 'BOT-025', // 市井粗布鞋
  bow: null,
  accessory1: 'ACC-052', // 旧铜钱挂坠
  accessory2: 'ACC-049', // 粗麻平安绳
  curio1: null,
  curio2: null,
  mount: null,
}

const SONG_SURNAMES = [
  '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈',
  '褚', '卫', '沈', '韩', '杨', '朱', '秦', '许', '何', '吕',
  '张', '孔', '曹', '严', '华', '苏', '范', '欧阳', '司马', '慕容',
  '林', '陆', '辛', '岳', '狄', '包', '文', '晏', '程', '黄',
]

const SONG_GIVEN_NAMES = [
  '子瞻', '介甫', '君实', '希文', '永叔', '明远', '行之', '景初',
  '清照', '幼安', '放翁', '无咎', '少游', '子美', '庭坚', '伯驹',
  '青云', '凌风', '云飞', '长风', '疏影', '寒松', '竹溪', '墨染',
  '阿福', '小乙', '平安', '长生', '知节', '怀瑾', '承恩', '思齐',
]

export function generateRandomHeroName(): string {
  const surname = SONG_SURNAMES[Math.floor(Math.random() * SONG_SURNAMES.length)]
  const given = SONG_GIVEN_NAMES[Math.floor(Math.random() * SONG_GIVEN_NAMES.length)]
  return `${surname}${given}`
}
