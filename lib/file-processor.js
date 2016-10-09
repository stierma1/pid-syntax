var path = require("path");

function transform(participant){
  switch(participant.predicates[0]){
    case "no-receive": return {
      filePath:  "./" + path.join(participant.path, participant.name) + ".js",
      dir: participant.path,
      content: noReceive,
      testPath: "./" + path.join("tests",participant.path, participant.name) + "Spec.js",
      testContent: testMock(participant.name, "./" + path.join(participant.path, participant.name) + ".js"),
      mockMessagesPath: "./" + path.join("tests", "mock-messages",participant.path, participant.name) + ".js",
      mockMessagesContent: mockMessages,
      name: participant.name,
    }
    case "receive": return {
      filePath:  "./" + path.join(participant.path, participant.name) + ".js",
      dir: participant.path,
      content: receive,
      testPath: "./" + path.join("tests",participant.path, participant.name) + "Spec.js",
      testContent: testMock(participant.name, "./" + path.join(participant.path, participant.name) + ".js"),
      mockMessagesPath: "./" + path.join("tests", "mock-messages",participant.path, participant.name) + ".js",
      mockMessagesContent: mockMessages,
      name: participant.name,
    }
    case "receive-recurse": return {
      filePath:  "./" + path.join(participant.path, participant.name) + ".js",
      dir: participant.path,
      content: receiveRecurse,
      testPath: "./" + path.join("tests", participant.path, participant.name) + "Spec.js",
      testContent: testMock(participant.name, "./" + path.join(participant.path, participant.name) + ".js"),
      mockMessagesPath: "./" + path.join("tests", "mock-messages",participant.path, participant.name) + ".js",
      mockMessagesContent: mockMessages,
      name: participant.name,
    }
    default: return {
      filePath:  "./" + path.join(participant.path, participant.name) + ".js",
      dir: participant.path,
      content: noReceive,
      testPath: "./" + path.join("tests",participant.path, participant.name) + "Spec.js",
      testContent: testMock(participant.name, "./" + path.join(participant.path, participant.name) + ".js"),
      mockMessagesPath: "./" + path.join("tests", "mock-messages",participant.path, participant.name) + ".js",
      mockMessagesContent: mockMessages,
      name: participant.name,
    }
  }
}

module.exports = function(participants){
  var fileProds = {}
  for(var i in participants){
    fileProds[i] = transform(participants[i]);
  }
  return fileProds
}

var receive = `
var System = require("pid-system");

module.exports.main = async function main(){
  var message = await System.receive(this);
}
`

var receiveRecurse = `
var System = require("pid-system");

module.exports.main = async function main(){
  var message = await System.receive(this);

  System.recurse(this, "main");
}
`

var noReceive = `
var System = require("pid-system");

module.exports.main = async function main(){

}
`

var testMock = function(name, pathToFile){
  return `
var chai = require("chai");
chai.expect();
var System = require("pid-system");
var path = require("path");
var testModulePath = path.join(process.cwd(), "${pathToFile}");
var mockMessages = path.join(process.cwd(), "tests", "mock-messages", "${pathToFile}");

function mockClosure function(cleanUpPids){
  return function (options){
    return System.spawn(testModulePath, "main", options).then(function(pid){
      cleanUpPids.push(pid);
      return pid;
    });
  }
}

describe("#${name}", async function(){
  var cleanUpPids = [];
  var mock = mockClosure(cleanUpPids);

  before(function(){
    cleanUpPids.map(function(pid){
      System.exit(pid);
    });
    cleanUpPids = [];
  });

});
`
}

var mockMessages = `module.exports = {

}`
