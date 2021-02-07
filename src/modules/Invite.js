const phin = require("phin");

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
   }

   init() {
      if (!settings.invite.enabled) return;
      this.client.on('message', (msg) => {
         if (this.cooldown && this.cooldown > new Date()) return;
         this.cooldown = null;
         let invites = msg.content.match(this.regex.invite);
         if (invites?.length + this.joinedBucket > this.bucket) {
            let index = (invites.length + this.joinedBucket) - this.bucket;
            invites.splice(0, index);
         }
         if (invites?.length) return this.join(msg,
            invites.map(i => i.replace(this.regex.url, '')).filter(i => !this.cache.includes(i))
         );
      });
   }

   async join(msg, invites) {
      // Define vars
      let headers = {
         'Authorization': this.client.token,
         'X-Super-Properties': constants.xSuperProperties,
         'X-Context-Properties': constants.xContextProperties,
         'User-Agent': constants.userAgent
      };

      let author = msg.author.tag;
      let account = this.client.user.tag;
      let origin = `Author: ${author} • Account: ${account}`;
      let location = msg.guild ? `${msg.guild.name} > #${msg.channel.name}` : 'DMs';

      // Loop over the invites
      for (const i of invites) {
         // Max server check
         if (this.client.guilds.cache.size >= 100) break;

         // Wait the delay
         const { invite: { delay: { min, max } } } = settings;
         let waited = util.randomInt(min * 1000, max * 1000);
         let timeTook = `${((waited % 6e4) / 1e3).toFixed(0)} seconds`;
         await util.sleep(waited);

         // Fetch invite information
         let res = await phin({
            url: constants.inviteFetchURL(i),
            method: 'GET',
            headers,
            parse: 'json'
         }).catch(() => null);
         if (!res?.body?.approximate_member_count) continue;
         let invite = res.body;

         // Push code to cache
         this.cache.push(invite.code);

         // Check member count against min and max settings
         if (
            invite.approximate_member_count >= settings.invite.min &&
            invite.approximate_member_count <= settings.invite.max
         ) continue;

         // Check if the user is already in the guild
         if (
            this.client.guilds.cache.find(g => g.id == invite.guild.id)
         ) continue;

         // Attempt to join the server
         let joined = await phin({
            url: constants.joinURL(invite.code),
            method: 'POST',
            headers,
            parse: 'json'
         }).catch(() => null);

         // Alert 
         if (joined?.body?.guild) {
            if (webhook) webhook.fire('inviteJoin', {
               invite: invite.code,
               server: invite.guild.name,
               author: origin,
               location,
               timeTook
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