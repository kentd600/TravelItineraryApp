import { useContext } from "react"
import { WandererContext, WdAppState } from "../../../context/WandererContext"
import LocationCard from "./components/LocationCard";
import styles from "./SidePanel.module.css"
import SidePanelControl from "./components/SidePanelControl";

export default function WandererSidePanel () {
  const ctx = useContext(WandererContext)
  const locationList = ctx?.wanderState?.locationList ?? null;

  return (
    <div className={styles.sidePanel}>
      <SidePanelControl />
      <div className={styles.locationsContainer}>
        {locationList && ctx?.wanderState.appState === WdAppState.itineraryEdit ?
        locationList.map(loc => <LocationCard locationData={loc} key={loc.city}/>) : null}
      </div>
    </div>
  )
}