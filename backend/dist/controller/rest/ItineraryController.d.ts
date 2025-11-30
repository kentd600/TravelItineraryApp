import { type Request } from "express";
export declare const itineraryController: {
    createNew(req: Request): Promise<(import("mongoose").Document<unknown, {}, import("../../model/MUtilTypes.js").MongooseDocument<import("../../model/ItineraryModel.js").Itinerary>, {}, {}> & import("../../model/ItineraryModel.js").Itinerary & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getItineraries(req: Request): Promise<(import("mongoose").Document<unknown, {}, import("../../model/MUtilTypes.js").MongooseDocument<import("../../model/ItineraryModel.js").Itinerary>, {}, {}> & import("../../model/ItineraryModel.js").Itinerary & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getIinerary(req: Request): Promise<{
        itinerary: import("mongoose").Document<unknown, {}, import("../../model/MUtilTypes.js").MongooseDocument<import("../../model/ItineraryModel.js").Itinerary>, {}, {}> & import("../../model/ItineraryModel.js").Itinerary & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
        locations: (import("mongoose").Document<unknown, {}, import("../../model/MUtilTypes.js").MongooseDocument<import("../../model/LocationModel.js").Location>, {}, {}> & import("../../model/LocationModel.js").Location & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    deleteItinerary(req: Request): Promise<import("mongodb").DeleteResult>;
};
//# sourceMappingURL=ItineraryController.d.ts.map