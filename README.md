<h1 align="center">Nitro/Giveaway/Invite Sniper</h1>

<p align="center">
  <a href="#"><img src="https://www.codefactor.io/repository/github/slow/nitro-sniper/badge" /></a>
  <a href="https://github.com/slow/nitro-sniper/issues"><img src="https://img.shields.io/github/issues/slow/nitro-sniper?style=flat" /></a>
  <a href="https://github.com/slow/nitro-sniper/stargazers"><img src="https://img.shields.io/github/stars/slow/nitro-sniper?style=flat" /></a>
  <a href="https://paypal.me/eternal404"><img src="https://img.shields.io/badge/donate-paypal-blue"></a>
  <a href=" https://discord.gg/shnvz5ryAt"><img src="https://img.shields.io/discord/875126204758360094"></a>
</p>

<p align="center">
   A lightweight, fast and efficient discord nitro sniper, giveaway sniper & invite sniper. <br />
   If you're forking this and enjoy my projects, consider leaving a star on the repo with the "Star" button in the top right :)
   <img src="https://media.wtf/11603354" />
</p>

# Features

- Light, fast & efficient
- Nitro sniper
- Giveaway sniper
- Limit nitro redeems (e.g. 2 codes / 24 hours)
- Custom giveaway reaction delay (randomized between **delay** and (**delay** \* 1.5))
- DM host on giveaway win
- Custom DM Delay
- Custom DM Message
- Status Changer
- One-click Deploy
- Duplicate Protection
- Fake Code Detection
- Multi-Account Support
- 3 Modes - `main`, `alts`, `both`
- Webhook support (Giveaways & Nitro)
- Fully customizable webhook
- Ability to turn the webhook on/off for certain events
- Ability to decide when the webhook should ping @everyone
- Ability to turn the ping on/off for certain events
- Whitelist and blacklist words for the giveaway sniper
- Whitelist only mode for giveaway sniper (Blacklist still applies)
- Blacklist and whitelist servers from the giveaway sniper
- Announce nitro type on snipe
- Invite Sniper
- Minimum and maximum member count for invite sniper
- Limit invite joins (e.g. 10 invites / 6 hours)
- Minimum and maximum delay before sniping invite

## Installation

#### Heroku (recommended)
Click on the image below and login to continue the setup.<br>

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/heroku-hate-club/XLFU8TWfYyzba/tree/main)  

Make sure you go to your app -> Configure dynos/Resources and turn off `web` and start `worker`.<br>

You can then see logs by clicking on `More` (top right) and then `View logs`.<br>

#### Local
- Make sure [Node v14+](https://nodejs.org/en/) is installed on your system and open a command prompt/terminal.
- Run `git clone https://github.com/slow/nitro-sniper nitro-sniper`
- Run `cd nitro-sniper`
- Run `npm install`
- Edit the .env file.
- Run `node .`

## Default Configuration

```js
{
   tokens: {
      // Main Token
      main: 'Nz...',
      // Alt Tokens
      alts: [
         'Nz...',
         'Nz...'
      ],
   },
   // The mode to run the sniper in. Options: main (only main account), alts (only alts), both
   mode: 'both',
   /*
      The status the accounts should be on.
      Options: online, dnd, idle, offline, default
      default means the status will not be modified.
   */
   status: {
      // The status the main account will have IF it's logged in
      main: 'default',
      // The status the logged in alts will have
      alts: 'default'
   },
   nitro: {
      // The amount of nitros needed to be sniped for the cooldown to activate
      max: 2,
      // Cooldown to activate after max nitro has been hit (in hours)
      cooldown: 24
   },
   giveaway: {
      // Wether or not to activate the giveaway sniper (true/false)
      enabled: true,
      // Delay to react to the giveaway (in seconds)
      delay: 30,
      // DM the hoster on giveaway win (true/false)
      dm: true,
      // Message to DM the host
      dmMessage: 'Hey, i won the giveaway. Could i redeem my prize?',
      // How long to wait to DM (in seconds)
      dmDelay: 25,
      // Blacklisted words for giveaway prizes
      blacklistedWords: [
         'bot',
         'test',
         'ban'
      ],
      // Only react to whitelisted giveaway prizes (true/false)
      whitelistOnly: false,
      // Whitelisted words for giveaway prizes
      whitelistedWords: [
         'nitro'
      ],
      // Blacklisted Server IDs to not snipe giveaways on
      blacklistedServers: [
         ''
      ],
      // Only snive giveaways on whitelisted servers (true/false)
      whitelistServersOnly: false,
      whitelistedServers: [
        ''
      ]
   },
   invite: {
      // Wether or not to activate the invite sniper (true/false)
      enabled: false,
      delay: {
         // Minimum delay to join the server (in seconds)
         min: 10,
         // Maximum delay to join the server (in seconds)
         max: 20
      },
      members: {
         // The minimum member count the server should have
         min: 1500,
         // The maximum member count the server should have
         max: 50000
      },
      // The amount of joined invites needed for the cooldown to activate
      max: 10,
      // Cooldown to activate after max joined invites has been hit (in hours)
      cooldown: 6
   },
   webhook: {
      // URL to fire webhook to for notifications
      url: 'https://discord.com/api/webhooks/.../...',
      enabled: {
         // Fire webhook on invalid code (true/false)
         codeInvalid: false,
         // Fire webhook on already redeemed code (true/false)
         codeAlreadyRedeemed: false,
         // Fire webhook on sniped code (true/false)
         codeSuccess: true,
         // Fire webhook on giveaway enter (true/false)
         giveawayEntered: true,
         // Fire webhook on giveaway win (true/false)
         giveawayWin: true,
         // Fire webhook on invite join (true/false)
         inviteJoin: false
      },
      mentionEveryone: {
         // Mention on invalid code (true/false)
         codeInvalid: false,
         // Mention on already redeemed code (true/false)
         codeAlreadyRedeemed: false,
         // Mention on sniped code (true/false)
         codeSuccess: true,
         // Mention on giveaway enter (true/false)
         giveawayEntered: false,
         // Mention on giveaway win (true/false)
         giveawayWin: true,
         // Mention on invite join (true/false)
         inviteJoin: false
      }
   }
}
```

#### How to obtain your token

https://github.com/Tyrrrz/DiscordChatExporter/wiki/Obtaining-Token-and-Channel-IDs#how-to-get-a-user-token

# Tips

- Try to get a low latency to discord servers as there can be competition with other snipers.
- This is technically a self-bot: mentioning this in a discord chat is enough to make your account reportable to Trust & Safety.
- Running more than one instance or different snipers is an easy way to get your account deactivated.
- Before using, consider the moral implications of stealing gifts from communities you have nothing to do with.
