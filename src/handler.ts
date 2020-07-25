import serverless from 'serverless-http';
import {app} from './index';

const expressEdge = require('aws-serverless-express-edge');

export const forward = serverless(app);
export const edgeHandler = expressEdge.createServer(app);

export {app} from './index';
