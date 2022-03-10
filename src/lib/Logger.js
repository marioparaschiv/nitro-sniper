const chalk = require('chalk');
const { Timestamp } = require('@skyra/timestamp');
const fs = require("fs")

module.exports = class Logger {
   constructor(options) {
      this.options = options || {};
   }

   debug(text, ...args) {
      if (!this.options.debug) return;
      fs.appendFileSync("sniper.log", `${new Timestamp('YYYY-MM-DD HH:mm:ss')} DEBUG: ${text} ${args}`);
      return console.log(chalk`{bgGray.white [${new Timestamp('YYYY-MM-DD HH:mm:ss')}]} {gray ${text}}`, ...args);
   }

   warn(text, ...args) {
      fs.appendFileSync("sniper.log", `${new Timestamp('YYYY-MM-DD HH:mm:ss')} WARNING: ${text} ${args}`);
      return console.log(chalk`{bgYellow.gray [${new Timestamp('YYYY-MM-DD HH:mm:ss')}]} {yellow ${text}}`, ...args);
   }

   success(text, ...args) {
      fs.appendFileSync("sniper.log", `${new Timestamp('YYYY-MM-DD HH:mm:ss')} INFO: ${text} ${args}`);
      return console.log(chalk`{bgGreenBright.gray [${new Timestamp('YYYY-MM-DD HH:mm:ss')}]} {greenBright ${text}}`, ...args);
   }

   error(text, ...args) {
      fs.appendFileSync("sniper.log", `${new Timestamp('YYYY-MM-DD HH:mm:ss')} ERROR: ${text} ${args}`);
      return console.log(chalk`{bgRed.white [${new Timestamp('YYYY-MM-DD HH:mm:ss')}]} {red ${text}}`, ...args);
   }

   critical(text, ...args) {
      fs.appendFileSync("sniper.log", `${new Timestamp('YYYY-MM-DD HH:mm:ss')} CRITICAL ERROR: ${text} ${args}`);
      console.log(chalk`{bgRed.white [${new Timestamp('YYYY-MM-DD HH:mm:ss')}]} {red ${text}}`, ...args);
      return new Promise((fulfill) => {
         setTimeout(() => {
            fulfill();
            process.exit(-1);
         }, 5000);
      });
   }
};