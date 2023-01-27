import { sqlite, connect, disconnect } from '../utils/sqlite.js';
import { readFile } from 'fs';
import path from 'path';
import logger from '../utils/logger.js';
import { format } from 'util';

/**
 * Reads and execute SQL Query from given `file`
 * @param {string} file
 * @returns {Promise<object>}
 */
function readAndExecuteQuery(file) {
   return new Promise(function (resolve, reject) {
      readFile(file, 'utf8', async function (error, sql) {
         if (error) {
            logger.error('query', format("couldn't read %s", file));
            reject(error);
         } else {
            try {
               const result = await sqlite().run(sql);
               resolve(result);
            } catch (error) {
               logger.error('query:sql', format("couldn't run %s", sql));
               reject(error);
            }
         }
      });
   });
}

(async function () {
   const files = process.argv.slice(2);

   await connect();

   for (let file of files) {
      const queryPath = path.join('sql', file + '.sql');
      await readAndExecuteQuery(queryPath);
   }
   await disconnect();
})();
