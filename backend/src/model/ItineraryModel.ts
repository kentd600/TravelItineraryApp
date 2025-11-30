import mongoose, { Schema } from "mongoose";
import type { MongooseDocument, MongooseSchemaDef } from "./MUtilTypes.js";
import { generateSelect } from "./ModelUtility.js";
import { dbInstance } from "./Models.js";
import { error } from "console";

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

  async getItinerary(_user: string, itineraryId: string, select?: string[], exclude?: string []) {
    if (!_user || !itineraryId) console.error('Cannot get itinerary without user id and itinerary id.')
    const selectFields = generateSelect(select || undefined, exclude || undefined);
    const itinerary = await this.model
      .findOne({
        _id: itineraryId,
        _user
      })
      .select(selectFields)
    return itinerary;
  }

  async deleteItinerary(_id: string, _user: string) {
    const itinerary = await this.model.findOne({ _id, _user });
    if (!itinerary) throw Error('Invalid itinerary or user id.');
    const deleteLocationsResult = await dbInstance.locationModel.model.deleteMany({
      _itinerary: _id
    })
    if(!deleteLocationsResult.acknowledged) throw error('Error deleting locations associated with itinerary.');
    const result = await this.model.deleteOne({ _id, _user });
    return result;
  }
}