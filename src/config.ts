import { cpus } from 'node:os';

const DEFAULT_SERVER_PORT = 4000;

export const PORT = process.env.PORT || DEFAULT_SERVER_PORT;
export const isMultiMode = process.argv.includes('--multi');
export const cpuCount = cpus().length;

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const ENDPOINT = '/api/users';
