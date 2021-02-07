const fs = require('fs');

// Gather everything from current dir and export it
module.exports = (() => {
   let files = {};

   fs.readdirSync(__dirname)
      .filter(file => file !== 'index.js')
      .map(fn => files[fn.replace('.js', '')] = require(`${__dirname}/${fn}`));

   return files;
})();