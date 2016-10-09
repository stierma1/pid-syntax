#!/usr/bin/env node

var program = require("commander");
var fs = require("fs");
var path = require("path");
var app = require("../lib/app");

program.version(JSON.parse(fs.readFileSync(path.join(__dirname,"../package.json"), "utf8")).version)
  .option("-i, --inputFile [pidSyntaxFile]", "relative path to the input file")
  .parse(process.argv);

if(!program.inputFile){
  console.error("No input file found");
  process.exit(1);
}
app(path.join(process.cwd(), program.inputFile));

console.log("Done")
