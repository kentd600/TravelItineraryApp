import { UserModel, type UserModelInstance } from "./UserModel.js"
import mongoose, { Document } from "mongoose";

class wdrDb {
  userModel: UserModelInstance

  constructor () {
    this.userModel = new UserModel();
  }

  async connect() {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.tf0woju.mongodb.net/wanderer?appName=Cluster0`);
  }
}

export const dbInstance = new wdrDb();