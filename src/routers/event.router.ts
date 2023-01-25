
import { Router, Request, Response } from 'express';
import { Event } from '../models/event';
import { handleResult, handleError, RouterError } from '../lib/utils';
import { createEvent, deleteEvent, getEvent, getEvents, updateEvent } from '../services/event.service';

export const eventRouter = Router();
eventRouter.post('/', async (req: Request, res: Response) => {
  return createEvent(req).then(
    (result: Event) => handleResult<Event>(result, res),
    (err: RouterError) => handleError(err, res),
  );
});

eventRouter.get('/', async (req: Request, res: Response) => {
  return getEvents().then(
    (result: Event[]) => handleResult<Event[]>(result, res),
    (err: RouterError) => handleError(err, res),
  )
});

eventRouter.get('/:id', async (req: Request, res: Response) => {
  return getEvent(req).then(
    (result: Event | null) => handleResult<Event>(result, res),
    (err: RouterError) => handleError(err, res),
  )
});

eventRouter.put('/:id', async (req: Request, res: Response) => {
  return updateEvent(req).then(
    (result: Event | null) => handleResult<Event | null>(result, res),
    (err: RouterError) => handleError(err, res),
  )
});

eventRouter.delete('/:id', async (req: Request, res: Response) => {
  return deleteEvent(req).then(
    () => res.status(201).json({ data: {} }),
    (err: RouterError) => handleError(err, res),
  )
});
