const express = require('express');

module.exports = class Dashboard {
  constructor() {
    this.server = null;
    this.port = null;
    this.listener = null;

    this.start();
  }

  start() {
    this.server = express();
    this.attachListeners();

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
