import mongoose, { Schema } from "mongoose";
import { generateSelect } from "./ModelUtility.js";
import { dbInstance } from "./Models.js";
import { error } from "console";
const itinerarySchema = {
    _user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    title: { type: String, required: true }
};
export class ItineraryModel {
    schema;
    model;
    constructor() {
        this.schema = new mongoose.Schema(itinerarySchema);
        this.model = mongoose.model('itinerary', this.schema);
    }
    async createItinerary(_user, title) {
        const result = await this.model.insertOne({
            _user,
            locations: [],
            title
        });
    }
    async getUserItineraries(userId, select, exclude) {
        const selectFields = generateSelect(select || undefined, exclude || undefined);
        const itineraries = Object.keys(selectFields).length === 0 ?
            await this.model.find({ _user: userId }) :
            await this.model.find({ _user: userId }).select(selectFields);
        return itineraries;
    }
    async getItinerary(_user, itineraryId, select, exclude) {
        if (!_user || !itineraryId)
            console.error('Cannot get itinerary without user id and itinerary id.');
        const selectFields = generateSelect(select || undefined, exclude || undefined);
        const itinerary = await this.model
            .findOne({
            _id: itineraryId,
            _user
        })
            .select(selectFields);
        return itinerary;
    }
    async deleteItinerary(_id, _user) {
        const itinerary = await this.model.findOne({ _id, _user });
        if (!itinerary)
            throw Error('Invalid itinerary or user id.');
        const deleteLocationsResult = await dbInstance.locationModel.model.deleteMany({
            _itinerary: _id
        });
        if (!deleteLocationsResult.acknowledged)
            throw error('Error deleting locations associated with itinerary.');
        const result = await this.model.deleteOne({ _id, _user });
        return result;
    }
}
//# sourceMappingURL=ItineraryModel.js.map