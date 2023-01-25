import { Request } from 'express';
import { Event, EventAttributes } from '../models/event';
import { badRequest } from '../lib/utils';

export async function createEvent(req: Request): Promise<Event> {
  let { name, event_date, venue_id }: EventAttributes = req.body;
  if (!name || !event_date || !venue_id) throw badRequest('Malformed Body');
  return await Event.create({ name, event_date, venue_id });
}

export async function getEvent(req: Request): Promise<Event | null> {
  if (!req.params.id) throw badRequest('Missing Required param `id`');
  return await Event.findOne({ where: { id: req.params.id } });
}

export async function getEvents(): Promise<Event[]> {
  return await Event.findAll();
}

export async function updateEvent(req: Request): Promise<Event | null> {
  if (!req.params.id) throw badRequest('Missing Required param `id`');
  let body: Partial<EventAttributes> = req.body;
  await Event.update(body, { where: { id: req.params.id } });
  return await Event.findOne({ where: { id: req.params.id } });
}

export async function deleteEvent(req: Request): Promise<void> {
  if (!req.params.id) throw badRequest('Missing Required param `id`');
  let event = await Event.findOne({ where: { id: req.params.id } });
  if (event) {
    await event.destroy();
  }
}
