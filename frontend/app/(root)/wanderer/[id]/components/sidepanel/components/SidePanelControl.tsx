import { useContext } from "react"
import { WandererContext, WdAppState } from "../../../../context/WandererContext"
import styles from '../SidePanel.module.css';

export default function SidePanelControl() {
  const ctx = useContext(WandererContext);

  function backToItineraryEdit () {
    ctx?.dispatch({
      type: 'setAppState',
      payload: { appState: WdAppState.itineraryEdit }
    })
    ctx?.dispatch({
      type: 'deselectLocation'
    })
  }

  return (
    <div className={styles.panelControl}>
      <h1>Selected Location: {ctx?.wanderState.selectedLocation?.properties.name ?? null}</h1>
        {ctx?.wanderState.appState === WdAppState.locationEdit ?
        <button type="button" onClick={backToItineraryEdit}>Edit Itinerary</button> : null}
    </div>
  )
}