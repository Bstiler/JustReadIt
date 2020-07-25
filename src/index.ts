import { rawTextRouter } from './parser';
import express from 'express';

export const app = express();
app.use('/lambda', rawTextRouter);
app.use('/express', rawTextRouter);
app.use('/', rawTextRouter);
