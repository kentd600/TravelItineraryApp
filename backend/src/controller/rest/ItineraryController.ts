import { ItineraryModel } from "../../model/ItineraryModel.js"
import { dbInstance } from "../../model/Models.js"

export const itineraryController = {
  async createNew(userId: string) {
    await dbInstance.itineraryModel.createItinerary(userId);
  }
}