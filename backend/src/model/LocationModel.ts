import mongoose, { Document, Mongoose, Schema, Types } from "mongoose";
import type { MongooseDocument, MongooseSchemaDef } from "./MUtilTypes.js";
import { generateSelect } from "./ModelUtility.js";
import { dbInstance } from "./Models.js";
import { instanceOfFeaturePropertiesV2, type FeaturePropertiesV2, type GeocodeResponseEnvelopePropertiesV2 } from "@stadiamaps/api";
import { array, boolean, string } from "zod";
import { fa } from "zod/locales";

export type docSubMap = { [key: string]: string } | null | undefined

export interface LocationDetails {
  bbox: Number[],
  geoCoordinates: number[],
  geoType: string,
  coarseLocation?: string | null | undefined,
  continent?: docSubMap,
  country?: docSubMap,
  locality?: docSubMap,
  gid: string,
  name: string
}

const locationDetailsSchema: MongooseSchemaDef<LocationDetails> = {
  bbox: { type: [Number], required: true },
  geoCoordinates: { type: [Number], required: true},
  geoType: { type: String, required: true },
  coarseLocation: { type: String, required: false },
  continent: { type: Map, of: String, required: false },
  country: { type: Map, of: String, required: false },
  locality: { type: Map, of: String, required: false },
  gid: { type: String, required: true },
  name: { type: String, required: true }
}

export interface Location {
  _itinerary: Schema.Types.ObjectId,
  details: LocationDetails,
  startDate: Date,
  endDate: Date,
  justAdded: Boolean,
}
interface LocationUpdateArg {
  details?: Partial<LocationDetails>,
  startDate?: Date,
  endDate?: Date,
  justAdded?: Boolean
}

const locationSchema: MongooseSchemaDef<Location> = {
  _itinerary: { type: Schema.Types.ObjectId, required: true, ref: 'itineraries' },
  details: { type: locationDetailsSchema, required: true },
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false },
  justAdded: { type: Boolean, required: true }
}

export interface DbLocationResult extends Location {
  _id: Object
}

export type LocationModelInstance = InstanceType<typeof LocationModel>

export class LocationModel {
  public schema: mongoose.Schema
  public model: mongoose.Model<MongooseDocument<Location>>

  constructor() {
    this.schema = new mongoose.Schema(locationSchema);
    this.model = mongoose.model<MongooseDocument<Location>>('location', this.schema);
  }

  async addLocation(_itinerary: string, details: LocationDetails) {
    const result = await this.model.insertOne({
      _itinerary,
      details,
      startDate: null,
      endDate: null,
      justAdded: true
    })
    return result;
  }

  async deleteLocation(_id: string, _itinerary: string, _user: string) {
    console.log(_id, _itinerary, _user)
    const itinerary = await dbInstance.itineraryModel.model.findOne({ _id: _itinerary, _user });
    if (!itinerary) {
      console.error('Itinerary and user ids must be valid.');
      throw Error('Invalid itinerary or user id.');
    }
    const result = await this.model.deleteOne({ _id, _itinerary });
    return result;
  }

  async getItineraryLocations(_itinerary: string, select?: string[], exclude?: string[]) {
    const selectFields = generateSelect(select || undefined, exclude || undefined);
    const result = await this.model.find({ _itinerary }).select(selectFields);
    return result;
  }

  async updateLocation(_id: string, _itinerary: string, _user: string, updateFields: LocationUpdateArg) {
    const itinerary = await dbInstance.itineraryModel.model.findOne({ _id: _itinerary, _user });
    if (!itinerary) {
      console.error('Itinerary and user ids must be valid.');
      throw Error('Itinerary and user ids must be valid.');
    }
    const result = await this.model.updateOne({ _id, _itinerary }, updateFields);
    return result;
  }
}