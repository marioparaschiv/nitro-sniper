const { Util: { mergeDefault }, ClientOptions } = require('discord.js');
const GiveawaySniper = require('./Giveaway');
const { Client } = require('discord.js');
const NitroSniper = require('./Nitro');

module.exports = class Sniper extends Client {
   constructor() {
      super(mergeDefault(ClientOptions, constants.clientOp));

      this.nitro = new NitroSniper(this);
      this.giveaway = new GiveawaySniper(this);
   }

   async init(token) {
      let failed = false;
      this.nitro.init(this);
      this.giveaway.init(this);

      await this.login(token).catch(() => {
         failed = true;
         this.destroy();
         return null;
      });

      return failed ? null : this;
   }
};