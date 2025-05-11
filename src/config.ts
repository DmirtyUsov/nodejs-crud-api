import { parseArgs, ParseArgsOptionsConfig } from 'node:util';

const options: ParseArgsOptionsConfig = {
  multi: { type: 'boolean' },
};
const { values } = parseArgs({ options, tokens: true });
export const isMultiMode = values.multi ?? false;

const DEFAULT_SERVER_PORT = 4005;

export const SERVER_PORT = process.env.SERVER_PORT || DEFAULT_SERVER_PORT;
export const ENDPOINT = '/api/users';
