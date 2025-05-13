import { StatusCode } from './status-code.model.js';

export type AppResponse = {
  statusCode: StatusCode;
  data?: unknown;
};
