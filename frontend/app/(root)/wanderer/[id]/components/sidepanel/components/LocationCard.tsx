import { useContext } from "react";
import { WandererContext, WdAppState } from "../../../../context/WandererContext";
import styles from './LocationCard.module.css';
import { LocationDetails } from "@/app/(root)/wanderer/WandererTypes";

export interface LocationCardProps {
  locationData: LocationDetails
}

export default function LocationCard(props: LocationCardProps) {
  const { locationData } = props!;
  console.log(locationData)
  const ctx = useContext(WandererContext);
  

  function enterLocationEdit() {
    if (!ctx) throw new Error('Missing context!');
    ctx.dispatch({
      type: 'setAppState',
      payload: { appState: WdAppState.locationEdit }
    })
    ctx.dispatch({ type: 'selectLocation', payload: { location: locationData } })
  }

  return (
    <div
      className={styles.locationCard}
      onClick={enterLocationEdit}
    >
        <h2>{locationData.details.name}</h2>
        <p>{`Continent: ${locationData.details.continent}`}</p>
        <p>{`Country: ${locationData.details.country}`}</p>
    </div>
  )
}