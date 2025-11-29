import mongoose, { Schema } from "mongoose";
import type { MongooseDocument } from "./MUtilTypes.js";
export type docSubMap = {
    [key: string]: string;
} | null | undefined;
export interface LocationDetails {
    bbox: Number[];
    geoCoordinates: number[];
    geoType: string;
    coarseLocation?: string | null | undefined;
    continent?: docSubMap;
    country?: docSubMap;
    locality?: docSubMap;
    gid: string;
    name: string;
}
export interface Location {
    _itinerary: Schema.Types.ObjectId;
    details: {};
}
export interface DbLocationResult extends Location {
    _id: Object;
}
export type LocationModelInstance = InstanceType<typeof LocationModel>;
export declare class LocationModel {
    schema: mongoose.Schema;
    model: mongoose.Model<MongooseDocument<Location>>;
    constructor();
    addLocation(_itinerary: string, details: LocationDetails): Promise<mongoose.Document<unknown, {}, MongooseDocument<Location>, {}, {}> & Location & mongoose.Document<mongoose.Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getItineraryLocations(_itinerary: string, select?: string[], exclude?: string[]): Promise<(mongoose.Document<unknown, {}, MongooseDocument<Location>, {}, {}> & Location & mongoose.Document<mongoose.Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}
//# sourceMappingURL=LocationModel.d.ts.map