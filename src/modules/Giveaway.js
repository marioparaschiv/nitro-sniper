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
            blacklistedServers
         }
      } = settings;

      if (!enabled) return;
      // Giveaway Start
      this.client.on('message', async (msg) => {
         // Cancel if not a server text channel
         if (msg.channel.type !== 'text') return;

         // Check for blacklisted servers
         if (blacklistedServers.includes(msg.guild.id)) return;

         if (msg.content.includes('**GIVEAWAY**') && msg.content.includes(':yay:')) {
            let embed = msg.embeds[0];
            if (!embed) return;
            let prize = embed.author?.name;
            let hoster = embed.description
               ?.replace(/\r/g, '')
               ?.split('\n')[2]
               ?.match(/[0-9]{17,20}/gim)[0];

            if (!hoster) return;
            let fetch = await this.client.users.fetch(hoster).catch(() => null);
            if (!fetch) return;
            hoster = this.client.users.cache.get(hoster);
            if (!hoster) return;

            // Check for whitelist
            if (whitelistOnly) {
               let whitelist = prize.toLowerCase().containsAny(
                  whitelistedWords.map(w => String(w).toLowerCase())
               );
               if (!whitelist) return;
            }

            // Check for blacklist
            let blacklist = prize.toLowerCase().containsAny(
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
            msg.channel.type !== 'text' ||
            !msg.author.bot
         ) return;

         // Cancel if user didn't win the giveaway
         if (!(
            msg.content.toLowerCase().includes('congratulations') &&
            msg.content.toLowerCase().includes(`<@${this.client.user.id}>`)
         )) return;

         let messageLinks = msg.content.match(this.regex.messageLink);
         if (!messageLinks || !messageLinks.length) return;
         let messageId = messageLinks[0]?.split('/')[6];
         let message = await msg.channel.messages.fetch({ limit: 1, around: messageId })
            .then(i => i.first())
            .catch(() => null);

         if (!message) return;

         let embed = message.embeds[0];
         if (!embed) return;


         // Get info from embed
         let prize = embed.author?.name;

         let description = embed.description
            ?.replace(/\r/g, "")
            ?.split('\n');

         let hoster = description[description.length - 1]
            ?.match(/[0-9]{17,20}/gim)[0];

         // Fetch hoster
         if (!hoster) return;
         let fetch = await this.client.users.fetch(hoster).catch(() => null);
         if (!fetch) return;
         hoster = this.client.users.cache.get(hoster);
         if (!hoster) return;

         return await this.handleGiveawayWin(msg, hoster, prize);
      });
   };

   async handleGiveawayStart(msg, delay, prize, hoster) {
      let origin = `Author: ${msg.author.tag} • Account: ${this.client.user.tag}`;
      // Attempt to react
      let timeout = util.randomInt(delay, delay * 1.5);
      let reacted = await new Promise((fulfill) => {
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
      let timeTook = `${((timeout % 6e4) / 1e3).toFixed(0)} seconds`;
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
            author: origin
         });
      }
   }

   async handleGiveawayWin(msg, hoster, prize) {
      let origin = `Author: ${msg.author.tag} • Account: ${this.client.user.tag}`;
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
         author: origin
      });

      // DM hoster
      if (settings.giveaway.dm) {
         const { giveaway: { dmDelay } } = settings;
         let delay = dmDelay * 1000;
         let timeout = util.randomInt(delay, delay * 1.5);
         let timeTook = `${((timeout % 6e4) / 1e3).toFixed(0)} seconds`;
         let dmed = await new Promise(async (fulfill) => {
            setTimeout(async () => {
               try {
                  await hoster.send(settings.giveaway.dmMessage);
                  fulfill(true);
               } catch {
                  fulfill(false);
               }
            }, timeout);
         });

         // Check if DM sent
         if (dmed) {
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
}