import http from 'node:http';
import { StatusCode } from './models/status-code.model.js';
import { validateUrl } from './validate-url.fn.js';
import { AppResponse } from './models/app-response.model.js';
import { HttpMethod } from './models/http-method.model.js';
import * as MethodHandlers from './method-handlers.js';

export const startServer = (): http.Server => {
  return http.createServer(listener);
};

const listener = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
): Promise<void> => {
  const { method, url = '' } = req;
  const urlState = validateUrl(url);

  switch (method) {
    case HttpMethod.GET: {
      const appResponse = MethodHandlers.get(urlState);
      writeResponse(res, appResponse);
      break;
    }
    default: {
      writeResponse(res, {
        statusCode: StatusCode.NotFound_404,
        data: {
          message: 'Invalid HTTP method',
          method,
          url,
          urlState,
        },
      });
      break;
    }
  }
};

const writeResponse = (
  res: http.ServerResponse,
  appResponse: AppResponse,
): void => {
  res.statusCode = appResponse.statusCode;
  res.setHeader('Content-Type', 'application/json');
  if (appResponse.data) {
    res.write(JSON.stringify(appResponse.data));
  }
  res.end();
};
