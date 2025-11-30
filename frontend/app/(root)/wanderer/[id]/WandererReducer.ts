import { FeaturePropertiesV2 } from "@stadiamaps/api";
import { type WdStateVal, type WdDispatchArgs, WdAppState } from "../context/WandererContext";
import { LngLat } from "maplibre-gl";
import ky from "ky";
import { LocationDetails } from "../WandererTypes";

export default function wdReducer(state: WdStateVal, action: WdDispatchArgs): WdStateVal {
  switch(action.type) {
      // const selectedCityProperties = state.selectedLocation!.properties;
      // const coordinates = state.selectedLocation!.geometry?.coordinates || [0, 0];
      // const continent = selectedCityProperties.context?.whosonfirst?.continent?.name || 'missing';
      // const country = selectedCityProperties.context?.whosonfirst?.country?.name || 'missing';
      // const countryCode = selectedCityProperties.context?.whosonfirst?.country?.abbreviation || 'missing';
      // const city = selectedCityProperties.name || 'missing';
      // return {
      //   ...state,
      //   locationList: [
      //     ...state.locationList,
      //     {
      //       coords: new LngLat(coordinates[0], coordinates[1]),
      //       continent,
      //       country,
      //       countryCode,
      //       city,
      //       raw: state.selectedLocation!
      //     }
      //   ],

      // }

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

    case 'setItineraryId':
      const { itineraryId } = action.payload!;
      return {
        ...state,
        currentItinerary: itineraryId
      }

    case 'setItineraryDetails':
      const { itineraries } = action.payload!;
      return {
        ...state,
        itineraryDetails: itineraries
      }

    default:
      return state;
  }
}

export interface wdReducerActionPayloadMap {
  'addLocation': undefined,
  'selectLocation': { location: LocationDetails },
  'deselectLocation': undefined,
  'setAppState': { appState: WdAppState },
  'setItineraryId': { itineraryId: string },
  'setItineraryDetails': { itineraries: LocationDetails[] }
}

function throwReducerError(msg: string): void {
  throw new Error(msg);
}