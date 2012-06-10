#!/usr/bin/env node

var express = require("express")
  , app = express.createServer()
  , pump = require("util").pump
  , Clipper = require("./lib/clipper/xsel")

if (!Clipper.isAvailableSync()) {
  console.error("No available clipboard bin.")
  process.exit(1)
}

app.get('/', function(req, res) {
  var clipper = Clipper.createPasteProc()
  res.writeHead(200, {
    "Content-Type": "application/octet-stream"
  })
  clipper.on("exit", end(res))
  pump(clipper.stdout, res, end(res))
})

app.put('/', function(req, res) {
  var clipper = Clipper.createCopyProc()
  res.writeHead(201)
  clipper.on("exit", end(res))
  pump(req, clipper.stdin, end(res))
})

function end(res) {
  return function() {
    res.end()
  }
}

app.listen(2547)
