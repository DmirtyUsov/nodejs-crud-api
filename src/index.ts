import * as config from './config.js';
import { startServer } from './server.js';

if (!config.isMultiMode) {
  startServer().listen(config.SERVER_PORT, () => {
    console.log(`Server running on port ${config.SERVER_PORT}`);
  });
}

if (config.isMultiMode) {
  console.log('Multi not implemented');
  startServer().listen(config.SERVER_PORT, () => {
    console.log(`Server running on port ${config.SERVER_PORT}`);
  });
}
