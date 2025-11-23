import { FeaturePropertiesV2 } from "@stadiamaps/api";
import { type WdStateVal, type WdDispatchArgs, WdAppState } from "./context/WandererContext";
import { LngLat } from "maplibre-gl";

export default function wdReducer(state: WdStateVal, action: WdDispatchArgs): WdStateVal {
  switch(action.type) {

    case 'addLocation':
      if (!state.selectedLocation) throwReducerError('No location selected!');
      const selectedCityProperties = state.selectedLocation!.properties;
      const coordinates = state.selectedLocation!.geometry?.coordinates || [0, 0];
      const continent = selectedCityProperties.context?.whosonfirst?.continent?.name || 'missing';
      const country = selectedCityProperties.context?.whosonfirst?.country?.name || 'missing';
      const countryCode = selectedCityProperties.context?.whosonfirst?.country?.abbreviation || 'missing';
      const city = selectedCityProperties.name || 'missing';
      return {
        ...state,
        locationList: [
          ...state.locationList,
          {
            coords: new LngLat(coordinates[0], coordinates[1]),
            continent,
            country,
            countryCode,
            city,
            raw: state.selectedLocation!
          }
        ],

      }

    case 'selectLocation':
      if (!action.payload?.location) throwReducerError('Location payload missing.');
      const { location } = action.payload!;
      return {
        ...state,
        selectedLocation: location!
      }

    case 'deselectLocation':
      return {
        ...state,
        selectedLocation: null
      }

    case 'setAppState':
      const { appState } = action.payload!;
      return {
        ...state,
        appState: appState!
      }

    default:
      return state;
  }
}

export interface wdReducerActionPayloadMap {
  'addLocation': undefined,
  'selectLocation': { location: FeaturePropertiesV2 },
  'deselectLocation': undefined,
  'setAppState': { appState: WdAppState }
}

function throwReducerError(msg: string): void {
  throw new Error(msg);
}