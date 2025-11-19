import { type Request } from 'express';
import { LayerId, type FeaturePropertiesV2, GeocodingApi, Configuration } from '@stadiamaps/api';

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
  }
}