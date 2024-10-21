import http from 'node:http';
import { validate } from 'uuid';
import { UrlParts } from './Models/url-parts.model.js';
import { Code, CRUDResponse } from './Models/crud-response.model.js';
import { NonExistingEndpoint } from './response-template.js';
import * as handler from './method-handler.js';
import { ENDPOINT, Method } from './config.js';

export const startServer = (): http.Server => {
  return http.createServer(listener);
};

const listener: http.RequestListener = async (req, res): Promise<void> => {
  const { method, url = '' } = req;
  const urlParts = validateUrl(url);

  if (!urlParts.isValid) {
    generateResponse(res, NonExistingEndpoint);
    return;
  }

  switch (method) {
    case Method.GET: {
      generateResponse(res, handler.get(urlParts));
      break;
    }
    case Method.POST: {
      const bodyStr = await getRequestBody(req);
      const response = handler.add(urlParts, bodyStr);
      generateResponse(res, response);
      break;
    }
    case Method.PUT: {
      const bodyStr = await getRequestBody(req);
      const response = handler.update(urlParts, bodyStr);
      generateResponse(res, response);
      break;
    }
    case Method.DELETE: {
      const response = handler.del(urlParts);
      generateResponse(res, response);
      break;
    }
    default:
      generateResponse(res, {
        statusCode: Code.NotFound_404,
        data: {
          message: 'Invalid HTTP method',
          method,
          url,
          urlParts,
        },
      });
      break;
  }
};

const generateResponse = (
  res: http.ServerResponse,
  crudResponse: CRUDResponse,
): void => {
  res.statusCode = crudResponse.statusCode;
  res.setHeader('Content-Type', 'application/json');
  if (crudResponse.data) {
    res.write(JSON.stringify(crudResponse.data));
  }
  res.end();
};

const validateUrl = (url: string): UrlParts => {
  const urlParts: UrlParts = {
    isValid: false,
    userId: undefined,
    isUserIdValid: false,
  };

  const parts = url.split(ENDPOINT);
  if (parts.length !== 2) {
    return urlParts;
  }
  if (parts[1] && parts[1][0] !== '/') {
    return urlParts;
  }
  const id = parts[1].slice(1);
  urlParts.isValid = true;
  urlParts.userId = parts[1].length === 1 ? ' ' : id;
  urlParts.isUserIdValid = validate(id);
  return urlParts;
};

const getRequestBody = async (req: http.IncomingMessage): Promise<string> => {
  return new Promise((resolve, reject) => {
    const body: Buffer[] = [];

    req.on('data', (chunk: Buffer) => {
      body.push(chunk);
    });

    req.on('end', () => {
      resolve(Buffer.concat(body).toString());
    });

    req.on('error', (err) => {
      reject(err);
    });
  });
};
