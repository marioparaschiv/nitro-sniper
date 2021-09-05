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
      ModuleKeys.forEach(m => {
         this[m.toLowerCase()]?.init();
      });

      await this.login(token).catch(() => {
         failed = true;
         this.destroy();
      });

      return failed ? null : this;
   }
};
