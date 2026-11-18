import type { StorySceneDef } from '../../../types/quest'
import { N, P, S, setStep, warn } from '../../../engine/quest/dsl'

const INLINE_SCENE_01_scene_toumingzhuang_intro: StorySceneDef = {
              id: 'scene_toumingzhuang_intro',
              title: '太行草莽 · 歃血投名状',
              subtitle: '太行/京东绿林盟入门试炼',
              beats: [
                N('山风呼啸，刀戟森寒。面前绿林好汉上下打量了少侠一番，按住腰间雁翎刀沉声冷笑。'),
                S('interactedNpc', '“想入我太行绿林盟吃这碗刀口舔血的聚义饭？口说无凭！我山寨最忌朝廷六扇门混进来的耳目细作。”'),
                S('interactedNpc', '“按道上老规矩，先去寻个大宋朝廷命官劫上一票，提这厮的官凭印绶来作『投名状』！不过丑话说在前头——一旦动手，你的名字便上了开封府海捕黑名单，日后若敢踏入东京汴梁半步，南侠展昭的巨阙剑可不认人！”'),
              ],
              choices: [
                {
                  id: 'choice_accept_oath',
                  label: '【歃血领命】立誓劫杀贪官，纳投名状！',
                  subLabel: '开启《太行聚义·纳投名状》任务链',
                  tone: 'danger',
                  effects: [
                    {
                      type: 'startQuest',
                      questId: 'QST-SECT-18-TOUMINGZHUANG',
                      stepId: 'rob_official',
                    },
                    { type: 'setFlag', flag: 'toumingzhuang_state', value: 'accepted' },
                    warn('已领「纳投名状」之命！请寻任意大宋朝廷官员发起【劫道纳投名状】生死战。', '绿林试炼'),
                  ],
                },
                {
                  id: 'choice_decline_oath',
                  label: '【容某三思】兹事体大，暂缓领命',
                  tone: 'default',
                  effects: [],
                },
              ],
            }

const INLINE_SCENE_02_scene_rob_official_ambush: StorySceneDef = {
              id: 'scene_rob_official_ambush',
              title: '黑巾蒙面 · 官道劫驾',
              subtitle: '生死决战 · 败则当场格杀',
              beats: [
                P('“太行山好汉借道！狗官休走，留下官凭印信与行囊金银买命！”'),
                S('interactedNpc', '“大胆草寇，朗朗乾坤竟敢截杀朝廷命官！左右护卫何在——格杀勿论！”'),
              ],
              choices: [
                {
                  id: 'choice_fight_official',
                  label: '【拔刃死战】既立投名状，今日有进无退！',
                  subLabel: '生死决战（败亡将直接结束游戏）',
                  tone: 'danger',
                  effects: [
                    {
                      type: 'startCombat',
                      questId: 'QST-SECT-18-TOUMINGZHUANG',
                      opponent: { kind: 'interactedNpc' },
                      rule: 'duel',
                      duelStakesTag: 'rob_official',
                      deathTitle: '劫官失手 · 横尸官道',
                      deathDetail:
                        '少侠为纳绿林投名状强劫大宋命官，奈何武艺不精失手落败，当场被官军护卫乱刃分尸。',
                      onWin: [
                        setStep('QST-SECT-18-TOUMINGZHUANG', 'return_to_join'),
                        { type: 'setFlag', flag: 'toumingzhuang_state', value: 'completed' },
                        { type: 'setFlag', flag: 'toumingzhuang_completed', value: true },
                        { type: 'setFlag', flag: 'song_court_blacklisted', value: true },
                        { type: 'giveSilver', amount: 60, reason: '劫掠官银' },
                        warn('劫官得手（夺得官银 60 两）！「纳投名状」已成，现可拜入【太行/京东绿林盟】；但大宋朝廷已下达海捕黑名单，切莫踏入开封府！', '朝廷通缉'),
                      ],
                    },
                  ],
                },
                {
                  id: 'choice_abort_robbery',
                  label: '【隐入暗巷】护卫森严，暂且收刀退去',
                  tone: 'default',
                  effects: [],
                },
              ],
            }

