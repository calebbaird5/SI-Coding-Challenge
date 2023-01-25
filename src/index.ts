import express, { Express } from 'express';
// import { e, Express } from 'express';

const app: Express = express();
const port = 3000;

app.use(express.json());

import { venueRouter } from './routers/venue.router'
import { eventRouter } from './routers/event.router'

app.use('/events', eventRouter);
app.use('/venues', venueRouter);

app.listen(port, async () => {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});
