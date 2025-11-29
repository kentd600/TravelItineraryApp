import { useContext } from "react"
import { WandererContext, WdAppState } from "../../../../context/WandererContext"
import styles from '../SidePanel.module.css';

export default function SidePanelControl() {
  const ctx = useContext(WandererContext);
  if (!ctx) throw new Error('Missing context!');

  function backToItineraryEdit () {
    if (!ctx) throw new Error('Missing context!');
    ctx.dispatch({
      type: 'setAppState',
      payload: { appState: WdAppState.itineraryEdit }
    })
    ctx.dispatch({
      type: 'deselectLocation'
    })
  }

  console.log(ctx.wanderState.selectedLocation?.details.name)

  return (
    <div className={styles.panelControl}>
      <h1>Selected Location: {ctx.wanderState.selectedLocation?.details.name ?? null}</h1>
        {ctx.wanderState.appState === WdAppState.locationEdit ?
        <button type="button" onClick={backToItineraryEdit}>Edit Itinerary</button> : null}
    </div>
  )
}