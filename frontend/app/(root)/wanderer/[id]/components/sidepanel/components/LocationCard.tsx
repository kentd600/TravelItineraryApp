import React, { useContext, useRef, useState } from "react";
import { WandererContext, WdAppState } from "../../../../context/WandererContext";
import styles from './LocationCard.module.css';
import { LocationDetails } from "@/app/(root)/wanderer/WandererTypes";
import ky from "ky";
import { mutate } from "swr";
import Image from "next/image";
import { exitCode } from "process";

export interface LocationCardProps {
  locationData: LocationDetails,
  nextStartDate: string | null
}

export default function LocationCard(props: LocationCardProps) {
  const { locationData, nextStartDate } = props;
  const container = useRef<HTMLDivElement>(null);
  const outerContainer = useRef<HTMLDivElement>(null);
  const mouseCoords = useRef({
    x: 0,
    y: 0
  })
  const dragging = useRef(false);
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

  function updateMouseCoords(evt: MouseEvent) {
    mouseCoords.current = { x: evt.clientX, y: evt.clientY };
  }

  function animateDrag(timestamp: number, start: number[]) {
    if (!container.current) return;
    const x = mouseCoords.current.x - start[0];
    const y = mouseCoords.current.y - start[1];
    container.current.style.transform = `translateY(${y}px)`
    if (dragging.current) {
      requestAnimationFrame(timestamp => animateDrag(timestamp, start));
    } else {
      container.current.style.transform = "translateY(0px)"
      container.current.style.position = 'relative';
    }
  }

  function handleDrag(evt: React.MouseEvent<HTMLDivElement>) {
    if (!container.current || !outerContainer.current) return;
    const start = [evt.clientX, evt.clientY];
    mouseCoords.current = { x: evt.clientX, y: evt.clientY };
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('mousemove', updateMouseCoords);
    dragging.current = true;
    const curWidth = container.current.clientWidth;
    container.current.style.zIndex = '9999';
    container.current.style.position = 'absolute';
    container.current.style.width = `${curWidth}px`;
    outerContainer.current.style.height = 'auto';
    requestAnimationFrame(timestamp => animateDrag(timestamp, start));
  }

  function handleDragEnd() {
    if (!container.current || !outerContainer.current) return;
    outerContainer.current.style.height = '170px';
    container.current.style.zIndex = '1';
    container.current.style.position = 'relative';
    window.removeEventListener('mouseup', handleDragEnd);
    window.removeEventListener('mousemove', updateMouseCoords);
    dragging.current = false;
  }

  return (
    <div className={styles.locationCardContainer} ref={outerContainer}>
      <div className={styles.dropZone}></div>
      <div
        className={styles.locationCard}
        onMouseDown={handleDrag}
        ref={container}
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
      <div className={styles.dropZone}></div>
    </div>
  )
}