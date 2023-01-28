import { Command } from 'commander';
import { openWASocket, closeWASocket } from '../services/wa.service.js';
import { connect, disconnect } from '../utils/sqlite.js';
import logger from '../utils/logger.js';

const goCommand = new Command('go');

(function () {
   goCommand.description('starts wa service').action(async function () {
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
   });
})();

export { goCommand };
