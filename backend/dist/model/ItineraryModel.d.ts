import mongoose from "mongoose";
import type { MongooseDocument } from "./MUtilTypes.js";
import type { FeaturePropertiesV2 } from "@stadiamaps/api";
export interface ItineraryLocation {
    pois: string[] | null | undefined;
    location: FeaturePropertiesV2;
}
export interface Itinerary {
    userId: string;
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
    createItinerary(userId: string): Promise<void>;
}
//# sourceMappingURL=ItineraryModel.d.ts.map