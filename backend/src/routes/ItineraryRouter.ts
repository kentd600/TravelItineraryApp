import express, { Router } from 'express';
import { itineraryController } from '../controller/rest/ItineraryController.js';

const itineraryRouter: Router = express.Router();

itineraryRouter.get('/', async (req, res) => {
  const result = await itineraryController.getItineraries(req);
  res.status(200).json(result);
})

itineraryRouter.post('/create', async (req, res) => {
  await itineraryController.createNew(req);
  res.status(201).send();
})

itineraryRouter.post('/update', async (req, res) => {
  await itineraryController.addLocation(req);
})

itineraryRouter.get('/:id', async (req, res) => {
  const itinerary = await itineraryController.getIinerary(req);
  console.log('Got itinerary', itinerary);
})

export default itineraryRouter;