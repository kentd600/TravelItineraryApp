import { type Request } from 'express';
import { LayerId, type FeaturePropertiesV2, GeocodingApi, Configuration } from '@stadiamaps/api';
import { dbInstance } from '../../model/Models.js';
import { normalizeFeatureProperties } from '../../utils/modelUtil.js';
import type { DbLocationResult } from '../../model/LocationModel.js';

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

  async getPlaceDetails(req: Request): Promise<Omit<DbLocationResult, '_id' | '_itinerary' | 'startDate' | 'endDate' | 'justAdded' | 'notes'>> {
    const { id } = req.body;
    const result = await geoApi.placeDetailsV2({
      ids: [id]
    })
    const normalized = normalizeFeatureProperties(result.features[0]!);
    return {
      details: normalized
    };
  },

  async addLocationToItinerary(req: Request) {
    const { id, details } = req.body;
    const result = await dbInstance.locationModel.addLocation(id, details.details);
    return result;
  },

  async deleteLocationFromItinerary(req: Request) {
    const { _id, _itinerary } = req.body;
    const { userId } = req;
    if (!userId) throw Error('Not authenticated!');
    const result = await dbInstance.locationModel.deleteLocation(_id, _itinerary, userId)
    return result;
  },

  async updateDates(req: Request) {
    const { _id, _itinerary, startDate, endDate, justAdded, notes } = req.body;
    const { userId } = req;
    if (!userId) throw Error('Not authenticated');
    const result = await dbInstance.locationModel.updateLocation(_id, _itinerary, userId, {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      justAdded,
      notes
    })
    return result;
  }
}