const { Util: { mergeDefault }, ClientOptions } = require('discord.js');
const { Client } = require('discord.js-light');

const Modules = require('../modules/index');
const ModuleKeys = Object.keys(Modules);

module.exports = class Sniper extends Client {
   constructor() {
      super(mergeDefault(
         ClientOptions,
         constants.clientOptions
      ));

      ModuleKeys.forEach(m => {
         this[m.toLowerCase()] = new Modules[m](this);
      });
   }

   async init(token) {
      let failed = false;

      await this.login(token).catch(() => {
         failed = true;
         this.destroy();
      });

      if (!failed) {
         ModuleKeys.forEach(m => {
            if (
               m == 'Invite' &&
               settings.invite.onlyAlts &&
               token == settings.tokens.main
            ) return;

            this[m.toLowerCase()]?.init();
         });
      }

      return failed ? null : this;
   }
};
