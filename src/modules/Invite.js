const puppeteer = require('puppeteer');
const phin = require('phin');
const { sleep } = require('../lib/Util');
const { Util } = require('discord.js');

module.exports = class Invite {
   constructor(client) {
      this.client = client;

      this.regex = {
         invite: /discord(?:\.com|app\.com|\.gg)(\/invite\/|\/)(?:[a-zA-Z0-9\-]{2,32})/gim,
         url: /(discord.gg\/|discord.com\/invite\/|discordapp.com\/invite\/)/gim
      };

      this.cooldown = null;
      this.joinedBucket = 0;
      this.bucket = settings.invite.max;

      this.cache = [];

      this.pageReady = false;
   }

   async initBot() {
      // Initiate the browser instance
      const browser = await puppeteer.launch();
      this.page = await browser.newPage();
      await this.page.goto('https://discord.com/login');

      // Login using the provided token
      await this.page.evaluate(async (token) => {
         const login = Object.values(webpackJsonp.push([[], { "": (e, t, o) => { t.cache = o.c; } }, [[""]]]).cache).find(e => e.exports && e.exports.default && void 0 !== e.exports.default.loginToken).exports.default.loginToken;
         login(token);

         while (!document.querySelector('.container-3baos1')) {
            await new Promise(f => setTimeout(f, 100));
         }
      }, this.client.token);


      this.pageReady = true;
      // await browser.close();
   }

   init() {
      if (!settings.invite.enabled) return;
      this.initBot();
      this.client.on('message', (msg) => {
         if (this.cooldown && this.cooldown > new Date()) return;
         this.cooldown = null;
         let invites = msg.content.match(this.regex.invite);
         if (invites?.length + this.joinedBucket > this.bucket) {
            let index = (invites.length + this.joinedBucket) - this.bucket;
            invites.splice(0, index);
         }
         if (invites?.length) return this.handleInvite(msg,
            invites.map(i => i.replace(this.regex.url, '')).filter(i => !this.cache.includes(i))
         );
      });
   }

   async join(invite) {
      if (!this.page || !this.pageReady) return;

      const joined = await this.page.evaluate(async (invite) => {
         const accept = Object.values(webpackJsonp.push([[], { "": (e, t, o) => { t.cache = o.c; } }, [[""]]]).cache).find(e => e.exports && e.exports.default && void 0 !== e.exports.default.acceptInvite).exports.default.acceptInvite;
         const result = await accept(invite).catch(e => e);
         return result;
      }, invite).catch(() => false);

      return joined;
   }

   async handleInvite(msg, invites) {
      // Define vars
      const author = msg.author.tag;
      const account = this.client.user.tag;
      const origin = `Author: ${author} • Account: ${account}`;
      const location = msg.guild ? `${msg.guild.name} > #${msg.channel.name}` : 'DMs';
      const link = msg.url;

      // Filter out used invites just incase
      invites = invites.filter(i => !this.cache.includes(i));

      // Loop over the invites
      for (const i of invites) {
         // Max server check
         if (this.client.guilds.cache.size >= 100) break;

         // Wait the delay
         const { invite: { delay: { min, max } } } = settings;
         const waited = util.randomInt(min * 1000, max * 1000);
         const timeTook = `${(waited / 1000).toFixed(0)} second(s)`;
         await util.sleep(waited);

         // Fetch invite information
         const res = await phin({
            url: constants.inviteFetchURL(i),
            method: 'GET',
            headers: {
               'Authorization': this.client.token,
               'X-Super-Properties': constants.xSuperProperties,
               'X-Context-Properties': constants.xContextProperties,
               'User-Agent': constants.userAgent
            },
            parse: 'json'
         }).catch(() => null);
         if (!res?.body?.approximate_member_count) continue;
         const invite = res.body;

         // Push code to cache
         this.cache.push(invite.code);

         // Check member count against min and max settings
         if (
            invite.approximate_member_count >= settings.invite.members.min &&
            invite.approximate_member_count <= settings.invite.members.max
         ) continue;

         // Check if the user is already in the guild
         if (
            this.client.guilds.cache.find(g => g.id == invite.guild.id)
         ) continue;

         // Attempt to join the server
         const joined = await this.join(invite.code);
         if (!joined) return;

         // Alert result
         if (joined.error && joined.message) {
            if (webhook) webhook.fire('inviteFail', {
               invite: invite.code,
               server: invite.guild.name,
               error: joined.message,
               author: origin,
               location,
               timeTook,
               link
            });

            return logger.error(constants.inviteFail(
               invite.code,
               invite.guild.name,
               location,
               joined.message,
               author,
               account,
               timeTook
            ));
         }

         if (joined) {
            if (webhook) webhook.fire('inviteJoin', {
               invite: invite.code,
               server: invite.guild.name,
               author: origin,
               location,
               timeTook,
               link
            });

            logger.success(constants.joinedServer(
               invite.code,
               invite.guild.name,
               location,
               author,
               account,
               timeTook
            ));
            ++this.joinedBucket;
         }
      }

      // Check Max Bucket 
      if (this.joinedBucket >= this.bucket) {
         let date = new Date();
         date.setHours(date.getHours() + settings.invite.cooldown);
         this.cooldown = date;
         this.joinedBucket = 0;
         logger.warn(constants.cooldown('invite', settings.invite.max, settings.invite.cooldown));
      }
   }
};