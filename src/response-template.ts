import { Code, CRUDResponse } from './Models/crud-response.model.js';

export const NonExistingEndpoint: CRUDResponse = {
  statusCode: Code.NotFound_404,
  data: { message: 'Request to non-existing endpoint' },
};

export const InvalidUUIDError: CRUDResponse = {
  statusCode: Code.BadRequest_400,
  data: { message: 'Invalid UUID format' },
};

export const UserNotFound: CRUDResponse = {
  statusCode: Code.NotFound_404,
  data: { message: 'User not found' },
};
export const InvalidData: CRUDResponse = {
  statusCode: Code.BadRequest_400,
  data: {
    message: 'Invalid body data: wrong format',
  },
};
export const InvalidUserData: CRUDResponse = {
  statusCode: Code.BadRequest_400,
  data: {
    message:
      'Invalid user data: required fields are missing or have wrong format',
  },
};
