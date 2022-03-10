const phin = require('phin').unpromisified;
const moment = require('moment');

module.exports = class Sniper {
   constructor(client) {
      this.client = client;

      this.regex = {
         gift: /(discord.gift|discord\.com\/gifts|discordapp\.com\/gifts)\/\w{16,25}/gim,
         url: /(discord\.gift\/|discord\.com\/gifts\/|discordapp\.com\/gifts\/)/gim
      };

      this.stats = {
         invalid: 0,
         redeemed: 0,
         sniped: 0
      }; // To be used in the dashboard

      this.cooldown = null;
      this.snipedBucket = 0;
      this.bucket = settings.nitro.max;

      this.cache = [];
   }

   async init() {
      this.client.prependListener('message', async (msg) => {
         if (this.cooldown && this.cooldown > new Date()) return;
         this.cooldown = null;

         const codes = msg?.content.match(this.regex.gift);
         if (codes?.length + this.snipedBucket > this.bucket) {
            const index = (codes.length + this.snipedBucket) - this.bucket;
            codes.splice(0, index);
         }

         if (codes?.length) return this.handleMessage(msg, codes);
      });
   }

   async handleMessage(msg, codes) {
      // Check for blacklisted channels
      const blacklisted = settings.nitro?.blacklistedChannels;
      if (blacklisted?.includes(msg?.channel?.id)) return;

      // Wait DM Timer
      if (msg?.channel?.type == 'dm' && settings.nitro.dm.delay > 0) {
         await util.sleep(settings.nitro.dm.delay * 1000);
         if (this.cooldown && this.cooldown > new Date()) return;
      }

      // Define vars
      const author = msg.author.tag;
      const account = this.client.user.tag;
      const origin = `Author: ${author} • Account: ${account}`;
      const location = msg.guild ? `${msg.guild.name} > #${msg.channel.name}` : 'DMs';

      // Run for each code
      for (let code of codes) {
         code = code.replace(this.regex.url, '');

         // Check if cache contains code
         if (this.cache.indexOf(code) > -1) {
            logger.warn(constants.duplicateFound(code, location, author));
            continue;
         }

         // Fire request
         phin({
            url: constants.redeemCodeURL(code),
            method: 'POST',
            parse: 'json',
            time: true,
            headers: {
               'Authorization': settings.tokens.main,
               'User-Agent': constants.userAgent
            },
            data: JSON.stringify({
               channel_id: msg.channel.id,
               payment_source_id: paymentSourceId
            })
         }, (err, res) => {
            // Handle response

            if (res?.body?.retry_after) {
               const cooldown = moment().add(res.body?.retry_after, 'milliseconds');
               return this.cooldown = new Date(cooldown);
            }

            const time = `${res.time.taken}ms`;
            const type = res?.body?.subscription_plan?.name;
            const link = msg.url;

            if (err) {
               return logger.error(constants.phinError(err, code, location, author, time));
            } else if (res?.body?.message?.includes('Unauthorized')) {
               return logger.critical(constants.invalidTokenOnSnipe(code, location, author, time));
            } else if (res?.body?.message?.includes('redeemed already')) {
               logger.error(constants.alreadyRedeemedCode(code, location, author, time));
               if (webhook) webhook.fire('codeAlreadyRedeemed', { time, code, account, author: origin, location, link });
            } else if ('subscription_plan' in res?.body) {
               logger.success(constants.snipedCode(code, type, location, author, time));
               if (webhook) webhook.fire('codeSuccess', { time, type, code, account, author: origin, location, link });
               ++this.snipedBucket;
            } else if (res?.body?.message?.includes('Unknown')) {
               logger.error(constants.unknownCode(code, location, author, time));
               if (webhook) webhook.fire('codeInvalid', { time, code, account, author: origin, location, link });
            } else if (res?.body?.message) {
               logger.error(constants.unknownResponse(code, location, author, time, res.body.message));
            }

            // Handle bucket & cache
            this.cache.push(code);
            if (this.snipedBucket >= this.bucket) {
               const date = new Date();
               date.setHours(date.getHours() + settings.nitro.cooldown);
               this.cooldown = date;
               this.snipedBucket = 0;
               logger.warn(constants.cooldown('nitro', settings.nitro.max, settings.nitro.cooldown));
            }
         });
      }
   }
};
