import mongoose from "mongoose";
const itinerarySchema = {
    userId: { type: String, required: true },
    locations: { type: Array, required: true }
};
export class ItineraryModel {
    schema;
    model;
    constructor() {
        this.schema = new mongoose.Schema(itinerarySchema);
        this.model = mongoose.model('itinerary', this.schema);
    }
    async createItinerary(userId) {
        const result = await this.model.insertOne({
            userId,
            locations: []
        });
    }
}
//# sourceMappingURL=ItineraryModel.js.map