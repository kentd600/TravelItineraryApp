import type { FeaturePropertiesV2 } from "@stadiamaps/api";
import type { LngLat } from "maplibre-gl";
import { createContext, type ActionDispatch } from "react";
import { wdReducerActionPayloadMap } from "../WandererReducer";

export type WdLocation = {
  coords: LngLat,
  continent: string,
  country: string,
  countryCode: string,
  city: string | null,
  raw: FeaturePropertiesV2
}

export enum WdAppState {
  itineraryEdit,
  locationEdit
}

export interface WdStateVal {
  locationList: WdLocation[],
  //List of locations in the itinerary.
  appState: WdAppState,
  /*State of the app represented with the WdAppState enum.
  Is the user selecting a location? A POI for a locatin already added to the itinerary?
  Used to update the UI based on what the user is currently doing.*/
  selectedLocation?: null | FeaturePropertiesV2
  /*Currently selected location.
  Could be a country, city, POI, depending on the appState*/
}

export type WdDispatchArgs = {
  [K in keyof wdReducerActionPayloadMap]: {
    type: K;
    payload?: wdReducerActionPayloadMap[K];
  }
}[keyof wdReducerActionPayloadMap]

export type WdContextType = {
  wanderState: WdStateVal,
  dispatch: ActionDispatch<[WdDispatchArgs]>
}

export const WandererContext = createContext<WdContextType | null>(null);