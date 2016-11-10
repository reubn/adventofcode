module.exports = function total(node){
  if(Object.prototype.toString.call(node) === "[object Array]") return node.map(total).reduce((a, b) => a + b, 0)
  if(Object.prototype.toString.call(node) === "[object Object]") {
    if(Object.keys(node).map(key => node[key]).indexOf("red") === -1) return Object.keys(node).map(key => node[key]).map(total).reduce((a, b) => a + b, 0)
    return 0
  }
  return parseInt(node, 10) || 0
}
