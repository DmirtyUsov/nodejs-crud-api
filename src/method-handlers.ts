import { AppResponse } from './models/app-response.model.js';
import { StatusCode } from './models/status-code.model.js';
import { UrlState } from './models/url-state.model.js';
import { usersDB } from './users-db.js';
import * as ResponseTemplates from './response-templates.js';

export const get = (urlState: UrlState): AppResponse => {
  const { userId, isUserIdValid, isValid } = urlState;

  if (!isValid) {
    return ResponseTemplates.NonExistingEndpoint;
  }
  if (userId && !isUserIdValid) {
    return ResponseTemplates.InvalidUUIDError;
  }
  if (userId) {
    const user = usersDB.get(userId);
    if (user) {
      return { statusCode: StatusCode.OK_200, data: user };
    }
    return ResponseTemplates.UserNotFound;
  }
  const users = usersDB.list();
  return { statusCode: StatusCode.OK_200, data: users };
};
