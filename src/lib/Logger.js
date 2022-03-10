const { Timestamp } = require('@skyra/timestamp');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

const log = path.join(__dirname, '..', '..', 'sniper.log');

// Delete previous log
if (fs.existsSync(log)) {
   fs.unlinkSync(log);
}

module.exports = class Logger {
   constructor(options) {
      this.options = options || {};
   }

   debug(text, ...args) {
      if (!this.options.debug) return;
      if (global.settings?.log) this.#save('DEBUG', text, ...args);

      return console.log(chalk`{bgGray.white [${new Timestamp('YYYY-MM-DD HH:mm:ss')}]} {gray ${text}}`, ...args);
   }

   warn(text, ...args) {
      if (global.settings?.log) this.#save('WARNING', text, ...args);

      return console.log(chalk`{bgYellow.gray [${new Timestamp('YYYY-MM-DD HH:mm:ss')}]} {yellow ${text}}`, ...args);
   }

   success(text, ...args) {
      if (global.settings?.log) this.#save('SUCCESS', text, ...args);

      return console.log(chalk`{bgGreenBright.gray [${new Timestamp('YYYY-MM-DD HH:mm:ss')}]} {greenBright ${text}}`, ...args);
   }

   error(text, ...args) {
      if (global.settings?.log) this.#save('ERROR', text, ...args);

      return console.log(chalk`{bgRed.white [${new Timestamp('YYYY-MM-DD HH:mm:ss')}]} {red ${text}}`, ...args);
   }

   critical(text, ...args) {
      if (global.settings?.log) this.#save('CRITICAL', text, ...args);

      console.log(chalk`{bgRed.white [${new Timestamp('YYYY-MM-DD HH:mm:ss')}]} {red ${text}}`, ...args);

      return new Promise((fulfill) => {
         setTimeout(() => {
            fulfill();
            process.exit(-1);
         }, 5000);
      });
   }

   #save(prefix, ...content) {
      const timestamp = new Timestamp('YYYY-MM-DD HH:mm:ss');

      try {
         fs.appendFileSync(log, `${timestamp} ${prefix}: ${content.join(' ')}`);
      } catch (e) {
         console.error('Failed to save log file.', e.message);
      }
   }
};