const chalk = require('chalk');

module.exports = {
   clientOptions: {
      disabledEvents: [
         'TYPING_START',
         'VOICE_SERVER_UPDATE',
         'RELATIONSHIP_ADD',
         'RELATIONSHIP_REMOVE',
         'GUILD_ROLE_DELETE',
         'GUILD_ROLE_UPDATE',
         'GUILD_BAN_ADD',
         'GUILD_BAN_REMOVE',
         'CHANNEL_UPDATE',
         'CHANNEL_PINS_UPDATE',
         'MESSAGE_DELETE',
         'MESSAGE_UPDATE',
         'MESSAGE_DELETE_BULK',
         'MESSAGE_REACTION_ADD',
         'MESSAGE_REACTION_REMOVE',
         'GUILD_MEMBER_UPDATE',
         'GUILD_MEMBERS_CHUNK',
         'GUILD_ROLE_CREATE',
         'MESSAGE_REACTION_REMOVE_ALL',
         'USER_UPDATE',
         'USER_NOTE_UPDATE',
         'USER_SETTINGS_UPDATE',
         'PRESENCE_UPDATE',
         'VOICE_STATE_UPDATE',
         'GUILD_UPDATE',
         'GUILD_MEMBER_ADD',
         'GUILD_MEMBER_REMOVE'
      ],
      messageEditHistoryMaxSize: 1,
      messageSweepInterval: 1,
      messageCacheLifetime: 1,
      messageCacheMaxSize: 1,
      cacheChannels: true,
      restTimeOffset: 0,
      presence: { afk: true }
   },
   defaultSettings: {
      tokens: {
         main: '',
         alts: [
            ''
         ],
      },
      mode: 'both',
      status: {
         main: 'default',
         alts: 'default'
      },
      nitro: {
         max: 2,
         cooldown: 24,
         dm: {
            delay: 10
         }
      },
      giveaway: {
         enabled: true,
         delay: 30,
         dm: true,
         dmMessages: [
            'Hey, i won the giveaway.',
            'Could i redeem my prize?'
         ],
         dmDelay: 25,
         messageDelay: 2,
         blacklistedWords: [
            'bot',
            'test',
            'ban'
         ],
         whitelistOnly: false,
         whitelistedWords: [
            'nitro'
         ],
         blacklistedServers: [
            ''
         ],
         whitelistServersOnly: false,
         whitelistedServers: [
            ''
         ]
      },
      invite: {
         enabled: false,
         delay: {
            min: 10,
            max: 20
         },
         members: {
            min: 1500,
            max: 50000
         },
         max: 10,
         cooldown: 6,
         queue: true,
         onlyAlts: true
      },
      webhook: {
         url: '',
         enabled: {
            codeInvalid: false,
            codeAlreadyRedeemed: false,
            codeSuccess: true,
            giveawayEntered: true,
            giveawayWin: true,
            inviteJoin: false,
            inviteFail: false
         },
         mentionEveryone: {
            codeInvalid: false,
            codeAlreadyRedeemed: false,
            codeSuccess: true,
            giveawayEntered: false,
            giveawayWin: true,
            inviteJoin: false,
            inviteFail: false
         }
      }
   },
   cooldown: (type, max, hours) => `Cooldown hit after ${max} ${type}s were sniped. Pausing the ${type} sniper for ${hours} hours.`,
   xSuperProperties: 'eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRGlzY29yZCBDbGllbnQiLCJyZWxlYXNlX2NoYW5uZWwiOiJjYW5hcnkiLCJjbGllbnRfdmVyc2lvbiI6IjEuMC4yMSIsIm9zX3ZlcnNpb24iOiIxMC4wLjE5MDQyIiwib3NfYXJjaCI6Ing2NCIsInN5c3RlbV9sb2NhbGUiOiJlbi1VUyIsImNsaWVudF9idWlsZF9udW1iZXIiOjc1NjU3LCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==',
   xContextProperties: 'eyJsb2NhdGlvbiI6Ikludml0ZSBCdXR0b24gRW1iZWQiLCJsb2NhdGlvbl9ndWlsZF9pZCI6bnVsbCwibG9jYXRpb25fY2hhbm5lbF9pZCI6IjgwNzgyMTYwMDM1ODc5MzI1NiIsImxvY2F0aW9uX2NoYW5uZWxfdHlwZSI6MSwibG9jYXRpb25fbWVzc2FnZV9pZCI6IjgwNzgyMTY5ODUwMTA1MDQzOSJ9',
   webhookCantReach: (e) => `Unable to reach your webhook - ${e}`,
   invalidConfig: 'Invalid settings, please visit the FAQ for more information: https://github.com/slow/nitro-sniper#faq. Exiting process...',
   noMode: 'No sniper mode provided in settings, exiting process...',
   invalidMode: 'Invalid mode provided, visit https://github.com/slow/nitro-sniper#default-configuration for a list of modes. Exiting process...',
   noMain: 'No main account token provided, exiting process...',
   noAlts: 'No alt tokens were provided, exiting process...',
   invalidTokens: 'All tokens provided were invalid, exiting process...',
   userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.37 Chrome/91.0.4472.106 Electron/13.1.4 Safari/537.36',
   ready: (accounts, servers) => `Sniper is running with ${accounts} ${accounts > 1 ? 'accounts' : 'account'} and ${servers} ${servers > 1 || servers == 0 ? 'servers' : 'server'}.`,
   unknownResponse: (code, location, author, end, body) => `Unknown Response | ${body} | Code: ${chalk.bold(code)} | ${location} | ${author} | ${end}`,
   bothModeNoAlts: 'No alts were able to log in, trying to use only main account.',
   bothModeNoMain: "Couldn't log into main account meaning sniping is not possible. Exiting process...",
   noPaymentMethod: 'Main token does not have a billing source, some codes will not be sniped.',
   invalidWebhookType: 'Invalid Webhook type.',
   joinedServer: (invite, server, location, author, account, time) => `${account} joined ${server} after ${time} | Invite: ${invite} | ${location} | ${author}`,
   giveawayWon: (prize, hoster, guild, channel) => `Won giveaway of ${chalk.bold(prize)} from ${hoster} in (${guild} > #${channel}).`,
   failedGiveawayReact: (prize, hoster, guild, channel, timeTook) => `Failed to react to giveaway of ${chalk.bold(prize)} from ${hoster.tag} in (${guild} > #${channel}) after ${timeTook}.`,
   reactedGiveaway: (prize, hoster, guild, channel, timeTook) => `Reacted to giveaway of ${chalk.bold(prize)} from ${hoster} in (${guild} > #${channel}) after ${timeTook}.`,
   dmHosterSuccess: (hoster, prize, server, channel, timeTook) => `DMed ${hoster} after winning ${chalk.bold(prize)} in (${server} > #${channel}) after ${timeTook}.`,
   dmHosterFail: (hoster, prize, server, channel, timeTook) => `Couldn't DM ${hoster} after winning ${chalk.bold(prize)} in (${server} > #${channel}) after ${timeTook}.`,
   paymentMethodFail: (body) => `Unable to get billing source. ${body}`,
   invalidTokenOnSnipe: (code, from, author, end) => `Invalid Token | Code: ${chalk.bold(code)} | ${from} | ${author} | ${end}`,
   phinError: (err, code, from, author, end) => `${err} | Code: ${chalk.bold(code)} | ${from} | ${author} | ${end}`,
   unknownCode: (code, from, author, end) => `Invalid Code | Code: ${chalk.bold(code)} | ${from} | ${author} | ${end}`,
   alreadyRedeemedCode: (code, from, author, end) => `Already Redeemed | Code: ${chalk.bold(code)} | ${from} | ${author} | ${end}`,
   snipedCode: (code, type, from, author, end) => `Success | Code: ${chalk.bold(code)} | ${type} | ${from} | ${author} | ${end}`,
   duplicateFound: (code, location, author) => `Avoiding Duplicate | Code: ${chalk.bold(code)} | ${location} | ${author}`,
   webhookTypes: ['codeInvalid', 'codeAlreadyRedeemed', 'codeSuccess', 'giveawayEntered', 'giveawayWin', 'inviteJoin', 'inviteFail'],
   inviteFail: (invite, server, location, error, author, account, time) => `${account} failed to join ${server} after ${time} | ${error} | Invite: ${invite} | ${location} | ${author}`,
   fields: {
      codeFail: (time, code, location) => [
         { key: 'Time Taken', value: time },
         { key: 'Code', value: code },
         { key: 'Location', value: location },
      ],
      codeSuccess: (time, type, code, location) => [
         { key: 'Time Taken', value: time, },
         { key: 'Type', value: type },
         { key: 'Code', value: code },
         { key: 'Location', value: location },
      ],
      giveawayEntered: (server, channel, timeTook, prize) => [
         { key: 'Location', value: `${server} > #${channel}` },
         { key: 'Prize', value: prize },
         { key: 'Time Waited', value: timeTook }
      ],
      giveawayWin: (server, channel, prize) => [
         { key: 'Location', value: `${server} > #${channel}` },
         { key: 'Prize', value: prize },
      ],
      inviteJoin: (location, invite, server, timeTook) => [
         { key: 'Location', value: location },
         { key: 'Server Joined', value: server },
         { key: 'Invite Used', value: invite },
         { key: 'Time Waited', value: timeTook }
      ],
      inviteFail: (location, error, invite, server, timeTook) => [
         { key: 'Location', value: location },
         { key: 'Server', value: server },
         { key: 'Invite Used', value: invite },
         { key: 'Time Waited', value: timeTook },
         { key: 'Error', value: error }
      ]
   },
   titles: {
      codeInvalid: 'Invalid Code',
      codeAlreadyRedeemed: 'Already Redeemed Code',
      codeSuccess: 'Nitro Sniped',
      giveawayEntered: 'Giveaway Entered',
      giveawayWin: 'Giveaway Won',
      inviteJoin: 'Joined Server',
      inviteFail: 'Invite Snipe Failed'
   },
   colors: {
      error: '#FF0000',
      success: '#41FC9F',
      warn: '#FFF000'
   },
   paymentSourceURL: 'https://discord.com/api/v8/users/@me/billing/payment-sources',
   redeemCodeURL: (code) => `https://discord.com/api/v8/entitlements/gift-codes/${code}/redeem`,
   inviteFetchURL: (invite) => `https://discord.com/api/v8/invites/${encodeURIComponent(invite)}?with_counts=true`,
};
