module.exports = input => {
  return input
         .split("\n")
         .map(word => {
           if(!!word.match(/[aeiou]/g)
               && word.match(/[aeiou]/g).length > 2
               && !!word.match(/([a-zA-Z])\1{1,}/g)
               && !word.match(/(ab)|(cd)|(pq)|(xy)/g)) {
             return word
           }})
         .filter(word => word).length
}
