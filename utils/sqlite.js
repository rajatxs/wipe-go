import * as SQLite from 'sqlite';
import SQLite3 from 'sqlite3';
import { readFile } from 'fs';
import logger from './logger.js';
import { format } from 'util';
import { SQLITE_DIR } from '../config/config.js';

/** @type {SQLite.Database} */
var connection = null;

export function sqlite() {
   if (!connection) {
      connect();
   }
   return connection;
}

export async function connect() {
   /** @type {SQLite.ISqlite.Config} */
   const config = {
      filename: SQLITE_DIR,
      driver: SQLite3.Database,
   };

   connection = await SQLite.open(config);
}

export function disconnect() {
   if (!connection) {
      return;
   }

   return connection.close();
}

/**
 * Reads and execute SQL Query from given `file`
 * @param {string} file
 * @returns {Promise<object>}
 */
export function readAndExecuteQuery(file) {
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
