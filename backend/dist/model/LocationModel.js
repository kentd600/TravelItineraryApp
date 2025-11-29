import mongoose, { Document, Schema } from "mongoose";
import { generateSelect } from "./ModelUtility.js";
import { dbInstance } from "./Models.js";
import { instanceOfFeaturePropertiesV2 } from "@stadiamaps/api";
import { array, string } from "zod";
import { fa } from "zod/locales";
const locationDetailsSchema = {
    bbox: { type: [Number], required: true },
    geoCoordinates: { type: [Number], required: true },
    geoType: { type: String, required: true },
    coarseLocation: { type: String, required: false },
    continent: { type: Map, of: String, required: false },
    country: { type: Map, of: String, required: false },
    locality: { type: Map, of: String, required: false },
    gid: { type: String, required: true },
    name: { type: String, required: true }
};
const locationSchema = {
    _itinerary: { type: Schema.Types.ObjectId, required: true, ref: 'itineraries' },
    details: { type: locationDetailsSchema, required: true }
};
export class LocationModel {
    schema;
    model;
    constructor() {
        this.schema = new mongoose.Schema(locationSchema);
        this.model = mongoose.model('location', this.schema);
    }
    async addLocation(_itinerary, details) {
        const toInsert = {
            bbox: details.bbox,
            geoCoordinates: details.geometry.coordinates,
            geoType: details.geometry.type,
            coarseLocation: details.properties.coarseLocation,
            continent: details.properties.context?.whosonfirst.continent,
            country: details.properties.context?.whosonfirst.country,
            locality: details.properties.context?.whosonfirst.locality,
            gid: details.properties.gid,
            name: details.properties.name
        };
        const result = await this.model.insertOne({
            _itinerary,
            details: toInsert
        });
        return result;
    }
}
//# sourceMappingURL=LocationModel.js.map