import { Suspense, useContext } from "react"
import { WandererContext, WdAppState } from "../../../context/WandererContext"
import LocationCard from "./components/LocationCard";
import styles from "./SidePanel.module.css"
import SidePanelControl from "./components/SidePanelControl";
import Loading from "@/app/(root)/loading";
import LocationEdit from "./components/LocationEdit";

export default function WandererSidePanel () {
  const ctx = useContext(WandererContext)
  if(!ctx) throw new Error('Missing context!');
  const locationList = ctx.wanderState.itineraryDetails ?? null;
  const sortedList = locationList?.sort((a, b) => {
    const aDate = new Date(a.startDate);
    const bDate = new Date(b.startDate);
    return aDate.getTime() - bDate.getTime();
  })

  function renderContent() {
    if (!ctx) return null;
    switch(ctx.wanderState.appState) {
      case WdAppState.itineraryEdit:
        if (!sortedList) return null;
        return sortedList.map((loc, idx) => <LocationCard locationData={loc} key={`${idx}_${loc.details.gid}`}/>);
      case WdAppState.locationEdit:
        return <LocationEdit />
      default:
        return null
    }
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className={styles.sidePanel}>
        <SidePanelControl />
        <div className={styles.locationsContainer}>
          {renderContent()}
        </div>
      </div>
    </Suspense>
  )
}