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
  '/assets/characters/templates/tpl_child_boy_fb.jpg':
    '/assets/characters/templates/tpl_child_boy_av.jpg',
  '/assets/characters/templates/tpl_child_girl_fb.jpg':
    '/assets/characters/templates/tpl_child_girl_av.jpg',
  '/assets/characters/templates/tpl_dali_royal_male_fb.jpg':
    '/assets/characters/templates/tpl_dali_royal_male_av.jpg',
  '/assets/characters/templates/tpl_emei_female_fb.jpg':
    '/assets/characters/templates/tpl_emei_female_av.jpg',
  '/assets/characters/templates/tpl_emei_male_fb.jpg':
    '/assets/characters/templates/tpl_emei_male_av.jpg',
  '/assets/characters/templates/tpl_eunuch_male_fb.jpg':
    '/assets/characters/templates/tpl_eunuch_male_av.jpg',
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
  '/assets/characters/templates/tpl_jinjun_female_fb.jpg':
    '/assets/characters/templates/tpl_jinjun_female_av.jpg',
  '/assets/characters/templates/tpl_jinjun_male_fb.jpg':
    '/assets/characters/templates/tpl_jinjun_male_av.jpg',
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
  '/assets/characters/templates/tpl_peasant_old_female_fb.jpg':
    '/assets/characters/templates/tpl_peasant_old_female_av.jpg',
  '/assets/characters/templates/tpl_peasant_old_male_fb.jpg':
    '/assets/characters/templates/tpl_peasant_old_male_av.jpg',
  '/assets/characters/templates/tpl_qiantang_male_fb.jpg':
    '/assets/characters/templates/tpl_qiantang_male_av.jpg',
  '/assets/characters/templates/tpl_qingcheng_fb.jpg':
    '/assets/characters/templates/tpl_qingcheng_av.jpg',
  '/assets/characters/templates/tpl_qingcheng_female_fb.jpg':
    '/assets/characters/templates/tpl_qingcheng_female_av.jpg',
  '/assets/characters/templates/tpl_ronin_pirate_fb.jpg':
    '/assets/characters/templates/tpl_ronin_pirate_av.jpg',
  '/assets/characters/templates/tpl_sanren_female_fb.jpg':
    '/assets/characters/templates/tpl_sanren_female_av.jpg',
  '/assets/characters/templates/tpl_sanren_male_fb.jpg':
    '/assets/characters/templates/tpl_sanren_male_av.jpg',
  '/assets/characters/templates/tpl_shaolin_songshan_male_fb.jpg':
    '/assets/characters/templates/tpl_shaolin_songshan_male_av.jpg',
  '/assets/characters/templates/tpl_song_court_female_fb.jpg':
    '/assets/characters/templates/tpl_song_court_female_av.jpg',
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
  '/assets/characters/templates/tpl_tubo_esoteric_female_fb.jpg':
    '/assets/characters/templates/tpl_tubo_esoteric_female_av.jpg',
  '/assets/characters/templates/tpl_tubo_esoteric_male_fb.jpg':
    '/assets/characters/templates/tpl_tubo_esoteric_male_av.jpg',
  '/assets/characters/templates/tpl_tubo_tribes_male_fb.jpg':
    '/assets/characters/templates/tpl_tubo_tribes_male_av.jpg',
  '/assets/characters/templates/tpl_wooden_dummy_fb.jpg':
    '/assets/characters/templates/tpl_wooden_dummy_av.jpg',
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
  '/assets/characters/templates/tpl_xixia_court_male_fb.jpg':
    '/assets/characters/templates/tpl_xixia_court_male_av.jpg',
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
  const nameAndTitle = `${meta.name ?? ''} ${meta.title ?? ''}`
  const combined = `${nameAndTitle} ${meta.factionName ?? ''}`

  // 0. 机关木人与东洋浪人海寇（优先于佛门/邪派匹配）
  if (/木人|机关傀儡/.test(combined)) {
    return '/assets/characters/templates/tpl_wooden_dummy_fb.jpg'
  }
  if (/浪人|倭寇|东洋|扶桑|鬼丸/.test(combined)) {
    return '/assets/characters/templates/tpl_ronin_pirate_fb.jpg'
  }

  // 1. 佛门僧侣（先排除带发护寺俗家弟子）
  if (/俗家/.test(combined) && /少林|南少林|佛/.test(combined)) {
    return '/assets/characters/templates/tpl_hongmen_male_fb.jpg'
  }
  if (/禅师|老僧|高僧|方丈|首座|神僧/.test(combined)) {
    return '/assets/characters/templates/tpl_shaolin_monk_fb.jpg'
  }
  if (/大师|护法僧|武僧|和尚|沙弥|僧|少林|清凉寺|五台|天龙寺/.test(combined)) {
    if (/五台|清凉/.test(combined)) {
      return '/assets/characters/templates/tpl_wutai_monk_male_fb.jpg'
    }
    return '/assets/characters/templates/tpl_shaolin_monk_fb.jpg'
  }

  // 2. 道门羽士与隐逸老道
  if (/道长|真人|道士|观主|道人|老道|棋叟|武当|终南|重阳|青城/.test(combined)) {
    return '/assets/characters/templates/tpl_taoist_master_fb.jpg'
  }

  // 3. 女性角色（女将、女教头、女尼、老母妇人、女童、女侠、医女）——严禁落入男游侠默认项
  if (/禁军.*女|女教头/.test(combined)) {
    return '/assets/characters/templates/tpl_jinjun_female_fb.jpg'
  }
  if (/女将|女帅|穆桂|花木兰|女营/.test(combined)) {
    return '/assets/characters/templates/tpl_woman_general_fb.jpg'
  }
  if (/杨排风/.test(combined)) {
    return '/assets/characters/templates/tpl_emei_heroine_fb.jpg'
  }
  if (/师太|女尼|庵|峨眉/.test(combined) && !/男|儿郎|俗家男/.test(combined)) {
    return '/assets/characters/templates/tpl_emei_female_fb.jpg'
  }
  if (/小草|阿珠|囡囡|小女孩|女童|幼女/.test(nameAndTitle) && !/陈氏|婆婆|老母|妇人/.test(nameAndTitle)) {
    return '/assets/characters/templates/tpl_child_girl_fb.jpg'
  }
  if (/婆婆|老妇|老母|母亲|老妪|遗孀|遗眷|逃荒.*母|陈氏/.test(nameAndTitle)) {
    return '/assets/characters/templates/tpl_peasant_old_female_fb.jpg'
  }
  if (/姥姥|婆婆|老妇|老母|母亲|老妪|遗孀|遗眷|妇人|母女|夫人|居士|医女|姑姑|姑娘|小姐|女侠|女子|侍女|渔家女|孤女/.test(combined)) {
    if (/百草|药|医|姥姥|居士/.test(combined)) {
      return '/assets/characters/templates/tpl_baicao_female_fb.jpg'
    }
    return '/assets/characters/templates/tpl_sanren_female_fb.jpg'
  }

  // 4. 舟子船夫、老石匠等伪装/市井身份（优先于“开封府/六扇门暗桩”避免潜伏船夫/老石匠穿官差服）
  if (/艄公|船夫|船老大|船头|老船户|老船工|舵手|水手|漕帮|钱塘|渔/.test(nameAndTitle)) {
    return '/assets/characters/templates/tpl_caobang_fb.jpg'
  }
  if (/老石匠|老刻工|老药农|药农|老农|老茶商|老绸商|老酒保|老伯|老汉|老丈|老人|老者|遗老|周伯|陈默/.test(nameAndTitle)) {
    return '/assets/characters/templates/tpl_peasant_old_male_fb.jpg'
  }

  // 5. 稚龄孩童、采药山童、守谱少年（使用市井牧童模板，避免变成络腮胡佩剑大汉）
  if (/小石锁|小石子|阿石|阿蝉|山童|药童|小童|童子|守谱少年|短工少年|七岁/.test(nameAndTitle)) {
    return '/assets/characters/templates/tpl_child_boy_fb.jpg'
  }

  // 6. 北朝契丹 / 大辽 / 乌桓军将与密使（细分为掌符朝臣、潜伏暗桩与铁林重骑）
  if (/契丹|大辽|辽国|辽军|辽卒|辽骑|辽谍|铁林|耶律|述律|乌桓|完颜|乌古|萧远|萧烈|萧断|萧寒|燕京.*卫|北院/.test(combined)) {
    if (/萧寒|女/.test(combined)) {
      return '/assets/characters/templates/tpl_liao_spy_female_fb.jpg'
    }
    if (/掌符使|朝臣|参军|文官/.test(combined)) {
      return '/assets/characters/templates/tpl_liao_court_male_fb.jpg'
    }
    if (/暗桩|灭口|潜伏|探哨|修罗斩|驯马悍骑/.test(combined)) {
      return '/assets/characters/templates/tpl_liao_spy_male_fb.jpg'
    }
    return '/assets/characters/templates/tpl_khitan_warrior_fb.jpg'
  }

  // 7. 西夏一品堂 / 铁鹞子 / 党项
  if (/西夏|一品堂|铁鹞|党项|没藏|嵬名|野利|拓跋|贺兰|努儿|漫咩|兴庆/.test(combined)) {
    if (/野利寒鸦|没藏血影|女/.test(combined)) {
      return '/assets/characters/templates/tpl_yipintang_female_fb.jpg'
    }
    return '/assets/characters/templates/tpl_yipintang_fb.jpg'
  }

  // 8. 姑苏慕容 / 燕子坞 / 锦袍世家公子
  if (/慕容|参合|燕子坞|世家子|豪族/.test(combined)) {
    return '/assets/characters/templates/tpl_murong_male_fb.jpg'
  }

  // 9. 内侍省无须宦官 vs 朝廷文官、台谏御史、儒生、商贾、账房
  if (/内侍|内官|宦官|押班|司礼监|茂则|守忠/.test(combined)) {
    return '/assets/characters/templates/tpl_eunuch_male_fb.jpg'
  }
  if (/知府|知州|知县|相公|大人|学士|御史|言官|正言|谏院|宪臣|副使|涉案官|勾当公事|员外|书生|儒|掌柜|丝商|茶商|商帮|算盘|账房|醒客|说书|文士/.test(combined)) {
    return '/assets/characters/templates/tpl_song_scholar_fb.jpg'
  }

  // 10. 医者、术士
  if (/神医|郎中|大夫|医|半仙|卜/.test(combined)) {
    return '/assets/characters/templates/tpl_song_physician_fb.jpg'
  }

  // 11. 大宋禁军、边关老兵、驿骑与三衙军将（优先于捕快，避免军汉穿六扇门服）
  if (/老卒|退伍老兵|老塘骑|押纲副指挥|三衙叛校|镖师|镖头|总镖头|驿使/.test(combined)) {
    return '/assets/characters/templates/tpl_zhenyuan_male_fb.jpg'
  }
  if (/常山|天波/.test(combined) && !/禁军|虎翼|殿前司/.test(combined)) {
    return '/assets/characters/templates/tpl_changshan_male_fb.jpg'
  }
  if (/禁军|军卒|虎翼|殿前司|队正|军邮|快骑|巡卒|军汉|校尉|统制|百夫长|什长/.test(combined)) {
    return '/assets/characters/templates/tpl_jinjun_male_fb.jpg'
  }

  // 12. 官差捕快、六扇门、开封府探马、皇城司
  if (/捕快|捕头|总捕|探头|密探|暗探|六扇门|开封府|皇城司|公人|衙役/.test(combined)) {
    return '/assets/characters/templates/tpl_liushenmen_male_fb.jpg'
  }

  // 13. 其余舟楫水寨
  if (/艄公|船夫|船老大|舵手|水手|漕帮|钱塘|渔/.test(combined)) {
    return '/assets/characters/templates/tpl_caobang_fb.jpg'
  }

  // 14. 暗器刺客、夜行暗哨、奇毒邪派
  if (/暗哨|灰鹞|断翅鹞|刺客|杀手|夜行人|唐门/.test(combined)) {
    return '/assets/characters/templates/tpl_tangmen_male_fb.jpg'
  }
  if (/魔|邪|鬼手|阴九幽|老怪|毒仙|星宿/.test(combined)) {
    return '/assets/characters/templates/tpl_unorthodox_master_fb.jpg'
  }

  // 15. 绿林山贼、海捕要犯、响马悍匪、山寨匪目
  if (/山贼|强盗|响马|悍匪|盗匪|匪目|残匪|山匪|水匪|盐枭|头目|寨主|喽啰|绿林|海捕|恶霸|私运暗桩/.test(combined)) {
    return '/assets/characters/templates/tpl_greenwood_sect_fb.jpg'
  }

  // 16. 丐帮弟子
  if (/丐帮|乞丐|袋弟子|小叫花|老乞/.test(combined)) {
    return '/assets/characters/templates/tpl_gaibang_fb.jpg'
  }

  // 默认：端正的江湖散人游侠立绘
  return '/assets/characters/templates/tpl_sanren_male_fb.jpg'
}

export function resolveAvatarForFullbody(fullbodyUrl: string): string {
  if (fullbodyUrl.includes('/fullbody/')) {
    return fullbodyUrl.replace('/fullbody/', '/avatars/')
  }
  return KNOWN_AVATAR_COUNTERPARTS[fullbodyUrl] ?? fullbodyUrl
}
