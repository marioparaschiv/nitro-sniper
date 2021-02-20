const Sniper = require('../lib/Client');

module.exports = async () => {
   if (!settings.tokens.main) return logger.critical(constants.noMain);

   // Main
   await new Promise((fulfill) => {
      setTimeout(async () => {
         let client = await new Sniper().init(settings.tokens.main);
         if (client) active.push(client);
         fulfill();
      }, util.randomInt(1e3, 3e3));
   });
};