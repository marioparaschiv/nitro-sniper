const express = require('express');
const phin = require('phin');

module.exports = class Dashboard {
  constructor() {
    this.server = null;
    this.port = null;
    this.listener = null;

    const { REPL_SLUG, REPL_OWNER } = process.env;

    if (REPL_SLUG && REPL_OWNER) {
      this.start();
    }
  }

  keepAlive() {
    const { REPL_SLUG, REPL_OWNER } = process.env;
    if (!REPL_OWNER || !REPL_SLUG) return;

    const url = `https://${REPL_SLUG}.${REPL_OWNER}.repl.co/`;
    setInterval(async () => {
      const res = await phin({ url, method: 'GET' });
      if (res.statusCode == 200) logger.debug(`Pinged URL ${url}`);
    }, 1000);
  }

  start() {
    this.server = express();
    this.attachListeners();
    this.keepAlive();

    // To be continued...
  }

  attachListeners() {
    this.listener = this.server.listen(process.env.PORT || 3000, () => {
      this.port = this.listener.address().port;
      logger.debug(`Pinger listening on ${this.port}.`);
    });

    this.server.all('/', (req, res) => {
      res.send('Your bot is alive!');
    });
  }
};