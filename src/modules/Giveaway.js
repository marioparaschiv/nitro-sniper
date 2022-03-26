module.exports = class Giveaway {
   constructor(client) {
      this.client = client;

      this.regex = {
         messageLink: /https:\/\/(canary.|ptb.|)discord(|app).com\/channels\/([0-9]+)\/([0-9]+)\/([0-9]+)/gim
      };
   }

   async init() {
      const {
         giveaway: {
            enabled,
            delay,
            whitelistOnly,
            whitelistedWords,
            blacklistedWords,
            blacklistedServers,
            whitelistedServers,
            whitelistServersOnly,
            prizeLength
         }
      } = settings;

      if (!enabled) return;
      // Giveaway Start
      this.client.on('message', async (msg) => {
         // Cancel if not a server text channel
         if (msg?.channel.type !== 'text') return;

         // Check for whitelist
         if (whitelistServersOnly) {
            if (!whitelistedServers.includes(msg.guild.id)) return;
         }

         // Check for blacklisted servers
         if (blacklistedServers.includes(msg.guild.id)) return;

         if (msg.content.includes('**GIVEAWAY**') && msg.content.includes(':yay:')) {
            const embed = msg.embeds[0];
            if (!embed) return;
            const prize = embed.author?.name;

            // Validate prize length with provided settings
            const minLength = prizeLength.min || Infinity;
            const maxLength = prizeLength.max || Infinity;

            if (minLength > prize.length) return;
            if (maxLength < prize.length) return;

            let hoster = embed.description
               ?.replace(/\r/g, '')
               ?.split('\n')[2]
               ?.match(/[0-9]{17,20}/gim)[0];

            if (!hoster) return;
            const fetch = await this.client.users.fetch(hoster).catch(() => null);
            if (!fetch) return;
            hoster = this.client.users.cache.get(hoster);
            if (!hoster) return;

            // Check for whitelist
            if (whitelistOnly) {
               let whitelist = prize?.toLowerCase().containsAny(
                  whitelistedWords.map(w => String(w).toLowerCase())
               );
               if (!whitelist) return;
            }

            // Check for blacklist
            const blacklist = prize?.toLowerCase().containsAny(
               blacklistedWords.map(w => String(w).toLowerCase())
            );

            if (blacklist) return;

            // Handle giveaway
            return await this.handleGiveawayStart(msg, delay * 1000, prize, hoster);
         }
      });

      // Giveaway End
      this.client.on('message', async (msg) => {
         // Fake giveaway checks
         if (
            msg?.channel.type !== 'text' ||
            !msg.author.bot
         ) return;

         // Cancel if user didn't win the giveaway
         if (!(
            msg.content.toLowerCase().includes('congratulations') &&
            msg.content.toLowerCase().includes(`<@${this.client.user.id}>`)
         )) return;

         const messageLinks = msg.embeds?.[0]?.description?.match(this.regex.messageLink);
         if (!messageLinks || !messageLinks.length) return;
         const messageId = messageLinks[0]?.split('/')[6];
         const message = await msg.channel.messages.fetch({ limit: 1, around: messageId })
            .then(i => i.first())
            .catch(() => null);

         if (!message) return;

         const embed = message.embeds[0];
         if (!embed) return;


         // Get info from embed
         const prize = embed.author?.name;

         const description = embed.description
            ?.replace(/\r/g, "")
            ?.split('\n');

         let hoster = description[description.length - 1]
            ?.match(/[0-9]{17,20}/gim)[0];

         // Fetch hoster
         if (!hoster) return;
         const fetch = await this.client.users.fetch(hoster).catch(() => null);
         if (!fetch) return;
         hoster = this.client.users.cache.get(hoster);
         if (!hoster) return;

         return await this.handleGiveawayWin(msg, hoster, prize);
      });
   };

   async handleGiveawayStart(msg, delay, prize, hoster) {
      const origin = `Author: ${msg.author.tag} • Account: ${this.client.user.tag}`;
      const link = msg.url;
      // Attempt to react
      const timeout = util.randomInt(delay, delay * 1.5);
      const reacted = await new Promise((fulfill) => {
         setTimeout(async () => {
            try {
               await msg.react('🎉');
               fulfill(true);
            } catch {
               fulfill(false);
            }
         }, timeout);
      });

      // Check if reaction was successful
      const timeTook = `${(timeout / 1000).toFixed(0)} second(s)`;
      if (!reacted) {
         return logger.error(constants.failedGiveawayReact(
            prize,
            hoster,
            msg.guild.name,
            msg.channel.name,
            timeTook
         ));
      } else {
         logger.success(constants.reactedGiveaway(
            prize,
            hoster.tag,
            msg.guild.name,
            msg.channel.name,
            timeTook
         ));

         // Fire webhook
         if (webhook) return webhook.fire('giveawayEntered', {
            server: msg.guild.name,
            channel: msg.channel.name,
            timeTook,
            prize,
            author: origin,
            link
         });
      }
   }

   async handleGiveawayWin(msg, hoster, prize) {
      const origin = `Author: ${msg.author.tag} • Account: ${this.client.user.tag}`;
      const link = msg.url;

      logger.success(constants.giveawayWon(
         prize,
         hoster.tag,
         msg.guild.name,
         msg.channel.name
      ));

      // Fire webhook
      if (webhook) webhook.fire('giveawayWin', {
         server: msg.guild.name,
         channel: msg.channel.name,
         prize,
         author: origin,
         link
      });

      // DM hoster
      if (settings.giveaway.dm) {
         const { giveaway: { dmDelay } } = settings;
         const delay = dmDelay * 1000;
         const timeout = util.randomInt(delay, delay * 1.5);
         const timeTook = `${(timeout / 1000).toFixed(0)} second(s)`;
         const channel = await hoster.createDM(true);

         const success = await new Promise(async (fulfill) => {
            setTimeout(async () => {
               try {
                  for (const message of settings.giveaway.dmMessages) {
                     await channel.send(message);
                     await util.sleep(settings.giveaway.messageDelay * 1000);
                  }

                  fulfill(true);
               } catch {
                  fulfill(false);
               }
            }, timeout);
         });

         // Check if DM sent
         if (success) {
            logger.success(constants.dmHosterSuccess(
               hoster.tag,
               prize,
               msg.guild.name,
               msg.channel.name,
               timeTook
            ));
         } else {
            logger.error(constants.dmHosterFail(
               hoster.tag,
               prize,
               msg.guild.name,
               msg.channel.name,
               timeTook
            ));
         }
      }
   }
};
