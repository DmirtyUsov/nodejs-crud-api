import { validate } from 'uuid';
import { ENDPOINT } from './config.js';
import { UrlState } from './models/url-state.model.js';

export const validateUrl = (url: string): UrlState => {
  const urlState: UrlState = {
    isValid: false,
    userId: undefined,
    isUserIdValid: false,
  };

  const parts = url.split(ENDPOINT);
  if (parts.length !== 2) {
    return urlState;
  }
  if (parts[1] && parts[1][0] !== '/') {
    return urlState;
  }
  const id = parts[1].slice(1);
  urlState.isValid = true;
  urlState.userId = parts[1].length === 1 ? ' ' : id;
  urlState.isUserIdValid = validate(id);
  return urlState;
};
