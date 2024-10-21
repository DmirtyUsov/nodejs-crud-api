import * as config from './config.js';
import { startServer } from './server.js';

if (!config.isMultiMode) {
  startServer().listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
  });
}

if (config.isMultiMode) {
  console.log('Multi not implemented');
  startServer().listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
  });
}
