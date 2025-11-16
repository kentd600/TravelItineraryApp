import mongoose, { Document } from "mongoose";
import type { MongooseDocument, MongooseSchemaDef } from "./MUtilTypes.js";

export interface User {
  email: string,
  firstName: string,
  middleName?: string,
  lastName: string,
  birthday: Date,
  username: string,
  hashedPass: string
}

const userSchema: MongooseSchemaDef<User> = {
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  middleName: { type: String, required: false },
  lastName: { type: String, required: true },
  birthday: { type: Date, required: true },
  username: { type: String, required: true, unique: true },
  hashedPass: { type: String, required: true }
}

export type UserModelInstance = InstanceType<typeof UserModel>

export class UserModel {
  public schema: mongoose.Schema
  public model: mongoose.Model<MongooseDocument<User>>

  constructor () {
    this.schema = new mongoose.Schema(userSchema);
    this.model = mongoose.model<MongooseDocument<User>>('wanderer_users', this.schema);
  }

  async findUser(username: string) {
    const result = await this.model.findOne({ username });
    return result;
  }

  async addUser(input: User) {
    const result = await this.model.insertOne(input);
    return result;
  }
}