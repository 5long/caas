#!/usr/bin/env node

var express = require("express")
  , app = express.createServer()
  , Clipper = require("./lib/clipper/xsel")
  , handler = require("./lib/handler").create

if (!Clipper.isAvailableSync()) {
  console.error("No available clipboard bin.")
  process.exit(1)
}

app.use("/", handler(Clipper))
app.listen(2547)
