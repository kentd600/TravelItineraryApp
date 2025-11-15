import WandererMainPanel from "./components/mainpanel/components/Map";
import WandererLayout from "./WandererLayout";
import { WandererContext, WdAppState, type WdDispatchArgs } from "./context/WandererContext";
import wdReducer from "./WandererReducer";
import { useEffect, useReducer } from "react";
import WandererSidePanel from "./components/sidepanel/SidePanel";
import wdHistoryReducer from "./HistoryReducer";
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
    appState: WdAppState.locationSelection,
    selectedLocation: null,
  })

  const map: Map | null = useMap("wanderer-map");

  const [wanderHistory, historyDispatch] = useReducer(wdHistoryReducer, [])

  useEffect(() => {
    if (!wanderState.selectedLocation) return;
    const coords = wanderState.selectedLocation.geometry?.coordinates
    if (!coords) return;
    map?.flyTo({
      center: new LngLat(coords[0], coords[1]),
      zoom: 7.5
    })
  }, [wanderState.selectedLocation]);

  function dispatchWithHistory (action: WdDispatchArgs): void {
    historyDispatch({ type: "add", payload: wanderState });
    dispatch({ type: action.type, payload: action.payload })
  }

  return (
      <WandererContext value={{wanderState, dispatch, wanderHistory, historyDispatch, dispatchWithHistory}}>
          <WandererLayout
            sidePanel={<WandererSidePanel />}
            mainPanel={<WandererMainPanel />}
          />
      </WandererContext>
  )
}