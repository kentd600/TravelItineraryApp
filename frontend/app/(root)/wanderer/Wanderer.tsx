import WandererMainPanel from "./components/mainpanel/components/Map";
import WandererLayout from "./WandererLayout";
import { WandererContext, WdAppState, WdStateVal, type WdDispatchArgs } from "./context/WandererContext";
import wdReducer from "./WandererReducer";
import { ActionDispatch, useEffect, useReducer } from "react";
import WandererSidePanel from "./components/sidepanel/SidePanel";
import { RMapContextProvider, useMap } from "maplibre-react-components";
import { LngLat, type Map } from "maplibre-gl";

export default function Wanderer() {
  return (
    <RMapContextProvider>
      <WandererInner />
    </RMapContextProvider>
  )
}

function WandererInner() {
  const [wanderState, dispatch] = useReducer(wdReducer, {
    locationList: [],
    appState: WdAppState.itineraryEdit,
    selectedLocation: null,
  })

  const map: Map | null = useMap("wanderer-map");

  useEffect(() => {
    if (!wanderState.selectedLocation) return;
    const coords = wanderState.selectedLocation.geometry?.coordinates
    if (!coords) return;
    map?.flyTo({
      center: new LngLat(coords[0], coords[1]),
      zoom: 7.5
    })
  }, [wanderState.selectedLocation]);

  return (
      <WandererContext value={{wanderState, dispatch}}>
          <WandererLayout
            sidePanel={<WandererSidePanel />}
            mainPanel={<WandererMainPanel />}
          />
      </WandererContext>
  )
}