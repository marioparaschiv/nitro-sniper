<h1 align="center">Nitro/Giveaway/Invite Sniper</h1>

<p align="center">
  <a href="#"><img src="https://www.codefactor.io/repository/github/slow/nitro-sniper/badge" /></a>
  <a href="https://github.com/slow/nitro-sniper/issues"><img src="https://img.shields.io/github/issues/slow/nitro-sniper?style=flat" /></a>
  <a href="https://github.com/slow/nitro-sniper/stargazers"><img src="https://img.shields.io/github/stars/slow/nitro-sniper?style=flat" /></a>
  <a href="https://paypal.me/eternal404"><img src="https://img.shields.io/badge/donate-paypal-blue"></a>
</p>

<p align="center">
   A lightweight, fast and efficient discord nitro sniper, giveaway sniper & invite sniper. <br />
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

#### Repl.it (recommended)

- Visit the [dashboard](https://replit.com/~)
- Click the `New Repl` button as seen below.<br/>
   ![Image](https://media.wtf/21365449)

- Click the `Import from GitHub` tab<br/>
   ![Image](https://media.wtf/63105027)

- Paste the following inside the box:<br/>
   `https://github.com/slow/nitro-sniper`

- After the process completes, visit the environment variables tab.<br/>
   ![Image](https://media.wtf/52361997)

- Set the key as `settings` and paste [this](#default-configuration) inside the value text box; proceed to edit your configuration.

- After you are done editing your configuration, click `Add new secret`. (You can go back to that tab whenever to change your settings)<br/>
   ![Image](https://media.wtf/49612563)

- You can now use <kbd>CTRL</kbd> + <kbd>ENTER</kbd> or  <kbd>CMD</kbd> + <kbd>ENTER</kbd> to start the sniper or by using the `Run` button at the top of the page.

- Tips:
   - To see the output of the sniper, go to the `Console` tab. <br />
   ![Image](https://media.wtf/37329719)
   - If you wish to update the sniper when a new version is released you can run `git pull` in the `Shell` tab as seen in this screenshot: <br />
   ![Image](https://media.wtf/81080054)

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
      // Main Token (ex: Nz...)
      main: '',
      // Alt Tokens (ex: Nz...)
      alts: [
         '',
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
      // Only snipe giveaways on whitelisted servers (true/false)
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
      cooldown: 6,
      // Wether to allow the main token to snipe invites (true/false)
      onlyAlts: true
   },
   webhook: {
      // URL to fire webhook to for notifications (ex: https://discord.com/api/webhooks/.../...)
      url: '',
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
         inviteJoin: false,
         // Fire webhook on failure of sniping invite (true/false)
         inviteFail: false
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
         inviteJoin: false,
         // Mention on failure of sniping invite (true/false)
         inviteFail: false
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

> If you enjoy my projects, please consider leaving a :star: in the top right on the repo :)
