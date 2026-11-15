/**
 * 根据人物姓名、头衔与所属势力智能匹配贴合身份的宋画立绘模板，
 * 杜绝“老僧/船夫/长者默认回退成强盗或书生”的立绘错配问题。
 * 所有返回路径均严格对应 public/assets/characters/templates/ 下真实存在的图片。
 */
export interface PortraitInferenceMeta {
  name?: string | null
  title?: string | null
  factionId?: string | null
  factionName?: string | null
}

const KNOWN_AVATAR_COUNTERPARTS: Record<string, string> = {
  '/assets/characters/templates/tpl_baicao_female_fb.jpg':
    '/assets/characters/templates/tpl_baicao_female_av.jpg',
  '/assets/characters/templates/tpl_baicao_male_fb.jpg':
    '/assets/characters/templates/tpl_baicao_male_av.jpg',
  '/assets/characters/templates/tpl_baji_female_fb.jpg':
    '/assets/characters/templates/tpl_baji_female_av.jpg',
  '/assets/characters/templates/tpl_baji_male_fb.jpg':
    '/assets/characters/templates/tpl_baji_male_av.jpg',
  '/assets/characters/templates/tpl_caobang_fb.jpg':
    '/assets/characters/templates/tpl_caobang_av.jpg',
  '/assets/characters/templates/tpl_caobang_female_fb.jpg':
    '/assets/characters/templates/tpl_caobang_female_av.jpg',
  '/assets/characters/templates/tpl_changshan_female_fb.jpg':
    '/assets/characters/templates/tpl_changshan_female_av.jpg',
  '/assets/characters/templates/tpl_changshan_male_fb.jpg':
    '/assets/characters/templates/tpl_changshan_male_av.jpg',
  '/assets/characters/templates/tpl_chaquan_female_fb.jpg':
    '/assets/characters/templates/tpl_chaquan_female_av.jpg',
  '/assets/characters/templates/tpl_chaquan_male_fb.jpg':
    '/assets/characters/templates/tpl_chaquan_male_av.jpg',
  '/assets/characters/templates/tpl_dali_royal_male_fb.jpg':
    '/assets/characters/templates/tpl_dali_royal_male_av.jpg',
  '/assets/characters/templates/tpl_emei_female_fb.jpg':
    '/assets/characters/templates/tpl_emei_female_av.jpg',
  '/assets/characters/templates/tpl_emei_male_fb.jpg':
    '/assets/characters/templates/tpl_emei_male_av.jpg',
  '/assets/characters/templates/tpl_gaibang_fb.jpg':
    '/assets/characters/templates/tpl_gaibang_av.jpg',
  '/assets/characters/templates/tpl_gaibang_female_fb.jpg':
    '/assets/characters/templates/tpl_gaibang_female_av.jpg',
  '/assets/characters/templates/tpl_greenwood_sect_fb.jpg':
    '/assets/characters/templates/tpl_greenwood_sect_av.jpg',
  '/assets/characters/templates/tpl_greenwood_sect_female_fb.jpg':
    '/assets/characters/templates/tpl_greenwood_sect_female_av.jpg',
  '/assets/characters/templates/tpl_hongmen_female_fb.jpg':
    '/assets/characters/templates/tpl_hongmen_female_av.jpg',
  '/assets/characters/templates/tpl_hongmen_male_fb.jpg':
    '/assets/characters/templates/tpl_hongmen_male_av.jpg',
  '/assets/characters/templates/tpl_huashan_fb.jpg':
    '/assets/characters/templates/tpl_huashan_av.jpg',
  '/assets/characters/templates/tpl_huashan_female_fb.jpg':
    '/assets/characters/templates/tpl_huashan_female_av.jpg',
  '/assets/characters/templates/tpl_jindaomen_male_fb.jpg':
    '/assets/characters/templates/tpl_jindaomen_male_av.jpg',
  '/assets/characters/templates/tpl_jinhuan_male_fb.jpg':
    '/assets/characters/templates/tpl_jinhuan_male_av.jpg',
  '/assets/characters/templates/tpl_liao_court_male_fb.jpg':
    '/assets/characters/templates/tpl_liao_court_male_av.jpg',
  '/assets/characters/templates/tpl_liao_spy_female_fb.jpg':
    '/assets/characters/templates/tpl_liao_spy_female_av.jpg',
  '/assets/characters/templates/tpl_liao_spy_male_fb.jpg':
    '/assets/characters/templates/tpl_liao_spy_male_av.jpg',
  '/assets/characters/templates/tpl_liushenmen_female_fb.jpg':
    '/assets/characters/templates/tpl_liushenmen_female_av.jpg',
  '/assets/characters/templates/tpl_liushenmen_male_fb.jpg':
    '/assets/characters/templates/tpl_liushenmen_male_av.jpg',
  '/assets/characters/templates/tpl_murong_female_fb.jpg':
    '/assets/characters/templates/tpl_murong_female_av.jpg',
  '/assets/characters/templates/tpl_murong_male_fb.jpg':
    '/assets/characters/templates/tpl_murong_male_av.jpg',
  '/assets/characters/templates/tpl_nanshaolin_male_fb.jpg':
    '/assets/characters/templates/tpl_nanshaolin_male_av.jpg',
  '/assets/characters/templates/tpl_qiantang_male_fb.jpg':
    '/assets/characters/templates/tpl_qiantang_male_av.jpg',
  '/assets/characters/templates/tpl_qingcheng_fb.jpg':
    '/assets/characters/templates/tpl_qingcheng_av.jpg',
  '/assets/characters/templates/tpl_qingcheng_female_fb.jpg':
    '/assets/characters/templates/tpl_qingcheng_female_av.jpg',
  '/assets/characters/templates/tpl_sanren_female_fb.jpg':
    '/assets/characters/templates/tpl_sanren_female_av.jpg',
  '/assets/characters/templates/tpl_sanren_male_fb.jpg':
    '/assets/characters/templates/tpl_sanren_male_av.jpg',
  '/assets/characters/templates/tpl_shaolin_songshan_male_fb.jpg':
    '/assets/characters/templates/tpl_shaolin_songshan_male_av.jpg',
  '/assets/characters/templates/tpl_taishan_fb.jpg':
    '/assets/characters/templates/tpl_taishan_av.jpg',
  '/assets/characters/templates/tpl_taishan_female_fb.jpg':
    '/assets/characters/templates/tpl_taishan_female_av.jpg',
  '/assets/characters/templates/tpl_tangmen_fb.jpg':
    '/assets/characters/templates/tpl_tangmen_av.jpg',
  '/assets/characters/templates/tpl_tangmen_male_fb.jpg':
    '/assets/characters/templates/tpl_tangmen_male_av.jpg',
  '/assets/characters/templates/tpl_taohuadao_female_fb.jpg':
    '/assets/characters/templates/tpl_taohuadao_female_av.jpg',
  '/assets/characters/templates/tpl_taohuadao_male_fb.jpg':
    '/assets/characters/templates/tpl_taohuadao_male_av.jpg',
  '/assets/characters/templates/tpl_tiezhang_fb.jpg':
    '/assets/characters/templates/tpl_tiezhang_av.jpg',
  '/assets/characters/templates/tpl_tiezhang_female_fb.jpg':
    '/assets/characters/templates/tpl_tiezhang_female_av.jpg',
  '/assets/characters/templates/tpl_wudang_fb.jpg':
    '/assets/characters/templates/tpl_wudang_av.jpg',
  '/assets/characters/templates/tpl_wudang_female_fb.jpg':
    '/assets/characters/templates/tpl_wudang_female_av.jpg',
  '/assets/characters/templates/tpl_wutai_monk_male_fb.jpg':
    '/assets/characters/templates/tpl_wutai_monk_male_av.jpg',
  '/assets/characters/templates/tpl_wuxiguzhai_fb.jpg':
    '/assets/characters/templates/tpl_wuxiguzhai_av.jpg',
  '/assets/characters/templates/tpl_wuxiguzhai_male_fb.jpg':
    '/assets/characters/templates/tpl_wuxiguzhai_male_av.jpg',
  '/assets/characters/templates/tpl_xiaoyao_female_fb.jpg':
    '/assets/characters/templates/tpl_xiaoyao_female_av.jpg',
  '/assets/characters/templates/tpl_xiaoyao_male_fb.jpg':
    '/assets/characters/templates/tpl_xiaoyao_male_av.jpg',
  '/assets/characters/templates/tpl_xingxiu_fb.jpg':
    '/assets/characters/templates/tpl_xingxiu_av.jpg',
  '/assets/characters/templates/tpl_xingxiu_female_fb.jpg':
    '/assets/characters/templates/tpl_xingxiu_female_av.jpg',
  '/assets/characters/templates/tpl_yipintang_fb.jpg':
    '/assets/characters/templates/tpl_yipintang_av.jpg',
  '/assets/characters/templates/tpl_yipintang_female_fb.jpg':
    '/assets/characters/templates/tpl_yipintang_female_av.jpg',
  '/assets/characters/templates/tpl_zhenyuan_male_fb.jpg':
    '/assets/characters/templates/tpl_zhenyuan_male_av.jpg',
  '/assets/characters/templates/tpl_zhongnan_fb.jpg':
    '/assets/characters/templates/tpl_zhongnan_av.jpg',
  '/assets/characters/templates/tpl_zhongnan_female_fb.jpg':
    '/assets/characters/templates/tpl_zhongnan_female_av.jpg',
}

