import { openWASocket, closeWASocket } from '../services/wa.service.js';
import { connect, disconnect } from '../utils/sqlite.js';
import logger from '../utils/logger.js';

(async function () {
   await connect();
   await openWASocket();

   process.on('SIGINT', async () => {
      try {
         closeWASocket();
         await disconnect();
      } catch (error) {
         logger.error('server', "couldn't stop service", error);
         return process.exit(1);
      }

      process.exit(0);
   });
})();