const INLINE_SCENE_03_scene_zhan_zhao_kaifeng_arrest: StorySceneDef = {
              id: 'scene_zhan_zhao_kaifeng_arrest',
              title: '天街剑影 · 南侠缉凶',
              subtitle: '开封府海捕黑名单 · 不死不休',
              mandatory: true,
              beats: [
                N('甫踏入东京汴梁御街界碑，长街两侧马蹄声骤起，一抹耀眼猩红官袍如电掠至，森寒剑意瞬间封死四方退路！'),
                S('NPC-0140', '“大胆绿林狂徒！劫掠朝廷命官，名列开封府海捕黑名单，竟还敢踏入天子脚下？”'),
                S('NPC-0140', '“御前四品带刀护卫展昭在此——休想走脱半步，亮出兵刃随展某回开封府狗头铡前伏法！”'),
              ],
              choices: [
                {
                  id: 'choice_resist_zhan_zhao',
                  label: '【困兽死斗】拔兵刃强闯御猫巨阙剑阵！',
                  subLabel: '强制生死战 · 不可逃跑 · 战败即押赴开封府狗头铡处斩',
                  tone: 'danger',
                  effects: [
                    {
                      type: 'startCombat',
                      questId: 'QST-SECT-18-TOUMINGZHUANG',
                      opponent: { kind: 'npc', npcId: 'NPC-0140' },
                      rule: 'duel',
                      duelStakesTag: 'zhan_zhao_arrest',
                      forbidEscapeReason: '御猫展昭剑气封锁长街，开封府重兵合围，绝无退路！',
                      deathTitle: '血溅天街 · 狗头铡下',
                      deathDetail:
                        '少侠因劫掠大宋命官身负朝廷海捕黑名单，踏入东京开封府时遭御前四品带刀护卫「南侠」展昭当街锁拿，力战败北，押赴开封府大堂狗头铡下问斩示众！',
                      forceMandatory: true,
                      onWin: [
                        warn('少侠竟在东京天街力挫「南侠」展昭杀出重围！然朝廷黑名单未消，再入开封仍将遭缉捕！', '震动东京'),
                      ],
                    },
                  ],
                },
              ],
            }

const INLINE_SCENE_04_scene_caobang_guide: StorySceneDef = {
              id: 'scene_caobang_guide',
              title: '舳舻千里 · 漕帮门禁',
              subtitle: '江淮漕帮入门指引',
              beats: [
                S('interactedNpc', '“我江淮漕帮掌管东南百万石皇粮北运，帮规森严，绝不收无根底的生面孔。”'),
                S('interactedNpc', '“少侠若真心想入帮，不妨先去杭州拜入同走水路的【钱塘怒潮帮】。等你混到他们『内门香主』的身份，再去寻那贪财的副帮主陈承涛塞上二十两纹银，讨一封《钱塘怒潮帮举荐帖》来，本帮自会开香堂接纳！”'),
              ],
              onFinishEffects: [
                {
                  type: 'startQuest',
                  questId: 'QST-SECT-16-REFERRAL',
                  stepId: 'get_nuchao_letter',
                },
              ],
            }

const INLINE_SCENE_05_scene_baji_guide: StorySceneDef = {
              id: 'scene_baji_guide',
              title: '文有太极 · 武有八极',
              subtitle: '沧州八极门入门指引',
              beats: [
                S('interactedNpc', '“沧州八极门立身河朔边鄙，拳出如崩山裂石，素来只收北方拳馆知根知底的熟手。”'),
                S('interactedNpc', '“少侠若欲拜门，有两条门径：其一，济南府【齐鲁查拳馆】与本门同气连枝，你若在查拳馆升任『内堂武师』后向金牌总教头奉银二十两讨封《齐鲁查拳馆举荐帖》，即可入门；其二，眼下大名府讲武分馆正逢【黄河铁索断江奇案】，少侠若有胆魄替本门洗刷奇冤，卢总馆主定会破例直纳内堂！”'),
              ],
              onFinishEffects: [
                {
                  type: 'startQuest',
                  questId: 'QST-SECT-23-REFERRAL',
                  stepId: 'get_chaquan_letter',
                },
              ],
            }

