export enum Code {
  OK_200 = 200,
  Created_201 = 201,
  NoContent_204 = 204,
  BadRequest_400 = 400,
  NotFound_404 = 404,
  ServerError_500 = 500,
}

export type CRUDResponse = {
  statusCode: Code;
  data?: unknown;
};
