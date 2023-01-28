import * as SQLite from 'sqlite';
import SQLite3 from 'sqlite3';
import path from 'path';
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
