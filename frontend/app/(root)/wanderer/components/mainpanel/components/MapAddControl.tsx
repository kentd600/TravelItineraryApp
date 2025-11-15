import { useContext } from "react";
import { WandererContext } from "../../../context/WandererContext";
import { useRControl } from "maplibre-react-components";
import { createPortal } from "react-dom";


export default function MapAddControl () {
  const ctx = useContext(WandererContext);
  const { container } = useRControl({
    position: "bottom-right"
  });

  const handleClick = () => {
    if (!ctx) return;
    ctx.dispatchWithHistory({ type: 'addLocation' })
  };

  return createPortal(
    <input 
      type='button'
      value='Add to Itinerary'
      onClick={handleClick}
      className='rmap-control__add-button'
    />,
    container
  )
}