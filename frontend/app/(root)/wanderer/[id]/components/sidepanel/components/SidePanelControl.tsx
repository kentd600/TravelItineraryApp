import { useContext } from "react"
import { WandererContext, WdAppState } from "../../../../context/WandererContext"
import styles from '../SidePanel.module.css';
import Image from "next/image";

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

  return (
    <div className={styles.panelControl}>
      <div className={styles.controlTextContainer}>
        {ctx.wanderState.appState === WdAppState.itineraryEdit ? "Selected Location: " : "Editing Location: "}
        <h2>{ctx.wanderState.selectedLocation?.details.name ?? null}</h2>
      </div>
        {ctx.wanderState.appState === WdAppState.locationEdit ?
        <button type="button" onClick={backToItineraryEdit} className={styles.controlPanelButton}>
          <div className={styles.buttonContentContainer}>
            <Image
            src='/svg/back.svg'
            alt="Back button image"
            width={25}
            height={25}
            />
            <p>Back to Itinerary</p>
          </div>
        </button> : null}
    </div>
  )
}