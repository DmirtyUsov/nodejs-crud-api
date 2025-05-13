import { AppResponse } from '../models/app-response.model.js';
import { UrlState } from '../models/url-state.model.js';
import * as ResponseTemplates from '../response-templates.js';

export const verifyNotValidUrlResponse = (
  urlState: UrlState,
): AppResponse | null => {
  return urlState.isValid ? null : ResponseTemplates.NonExistingEndpoint;
};

export const verifyNotValidUserResponse = (
  urlState: UrlState,
): AppResponse | null => {
  const { userId, isUserIdValid } = urlState;
  return userId && !isUserIdValid ? ResponseTemplates.InvalidUUIDError : null;
};

export const verifyNotValidResponse = (urlState: UrlState): AppResponse => {
  const notValidUrl = verifyNotValidUrlResponse(urlState);
  if (notValidUrl) {
    return notValidUrl;
  }

  const notValidUser = verifyNotValidUserResponse(urlState);
  if (notValidUser) {
    return notValidUser;
  }

  return null;
};
