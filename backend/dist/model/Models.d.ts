import { type ItineraryModelInstance } from "./ItineraryModel.js";
import { type UserModelInstance } from "./UserModel.js";
declare class wdrDb {
    userModel: UserModelInstance;
    itineraryModel: ItineraryModelInstance;
    constructor();
    connect(): Promise<void>;
}
export declare const dbInstance: wdrDb;
export {};
//# sourceMappingURL=Models.d.ts.map