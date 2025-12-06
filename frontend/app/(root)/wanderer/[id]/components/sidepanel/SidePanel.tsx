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

  function renderContent() {
    if (!ctx) return null;
    switch(ctx.wanderState.appState) {
      case WdAppState.itineraryEdit:
        if (!ctx.wanderState.itineraryDetailsSorted) return null;
        return ctx.wanderState.itineraryDetailsSorted.map((loc, idx) => {
          const nextLocation = idx + 1;
          const nextStartDate = ctx.wanderState.itineraryDetailsSorted![nextLocation] ? ctx.wanderState.itineraryDetailsSorted![nextLocation].startDate : null;
          return <LocationCard locationData={loc} nextStartDate={nextStartDate} key={`${idx}_${loc.details.gid}`}/>
        });
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