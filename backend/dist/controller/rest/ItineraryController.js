import { ItineraryModel } from "../../model/ItineraryModel.js";
import { dbInstance } from "../../model/Models.js";
export const itineraryController = {
    async createNew(userId) {
        await dbInstance.itineraryModel.createItinerary(userId);
    }
};
//# sourceMappingURL=ItineraryController.js.map