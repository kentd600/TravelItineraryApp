import { ItineraryModel, type ItineraryModelInstance } from "./ItineraryModel.js";
import { LocationModel, type LocationModelInstance } from "./LocationModel.js";
import { UserModel, type UserModelInstance } from "./UserModel.js"
import mongoose, { Document } from "mongoose";

class wdrDb {
  userModel: UserModelInstance
  itineraryModel: ItineraryModelInstance
  locationModel: LocationModelInstance

  constructor () {
    this.userModel = new UserModel();
    this.itineraryModel = new ItineraryModel();
    this.locationModel = new LocationModel();
  }

  async connect() {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.tf0woju.mongodb.net/wanderer?appName=Cluster0`);
  }
}

export const dbInstance = new wdrDb();