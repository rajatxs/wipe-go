import {
   createSubscription,
   deleteSubscription,
} from '../services/subs.service.js';
import { connect } from '../utils/sqlite.js';
import { Command } from 'commander';
import logger from '../utils/logger.js';

const subsCommand = new Command('subs');

(function () {
   const subsAddCommand = new Command('add')
      .description('adds new subscription')
      .option('--alias <string>', 'alias of subscription')
      .option('--phone <string>', 'wa phone number')
      .option('--event <string>', 'subscription event', 'presence.update')
      .action(async function (opt) {
         try {
            await connect();
            await createSubscription({
               alias: opt.alias,
               phone: opt.phone,
               event: opt.event,
               tag: 'CLI',
            });
            logger.info('subscription', 'added successfully');
         } catch (error) {
            logger.error('subscription', "couldn't add new one");
         }
      });

   const subsRemoveCommand = new Command('remove')
      .description('remove subscription')
      .option('--id <number>', 'subscription id')
      .action(async function (opt) {
         try {
            await connect();
            await deleteSubscription(opt.id);
            logger.info('subscription', 'removed successfully');
         } catch (error) {
            logger.error('subscription', "couldn't remove");
         }
      });

   subsCommand
      .description('manage subscriptions')
      .addCommand(subsAddCommand)
      .addCommand(subsRemoveCommand);
})();

export { subsCommand };
