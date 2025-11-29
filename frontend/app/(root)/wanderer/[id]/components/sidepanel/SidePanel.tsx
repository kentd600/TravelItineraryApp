import { useContext } from "react"
import { WandererContext, WdAppState } from "../../../context/WandererContext"
import LocationCard from "./components/LocationCard";
import styles from "./SidePanel.module.css"
import SidePanelControl from "./components/SidePanelControl";

export default function WandererSidePanel () {
  const ctx = useContext(WandererContext)
  if(!ctx) throw new Error('Missing context!');
  const locationList = ctx.wanderState.itineraryDetails ?? null;

  return (
    <div className={styles.sidePanel}>
      <SidePanelControl />
      <div className={styles.locationsContainer}>
        {locationList && ctx?.wanderState.appState === WdAppState.itineraryEdit ?
        locationList.map((loc, idx) => <LocationCard locationData={loc} key={`${idx}_${loc.details.gid}`}/>) : null}
      </div>
    </div>
  )
}