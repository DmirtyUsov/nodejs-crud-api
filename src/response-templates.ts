import { AppResponse } from './models/app-response.model.js';
import { StatusCode } from './models/status-code.model.js';

export const NonExistingEndpoint: AppResponse = {
  statusCode: StatusCode.NotFound_404,
  data: { message: 'Request to non-existing endpoint' },
};

export const InvalidUUIDError: AppResponse = {
  statusCode: StatusCode.BadRequest_400,
  data: { message: 'Invalid UUID format' },
};

export const UserNotFound: AppResponse = {
  statusCode: StatusCode.NotFound_404,
  data: { message: 'User not found' },
};
export const InvalidData: AppResponse = {
  statusCode: StatusCode.BadRequest_400,
  data: {
    message: 'Invalid body data: wrong format',
  },
};
export const InvalidUserData: AppResponse = {
  statusCode: StatusCode.BadRequest_400,
  data: {
    message:
      'Invalid user data: required fields are missing or have wrong format',
  },
};
export const InternalServerError: AppResponse = {
  statusCode: StatusCode.ServerError_500,
  data: {
    message: 'Internal Server Error',
  },
};
