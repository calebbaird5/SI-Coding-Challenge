import { Request } from 'express';
import { Venue } from '../models/venue';
import { badRequest } from '../lib/utils';
import { InferAttributes } from 'sequelize';

export async function createVenue(req: Request): Promise<Venue> {
  let { name, address }: InferAttributes<Venue> = req.body;
  if (!name || !address) throw badRequest('Malformed Body');
  return await Venue.create({ name, address });
}

export async function getVenue(req: Request): Promise<Venue | null> {
  if (!req.params.id) throw badRequest('Missing Required param `id`');
  return await Venue.findOne({ where: { id: req.params.id } });
}

export async function getVenues(): Promise<Venue[]> {
  return await Venue.findAll();
}

export async function updateVenue(req: Request): Promise<Venue | null> {
  if (!req.params.id) throw badRequest('Missing Required param `id`');
  let body: Partial<InferAttributes<Venue>> = req.body;
  await Venue.update(body, { where: { id: req.params.id } });
  return await Venue.findOne({ where: { id: req.params.id } });
}

export async function deleteVenue(req: Request): Promise<void> {
  if (!req.params.id) throw badRequest('Missing Required param `id`');
  let venue = await Venue.findOne({ where: { id: req.params.id } });
  if (venue) {
    await venue.destroy();
  }
}
