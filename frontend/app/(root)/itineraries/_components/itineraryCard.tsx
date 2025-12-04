import ky from "ky";
import { redirect, RedirectType } from "next/navigation";
import { useState } from "react";
import { mutate } from "swr";
import Confirmation from "./confirmation";
import styles from './itineraryCard.module.css';

export default function ItineraryCard ({ itinerary }: { itinerary: Record<string, any> }) {
  const { title, _id } = itinerary;
  const [modalState, setModalState] = useState(false);
  const [reqState, setReqState] = useState(false);

  function handleClick() {
    redirect(`/wanderer/${_id}`, RedirectType.push);
  }

  function toggleModal() {
    setModalState(prev => !prev);
  }

  async function deleteItinerary() {
    if(reqState) return;
    setReqState(true);
    const result = await ky.delete(`${process.env.NEXT_PUBLIC_WANDERER_API}/itinerary/${_id}`, {
      credentials: 'include'
    })
    setReqState(false);
    mutate(`${process.env.NEXT_PUBLIC_WANDERER_API}/itinerary`);
  }

  return (
    <div className={styles.itineraryCard}>
      <h1 className={styles.itineraryTitle}>{title.toUpperCase()}</h1>
      <button type="button" onClick={handleClick} className={`globalButtonStyle ${styles.editButton}`}>Edit</button>
      <button type="button" onClick={toggleModal} className={`globalButtonStyle ${styles.deleteButton}`}>Delete</button>
      {modalState ? <Confirmation callback={deleteItinerary} toggleSelf={toggleModal}/> : null}
    </div>
  )
}