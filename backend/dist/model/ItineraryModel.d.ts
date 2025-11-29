import mongoose, { Schema } from "mongoose";
import type { MongooseDocument } from "./MUtilTypes.js";
export interface ItineraryLocation {
    pois: string[] | null | undefined;
    location: string;
    startDate: Date;
    endDate: Date;
}
export interface Itinerary {
    _user: Schema.Types.ObjectId;
    title: string;
    locations: ItineraryLocation[] | null | undefined;
}
export interface DbItineraryResult extends Itinerary {
    _id: Object;
}
export type ItineraryModelInstance = InstanceType<typeof ItineraryModel>;
export declare class ItineraryModel {
    schema: mongoose.Schema;
    model: mongoose.Model<MongooseDocument<Itinerary>>;
    constructor();
    createItinerary(_user: string, title: string): Promise<void>;
    addLocation(itineraryId: string, location: {}, startDate: string, endDate: string): Promise<void>;
    getUserItineraries(userId: string, select?: string[], exclude?: string[]): Promise<(mongoose.Document<unknown, {}, MongooseDocument<Itinerary>, {}, {}> & Itinerary & mongoose.Document<mongoose.Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getItinerary(userId: string, itineraryId: string): Promise<(mongoose.Document<unknown, {}, MongooseDocument<Itinerary>, {}, {}> & Itinerary & mongoose.Document<mongoose.Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
//# sourceMappingURL=ItineraryModel.d.ts.map