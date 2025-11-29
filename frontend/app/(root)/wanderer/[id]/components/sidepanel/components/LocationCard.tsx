import { useContext } from "react";
import { WandererContext, WdAppState, type WdLocation } from "../../../../context/WandererContext";
import styles from './LocationCard.module.css';

export interface LocationCardProps {
  locationData: WdLocation
}

export default function LocationCard(props: LocationCardProps) {
  const { locationData } = props!;
  const ctx = useContext(WandererContext);

  function enterLocationEdit() {
    ctx?.dispatch({
      type: 'setAppState',
      payload: { appState: WdAppState.locationEdit }
    })
    ctx?.dispatch({ type: 'selectLocation', payload: { location: locationData.raw } })
  }

  return (
    <div
      className={styles.locationCard}
      onClick={enterLocationEdit}
    >
        <h2>{locationData.city}</h2>
        <p>{`Continent: ${locationData.continent}`}</p>
        <p>{`Country: ${locationData.country}`}</p>
        <p>{`Country Code: ${locationData.countryCode}`}</p>
    </div>
  )
}