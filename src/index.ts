import { rawTextRouter } from './parser';
import express from 'express';

export const app = express();
app.use(rawTextRouter);