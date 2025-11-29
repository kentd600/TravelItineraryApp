import { type Request } from 'express';
export declare const locationController: {
    autocomplete(req: Request): Promise<import("@stadiamaps/api").GeocodeResponseEnvelopePropertiesV2>;
    getPlaceDetails(req: Request): Promise<import("@stadiamaps/api").GeocodeResponseEnvelopePropertiesV2>;
    addLocationToItinerary(req: Request): Promise<import("mongoose").Document<unknown, {}, import("../../model/MUtilTypes.js").MongooseDocument<import("../../model/LocationModel.js").Location>, {}, {}> & import("../../model/LocationModel.js").Location & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
};
//# sourceMappingURL=LocationController.d.ts.map