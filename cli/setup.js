import { Command } from 'commander';
import path from 'path';
import logger from '../utils/logger.js';
import { connect, readAndExecuteQuery, disconnect } from '../utils/sqlite.js';
import { fileURLToPath } from 'url';

const setupCommand = new Command('setup');

(function () {
   setupCommand.description('runs setup script').action(async function () {
      const files = ['subs', 'pres_hist'];

      try {
         await connect();

         for (let file of files) {
            const dir = path.join(
               path.dirname(fileURLToPath(import.meta.url)),
               '..',
               'sql'
            );
            const queryPath = path.join(dir, file + '.sql');
            await readAndExecuteQuery(queryPath);
         }

         logger.info('setup', 'done');
         await disconnect();
      } catch (error) {
         logger.error('setup', 'something went wrong');
      }
   });
})();

export { setupCommand };
