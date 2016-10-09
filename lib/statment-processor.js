
var predicates = [
  {
    name: "no-receive",
    match: /^-<([0-9a-zA-Z\-\_]+)\n?$/
  },
  {
    name: "receive",
    match: /^->([0-9a-zA-Z\-\_]+)\n?$/
  },
  {
    name: "receive-recurse",
    match: /^n->([0-9a-zA-Z\-\_]+)\n?$/
  },
  {
    name: "participant",
    match: /^([\/0-9a-zA-Z\-\_\\]+)\n?$/
  }
]

module.exports = function(statmentString){
  var predicate = predicates.reduce(function(red, val){
    if(red){
      return red;
    }
    var matched = val.match.exec(statmentString);
    if(matched){
      return {
        name:val.name,
        participant:matched[1]
      }
    }
    return red;
  }, false)

  return predicate;
}
