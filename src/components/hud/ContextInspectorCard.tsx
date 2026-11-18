import { useGameStore } from '../../store/useGameStore'
import { InspectorBuildingActions } from './inspector/InspectorBuildingActions'
import { InspectorNpcRoster } from './inspector/InspectorNpcRoster'
import { InspectorShopSection } from './inspector/InspectorShopSection'
import { InspectorYamenBountySection } from './inspector/InspectorYamenBountySection'
import { isYamenBountyBoardBuilding } from '../../engine/world/yamenBounty'
import { ShaolinChoreWidget } from './inspector/ShaolinChoreWidget'
import { useInspectorContext } from './inspector/useInspectorContext'
import { WorldNodeInspectorCard } from './inspector/WorldNodeInspectorCard'

function RegionBuildingInspectorCard() {
  const clearFloatingSelection = useGameStore((s) => s.clearFloatingSelection)
  const selectRegionBuilding = useGameStore((s) => s.selectRegionBuilding)
  const enterBuildingMap = useGameStore((s) => s.enterBuildingMap)
  const buySpotShopItem = useGameStore((s) => s.buySpotShopItem)
  const sellInventoryItem = useGameStore((s) => s.sellInventoryItem)
  const buyXiangguoAuctionLot = useGameStore((s) => s.buyXiangguoAuctionLot)
  const runQuestEffects = useGameStore((s) => s.runQuestEffects)
  const interactNpc = useGameStore((s) => s.interactNpc)
  const startNpcCombat = useGameStore((s) => s.startNpcCombat)
  const openNpcInteraction = useGameStore((s) => s.openNpcInteraction)
  const completeKaifengInvestigation = useGameStore((s) => s.completeKaifengInvestigation)
  const openNpcDetailInCompendium = useGameStore((s) => s.openNpcDetailInCompendium)
  const openMenu = useGameStore((s) => s.openMenu)
  const startShaolinChore = useGameStore((s) => s.startShaolinChore)

  const {
    currentContextKey,
    activeRegionId,
    dayCount,
    regionNode,
    activeBldgRecord,
    singleHallCollapsed,
    targetItem,
    tierLabel,
    isAtCurrentRegion,
    showShaolinChorePanel,
    targetBuildingDb,
    activeCanEnter,
    targetHasSubSpots,
    inspectedRootBldg,
    isOwnSectGrounds,
    isInnVenue,
    isOddJobBldg,
    isTavernBldg,
    inOwnSectCity,
    isBirthplaceCity,
    canStudyScripture,
    artOptions,
    activeShop,
    isLeafBuilding,
    contextNpcs,
    spotQuestActions,
    silver,
    hp,
    maxHp,
    mp,
    maxMp,
    skills,
    equipped,
    speedParams,
    inventory,
    consumedUniqueIds,
    auctionBoughtByMonth,
    inscribedPoemSpotIds,
    activeEscortContract,
    activeYamenBounty,
    yamenBountyDoneIds,
    sectState,
    actionFeedback,
  } = useInspectorContext()

  if (!regionNode) return null

  if (singleHallCollapsed && activeBldgRecord) {
    return (
      <div className="absolute bottom-3.5 right-3.5 z-20 select-none">
        <button
          type="button"
          onClick={() => selectRegionBuilding(activeBldgRecord.id)}
          className="px-3.5 py-2 rounded-md bg-[#f8f1e1] hover:bg-[#efe3c8] text-[#23180f] border-2 border-[#6e5233] shadow-xl text-xs font-bold song-serif flex items-center gap-2 transition cursor-pointer"
        >
          <span className="text-[#8f1d14]">▣</span>
          <span>
            展开【{activeBldgRecord.name}】堂内交互与人物（{contextNpcs.length}人）
          </span>
        </button>
      </div>
    )
  }

  const shaolinChoreWidget = showShaolinChorePanel ? (
    <ShaolinChoreWidget
      shaolinChoreDays={sectState.shaolinChoreDays}
      isAtCurrentRegion={isAtCurrentRegion}
      onStartShaolinChore={startShaolinChore}
    />
  ) : null

  if (!targetItem) {
    if (shaolinChoreWidget) {
      return (
        <div
          id="floating-context-card"
          className="absolute bottom-3.5 right-3.5 z-20 w-[min(92vw,500px)] bg-[#f8f1e1] text-[#23180f] border-2 border-[#6e5233] rounded-lg p-4 shadow-2xl space-y-2.5 text-sm select-none"
        >
          <div className="flex items-center justify-between border-b border-[#cbb693] pb-2">
            <div>
              <div className="text-xs text-[#6b5235] font-semibold">嵩山少林寺 · 山门石阶</div>
              <div className="song-serif font-bold text-base text-[#23180f]">
                少林寺杂役弟子当值处
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#6b4614] text-[#fff8eb] text-[11px] font-bold">
              杂役挂单中
            </span>
          </div>
          {shaolinChoreWidget}
        </div>
      )
    }
    return null
  }

  return (
    <div
      id="floating-context-card"
      className="absolute bottom-3.5 right-3.5 z-20 w-[min(92vw,700px)] max-h-[84vh] overflow-y-auto scroll-thin bg-[#f8f1e1] text-[#23180f] border-2 border-[#6e5233] rounded-lg p-5 shadow-2xl space-y-3.5 text-sm select-none"
    >
      <div className="flex items-start justify-between gap-2 border-b border-[#cbb693] pb-3">
        <div>
          <div className="text-xs text-[#6b5235] font-semibold">
            {tierLabel} · {targetItem.tag || '建筑互动'}
          </div>
          <div className="song-serif font-bold text-lg text-[#23180f] mt-0.5">
            {targetItem.isSpecial ? '★ ' : ''}
            {targetItem.name}
          </div>
        </div>
        <button
          type="button"
          onClick={clearFloatingSelection}
          className="px-2.5 py-1 rounded hover:bg-[#e5d7bc] text-[#5e472d] text-base font-bold cursor-pointer"
        >
          ✕
        </button>
      </div>

      <p className="text-[#3d2b19] leading-relaxed">{targetItem.desc}</p>

      {activeCanEnter && (
        <button
          type="button"
          onClick={() => enterBuildingMap(targetItem.id)}
          className="w-full px-3 py-2 rounded bg-[#8f1d14] hover:bg-[#a9251b] text-[#fff8eb] text-xs font-bold song-serif shadow transition cursor-pointer"
        >
          进入【{targetItem.name}】
          {targetBuildingDb?.interior?.mode === 'image'
            ? '半3D实景'
            : targetHasSubSpots
              ? '宋式内院'
              : '市井大堂'}{' '}
          →
        </button>
      )}

      {shaolinChoreWidget}

      <InspectorBuildingActions
        activeRegionId={activeRegionId}
        regionName={regionNode.name}
        dayCount={dayCount}
        inspectedRootBldg={inspectedRootBldg}
        isAtCurrentRegion={isAtCurrentRegion}
        spotQuestActions={spotQuestActions}
        isOddJobBldg={isOddJobBldg}
        isTavernBldg={isTavernBldg}
        isOwnSectGrounds={isOwnSectGrounds}
        isInnVenue={isInnVenue}
        inOwnSectCity={inOwnSectCity}
        isBirthplaceCity={isBirthplaceCity}
        canStudyScripture={canStudyScripture}
        artOptions={artOptions}
        silver={silver}
        hp={hp}
        maxHp={maxHp}
        mp={mp}
        maxMp={maxMp}
        skills={skills}
        speedParams={speedParams}
        inventory={inventory}
        inscribedPoemSpotIds={inscribedPoemSpotIds}
        activeEscortContract={activeEscortContract}
        onRunQuestEffects={runQuestEffects}
        onOpenMenu={openMenu}
      />

      <InspectorYamenBountySection
        activeRegionId={activeRegionId}
        regionName={regionNode.name}
        dayCount={dayCount}
        isAtCurrentRegion={isAtCurrentRegion}
        isBoardBuilding={isLeafBuilding && isYamenBountyBoardBuilding(inspectedRootBldg?.id)}
        activeYamenBounty={activeYamenBounty}
        yamenBountyDoneIds={yamenBountyDoneIds}
        celunSkill={skills['策论'] ?? 0}
      />

      {activeShop && (
        <InspectorShopSection
          activeShop={activeShop}
          currentContextKey={currentContextKey}
          isAtCurrentRegion={isAtCurrentRegion}
          playerSectId={sectState.sectId}
          silver={silver}
          dayCount={dayCount}
          arithmeticSkill={skills['算术'] ?? 0}
          equipped={equipped}
          consumedUniqueIds={consumedUniqueIds}
          auctionBoughtByMonth={auctionBoughtByMonth}
          inventory={inventory}
          onBuyItem={buySpotShopItem}
          onSellItem={sellInventoryItem}
          onBuyAuctionLot={buyXiangguoAuctionLot}
        />
      )}

      {actionFeedback && (
        <div
          className={`p-2 rounded bg-[#efe4cc] border border-[#c8b28e] text-xs leading-relaxed ${
            actionFeedback.tone === 'warn'
              ? 'text-[#8f1d14] font-semibold'
              : actionFeedback.tone === 'talk'
                ? 'text-[#523018]'
                : 'text-[#1b5132] font-medium'
          }`}
        >
          {actionFeedback.text}
        </div>
      )}

      <InspectorNpcRoster
        currentContextKey={currentContextKey}
        isLeafBuilding={isLeafBuilding}
        targetHasSubSpots={targetHasSubSpots}
        targetBuildingDb={targetBuildingDb}
        contextNpcs={contextNpcs}
        onOpenNpcInteraction={openNpcInteraction}
        onInteractNpc={interactNpc}
        onStartNpcCombat={startNpcCombat}
        onCompleteKaifengInvestigation={completeKaifengInvestigation}
        onOpenNpcDetailInCompendium={openNpcDetailInCompendium}
      />
    </div>
  )
}

export function ContextInspectorCard() {
  const viewMode = useGameStore((s) => s.viewMode)
  if (viewMode === 'world') {
    return <WorldNodeInspectorCard />
  }
  return <RegionBuildingInspectorCard />
}
