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

  async getItineraries(req: Request) {
    const { userId } = req;
    console.log(userId);
    if(!userId) throw Error('Unauthorized.');
    const itineraries = await dbInstance.itineraryModel.getUserItineraries(userId);
    console.log(itineraries);
    return itineraries;
  },

  async getIinerary(req: Request) {
    const { userId } = req;
    if (!userId) throw new Error ('Unauthorized.');
    const itinerary = await dbInstance.itineraryModel.getItinerary(userId, req.params.id!);
    if (!itinerary) throw new Error('Could not find itinerary.');
    const locations = await dbInstance.locationModel.getItineraryLocations(itinerary._id.toString(), [], ['_itinerary']);
    return {
      itinerary,
      locations
    };
  },

  async deleteItinerary(req: Request) {
    const { id } = req.params;
    const { userId } = req;
    if(!id) throw Error('Missing id param.')
    if(!userId) throw Error('Unauthorized.')
    const result = dbInstance.itineraryModel.deleteItinerary(id, userId);
    return result;
  }
}