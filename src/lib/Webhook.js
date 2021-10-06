const { WebhookClient, MessageEmbed } = require('discord.js');

module.exports = class Webhook extends WebhookClient {
   constructor(...args) {
      super(...args);
   }

   async fire(webhookType, args) {
      if (!constants.webhookTypes.includes(webhookType)) return logger.error(constants.invalidWebhookType);

      let success = false;
      let fields = [];
      let embed = new MessageEmbed();

      // On Success
      if ([
         'giveawayWin',
         'codeSuccess',
         'giveawayEntered'
      ].includes(webhookType)) success = true;

      // On Fail
      if (!settings.webhook.enabled[webhookType]) return;

      let {
         time,
         code,
         type,
         author,
         location,
         server,
         invite,
         channel,
         timeTook,
         prize,
         link,
         error
      } = args;

      // Init fields
      switch (webhookType) {
         case 'codeInvalid':
         case 'codeAlreadyRedeemed':
            fields = constants.fields.codeFail(time, code, location);
            break;
         case 'codeSuccess':
            fields = constants.fields.codeSuccess(time, type, code, location);
            break;
         case 'giveawayEntered':
            fields = constants.fields.giveawayEntered(server, channel, timeTook, prize);
            break;
         case 'giveawayWin':
            fields = constants.fields.giveawayWin(server, channel, prize);
            break;
         case 'inviteJoin':
            fields = constants.fields.inviteJoin(location, invite, server, timeTook);
            break;
         case 'inviteFail':
            fields = constants.fields.inviteFail(location, error, invite, server, timeTook);
            break;
      }

      // Add fields
      for (const field of fields) {
         embed.addField(field.key, field.value, field.inline);
      }

      // Set misc
      embed.setTitle(constants.titles[webhookType]);
      embed.setURL(link);
      embed.setColor(success ? constants.colors.success : constants.colors.error);
      if (author) embed.setFooter(author);
      embed.setTimestamp();

      // Grab mention settings
      let { webhook: { mentionEveryone } } = settings;
      let mention = mentionEveryone[webhookType];

      // Fire webhook
      return this.send(mention ? '@everyone' : '', { embeds: [embed] }).catch((e) => {
         logger.error(constants.webhookCantReach(e.message));
      });
   }
};