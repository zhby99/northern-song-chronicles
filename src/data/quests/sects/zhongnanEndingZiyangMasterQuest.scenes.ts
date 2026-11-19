import type { StorySceneDef, StorySpeakerSpec } from '../../../types/quest'
import { N, P, S, openScene, setStep, toast } from '../../../engine/quest/dsl'
import { ZHONGNAN_Q36_QUEST_ID } from './zhongnanEndingZiyangMasterQuest'

const SPEAKER_TAO_DISCIPLES: StorySpeakerSpec = {
  kind: 'custom',
  name: '重阳古观众弟子',
  title: '终南玄门道众',
  factionName: '终南隐宗',
  portraitUrl: '/assets/characters/templates/tpl_zhongnan_fb.jpg',
  avatarUrl: '/assets/characters/templates/tpl_zhongnan_av.jpg',
}

export const SCENES: Record<string, StorySceneDef> = {
  scene_znq36_01: {
    id: 'scene_znq36_01',
    title: '第一幕 · 松鹤晨钟',
    subtitle: '重阳古观 · 重阳玄门清修主殿',
    mandatory: true,
    beats: [
      N('{reignYear}仲春，终南山云开雾散，松风送暖。重阳玄门清修主殿外仙鹤清唳，九声浑厚道钟传遍十里松林。'),
      N('三清金像之下，紫阳真人王重楼罕见地换上了一袭最朴素的青布云游道袍，腰间悬着一只旧葫芦与一根青竹杖，神态洒脱如闲云野鹤。'),
      S('NPC-0133', '（微笑望向齐聚殿内的你与全真七子）“都来齐了。今日唤你们上殿，非为外敌军情，而是老道要交代一件关乎重阳古观百年道统的大事。”'),
    ],
    onFinishEffects: [openScene('scene_znq36_02', ZHONGNAN_Q36_QUEST_ID)],
  },

  scene_znq36_02: {
    id: 'scene_znq36_02',
    title: '第二幕 · 功成身退',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      S('NPC-1054', '（马钰玄心头微震，上前一步躬身问道）“师父今日换上云游道装，莫非是要……”'),
      S('NPC-0133', '（朗声一笑，洒然拂须）“老道执掌重阳古观二十余载，早年抗辽，中年传道，如今古观香火鼎盛、塞北强敌胆寒，我这副老骨头也该去游历名山大川、寻访大道真机了。”'),
      S('NPC-0216', '（丘处玄急声道）“师父正值春秋鼎盛，玄门尚需您坐镇指引，怎可轻言远游？”'),
    ],
    onFinishEffects: [openScene('scene_znq36_03', ZHONGNAN_Q36_QUEST_ID)],
  },

  scene_znq36_03: {
    id: 'scene_znq36_03',
    title: '第三幕 · 孤峰正统',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      S('NPC-0133', '（目光转向窗外遥远的寒玉涧方向，神色沉静而淡然）“昔年道墓之争，终究已划界断桥、各行其道。既是孤峰独行，重阳古观便更须立住玄门正统之脊梁，不可有半分懈怠。”'),
      S('NPC-0133', '（收回目光，郑重落在你的肩头）“你身披紫阳鹤氅、手执天罡七星剑、悟通天阶《先天功》，更在潼关与延安统率七子横绝塞北。这重阳古观下一任【紫阳掌教真人】之位，舍你其谁？”'),
    ],
    onFinishEffects: [openScene('scene_znq36_04', ZHONGNAN_Q36_QUEST_ID)],
  },

  scene_znq36_04: {
    id: 'scene_znq36_04',
    title: '第四幕 · 众望所归',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      P('（心中一凛，连忙躬身谦辞）“师父！马师兄与丘师兄等七位师兄长入观最久、德高望重，弟子资历尚浅，岂敢居于诸位师兄之上！”'),
      S('NPC-1054', '（马钰玄坦荡微笑，率先稽首）“{gender:师弟|师妹}不必过谦！玄门掌教以德才武功为先，不以资历论高下。你护山门、救边关、承先天、执七星，我等七人早已心悦诚服！”'),
      S('NPC-0216', '（抱拳朗笑）“正是！有你执掌重阳大印，我等七人愿作左膀右臂，共兴玄门！”'),
    ],
    onFinishEffects: [openScene('scene_znq36_05', ZHONGNAN_Q36_QUEST_ID)],
  },

  scene_znq36_05: {
    id: 'scene_znq36_05',
    title: '第五幕 · 演剑之约',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      S('NPC-0133', '（欣慰颔首）“既然七子同心，这传印大典便定在明日清晨。不过在老道将紫阳玉印交出之前，我想先邀你去【天罡北斗七星演剑坛】走上几招——”'),
      S('NPC-0133', '“既为考校你如今的先天火候，也算老道离开终南前，师徒之间最后一次酣畅淋漓的论剑！”'),
    ],
    onFinishEffects: [openScene('scene_znq36_06', ZHONGNAN_Q36_QUEST_ID)],
  },

  scene_znq36_06: {
    id: 'scene_znq36_06',
    title: '第六幕 · 云游托印',
    subtitle: '重阳玄门主殿 · 传道定计',
    illustrationUrl: '/assets/quests/zn_q36_ziyang_summon.jpg',
    illustrationCaption: '重阳玄门清修主殿 · 王重楼换上云游青袍，于三清像前宣布传印托付玄门正统',
    mandatory: true,
    beats: [
      P('（眼中闪过敬仰与不舍，旋即化作坚定沉稳）“弟子恭领师命！请师父移步演剑坛赐教！”'),
    ],
    onFinishEffects: [openScene('scene_znq36_07', ZHONGNAN_Q36_QUEST_ID)],
  },

  scene_znq36_07: {
    id: 'scene_znq36_07',
    title: '第七幕 · 诸子观礼',
    subtitle: '重阳古观山门廊下',
    mandatory: true,
    beats: [
      N('消息传开，重阳古观上下百余道众齐齐聚集于演剑坛外松林之间，人人屏息静候这场两代紫阳传人的宗师演武。'),
    ],
    onFinishEffects: [openScene('scene_znq36_08', ZHONGNAN_Q36_QUEST_ID)],
  },

  scene_znq36_08: {
    id: 'scene_znq36_08',
    title: '第八幕 · 移步剑坛',
    subtitle: '重阳古观石阶',
    mandatory: true,
    beats: [
      N('你整理紫阳鹤氅，手按重阳天罡七星剑，随王重楼缓步登上高耸入云的天罡北斗七星演剑坛。'),
    ],
    choices: [
      {
        id: 'znq36_accept',
        label: '赴【天罡北斗七星演剑坛】，接受紫阳真人最后一次演武考校',
        tone: 'gold',
        effects: [
          { type: 'startQuest', questId: ZHONGNAN_Q36_QUEST_ID, stepId: 'dipper_master_trial' },
          setStep(ZHONGNAN_Q36_QUEST_ID, 'dipper_master_trial'),
          toast('已开启终局《玄门正统 · 紫阳掌教》！请赴【天罡北斗七星演剑坛】与师父演武印证！', 'talk', '紫阳掌教'),
        ],
      },
    ],
  },

  scene_znq36_09: {
    id: 'scene_znq36_09',
    title: '第九幕 · 坛上清风',
    subtitle: '重阳古观 · 天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('演剑坛上山风猎猎，脚下七星铜钉在春日暖阳下熠熠生辉。王重楼并未拔剑，只手持那根寻常青竹杖，却自有一股渊渟岳峙、令天地变色的宗师气度。'),
      S('NPC-0133', '（朗声一笑）“使出你平生全部所学，莫要顾忌师徒之礼！若你连老道这根竹杖也接不住，这掌教之位可还要再等三年！”'),
    ],
    onFinishEffects: [openScene('scene_znq36_10', ZHONGNAN_Q36_QUEST_ID)],
  },

  scene_znq36_10: {
    id: 'scene_znq36_10',
    title: '第十幕 · 师徒试锋',
    subtitle: '天罡北斗七星演剑坛 · 宗师切磋',
    mandatory: true,
    beats: [
      P('（拔出重阳天罡七星剑，肃然稽首）“师父，弟子得罪了！”'),
      N('青竹杖轻点虚空，一股浑厚无俦的先天纯阳气顿时如春潮涌来！你不敢怠慢，先天一炁与七星剑意同时绽放，迎了上去！'),
    ],
    choices: [
      {
        id: 'znq36_spar_wang',
        label: '与【紫阳真人 · 王重楼】演武切磋，印证玄门宗师大道！',
        tone: 'gold',
        effects: [
          { type: 'healPlayer', hpPct: 100, mpPct: 100 },
          {
            type: 'startCombat',
            questId: ZHONGNAN_Q36_QUEST_ID,
            opponent: { kind: 'npc', npcId: 'NPC-0133' },
            rule: 'spar',
            lethalOnLose: false,
            forbidEscapeReason: '师徒演武印证，岂可中途退场？',
            introText: '天罡北斗演剑坛上，你与紫阳真人王重楼以先天功与重阳剑道切磋印证！',
            onWin: [openScene('scene_znq36_11', ZHONGNAN_Q36_QUEST_ID)],
            onLose: [openScene('scene_znq36_11', ZHONGNAN_Q36_QUEST_ID)],
            onDraw: [openScene('scene_znq36_11', ZHONGNAN_Q36_QUEST_ID)],
          },
        ],
      },
    ],
  },

  scene_znq36_11: {
    id: 'scene_znq36_11',
    title: '第十一幕 · 紫气冲霄',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('百余招转瞬即逝！坛上青竹杖影与七星剑芒交织如星河倒挂，两股同源而至纯的先天一炁轰然相撞，竟未激起半点暴戾破坏，反而在演剑坛上空化作一片澄明紫霞！'),
      N('满坛观礼的道众无不看得如痴如醉，丘处玄更忍不住拍案大叫：“好精妙的先天剑意！”'),
    ],
    onFinishEffects: [openScene('scene_znq36_12', ZHONGNAN_Q36_QUEST_ID)],
  },

  scene_znq36_12: {
    id: 'scene_znq36_12',
    title: '第十二幕 · 收杖叹服',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('王重楼哈哈大笑，率先收杖后退三步，青竹杖尖竟被七星剑气悄然削去一寸竹皮，而他脸上满是前所未有的畅快与欣慰！'),
      S('NPC-0133', '“妙极！妙极！刚柔相济而不失玄门浩然正气，先天一炁绵绵不绝已臻化境！老道纵然今日远游，重阳古观在你手中也必将更胜往昔！”'),
    ],
    onFinishEffects: [openScene('scene_znq36_13', ZHONGNAN_Q36_QUEST_ID)],
  },

  scene_znq36_13: {
    id: 'scene_znq36_13',
    title: '第十三幕 · 剑坛印心',
    subtitle: '天罡北斗七星演剑坛 · 宗师演武',
    illustrationUrl: '/assets/quests/zn_q36_dipper_trial.jpg',
    illustrationCaption: '天罡演剑坛 · 紫阳真人以青竹杖印证七星神剑，两代先天紫气冲霄映彻终南',
    mandatory: true,
    beats: [
      P('（收剑跪拜）“师父承让！弟子能有今日，全赖师父多年呕心栽培。”'),
    ],
    onFinishEffects: [openScene('scene_znq36_14', ZHONGNAN_Q36_QUEST_ID)],
  },

  scene_znq36_14: {
    id: 'scene_znq36_14',
    title: '第十四幕 · 薪火交代',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      S('NPC-0133', '（将你扶起，低声叮嘱三事）“接任掌教之后，须牢记三诫：一守玄门清静戒律，莫令门下贪恋权贵；二护大宋关中苍生，胡虏来犯必当身先士卒；三莫忘道心本真，武功再高亦不过护道之器。”'),
      P('（字字铭记于心）“弟子谨记师父三诫，此生不敢或忘！”'),
    ],
    onFinishEffects: [openScene('scene_znq36_15', ZHONGNAN_Q36_QUEST_ID)],
  },

  scene_znq36_15: {
    id: 'scene_znq36_15',
    title: '第十五幕 · 暮色辞山',
    subtitle: '天罡北斗七星演剑坛',
    mandatory: true,
    beats: [
      N('斜阳渐沉，终南山巅晚霞如金。全真七子早已在重阳玄门清修主殿备好传印香案，只待吉时登坛。'),
    ],
    onFinishEffects: [openScene('scene_znq36_16', ZHONGNAN_Q36_QUEST_ID)],
  },

  scene_znq36_16: {
    id: 'scene_znq36_16',
    title: '第十六幕 · 晨钟再启',
    subtitle: '重阳古观山道',
    mandatory: true,
    beats: [
      N('翌晨天朗气清，重阳玄门清修主殿檀香缭绕，全真七子与百余名道众分列左右，静候传印大典启幕。'),
    ],
    onFinishEffects: [openScene('scene_znq36_17', ZHONGNAN_Q36_QUEST_ID)],
  },

  scene_znq36_17: {
    id: 'scene_znq36_17',
    title: '第十七幕 · 步入主殿',
    subtitle: '重阳古观丹墀',
    mandatory: true,
    beats: [
      N('你身披紫阳先天八卦鹤氅，腰悬重阳天罡七星剑，缓步走向重阳玄门清修主殿。'),
    ],
    choices: [
      {
        id: 'znq36_go_enthrone',
        label: '返回【重阳玄门清修主殿】，承接紫阳掌教玉印',
        tone: 'gold',
        effects: [
          setStep(ZHONGNAN_Q36_QUEST_ID, 'ziyang_enthronement'),
          toast('请前往【重阳玄门清修主殿（zn_to_hall）】举行紫阳掌教传印大典！', 'success', '紫阳传印'),
        ],
      },
    ],
  },

  scene_znq36_18: {
    id: 'scene_znq36_18',
    title: '第十八幕 · 三清鉴证',
    subtitle: '重阳古观 · 重阳玄门清修主殿',
    mandatory: true,
    beats: [
      N('主殿香烟袅袅，紫阳真人王重楼手捧一方雕有太极北斗纹样的温润紫玉掌教印，立于三清像前高台之上。'),
      S('NPC-0133', '（声音清越洪亮，传遍殿内外）“太上老君在上，重阳列代先师鉴证！今日贫道王重楼卸下掌教之职，正式将重阳古观掌教玉印传予门下真传弟子！”'),
    ],
    onFinishEffects: [openScene('scene_znq36_19', ZHONGNAN_Q36_QUEST_ID)],
  },

  scene_znq36_19: {
    id: 'scene_znq36_19',
    title: '第十九幕 · 紫阳授印',
    subtitle: '重阳玄门清修主殿 · 传印大典',
    illustrationUrl: '/assets/quests/zn_q36_seal_bestow.jpg',
    illustrationCaption: '重阳主殿 · 全真七子与百余道众稽首见证，王重楼亲授紫阳掌教玉印',
    mandatory: true,
    beats: [
      N('你拾级而上，双手庄重接过那方沉甸甸的紫玉掌教大印！玉印入手微暖，仿佛承载着终南玄门百年清风与社稷担当。'),
      S('NPC-1054', '（马钰玄率全真七子及满殿道众齐齐稽首行大礼）“恭迎新任重阳掌教真人！愿玄门正统万古长青，福泽苍生！”'),
      S(SPEAKER_TAO_DISCIPLES, '“恭迎掌教真人！愿玄门正统万古长青！”'),
    ],
    onFinishEffects: [openScene('scene_znq36_20', ZHONGNAN_Q36_QUEST_ID)],
  },

  scene_znq36_20: {
    id: 'scene_znq36_20',
    title: '第二十幕 · 掌教法谕',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      P('（手捧紫阳玉印面向众道众，声音清朗而威严）“承蒙师父厚托与诸位师兄妹信重，今日执掌重阳玄门，敢立三誓——”'),
      P('“一誓弘道修真、肃清门风；二誓剑指塞北、护国安民；三誓孤峰不折、薪火长传！”'),
    ],
    onFinishEffects: [openScene('scene_znq36_21', ZHONGNAN_Q36_QUEST_ID)],
  },

  scene_znq36_21: {
    id: 'scene_znq36_21',
    title: '第二十一幕 · 孤峰远眺',
    subtitle: '重阳古观山门',
    mandatory: true,
    beats: [
      N('大典毕，群客散去。你与全真七子送王重楼行至重阳山门牌坊之外。山风吹拂着老人花白的须发，他背负葫芦、手执青竹杖，再无半点俗务牵挂。'),
    ],
    onFinishEffects: [openScene('scene_znq36_22', ZHONGNAN_Q36_QUEST_ID)],
  },

  scene_znq36_22: {
    id: 'scene_znq36_22',
    title: '第二十二幕 · 临别寄语',
    subtitle: '重阳古观山门',
    mandatory: true,
    beats: [
      S('NPC-0133', '（望了眼后山终年云雾缭绕的活死人墓方向，轻轻一叹，旋即豁然一笑）“世间恩怨，终究如过眼云烟。我这一生有愧于她，却无愧于天下苍生。往后这终南山，就交给你了。”'),
      P('（深揖送别）“师父一路珍重！重阳古观大门永远为师父敞开！”'),
    ],
    onFinishEffects: [openScene('scene_znq36_23', ZHONGNAN_Q36_QUEST_ID)],
  },

  scene_znq36_23: {
    id: 'scene_znq36_23',
    title: '第二十三幕 · 踏云而去',
    subtitle: '终南山道',
    mandatory: true,
    beats: [
      N('王重楼摆摆手，长吟一声道歌，芒鞋踏破山间流云，身形几个起落便消失在苍翠松海深处，只留清越笑声久久回荡山谷。'),
    ],
    onFinishEffects: [openScene('scene_znq36_24', ZHONGNAN_Q36_QUEST_ID)],
  },

  scene_znq36_24: {
    id: 'scene_znq36_24',
    title: '第二十四幕 · 闲云野鹤',
    subtitle: '终南古道 · 紫阳云游',
    illustrationUrl: '/assets/quests/zn_q36_wandering_cloud.jpg',
    illustrationCaption: '终南山门外 · 王重楼芒鞋竹杖踏云远游，背影融入苍翠松海云雾之间',
    mandatory: true,
    beats: [
      N('七子肃立山门良久，直至再也望不见师父衣袂，方才转身随你步回道院。'),
    ],
    onFinishEffects: [openScene('scene_znq36_25', ZHONGNAN_Q36_QUEST_ID)],
  },

  scene_znq36_25: {
    id: 'scene_znq36_25',
    title: '第二十五幕 · 整肃观务',
    subtitle: '重阳玄门清修主殿',
    mandatory: true,
    beats: [
      N('自此以后，重阳古观在你的执掌下气象一新。马钰玄主理清修内务，丘处玄统领外门剑阵，七子各司其职，重阳道统蒸蒸日上。'),
    ],
    onFinishEffects: [openScene('scene_znq36_26', ZHONGNAN_Q36_QUEST_ID)],
  },

  scene_znq36_26: {
    id: 'scene_znq36_26',
    title: '第二十六幕 · 关中砥柱',
    subtitle: '重阳古观高台',
    mandatory: true,
    beats: [
      N('关中诸州百姓感念重阳古观济世退敌之恩，香火日盛；汴京朝堂与西北边军亦屡遣使者登终南拜会，尊称你为大宋玄门正统领袖。'),
    ],
    onFinishEffects: [openScene('scene_znq36_27', ZHONGNAN_Q36_QUEST_ID)],
  },

  scene_znq36_27: {
    id: 'scene_znq36_27',
    title: '第二十七幕 · 剑映孤峰',
    subtitle: '重阳古观高台',
    mandatory: true,
    beats: [
      N('偶有清风自后山寒玉涧吹来，你独立高台遥望那座永闭石门的幽谷，心中一片澄明——道不同不相为谋，各守本心，便无愧天地。'),
    ],
    onFinishEffects: [openScene('scene_znq36_28', ZHONGNAN_Q36_QUEST_ID)],
  },

  scene_znq36_28: {
    id: 'scene_znq36_28',
    title: '第二十八幕 · 万松朝宗',
    subtitle: '终南山巅',
    mandatory: true,
    beats: [
      N('晨光映照着紫阳先天八卦鹤氅，重阳天罡七星剑在鞘中轻鸣。天下风云虽未止息，但只要重阳玄门矗立终南，中原正道便永有脊梁！'),
    ],
    onFinishEffects: [openScene('scene_znq36_29', ZHONGNAN_Q36_QUEST_ID)],
  },

  scene_znq36_29: {
    id: 'scene_znq36_29',
    title: '第二十九幕 · 紫阳掌教',
    subtitle: '重阳古观 · 玄门正统终局',
    illustrationUrl: '/assets/quests/zn_q36_ziyang_master.jpg',
    illustrationCaption: '终南重阳古观 · 紫阳掌教真人立于七星高台，万松朝宗，紫气浩荡护佑关中',
    mandatory: true,
    beats: [
      N('一代玄门正统掌教，已然铸就！'),
    ],
    onFinishEffects: [openScene('scene_znq36_30', ZHONGNAN_Q36_QUEST_ID)],
  },

  scene_znq36_30: {
    id: 'scene_znq36_30',
    title: '第三十幕 · 终局归位',
    subtitle: '重阳玄门清修主殿 · 终局结案',
    mandatory: true,
    beats: [
      N('【终南终局 · 紫阳掌教】已然铸成！你承接王重楼云游传印，在全真七子见证下登临终南隐宗五阶【重阳掌教真人】尊位，名震天下玄门与大宋江山！'),
    ],
    choices: [
      {
        id: 'znq36_complete',
        label: '执掌紫阳玉印，正式继任【重阳掌教真人】（完成终局）',
        tone: 'gold',
        effects: [
          { type: 'setSectRank', sectId: 'SECT-11', rank: 5, promoteOnly: true },
          { type: 'giveCombatExp', amount: 1800, reason: '承接王重楼云游传印，正式继任终南重阳掌教真人' },
          { type: 'modifyRenown', delta: 320, reason: '登位重阳掌教真人，号令玄门正统，威震天下武林' },
          { type: 'modifyChivalry', delta: 110, reason: '立誓护国安民、弘扬玄门正道，仁义昭彰' },
          { type: 'modifySkill', key: '经义', delta: 2 },
          { type: 'modifySkill', key: '策论', delta: 1 },
          { type: 'setFlag', flag: 'zn_ending', value: 'ziyang' },
          { type: 'completeQuest', questId: ZHONGNAN_Q36_QUEST_ID, outcome: 'completed' },
          toast(
            '已完成终局《玄门正统 · 紫阳掌教》！晋升终南隐宗五阶【重阳掌教真人】，威望 +320，侠义 +110！',
            'success',
            '紫阳掌教',
          ),
        ],
      },
    ],
  },
}
