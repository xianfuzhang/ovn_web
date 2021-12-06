import express from 'express';
import { MockDataBuilder } from '../services/mockData';

export function middleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction) {
    const mock = MockDataBuilder.getMockData();
    if (!mock.hasInit()) {
      mock.init();
    }
  next();
}