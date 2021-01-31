<h1 align="center">Sniper</h1>

<p align="center">
  <img src="https://www.codefactor.io/repository/github/slow/nitro-sniper/badge" /> 
  <img src="https://img.shields.io/github/issues/slow/nitro-sniper?style=flat" />
  <img src="https://img.shields.io/github/stars/slow/nitro-sniper?style=flat" />
</p>

<p align="center">
   A lightweight, fast and efficient discord nitro sniper & giveaway sniper.
   <img src="https://media.wtf/66492755" />
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
- Option to only fire webhook when successful
- Ping on webhook message (can be set to success only)
- Whitelist words for the giveaway sniper
- Blacklist words for the giveaway sniper
- Whitelisted words only mode for giveaway sniper (Blacklist still applies)
- Blacklist servers from the giveaway sniper
- Announce nitro type on snipe

## Installation
#### Heroku 
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/slow/nitro-sniper/tree/main)

 - Resources > Turn off the `web` toggle and turn on the `worker` toggle.
 - `More` dropdown > View Logs

#### Local

- Make sure [Node](https://nodejs.org/en/) is installed on your system and open a command prompt/terminal.
- Run `cd %userprofile%\Downloads`
- Run `git clone https://github.com/slow/nitro-sniper nitro-sniper`
- Run `cd nitro-sniper`
- Run `npm install`
- Edit `.env` with the configuration you wish to use 
- Run `node .`

## Default Configuration
```js
{
   "alts": [
      "Nz..." // Alt Tokens
   ],
   "main": "Nz...", // Main Token
   "mode": "both", // The mode to run the sniper in. Options: main (only main account), alts (only alts), both
   "nitro": {
      "max": 2, // The amount of nitros needed to be sniped for the cooldown to activate
      "cooldown": 24 // Cooldown to activate after max nitro has been hit (in hours)
   },
   "giveaway": {
      "enabled": true, // Wether or not to activate the giveaway sniper (true/false)
      "delay": 5, // Delay to react to the giveaway (in seconds)
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
   "webhook": { 
      "url": "https://discord.com/api/webhooks/.../...", // URL to fire webhook to for notifications
      "successOnly": true, // Only fire the webhook on success (true/false)
      "mentionEveryone": { 
         "enabled": true, // Mention @everyone when the webhook is fired (true/false)
         "successOnly": true  // Only mention @everyone when successful (true/false)
      }
   }
}
```

[How to obtain your token](https://github.com/Tyrrrz/DiscordChatExporter/wiki/Obtaining-Token-and-Channel-IDs#how-to-get-a-user-token)

## Tips
- The less the latency to discord servers, the better; You could be competing with other snipers. <br>
    - High bandwidth hosting would benefit the sniper.
- There's a really high risk you might get terminated using this. <br>
    - Do not mention you have this anywhere. <br>
    - This is theoretically stealing money from discord.

 > If you like my project, please consider starring the repo :)
