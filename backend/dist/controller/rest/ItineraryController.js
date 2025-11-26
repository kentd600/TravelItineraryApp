import {} from "express";
import { dbInstance } from "../../model/Models.js";
import { auth } from "../../utils/auth.js";
import { fromNodeHeaders } from "better-auth/node";
export const itineraryController = {
    async createNew(req) {
        const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
        const { title } = req.body;
        if (!session)
            throw new Error('Unauthorized.');
        await dbInstance.itineraryModel.createItinerary(session.user.id, title);
    },
    async addLocation(req) {
        const { itineraryId, location, startDate, endDate } = req.body;
        const result = await dbInstance.itineraryModel.addLocation(itineraryId, location, startDate, endDate);
        console.log(result);
    }
};
//# sourceMappingURL=ItineraryController.js.map