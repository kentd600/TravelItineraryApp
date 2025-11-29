import { type Request } from "express";
import { dbInstance } from "../../model/Models.js"
import { auth } from "../../utils/auth.js";
import { fromNodeHeaders } from "better-auth/node";

export const itineraryController = {
  async createNew(req: Request) {
    const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
    const { title } = req.body;
    if (!session) throw new Error('Unauthorized.');
    await dbInstance.itineraryModel.createItinerary(session.user.id, title);
    const itineraries = await dbInstance.itineraryModel.getUserItineraries(session.user.id, ['title']);
    return itineraries;
  },

  async addLocation(req: Request) {
    const { itineraryId, location, startDate, endDate } = req.body;
  },

  async getItineraries(req: Request) {
    const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
    if (!session) throw new Error ('Unauthorized.');
    const itineraries = await dbInstance.itineraryModel.getUserItineraries(session.user.id);
    return itineraries;
  },

  async getIinerary(req: Request) {
    const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
    if (!session) throw new Error ('Unauthorized.');
    const itinerary = await dbInstance.itineraryModel.getItinerary(session.user.id, req.params.id!)
    if (!itinerary) throw new Error('Could not find itinerary.');
    const locations = await dbInstance.locationModel.getItineraryLocations(itinerary._id.toString(), [], ['_itinerary']);
    return {
      itinerary,
      locations
    };
  }
}