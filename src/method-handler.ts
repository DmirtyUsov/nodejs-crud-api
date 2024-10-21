import { Code, CRUDResponse } from './Models/crud-response.model.js';
import { UrlParts } from './Models/url-parts.model.js';
import { User } from './Models/user.model.js';
import * as ResponseTemplates from './response-template.js';
import { usersDB } from './users-db.js';

export const get = (urlParts: UrlParts): CRUDResponse => {
  const { userId, isUserIdValid, isValid } = urlParts;

  if (!isValid) {
    return ResponseTemplates.NonExistingEndpoint;
  }
  if (userId && !isUserIdValid) {
    return ResponseTemplates.InvalidUUIDError;
  }
  if (userId) {
    const user = usersDB.get(userId);
    if (user) {
      return { statusCode: Code.OK_200, data: user };
    }
    return ResponseTemplates.UserNotFound;
  }
  const users = usersDB.list();
  return { statusCode: Code.OK_200, data: users };
};

export const del = (urlParts: UrlParts): CRUDResponse => {
  const { userId, isUserIdValid, isValid } = urlParts;

  if (!isValid) {
    return ResponseTemplates.NonExistingEndpoint;
  }
  if (userId && !isUserIdValid) {
    return ResponseTemplates.InvalidUUIDError;
  }

  if (userId) {
    const user = usersDB.delete(userId);
    if (user) {
      return { statusCode: Code.NoContent_204, data: user };
    }
    return ResponseTemplates.UserNotFound;
  }
  return ResponseTemplates.NonExistingEndpoint;
};

export const add = (urlParts: UrlParts, bodyStr: string): CRUDResponse => {
  const { userId, isValid } = urlParts;
  if (!isValid || userId) {
    return ResponseTemplates.NonExistingEndpoint;
  }

  const body = convertStr2Obj(bodyStr);

  if (!body) {
    return ResponseTemplates.InvalidData;
  }
  if (!checkIsValidBody(body as User)) {
    return ResponseTemplates.InvalidUserData;
  }

  const newUser = usersDB.add(body as User);
  return { statusCode: Code.Created_201, data: newUser };
};

export const update = (urlParts: UrlParts, bodyStr: string): CRUDResponse => {
  const { userId, isUserIdValid, isValid } = urlParts;

  if (!isValid) {
    return ResponseTemplates.NonExistingEndpoint;
  }
  if (userId && !isUserIdValid) {
    return ResponseTemplates.InvalidUUIDError;
  }

  const body = convertStr2Obj(bodyStr);

  if (!body) {
    return ResponseTemplates.InvalidData;
  }

  if (!checkIsValidBody(body as User)) {
    return ResponseTemplates.InvalidUserData;
  }

  if (userId) {
    const user: User = body as User;
    user.id = userId;
    const updatedUser = usersDB.update(user);
    if (updatedUser) {
      return { statusCode: Code.OK_200, data: updatedUser };
    }
    return ResponseTemplates.UserNotFound;
  }
  return ResponseTemplates.NonExistingEndpoint;
};

const convertStr2Obj = (str: string): unknown | null => {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
};

const checkIsValidBody = (body: User): boolean => {
  const { username, age, hobbies } = body;

  if (!username || !age || !hobbies) {
    return false;
  }
  if (typeof username !== 'string' || typeof age !== 'number') {
    return false;
  }

  if (!Array.isArray(hobbies)) {
    return false;
  }

  if (hobbies.some((hobby: unknown) => typeof hobby !== 'string')) {
    return false;
  }
  return true;
};
