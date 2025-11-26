import express from 'express';
import rateLimits from '../middleware/RateLimiter.js';
import { locationController } from '../controller/rest/LocationController.js';
import { itineraryController } from '../controller/rest/ItineraryController.js';
import { wanderCache } from '../utils/cache.js';
import { auth } from '../utils/auth.js';
import { fromNodeHeaders } from 'better-auth/node';

const itineraryRouter = express.Router();

itineraryRouter.post('/create', async (req, res) => {
  await itineraryController.createNew(req);
})

itineraryRouter.post('/update', async (req, res) => {
  await itineraryController.addLocation(req);
})

itineraryRouter.post('/test', async (req, res) => {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
  console.log(session?.user.id);
  return res.status(200).send('Success');
  //wanderCache.setSelectedLocation()
})

export default itineraryRouter;