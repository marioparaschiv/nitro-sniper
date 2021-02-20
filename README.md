<h1 align="center">Sniper</h1>

<p align="center">
  <img src="https://www.codefactor.io/repository/github/slow/nitro-sniper/badge" /> 
  <img src="https://img.shields.io/github/issues/slow/nitro-sniper?style=flat" />
  <img src="https://img.shields.io/github/stars/slow/nitro-sniper?style=flat" />
</p>

<p align="center">
   A lightweight, fast and efficient discord nitro sniper, giveaway sniper & invite sniper. 
   <img src="https://media.wtf/11603354" />
</p>

# Features
- Light, fast & efficient
- Nitro sniper
- Giveaway sniper
- Limit nitro redeems (e.g. 2 codes / 24 hours)
- Custom giveaway reaction delay (randomized between **delay** and (**delay** * 1.5))
- DM host on giveaway win
- Custom DM Delay
- Custom DM Message
- One-click Deploy
- Duplicate Protection
- Fake Code Detection
- Multi-Account Support
- 3 Modes - `main`, `alts`, `both`
- Webhook support (Giveaways & Nitro)
- Fully customizable webhook
- Ability to turn the webhook on/off for certain events
- @everyone ping on webhook message
- Ability to turn the ping on/off for certain events
- Whitelist words for the giveaway sniper
- Blacklist words for the giveaway sniper
- Whitelisted words only mode for giveaway sniper (Blacklist still applies)
- Blacklist servers from the giveaway sniper
- Announce nitro type on snipe
- Invite Sniper
- Minimum member count for invite sniper
- Maximum member count for invite sniper
- Limit invite joins (e.g. 10 invites / 6 hours)
- Minimum delay before sniping invite
- Maximum delay before sniping invite

## Installation
https://github.com/slow/nitro-sniper/wiki/Installation

## Default Configuration
```js
{
   "tokens": {
      "main": "Nz...", // Main Token
      "alts": [
         "Nz..." // Alt Tokens
      ],
   },
   "mode": "both", // The mode to run the sniper in. Options: main (only main account), alts (only alts), both
   "nitro": {
      "max": 2, // The amount of nitros needed to be sniped for the cooldown to activate
      "cooldown": 24 // Cooldown to activate after max nitro has been hit (in hours)
   },
   "giveaway": {
      "enabled": true, // Wether or not to activate the giveaway sniper (true/false)
      "delay": 30, // Delay to react to the giveaway (in seconds)
      "dm": true, // DM the hoster on giveaway win (true/false)
      "dmMessage": "Hey, i won the giveaway. Could i redeem my prize?", // Message to DM the host
      "dmDelay": 25, // How long to wait to DM (in seconds)
      "blacklistedWords": [ // Blacklisted words for giveaway prizes
         "bot",
         "test",
         "ban"
      ],
      "whitelistOnly": false, // Only react to whitelisted giveaway prizes (true/false)
      "whitelistedWords": [ // Whitelisted words for giveaway prizes
         "nitro"
      ],
      "blacklistedServers": [ // Blacklisted Server IDs to not snipe giveaways on
         ""
      ]
   },
   "invite": {
      "enabled": false, // Wether or not to activate the invite sniper (true/false)
      "delay": {
         "min": 10, // Minimum delay to join the server (in seconds)
         "max": 20 // Maximum delay to join the server (in seconds)
      },
      "members": {
         "min": 1500, // The minimum member count the server should have
         "max": 50000 // The maximum member count the server should have
      },
      "max": 10, // The amount of joined invites needed for the cooldown to activate
      "cooldown": 6 // Cooldown to activate after max joined invites has been hit (in hours)
   },
   "webhook": { 
      "url": "https://discord.com/api/webhooks/.../...", // URL to fire webhook to for notifications
      "enabled": {
         "codeInvalid": false, // Fire webhook on invalid code (true/false)
         "codeAlreadyRedeemed": false, // Fire webhook on already redeemed code (true/false)
         "codeSuccess": true, // Fire webhook on sniped code (true/false)
         "giveawayEntered": true, // Fire webhook on giveaway enter (true/false)
         "giveawayWin": true, // Fire webhook on giveaway win (true/false)
         "inviteJoin": false // Fire webhook on invite join (true/false)
      }, 
      "mentionEveryone": { 
         "codeInvalid": false, // Mention on invalid code (true/false)
         "codeAlreadyRedeemed": false, // Mention on already redeemed code (true/false)
         "codeSuccess": true, // Mention on sniped code (true/false)
         "giveawayEntered": false, // Mention on giveaway enter (true/false)
         "giveawayWin": true, // Mention on giveaway win (true/false)
         "inviteJoin": false // Mention on invite join (true/false)
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

> If you like my project, please consider starring the repo :)
