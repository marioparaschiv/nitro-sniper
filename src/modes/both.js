const Sniper = require('../lib/Client');

module.exports = async () => {
   // Main
   let main = false;
   if (!settings.main) return logger.critical(constants.noMain);

   await new Promise((fulfill) => {
      setTimeout(async () => {
         let client = await new Sniper().init(settings.main);
         if (client) {
            main = true;
            snipers.push(client);
         }
         fulfill();
      }, util.randomInt(1e3, 3e3));
   });

   // Alts
   let alts = 0;
   for (const token of settings.alts) {
      await new Promise((fulfill) => {
         setTimeout(async () => {
            let client = await new Sniper().init(token);
            if (client) {
               snipers.push(client);
               ++alts;
            }
            fulfill();
         }, util.randomInt(1e3, 3e3));
      });
   }

   // Check if any logged in
   if (!main && alts <= 0) return;
   if (alts <= 0 && (!settings.alts?.length || settings.alts[0] != '')) {
      logger.warn(constants.bothModeNoAlts);
   }
   if (!main) logger.critical(constants.bothModeNoMain);
};