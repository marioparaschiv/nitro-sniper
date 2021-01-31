const Sniper = require('../lib/Client');

module.exports = async () => {
   if (!settings.alts?.length || settings.alts[0] == '') {
      return logger.critical(constants.noAlts);
   }

   // Alts
   for (const token of settings.alts) {
      await new Promise((fulfill) => {
         setTimeout(async () => {
            let client = await new Sniper().init(token);
            if (client) snipers.push(client);
            fulfill();
         }, util.randomInt(1e3, 3e3));
      });
   }
};