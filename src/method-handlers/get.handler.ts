import { AppResponse } from '../models/app-response.model.js';
import { StatusCode } from '../models/status-code.model.js';
import { UrlState } from '../models/url-state.model.js';
import { usersDB } from '../users-db.js';
import * as ResponseTemplates from '../response-templates.js';
import {
  verifyNotValidUrlResponse,
  verifyNotValidUserResponse,
} from './verify.fn.js';

export const get = (urlState: UrlState): AppResponse => {
  const notValidUrl = verifyNotValidUrlResponse(urlState);
  if (notValidUrl) {
    return notValidUrl;
  }

  const notValidUser = verifyNotValidUserResponse(urlState);
  if (notValidUser) {
    return notValidUser;
  }

  if (urlState.userId) {
    const user = usersDB.get(urlState.userId);
    if (user) {
      const appResponse: AppResponse = {
        statusCode: StatusCode.OK_200,
        data: user,
      };
      return appResponse;
    }

    return ResponseTemplates.UserNotFound;
  }

  const users = usersDB.list();
  const appResponse: AppResponse = {
    statusCode: StatusCode.OK_200,
    data: users,
  };
  return appResponse;
};
