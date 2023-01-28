import { Command } from 'commander';
import { subsCommand } from './subs.js';
import { setupCommand } from './setup.js';
import { goCommand } from './go.js';

const cmd = new Command('wipe');

(function () {
   cmd.version('1.1.0', '-v, --version');
   cmd.description('Liteweight tool to track presence on WhatsApp');

   cmd.addCommand(goCommand);
   cmd.addCommand(setupCommand);
   cmd.addCommand(subsCommand);
   cmd.parse();
})();

export { cmd };
