import mongoose, { Document, Schema } from "mongoose";
import type { MongooseDocument, MongooseSchemaDef } from "./MUtilTypes.js";
import { generateSelect } from "./ModelUtility.js";
import { dbInstance } from "./Models.js";
import { instanceOfFeaturePropertiesV2, type FeaturePropertiesV2, type GeocodeResponseEnvelopePropertiesV2 } from "@stadiamaps/api";
import { array, string } from "zod";
import { fa } from "zod/locales";

type docSubMap = { [key: string]: string } | null | undefined

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
  details: {}
}

const locationSchema: MongooseSchemaDef<Location> = {
  _itinerary: { type: Schema.Types.ObjectId, required: true, ref: 'itineraries' },
  details: { type: locationDetailsSchema, required: true }
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

  async addLocation(_itinerary: string, details: FeaturePropertiesV2) {
    const toInsert: LocationDetails = {
      bbox: details.bbox!,
      geoCoordinates: details.geometry!.coordinates,
      geoType: details.geometry!.type,
      coarseLocation: details.properties.coarseLocation,
      continent: details.properties.context?.whosonfirst.continent as docSubMap,
      country: details.properties.context?.whosonfirst.country as docSubMap,
      locality: details.properties.context?.whosonfirst.locality as docSubMap,
      gid: details.properties.gid,
      name: details.properties.name
    }
    const result = await this.model.insertOne({
      _itinerary,
      details: toInsert
    })
    return result;
  }
}