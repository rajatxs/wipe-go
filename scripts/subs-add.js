import { createSubscription } from '../services/subs.service.js';
import { connect } from '../utils/sqlite.js';
import logger from '../utils/logger.js';

const [alias, phone, event = 'presence.update'] = process.argv.slice(2);

(async function () {
   try {
      await connect();
      await createSubscription({
         alias,
         phone,
         // @ts-ignore
         event,
         tag: 'CLI',
      });
   } catch (error) {
      logger.error('subs:add', "couldn't add new subscription", error);
   }
}());
