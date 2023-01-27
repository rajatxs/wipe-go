import path from 'path';
import { homedir } from 'os';
import { getTag } from '../utils/common.js';

// global vars
export const NODE_ENV = process.env.NODE_ENV;

// common vars
export const TAG = process.env.WIPE_TAG || getTag();
export const SESSION_ROOT = process.env.WIPE_SESSION_ROOT || path.join(homedir(), '.wipe');

// SQLite config
export const SQLITE_DIR = process.env.WIPE_SQLITE_DIR;
