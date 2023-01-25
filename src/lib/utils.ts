
import { Response } from 'express';

export class RouterError extends Error {
  code: number = 0;

  constructor(msg: string) {
    super(msg);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, RouterError.prototype);
  }
}

export function badRequest(message = 'Bad Request'): RouterError {
  let err = new RouterError(message);
  err.code = 400;
  return err;
}

export function handleError(err: RouterError, res: Response) {
  switch (err.code) {
    case 400:
      return res.status(400).json({errorMessage: err.message });
    case 404:
      return res.status(404).json({errorMessage: err.message });
    default:
      console.error(err.message);
      return res.status(500).json(
        {errorMessage: 'Something went wrong on the server.'})
  }
}

export function handleResult<T>(result: T | null, res: Response) {
  if (!result)
    return res.status(404).json({ errorMessage: 'Record not found' });
  return res.status(201).json({data: result});
};
