const Sniper = require('../lib/Client');

module.exports = async () => {
   if (!settings.main) return logger.critical(constants.noMain);

   // Main
   await new Promise((fulfill) => {
      setTimeout(async () => {
         let client = await new Sniper().init(settings.main);
         if (client) snipers.push(client);
         fulfill();
      }, util.randomInt(1e3, 3e3));
   });
};