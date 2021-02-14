const chalk = require('chalk');
const { Timestamp } = require('@skyra/timestamp');

module.exports = class Logger {
   constructor(options) {
      this.options = options || {};
   }

   debug(text, ...args) {
      if (!this.options.debug) return;
      return console.log(chalk`{bgGray.white [${new Timestamp('YYYY-MM-DD HH:mm:ss')}]} {gray ${text}}`, ...args);
   }

   warn(text, ...args) {
      return console.log(chalk`{bgYellow.gray [${new Timestamp('YYYY-MM-DD HH:mm:ss')}]} {yellow ${text}}`, ...args);
   }

   success(text, ...args) {
      return console.log(chalk`{bgGreenBright.gray [${new Timestamp('YYYY-MM-DD HH:mm:ss')}]} {greenBright ${text}}`, ...args);
   }

   error(text, ...args) {
      return console.log(chalk`{bgRed.white [${new Timestamp('YYYY-MM-DD HH:mm:ss')}]} {red ${text}}`, ...args);
   }

   critical(text, ...args) {
      console.log(chalk`{bgRed.white [${new Timestamp('YYYY-MM-DD HH:mm:ss')}]} {red ${text}}`, ...args);
      return new Promise((fulfill) => {
         setTimeout(() => {
            fulfill();
            process.exit(-1);
         }, 5000);
      });
   }
};