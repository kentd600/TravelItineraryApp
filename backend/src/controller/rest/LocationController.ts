import { type Request } from 'express';
import { LayerId, type FeaturePropertiesV2, GeocodingApi, Configuration } from '@stadiamaps/api';
import { dbInstance } from '../../model/Models.js';

const config = new Configuration({ apiKey: process.env.STADIA_API_KEY! });
const geoApi = new GeocodingApi(config);

const layerStates = {
  default: ['locality', 'country'] as LayerId[]
}

export const locationController = {
  async autocomplete(req: Request) {
    const { text } = req.body;
    const result = await geoApi.autocompleteV2({
      text,
      lang: "en",
      layers: layerStates.default
    })
    return result;
  },

  async getPlaceDetails(req: Request) {
    const { id } = req.body;
    const result = await geoApi.placeDetailsV2({
      ids: [id]
    })
    return result;
  },

  async addLocationToItinerary(req: Request) {
    const { id, details } = req.body;
    const result = await dbInstance.locationModel.addLocation(id, details);
    return result;
  }
}