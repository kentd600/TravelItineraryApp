import WandererMainPanel from "./components/mainpanel/components/Map";
import WandererLayout from "./WandererLayout";
import { WandererContext } from "../context/WandererContext";
import { useContext, useEffect, useReducer } from "react";
import WandererSidePanel from "./components/sidepanel/SidePanel";
import { RMapContextProvider, useMap } from "maplibre-react-components";
import { LngLat, type Map } from "maplibre-gl";

export default function Wanderer() {
  const ctx = useContext(WandererContext);
  const map: Map | null = useMap("wanderer-map");

  if(!ctx) throw new Error('Missing context!');

  useEffect(() => {
    if (!ctx.wanderState.selectedLocation) return;
    const coords = ctx.wanderState.selectedLocation.details.geoCoordinates
    if (!coords) return;
    map?.flyTo({
      center: new LngLat(coords[0], coords[1]),
      zoom: 7.5
    })
  }, [ctx.wanderState.selectedLocation]);

  return (
    <WandererLayout
      sidePanel={<WandererSidePanel />}
      mainPanel={<WandererMainPanel />}
    />
  )
}