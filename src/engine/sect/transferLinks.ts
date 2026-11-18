// ============================================================================
// 门派任务树「可转投去向」提示：本门某卷任务之后可沿虚线转投 / 调任的目标门派。
// 仅作任务树可视化提示；真正的转投校验仍以 exclusivity.ts（官面转任 / 同脉转投白名单）
// 与各任务 startCondition 为准。新增转投路线时同步在此登记一条。
// ============================================================================

export interface SectTransferLink {
  /** 玩家当前所属门派 */
  fromSectId: string
  /** 本门内承接转投的任务（虚线自该任务节点引出） */
  viaQuestId: string
  /** 可转投 / 调任的目标门派 */
  toSectId: string
  /** 悬停与详单中展示的转投说明 */
  note: string
  /** 转投资格不以完结承接任务为准（如按职阶开放）时为 false，任务树改为提示「见转投条件」 */
  gatedByViaQuest?: boolean
}

export const SECT_TRANSFER_LINKS: readonly SectTransferLink[] = Object.freeze([
  {
    fromSectId: 'SECT-22',
    viaQuestId: 'QST-SECT-22-LONGLING',
    toSectId: 'SECT-17',
    note: '常山枪派晋升 Lv.3「演武教习」后，可向掌门领《开封府推荐信》，赴东京调任开封府六扇门',
    gatedByViaQuest: false,
  },
  {
    fromSectId: 'SECT-22',
    viaQuestId: 'QST-SECT-22-LONGLING',
    toSectId: 'SECT-03',
    note: '持本卷所得《常山·定州联合举荐信》，可免责带功剃度转投五台山清凉寺',
  },
  {
    fromSectId: 'SECT-23',
    viaQuestId: 'QST-CITY-DAMING-BAJI',
    toSectId: 'SECT-17',
    note: '持本卷所得《北京留守幕府举荐信》，可直授开封府六扇门 Lv.2「捕头都头」',
  },
  {
    fromSectId: 'SECT-17',
    viaQuestId: 'QST-SECT-17-RENZONG-ESCORT',
    toSectId: 'SECT-33',
    note: '完结《微服汴梁 · 血护龙颜》护驾有功，奉敕改授大宋禁军',
  },
  {
    fromSectId: 'SECT-16',
    viaQuestId: 'QST-SECT-16-REFERRAL',
    toSectId: 'SECT-15',
    note: '江淮漕帮弟子可水陆同脉转投铁掌帮',
  },
  {
    fromSectId: 'SECT-24',
    viaQuestId: 'QST-SECT-24-REFERRAL',
    toSectId: 'SECT-04',
    note: '闽海镇远镖局弟子可赴莆田同脉转投南少林',
  },
])

export function getSectTransferLinks(sectId: string | null): SectTransferLink[] {
  if (!sectId) return []
  return SECT_TRANSFER_LINKS.filter((l) => l.fromSectId === sectId)
}
