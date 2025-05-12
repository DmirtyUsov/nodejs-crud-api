import { AppResponse } from '../models/app-response.model.js';
import { StatusCode } from '../models/status-code.model.js';
import { UrlState } from '../models/url-state.model.js';
import { usersDB } from '../users-db.js';
import * as ResponseTemplates from '../response-templates.js';

import {
  verifyNotValidUrlResponse,
  verifyNotValidUserResponse,
} from './verify.fn.js';

export const del = (urlState: UrlState): AppResponse => {
  const notValidUrl = verifyNotValidUrlResponse(urlState);
  if (notValidUrl) {
    return notValidUrl;
  }

  const notValidUser = verifyNotValidUserResponse(urlState);
  if (notValidUser) {
    return notValidUser;
  }

  if (urlState.userId) {
    const user = usersDB.delete(urlState.userId);
    if (user) {
      return { statusCode: StatusCode.NoContent_204, data: user };
    }
    return ResponseTemplates.UserNotFound;
  }
  return ResponseTemplates.NonExistingEndpoint;
};