export function inferTemplatePortrait(meta: PortraitInferenceMeta): string {
  const combined = `${meta.name ?? ''} ${meta.title ?? ''} ${meta.factionName ?? ''}`

  // 1. 佛门僧侣（区分长老高僧与青年武僧）
  if (/禅师|老僧|高僧|方丈|首座|神僧/.test(combined)) {
    return '/assets/characters/templates/tpl_shaolin_monk_fb.jpg'
  }
  if (/大师|护法僧|武僧|和尚|僧|少林|清凉寺|五台|天龙寺/.test(combined)) {
    if (/五台|清凉/.test(combined)) {
      return '/assets/characters/templates/tpl_wutai_monk_male_fb.jpg'
    }
    return '/assets/characters/templates/tpl_shaolin_monk_fb.jpg'
  }

  // 2. 道门羽士
  if (/道长|真人|道士|观主|道人|武当|终南|重阳|青城/.test(combined)) {
    return '/assets/characters/templates/tpl_taoist_master_fb.jpg'
  }

  // 3. 女性角色（女将、女尼、女侠、医女、长辈妇人）
  if (/女将|女帅|穆桂|花木兰|女营/.test(combined)) {
    return '/assets/characters/templates/tpl_woman_general_fb.jpg'
  }
  if (/杨排风/.test(combined)) {
    return '/assets/characters/templates/tpl_emei_heroine_fb.jpg'
  }
  if (/师太|女尼|庵|峨眉/.test(combined)) {
    return '/assets/characters/templates/tpl_emei_female_fb.jpg'
  }
  if (/姥姥|婆婆|老妇|老母|遗孀|遗眷|夫人|居士|医女|姑姑|姑娘|小姐|女侠|女子|侍女/.test(combined)) {
    if (/百草|药|医|姥姥|婆婆|老母|居士/.test(combined)) {
      return '/assets/characters/templates/tpl_baicao_female_fb.jpg'
    }
    return '/assets/characters/templates/tpl_sanren_female_fb.jpg'
  }

  // 4. 北朝契丹 / 大辽 / 女真军将密使
  if (/契丹|大辽|辽军|辽卒|辽骑|辽谍|铁林|耶律|完颜|乌古|萧远|燕京.*卫|北院/.test(combined)) {
    return '/assets/characters/templates/tpl_khitan_warrior_fb.jpg'
  }

  // 5. 西夏一品堂 / 铁鹞子 / 党项
  if (/西夏|一品堂|铁鹞|党项|没藏|努儿|漫咩|兴庆/.test(combined)) {
    return '/assets/characters/templates/tpl_yipintang_fb.jpg'
  }

  // 6. 姑苏慕容 / 燕子坞
  if (/慕容|参合|燕子坞/.test(combined)) {
    return '/assets/characters/templates/tpl_murong_male_fb.jpg'
  }

  // 7. 朝廷文官、儒生、商贾、账房
  if (/知府|知州|知县|相公|大人|学士|言官|御史|员外|书生|儒|掌柜|丝商|绸商|商帮|算盘|账房|醒客|说书|文士/.test(combined)) {
    return '/assets/characters/templates/tpl_song_scholar_fb.jpg'
  }

  // 8. 医者、术士、苍颜老丈、遗老
  if (/神医|郎中|大夫|医|半仙|卜|老丈|老人|老者|遗老/.test(combined)) {
    return '/assets/characters/templates/tpl_song_physician_fb.jpg'
  }

  // 9. 官差捕快、六扇门、开封府探马、皇城司
  if (/捕快|捕头|总捕|探头|密探|暗探|六扇门|开封府|皇城司|公人|衙役/.test(combined)) {
    return '/assets/characters/templates/tpl_liushenmen_male_fb.jpg'
  }

  // 10. 舟子船夫、漕帮、水寨渔人
  if (/艄公|船夫|船老大|舵手|水手|漕帮|钱塘|渔/.test(combined)) {
    return '/assets/characters/templates/tpl_caobang_fb.jpg'
  }

  // 11. 镖师、驿使、边关老卒、军将
  if (/镖师|镖头|总镖头|驿使|老卒|军卒|禁军|校尉|统制|队正|百夫长|将|天波|常山/.test(combined)) {
    return '/assets/characters/templates/tpl_zhenyuan_male_fb.jpg'
  }

  // 12. 暗器刺客、夜行暗哨、奇毒邪派
  if (/暗哨|灰鹞|断翅鹞|刺客|杀手|夜行人|唐门/.test(combined)) {
    return '/assets/characters/templates/tpl_tangmen_male_fb.jpg'
  }
  if (/魔|邪|鬼手|阴九幽|老怪|毒仙|星宿/.test(combined)) {
    return '/assets/characters/templates/tpl_unorthodox_master_fb.jpg'
  }

  // 13. 绿林山贼、海捕要犯、响马悍匪
  if (/山贼|强盗|响马|悍匪|盗匪|匪目|头目|寨主|喽啰|绿林|海捕|恶霸/.test(combined)) {
    return '/assets/characters/templates/tpl_greenwood_sect_fb.jpg'
  }

  // 14. 丐帮弟子
  if (/丐帮|乞丐|袋弟子/.test(combined)) {
    return '/assets/characters/templates/tpl_gaibang_fb.jpg'
  }

  // 默认：端正的江湖散人游侠立绘（绝不默认落入强盗立绘）
  return '/assets/characters/templates/tpl_sanren_male_fb.jpg'
}

export function resolveAvatarForFullbody(fullbodyUrl: string): string {
  if (fullbodyUrl.includes('/fullbody/')) {
    return fullbodyUrl.replace('/fullbody/', '/avatars/')
  }
  return KNOWN_AVATAR_COUNTERPARTS[fullbodyUrl] ?? fullbodyUrl
}
