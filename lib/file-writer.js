var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp")

module.exports = function(fileProduction){
  mkdirp.sync(path.join(process.cwd(), fileProduction.dir));
  fs.writeFileSync(path.join(process.cwd(), fileProduction.filePath), fileProduction.content);
  mkdirp.sync(path.join(process.cwd(), "tests", fileProduction.dir));
  fs.writeFileSync(path.join(process.cwd(), fileProduction.testPath), fileProduction.testContent);
  mkdirp.sync(path.join(process.cwd(), "tests", "mock-messages", fileProduction.dir));
  fs.writeFileSync(path.join(process.cwd(), fileProduction.mockMessagesPath), fileProduction.mockMessagesContent);
}
