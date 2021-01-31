
module.exports = {
   randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
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