const INLINE_SCENE_06_scene_zhenyuan_guide: StorySceneDef = {
              id: 'scene_zhenyuan_guide',
              title: '闽海鲸波 · 红货保举',
              subtitle: '闽海镇远镖局入门指引',
              beats: [
                S('interactedNpc', '“我闽海镇远镖局押的皆是市舶司番货、犀象珠玉，一步行差踏错便是万贯家财付诸东流，岂敢乱招外人？”'),
                S('interactedNpc', '“广州【岭南洪门武馆】的金牌总教头与敝局总镖头乃是换帖兄弟。少侠若在洪门武馆升任『内堂武师』，备二十两茶敬求得《岭南洪门武馆举荐帖》，敝局大堂随时为你敞开！”'),
              ],
              onFinishEffects: [
                {
                  type: 'startQuest',
                  questId: 'QST-SECT-24-REFERRAL',
                  stepId: 'get_hongmen_letter',
                },
              ],
            }

const INLINE_SCENE_03B_scene_zhan_zhao_daming_map_arrest: StorySceneDef = {
  id: 'scene_zhan_zhao_daming_map_arrest',
  title: '天街剑影 · 南侠追图',
  subtitle: '开封府海捕黑名单 · 盗图大案',
  mandatory: true,
  beats: [
    N('甫踏入东京汴梁御街界碑，长街两侧马蹄声骤起，一抹耀眼猩红官袍如电掠至，森寒剑意瞬间封死四方退路！'),
    S('NPC-0140', '“大胆叛逆狂徒！夜闯北京留守行宫沙盘阁、劫夺《河北防辽舆图》与河工官银，名列朝廷头等海捕黑名单，竟还敢踏入天子脚下？”'),
    S('NPC-0140', '“御前四品带刀护卫展昭在此——休想走脱半步，交出边防残图，随展某回开封府狗头铡前伏法！”'),
  ],
  choices: [
    {
      id: 'choice_resist_zhan_zhao_daming',
      label: '【困兽死斗】拔兵刃强闯御猫巨阙剑阵！',
      subLabel: '强制生死战 · 不可逃跑 · 战败即押赴开封府狗头铡处斩',
      tone: 'danger',
      effects: [
        {
          type: 'startCombat',
          questId: 'QST-SECT-18-TOUMINGZHUANG',
          opponent: { kind: 'npc', npcId: 'NPC-0140' },
          rule: 'duel',
          duelStakesTag: 'zhan_zhao_arrest',
          forbidEscapeReason: '御猫展昭剑气封锁长街，开封府重兵合围，绝无退路！',
          deathTitle: '血溅天街 · 狗头铡下',
          deathDetail:
            '少侠因夜盗北京留守行宫《河北防辽舆图》身负朝廷海捕黑名单，踏入东京开封府时遭御前四品带刀护卫「南侠」展昭当街锁拿，力战败北，押赴开封府大堂狗头铡下问斩示众！',
          forceMandatory: true,
          onWin: [
            warn('少侠竟在东京天街力挫「南侠」展昭杀出重围！然盗图海捕黑名单未消，再入开封仍将遭缉捕！', '震动东京'),
          ],
        },
      ],
    },
  ],
}

export const SCENES_BY_QUEST: Record<string, Record<string, StorySceneDef>> = {
  'QST-SECT-18-TOUMINGZHUANG': {
    [INLINE_SCENE_01_scene_toumingzhuang_intro.id]: INLINE_SCENE_01_scene_toumingzhuang_intro,
    [INLINE_SCENE_02_scene_rob_official_ambush.id]: INLINE_SCENE_02_scene_rob_official_ambush,
    [INLINE_SCENE_03_scene_zhan_zhao_kaifeng_arrest.id]: INLINE_SCENE_03_scene_zhan_zhao_kaifeng_arrest,
    [INLINE_SCENE_03B_scene_zhan_zhao_daming_map_arrest.id]: INLINE_SCENE_03B_scene_zhan_zhao_daming_map_arrest,
  },
  'QST-SECT-16-REFERRAL': {
    [INLINE_SCENE_04_scene_caobang_guide.id]: INLINE_SCENE_04_scene_caobang_guide,
  },
  'QST-SECT-23-REFERRAL': {
    [INLINE_SCENE_05_scene_baji_guide.id]: INLINE_SCENE_05_scene_baji_guide,
  },
  'QST-SECT-24-REFERRAL': {
    [INLINE_SCENE_06_scene_zhenyuan_guide.id]: INLINE_SCENE_06_scene_zhenyuan_guide,
  },
}
