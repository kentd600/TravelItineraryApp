import { type WdStateVal, type WdDispatchArgs } from "./context/WandererContext";
import { LngLat } from "maplibre-gl";

export default function wdReducer(state: WdStateVal, action: WdDispatchArgs) {
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
            city
          }
        ],

      }

    case 'selectLocation':
      if (!action.payload?.location) throwReducerError('Location payload missing.');
      const { location } = action.payload!;
      return {
        ...state,
        selectedLocation: location!
      } satisfies WdStateVal;

    case 'setState':
      if (!action.payload?.state) throwReducerError('State payload missing.');
      return action.payload!.state!;

    default:
      return state;
  }
}

function throwReducerError(msg: string): void {
  throw new Error(msg);
}