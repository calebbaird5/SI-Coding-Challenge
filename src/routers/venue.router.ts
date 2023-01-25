import { Router, Request, Response } from 'express';
import { Venue } from '../models/venue';
import { handleResult, handleError, RouterError } from '../lib/utils';
import { createVenue, deleteVenue, getVenue, getVenues, updateVenue } from '../services/venue.service';

export const venueRouter = Router();
venueRouter.post('/', async (req: Request, res: Response) => {
  return createVenue(req).then(
    (result: Venue) => handleResult<Venue>(result, res),
    (err: RouterError) => handleError(err, res),
  );
});

venueRouter.get('/', async (req: Request, res: Response) => {
  return getVenues().then(
    (result: Venue[]) => handleResult<Venue[]>(result, res),
    (err: RouterError) => handleError(err, res),
  )
});

venueRouter.get('/:id', async (req: Request, res: Response) => {
  return getVenue(req).then(
    (result: Venue | null) => handleResult<Venue>(result, res),
    (err: RouterError) => handleError(err, res),
  )
});

venueRouter.put('/:id', async (req: Request, res: Response) => {
  return updateVenue(req).then(
    (result: Venue | null) => handleResult<Venue | null>(result, res),
    (err: RouterError) => handleError(err, res),
  )
});

venueRouter.delete('/:id', async (req: Request, res: Response) => {
  return deleteVenue(req).then(
    () => res.status(201).json({ data: {} }),
    (err: RouterError) => handleError(err, res),
  )
});
