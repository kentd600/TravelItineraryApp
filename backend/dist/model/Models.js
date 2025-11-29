import { ItineraryModel } from "./ItineraryModel.js";
import { LocationModel } from "./LocationModel.js";
import { UserModel } from "./UserModel.js";
import mongoose, { Document } from "mongoose";
class wdrDb {
    userModel;
    itineraryModel;
    locationModel;
    constructor() {
        this.userModel = new UserModel();
        this.itineraryModel = new ItineraryModel();
        this.locationModel = new LocationModel();
    }
    async connect() {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.tf0woju.mongodb.net/wanderer?appName=Cluster0`);
    }
}
export const dbInstance = new wdrDb();
//# sourceMappingURL=Models.js.map