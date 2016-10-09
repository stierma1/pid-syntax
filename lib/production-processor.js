var path = require("path");
var statementsProc = require("./statment-processor");


module.exports = function(inputString){
  var participants = {};
  var splits = inputString.split("\n");

  splits.map(function(val){
    return statementsProc(val);
  }).filter(function(val){
    return val;
  }).filter(function(val){
    if(val.name === "participant"){
      participants[path.basename(val.participant)] = {
        name: path.basename(val.participant),
        path: path.dirname(val.participant),
        predicates: []
      }
      return false;
    }
    return true;
  })
  .filter(function(val){
    participants[val.participant].predicates.push(val.name);
    return false;
  });

  return participants;
}
