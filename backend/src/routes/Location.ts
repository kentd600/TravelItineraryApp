import express from 'express';
import rateLimits from '../middleware/RateLimiter.js';
import { locationController } from '../c/rest/LocationController.js';

const locationRouter = express.Router();

locationRouter.post('/autocomp', rateLimits.autocomplete, async (req, res) => {
  const result = await locationController.autocomplete(req);
  res.status(200).json(result.features);
})

locationRouter.use(rateLimits.default);

export default locationRouter;