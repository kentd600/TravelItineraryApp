import { useContext, useState } from "react";
import { WandererContext } from "../../../../context/WandererContext";
import { useRControl } from "maplibre-react-components";
import { createPortal } from "react-dom";
import ky from "ky";
import { mutate } from "swr";
import styles from './MapAddControl.module.css';

export default function MapAddControl () {
  const ctx = useContext(WandererContext);
  const { container } = useRControl({
    position: "bottom-right"
  });
  const [addingState, setAddingState] = useState(false);

  const handleClick = () => {
    if (addingState) return;
    if (!ctx) return;
    if (!ctx.wanderState.selectedLocation) return;
    setAddingState(true);
    ky.post(`${process.env.NEXT_PUBLIC_WANDERER_API}/loc/add`, {
      credentials: 'include',
      json: {
        id: ctx.wanderState.currentItinerary,
        details: ctx.wanderState.selectedLocation
      }
    })
    mutate(`${process.env.NEXT_PUBLIC_WANDERER_API}/itinerary/${ctx.wanderState.currentItinerary}`)
    setAddingState(false);
  };

  return createPortal(
    <input 
      type='button'
      value='Add to Itinerary'
      onClick={handleClick}
      className={`globalButtonStyle ${styles.addButton}`}
      disabled={addingState}
    />,
    container
  )
}