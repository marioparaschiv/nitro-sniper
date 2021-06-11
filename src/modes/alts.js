const Sniper = require('../lib/Client');

module.exports = async () => {
   if (!settings.tokens.alts?.length || settings.tokens.alts[0] == '') {
      return logger.critical(constants.noAlts);
   }

   // Alts
   for (const token of settings.tokens.alts) {
      await new Promise((fulfill) => {
         setTimeout(async () => {
            let client = await new Sniper().init(token);
            if (client) {
               active.push(client);
               if (settings.status.alts.toLowerCase() !== 'default') {
                  client.user.setStatus(settings.status.alts.toLowerCase());
               }
            }
            fulfill();
         }, util.randomInt(1e3, 3e3));
      });
   }
};