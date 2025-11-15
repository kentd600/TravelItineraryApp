import { type WdLocation } from "../../../context/WandererContext";

export interface LocationCardProps {
  locationData: WdLocation
}

export default function LocationCard(props: LocationCardProps) {
  const { locationData } = props!;
  return (
    <div className="location-card__container">
      <h2>{locationData.city}</h2>
      <p>{`
        Continent: ${locationData.continent}
        Country: ${locationData.country}
        Country Code: ${locationData.countryCode}
      `}</p>
    </div>
  )
}