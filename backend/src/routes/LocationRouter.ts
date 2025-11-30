import express, { Router } from 'express';
import rateLimits from '../middleware/RateLimiter.js';
import { locationController } from '../controller/rest/LocationController.js';
import { wanderCache } from '../utils/cache.js';
import { normalizeFeatureProperties } from '../utils/modelUtil.js';

const locationRouter: Router = express.Router();

locationRouter.post('/autocomp', rateLimits.autocomplete, async (req, res) => {
  const result = await locationController.autocomplete(req);
  res.status(200).json(result.features);
})

//locationRouter.use(rateLimits.default);

locationRouter.post('/placedetails', async (req, res, next) => {
  const result = await locationController.getPlaceDetails(req);
  //Refactor to use redis and cache locations at a later date.
  //await wanderCache.setSelectedLocation('123', '456', 'location');
  res.status(200).json(result);
})

locationRouter.post('/add', async (req, res, next) => {
  const result = await locationController.addLocationToItinerary(req);
  res.status(201).json(result);
})

locationRouter.delete('/', async (req, res, next) => {
  const result = await locationController.deleteLocationFromItinerary(req);
  console.log(result);
  res.status(201).json(result);
})

locationRouter.patch('/', async (req, res, next) => {
  try {
    const result = await locationController.updateDates(req);
    res.status(201).json(result);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.stack);
      next(e);
    }
  }
})

export default locationRouter;