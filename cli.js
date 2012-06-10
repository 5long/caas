#!/usr/bin/env node

var express = require("express")
  , app = express.createServer()
  , clipper = require("./lib/clipper/xsel")
  , handler = require("./lib/handler").create

if (!clipper.isAvailableSync()) {
  console.error("No available clipboard bin.")
  process.exit(1)
}

app.use("/", handler(clipper))
app.listen(2547)
