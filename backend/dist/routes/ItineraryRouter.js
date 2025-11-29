import express, { Router } from 'express';
import rateLimits from '../middleware/RateLimiter.js';
import { locationController } from '../controller/rest/LocationController.js';
import { itineraryController } from '../controller/rest/ItineraryController.js';
import { wanderCache } from '../utils/cache.js';
import { auth } from '../utils/auth.js';
import { fromNodeHeaders } from 'better-auth/node';
const itineraryRouter = express.Router();
itineraryRouter.get('/', async (req, res) => {
    const result = await itineraryController.getItineraries(req);
    res.status(200).json(result);
});
itineraryRouter.post('/create', async (req, res) => {
    const result = await itineraryController.createNew(req);
    res.status(200).json(result);
});
itineraryRouter.post('/update', async (req, res) => {
    await itineraryController.addLocation(req);
});
export default itineraryRouter;
//# sourceMappingURL=ItineraryRouter.js.map