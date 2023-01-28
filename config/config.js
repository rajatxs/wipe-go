import path from 'path';
import { homedir } from 'os';
import { getTag } from '../utils/common.js';

/**
 * Resolve boolean value from env var
 * @param {string} envvar 
 */
function _resolveBoolean(envvar) {
   return Boolean(Number(process.env[envvar]));
}

// global vars
export const NODE_ENV = process.env.NODE_ENV;

// common vars
export const TAG = process.env.WIPE_TAG || getTag();
export const ENABLE_LOGS = _resolveBoolean('WIPE_ENABLE_LOGS');
export const SESSION_ROOT = process.env.WIPE_SESSION_ROOT || path.join(homedir(), '.wipe-session');

// SQLite config
export const SQLITE_DIR = process.env.WIPE_SQLITE_DIR || path.join(homedir(), '.wipe.db');
