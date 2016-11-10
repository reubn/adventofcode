module.exports = input => {
  return input
         .split("\n")
         .map(word => {
           if(!!word.match(/(.{2})(?:.*)\1/)
               && word.match(/(.).\1/g)) {
             return word
           }})
         .filter(word => word).length
}
