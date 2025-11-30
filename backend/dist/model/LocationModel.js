import mongoose, { Document, Mongoose, Schema, Types } from "mongoose";
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
    details: { type: locationDetailsSchema, required: true },
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false }
};
export class LocationModel {
    schema;
    model;
    constructor() {
        this.schema = new mongoose.Schema(locationSchema);
        this.model = mongoose.model('location', this.schema);
    }
    async addLocation(_itinerary, details) {
        const result = await this.model.insertOne({
            _itinerary,
            details,
            startDate: null,
            endDate: null
        });
        return result;
    }
    async deleteLocation(_id, _itinerary, _user) {
        console.log(_id, _itinerary, _user);
        const itinerary = await dbInstance.itineraryModel.model.findOne({ _id: _itinerary, _user });
        if (!itinerary) {
            console.error('Itinerary and user ids must be valid.');
            throw Error('Invalid itinerary or user id.');
        }
        const result = await this.model.deleteOne({ _id, _itinerary });
        return result;
    }
    async getItineraryLocations(_itinerary, select, exclude) {
        const selectFields = generateSelect(select || undefined, exclude || undefined);
        const result = await this.model.find({ _itinerary }).select(selectFields);
        return result;
    }
    async updateLocation(_id, _itinerary, _user, updateFields) {
        const itinerary = await dbInstance.itineraryModel.model.findOne({ _id: _itinerary, _user });
        if (!itinerary) {
            console.error('Itinerary and user ids must be valid.');
            throw Error('Itinerary and user ids must be valid.');
        }
        const result = await this.model.updateOne({ _id, _itinerary }, updateFields);
        return result;
    }
}
//# sourceMappingURL=LocationModel.js.map