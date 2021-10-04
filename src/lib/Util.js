
module.exports = class Util {
   static randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
   }

   static sleep(t) {
      return new Promise((f) => setTimeout(f, t));
   }

   static cleanTokens(tokens = settings.tokens.alts) {
      // Set => Cleans duplicates => Revert back to array
      const cleaned = [...new Set(tokens)];

      // Remove main token from alts if it exists
      if (cleaned.includes(settings.tokens.main)) {
         const index = cleaned.indexOf(settings.tokens.main);

         cleaned.splice(index, 1);
      }

      // Clean empty strings & return

      return cleaned.filter(t => t !== '');
   }
};

String.prototype.containsAny = function (arr) {
   for (var i = 0; i < arr.length; i++) {
      if (this.indexOf(arr[i]) > -1) {
         return true;
      }
   }
   return false;
};
