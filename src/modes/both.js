const Sniper = require('../lib/Client');

module.exports = async () => {
   // Main
   let main = false;
   if (!settings.tokens.main || !settings.tokens.main?.length) return logger.critical(constants.noMain);

   await new Promise((fulfill) => {
      setTimeout(async () => {
         const client = await new Sniper().init(settings.tokens.main);
         if (client) {
            main = true;
            client.main = true;
            active.push(client);

            if (settings.status.main.toLowerCase() !== 'default') {
               client.user.setStatus(settings.status.main.toLowerCase());
               client.user.setAFK(true);
            }
         }
         fulfill();
      }, util.randomInt(1e3, 3e3));
   });

   // Alts
   let alts = 0;
   for (const token of util.cleanTokens()) {
      await new Promise((fulfill) => {
         setTimeout(async () => {
            const client = await new Sniper().init(token);
            if (client) {
               active.push(client);
               ++alts;

               if (settings.status.alts.toLowerCase() !== 'default') {
                  client.user.setStatus(settings.status.alts.toLowerCase());
                  client.user.setAFK(true);
               }
            }
            fulfill();
         }, util.randomInt(1e3, 3e3));
      });
   }

   // Check if any logged in
   if (!main && alts <= 0) return;

   if (util.cleanTokens().length > 0 && alts <= 0) {
      logger.warn(constants.bothModeNoAlts);
   }

   if (!main) return logger.critical(constants.bothModeNoMain);
};