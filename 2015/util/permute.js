module.exports = function permute(res, item, key, arr) {
  return res.concat(
    arr.length > 1 && arr.slice(0, key)
    .concat(arr.slice(key + 1))
    .reduce(permute, [])
    .map(function(perm) {
      return [item].concat(perm);
    }) || item)
}
