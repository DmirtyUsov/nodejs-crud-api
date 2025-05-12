import { AppResponse } from '../models/app-response.model.js';
import { StatusCode } from '../models/status-code.model.js';
import { UrlState } from '../models/url-state.model.js';
import { UserDTO } from '../models/user-dto.model.js';
import * as ResponseTemplates from '../response-templates.js';
import { usersDB } from '../users-db.js';
import { checkIsValidBody } from './check-is-valid-body.js';
import { convertStrToObj } from './convert-str-to-obj.js';
import { verifyNotValidResponse } from './verify.fn.js';

export const put = (urlState: UrlState, bodyStr: string): AppResponse => {
  const notValid = verifyNotValidResponse(urlState);
  if (notValid) {
    return notValid;
  }

  const body = convertStrToObj(bodyStr);

  if (!body) {
    return ResponseTemplates.InvalidData;
  }
  if (!checkIsValidBody(body as UserDTO)) {
    return ResponseTemplates.InvalidUserData;
  }

  const user = usersDB.update(urlState.userId, body as UserDTO);
  const appResponse: AppResponse = {
    statusCode: StatusCode.OK_200,
    data: user,
  };
  return appResponse;
};
