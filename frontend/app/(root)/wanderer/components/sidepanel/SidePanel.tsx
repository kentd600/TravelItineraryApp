import { useContext } from "react"
import { WandererContext } from "../../context/WandererContext"
import LocationCard from "./components/LocationCard";

export default function WandererSidePanel () {
  const ctx = useContext(WandererContext)
  const locationList = ctx?.wanderState?.locationList ?? null;

  return (
    <>
      <div className="side-panel__tabs-container">

      </div>
      <div className="locations__container">
        {locationList ? locationList.map(loc => <LocationCard locationData={loc} key={loc.city}/>) : null}
      </div>
    </>
  )
}