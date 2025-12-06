import express, { Router } from 'express';
import { itineraryController } from '../controller/rest/ItineraryController.js';
import { ERROR_CODES } from 'better-auth/plugins';

const itineraryRouter: Router = express.Router();

itineraryRouter.get('/', async (req, res, next) => {
  try {
    const result = await itineraryController.getItineraries(req);
    res.status(200).json(result);
  } catch (e) {
    if (e instanceof Error) {
      next(e);
    }
  }
})

itineraryRouter.post('/create', async (req, res, next) => {
  try {
    const result = await itineraryController.createNew(req);
    res.status(201).json({
      id: result._id
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
    }
  }
})

itineraryRouter.get('/:id', async (req, res, next) => {
  try {
    const itinerary = await itineraryController.getIinerary(req);
    res.status(200).json(itinerary);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message)
      next(e);
    }
  }
})

itineraryRouter.delete('/:id', async (req, res, next) => {
  try {
    const result = await itineraryController.deleteItinerary(req);
    res.status(201).json(result);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      next(e);
    }
  }
})

export default itineraryRouter;