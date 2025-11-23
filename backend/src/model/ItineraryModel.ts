import mongoose from "mongoose";
import type { MongooseDocument, MongooseSchemaDef } from "./MUtilTypes.js";
import type { FeaturePropertiesV2 } from "@stadiamaps/api";

export interface ItineraryLocation {
  pois: string[] | null | undefined
  location: FeaturePropertiesV2
}

export interface Itinerary {
  userId: string
  locations: ItineraryLocation[] | null | undefined
}

export interface DbItineraryResult extends Itinerary {
  _id: Object
}

const itinerarySchema: MongooseSchemaDef<Itinerary> = {
  userId: { type: String, required: true },
  locations: { type: Array, required: true }
}

export type ItineraryModelInstance = InstanceType<typeof ItineraryModel>

export class ItineraryModel {
  public schema: mongoose.Schema
  public model: mongoose.Model<MongooseDocument<Itinerary>>

  constructor() {
    this.schema = new mongoose.Schema(itinerarySchema);
    this.model = mongoose.model<MongooseDocument<Itinerary>>('itinerary', this.schema);
  }

  async createItinerary(userId: string) {
      const result = await this.model.insertOne({
        userId,
        locations: []
      })
  }
}