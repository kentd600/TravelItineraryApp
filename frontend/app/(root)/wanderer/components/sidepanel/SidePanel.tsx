import { useContext } from "react"
import { WandererContext, WdAppState } from "../../context/WandererContext"
import LocationCard from "./components/LocationCard";
import styles from "./SidePanel.module.css"

export default function WandererSidePanel () {
  const ctx = useContext(WandererContext)
  const locationList = ctx?.wanderState?.locationList ?? null;

  function backToItineraryEdit () {
    ctx?.dispatch({
      type: 'setAppState',
      payload: { appState: WdAppState.itineraryEdit }
    })
  }

  return (
    <div className={styles.sidePanel}>
      <div className={styles.panelControl}>
        {ctx?.wanderState.appState === WdAppState.locationEdit ?
        <button type="button" onClick={backToItineraryEdit}>Edit Itinerary</button> : null}
      </div>
      <div className={styles.locationsContainer}>
        {locationList && ctx?.wanderState.appState === WdAppState.itineraryEdit ?
        locationList.map(loc => <LocationCard locationData={loc} key={loc.city}/>) : null}
      </div>
    </div>
  )
}