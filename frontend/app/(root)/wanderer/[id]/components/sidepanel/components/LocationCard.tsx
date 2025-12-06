import { useContext, useState } from "react";
import { WandererContext, WdAppState } from "../../../../context/WandererContext";
import styles from './LocationCard.module.css';
import { LocationDetails } from "@/app/(root)/wanderer/WandererTypes";
import ky from "ky";
import { mutate } from "swr";
import Image from "next/image";

export interface LocationCardProps {
  locationData: LocationDetails,
  nextStartDate: string | null
}

export default function LocationCard(props: LocationCardProps) {
  const { locationData, nextStartDate } = props;
  const ctx = useContext(WandererContext);
  const [reqState, setReqState] = useState(false);
  
  function enterLocationEdit() {
    if (!ctx) throw new Error('Missing context!');
    ctx.dispatch({
      type: 'setAppState',
      payload: { appState: WdAppState.locationEdit }
    })
    ctx.dispatch({ type: 'selectLocation', payload: { location: locationData } })
  }

  async function handleDelete() {
    if (!ctx) throw Error('Missing context!');
    if(reqState) return;
    setReqState(true);
    const result = await ky.delete(`${process.env.NEXT_PUBLIC_WANDERER_API}/loc`, {
      credentials: 'include',
      json: {
        _id: locationData._id,
        _itinerary: ctx.wanderState.currentItinerary
      }
    })
    setReqState(false);
    mutate(`${process.env.NEXT_PUBLIC_WANDERER_API}/itinerary/${ctx.wanderState.currentItinerary}`)
  }

  function renderWarning() {
    if (nextStartDate) {
      if (new Date(locationData.endDate) > new Date(nextStartDate)) {
        return (
          <div className={styles.warningContainer}>
            <Image width={20} height={20} src='/svg/caution.svg' alt='Caution icon' className={styles.warningIcon} />
            <p className={styles.warningText}>End date coincides with start date for next location!</p>
          </div>
        )
      }
    }
    return null;
  }

  return (
    <div
      className={styles.locationCard}
    >
      <div className={styles.infoContainer}>
        <div className={styles.locationDetails}>
          <h2>{locationData.details.name}</h2>
          <h3>{locationData.details.country?.name || null}</h3>
        </div>
        <div className={styles.locationDates}>
          <h2>Dates:</h2>
          <div className={styles.dateContainer}><span>Start:</span><span>{locationData.startDate ? new Date(locationData.startDate).toLocaleDateString('en-US') : null}</span></div>
          <div className={styles.dateContainer}><span>End:</span><span>{locationData.endDate ? new Date(locationData.endDate).toLocaleDateString('en-US') : null}</span></div>
        </div>
      </div>
      {renderWarning()}
      <div className={styles.controlContainer}>
        <button type="button" onClick={enterLocationEdit}>Edit</button>
        <button type="button" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}