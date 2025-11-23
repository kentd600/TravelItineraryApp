import express from 'express';
import rateLimits from '../middleware/RateLimiter.js';
import { locationController } from '../controller/rest/LocationController.js';
import { wanderCache } from '../utils/cache.js';
const locationRouter = express.Router();
locationRouter.post('/autocomp', rateLimits.autocomplete, async (req, res) => {
    const result = await locationController.autocomplete(req);
    res.status(200).json(result.features);
});
locationRouter.use(rateLimits.default);
locationRouter.post('/placedetails', async (req, res) => {
    const result = await locationController.getPlaceDetails(req);
    await wanderCache.setSelectedLocation('123', '456', 'location');
    res.status(200).json(result.features[0]);
});
export default locationRouter;
//# sourceMappingURL=LocationRouter.js.map