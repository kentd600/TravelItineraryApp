import mongoose, { Schema } from "mongoose";
import type { MongooseDocument, MongooseSchemaDef } from "./MUtilTypes.js";
import { generateSelect } from "./ModelUtility.js";
import { dbInstance } from "./Models.js";

export interface ItineraryLocation {
  pois: string[] | null | undefined
  location: string
  startDate: Date,
  endDate: Date
}

export interface Itinerary {
  _user: Schema.Types.ObjectId,
  title: string,
}

export interface DbItineraryResult extends Itinerary {
  _id: Object
}

const itinerarySchema: MongooseSchemaDef<Itinerary> = {
  _user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
  title: { type: String, required: true }
}

export type ItineraryModelInstance = InstanceType<typeof ItineraryModel>

export class ItineraryModel {
  public schema: mongoose.Schema
  public model: mongoose.Model<MongooseDocument<Itinerary>>

  constructor() {
    this.schema = new mongoose.Schema(itinerarySchema);
    this.model = mongoose.model<MongooseDocument<Itinerary>>('itinerary', this.schema);
  }

  async createItinerary(_user: string, title: string) {
    const result = await this.model.insertOne({
      _user,
      locations: [],
      title
    })
  }

  async getUserItineraries(userId: string, select?: string[], exclude?: string[]) {
    const selectFields = generateSelect(select || undefined, exclude || undefined);
    const itineraries =  Object.keys(selectFields).length === 0 ?
    await this.model.find({ _user: userId }) :
    await this.model.find({ _user: userId }).select(selectFields);
    return itineraries;
  }

  async getItinerary(userId: string, itineraryId: string, select?: string[], exclude?: string []) {
    const selectFields = generateSelect(select || undefined, exclude || undefined);
    const itinerary = await this.model
      .findById(itineraryId)
      .where('_user')
      .equals(userId)
      .select(selectFields)
    return itinerary;
  }
}