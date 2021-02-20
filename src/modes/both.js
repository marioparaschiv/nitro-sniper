const Sniper = require('../lib/Client');

module.exports = async () => {
   // Main
   let main = false;
   if (!settings.tokens.main) return logger.critical(constants.noMain);

   await new Promise((fulfill) => {
      setTimeout(async () => {
         let client = await new Sniper().init(settings.tokens.main);
         if (client) {
            main = true;
            active.push(client);
         }
         fulfill();
      }, util.randomInt(1e3, 3e3));
   });

   // Alts
   let alts = 0;
   for (const token of settings.tokens.alts) {
      await new Promise((fulfill) => {
         setTimeout(async () => {
            let client = await new Sniper().init(token);
            if (client) {
               active.push(client);
               ++alts;
            }
            fulfill();
         }, util.randomInt(1e3, 3e3));
      });
   }

   // Check if any logged in
   if (!main && alts <= 0) return;
   if (alts <= 0 && (!settings.tokens.alts?.length || settings.tokens.alts[0] != '')) {
      logger.warn(constants.bothModeNoAlts);
   }
   if (!main) return logger.critical(constants.bothModeNoMain);
};