import { Logger } from '@rxpm/logger';
import { ENABLE_LOGS } from '../config/config.js';

export default new Logger('wipe', {
   enable: ENABLE_LOGS,
});
