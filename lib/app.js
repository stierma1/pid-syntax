var fs = require("fs");
var path = require("path");
var productionProc = require("./production-processor");
var fileProc = require("./file-processor");
var fileWriter = require("./file-writer");

module.exports = function(inputFilePath){
  var file = fs.readFileSync(inputFilePath, "utf8");
  var prods = productionProc(file);
  var files = fileProc(prods);
  for(var i in files){
    fileWriter(files[i]);
  }
}
