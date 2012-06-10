#!/usr/bin/env node

var express = require("express")
  , app = express.createServer()
  , clipper = require("./lib/clipper/xsel")
  , handler = require("./lib/handler").create
  , argv = require("optimist")
            .usage('Usage: $0 [OPTIONS ...]')
            .options('p', {
                alias: 'port'
              , default: 2547
              , desc: 'The port to bind'
              })
            .options('h', {
                alias: 'help'
              , desc: 'Call for help'
              })
            .argv

if (argv.help) {
  require("optimist").showHelp()
  process.exit(1)
}

if (!clipper.isAvailableSync()) {
  console.error("xsel is not found")
  process.exit(2)
}

app.use(handler(clipper))
app.listen(argv.port)
