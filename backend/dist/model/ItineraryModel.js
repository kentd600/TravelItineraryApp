import mongoose, { Schema } from "mongoose";
const itinerarySchema = {
    _user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    title: { type: String, required: true },
    locations: { type: Array, required: true }
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
        console.log(result);
    }
    async addLocation(itineraryId, location, startDate, endDate) {
        const itinerary = await this.model.findById(itineraryId);
        itinerary?.locations?.push({
            location: JSON.stringify(location),
            pois: undefined,
            startDate: new Date(startDate),
            endDate: new Date(endDate)
        });
    }
}
//# sourceMappingURL=ItineraryModel.js.map