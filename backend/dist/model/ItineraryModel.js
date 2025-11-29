import mongoose, { Schema } from "mongoose";
import { generateSelect } from "./ModelUtility.js";
import { dbInstance } from "./Models.js";
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
    async getItinerary(userId, itineraryId, select, exclude) {
        const selectFields = generateSelect(select || undefined, exclude || undefined);
        const itinerary = await this.model
            .findById(itineraryId)
            .where('_user')
            .equals(userId)
            .select(selectFields);
        return itinerary;
    }
}
//# sourceMappingURL=ItineraryModel.js.map