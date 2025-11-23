import {} from 'express';
import { LayerId, GeocodingApi, Configuration } from '@stadiamaps/api';
const config = new Configuration({ apiKey: process.env.STADIA_API_KEY });
const geoApi = new GeocodingApi(config);
const layerStates = {
    default: ['locality', 'country']
};
export const locationController = {
    async autocomplete(req) {
        const { text } = req.body;
        const result = await geoApi.autocompleteV2({
            text,
            lang: "en",
            layers: layerStates.default
        });
        return result;
    },
    async getPlaceDetails(req) {
        const { id } = req.body;
        const result = await geoApi.placeDetailsV2({
            ids: [id]
        });
        return result;
    }
};
//# sourceMappingURL=LocationController.js.map