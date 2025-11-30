import mongoose, { Schema, Types } from "mongoose";
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
    details: LocationDetails;
    startDate: Date;
    endDate: Date;
}
interface LocationUpdateArg {
    details?: Partial<LocationDetails>;
    startDate?: Date;
    endDate?: Date;
}
export interface DbLocationResult extends Location {
    _id: Object;
}
export type LocationModelInstance = InstanceType<typeof LocationModel>;
export declare class LocationModel {
    schema: mongoose.Schema;
    model: mongoose.Model<MongooseDocument<Location>>;
    constructor();
    addLocation(_itinerary: string, details: LocationDetails): Promise<mongoose.Document<unknown, {}, MongooseDocument<Location>, {}, {}> & Location & mongoose.Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    deleteLocation(_id: string, _itinerary: string, _user: string): Promise<mongoose.mongo.DeleteResult>;
    getItineraryLocations(_itinerary: string, select?: string[], exclude?: string[]): Promise<(mongoose.Document<unknown, {}, MongooseDocument<Location>, {}, {}> & Location & mongoose.Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    updateLocation(_id: string, _itinerary: string, _user: string, updateFields: LocationUpdateArg): Promise<mongoose.UpdateWriteOpResult>;
}
export {};
//# sourceMappingURL=LocationModel.d.ts.map