import express from 'express';
import rateLimits from '../middleware/RateLimiter.js';
import { locationController } from '../controller/rest/LocationController.js';
import { itineraryController } from '../controller/rest/ItineraryController.js';

const itineraryRouter = express.Router();

itineraryRouter.post('/create', async (req, res) => {
  const { userId } = req.body;
  await itineraryController.createNew(userId);
})

export default itineraryRouter;