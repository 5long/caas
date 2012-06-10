#!/usr/bin/env node

var express = require("express")
  , app = express.createServer()
  , caas = require("./lib")
  , clipper = caas.clipper.xsel
  , argv = require("optimist")
            .usage('Usage: $0 [OPTIONS ...]')
            .options('p', {
                alias: 'port'
              , default: 2547
              , desc: 'The port to bind'
              })
            .options('H', {
                alias: 'host'
              , desc: 'Bind to specific host'
              , default: '0.0.0.0'
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

app.use(caas.create(clipper))
app.listen(argv.port, argv.host)
