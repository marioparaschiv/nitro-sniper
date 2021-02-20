const phin = require('phin').unpromisified;

module.exports = class Sniper {
   constructor(client) {
      this.client = client;

      this.regex = {
         gift: /(discord.gift|discord.com|discordapp.com\/gifts)\/\w{16,25}/gim,
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
         let codes = msg.content.match(this.regex.gift);
         if (codes?.length + this.snipedBucket > this.bucket) {
            let index = (codes.length + this.snipedBucket) - this.bucket;
            codes.splice(0, index);
         }
         if (codes?.length) await this.handleMessage(msg, codes);
      });
   }

   async handleMessage(msg, codes) {
      // Define vars
      let author = msg.author.tag;
      let account = this.client.user.tag;
      let origin = `Author: ${author} • Account: ${account}`;
      let location = msg.guild ? `${msg.guild.name} > #${msg.channel.name}` : 'DMs';

      // Run for each code
      for (let code of codes) {
         code = code.replace(this.regex.url, '');
         let start = new Date();

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
            headers: {
               'Authorization': settings.tokens.main,
               'User-Agent': constants.userAgent
            },
            data: `{"channel_id":${msg.channel.id},"payment_source_id":${paymentSourceId}}`
         }, (err, res) => {
            // Handle response
            let time = `${new Date() - start}ms`;
            let type = res.body?.subscription_plan?.name;

            if (err) {
               return logger.error(constants.phinError(err, code, location, author, time));
            } else if (res.body?.message?.includes('Unauthorized')) {
               return logger.critical(constants.invalidTokenOnSnipe(code, location, author, time));
            } else if (res.body?.message?.includes('redeemed already')) {
               logger.error(constants.alreadyRedeemedCode(code, location, author, time));
               if (webhook) webhook.fire('codeAlreadyRedeemed', { time, code, account, author: origin, location });
            } else if ('subscription_plan' in res.body) {
               logger.success(constants.snipedCode(code, type, location, author, time));
               if (webhook) webhook.fire('codeSuccess', { time, type, code, account, author: origin, location });
               ++this.snipedBucket;
            } else if (res.body?.message?.includes('Unknown')) {
               logger.error(constants.unknownCode(code, location, author, time));
               if (webhook) webhook.fire('codeInvalid', { time, code, account, author: origin, location });
            } else if (res.body?.message) {
               logger.error(constants.unknownResponse(code, location, author, time, res.body.message));
            }
            // Handle bucket & cache
            this.cache.push(code);
            if (this.snipedBucket >= this.bucket) {
               let date = new Date();
               date.setHours(date.getHours() + settings.nitro.cooldown);
               this.cooldown = date;
               this.snipedBucket = 0;
               logger.warn(constants.cooldown('nitro', settings.nitro.max, settings.nitro.cooldown));
            }
         });
      }
   }
};