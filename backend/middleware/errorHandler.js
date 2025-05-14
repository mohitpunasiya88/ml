import { 
  ValidationError, 
  UnauthorizedError, 
  NotFoundError 
} from '../utils/errors.js';

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof ValidationError) {
    return res.status(400).json({ message: err.message });
  }

  if (err instanceof UnauthorizedError) {
    return res.status(401).json({ message: err.message });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({ message: err.message });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }

  if (err.name === 'MongoServerError' && err.code === 11000) {
    return res.status(400).json({ message: 'Duplicate key error' });
  }

  res.status(500).json({ message: 'Internal server error' });
};