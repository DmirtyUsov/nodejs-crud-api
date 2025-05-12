import { AppResponse } from '../models/app-response.model.js';
import { StatusCode } from '../models/status-code.model.js';
import { UrlState } from '../models/url-state.model.js';
import { usersDB } from '../users-db.js';
import * as ResponseTemplates from '../response-templates.js';

import { verifyNotValidResponse } from './verify.fn.js';

export const del = (urlState: UrlState): AppResponse => {
  const notValid = verifyNotValidResponse(urlState);
  if (notValid) {
    return notValid;
  }

  if (urlState.userId) {
    const user = usersDB.delete(urlState.userId);
    if (user) {
      const appResponse: AppResponse = {
        statusCode: StatusCode.OK_200,
        data: user,
      };
      return appResponse;
    }
    return ResponseTemplates.UserNotFound;
  }
  return ResponseTemplates.NonExistingEndpoint;
};
