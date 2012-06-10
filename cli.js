#!/usr/bin/env node

var express = require("express")
  , app = express.createServer()
  , spawn = require("child_process").spawn
  , pump = require("util").pump

app.get('/', function(req, res) {
  var clipper = createPasteProc()
  res.writeHead(200, {
    "Content-Type": "application/octet-stream"
  })
  clipper.on("exit", end(res))
  pump(clipper.stdout, res, end(res))
})

app.put('/', function(req, res) {
  var clipper = createCopyProc()
  res.writeHead(201)
  clipper.on("exit", end(res))
  pump(req, clipper.stdin, end(res))
})

function end(res) {
  return function() {
    res.end()
  }
}

function createCopyProc() {
  return spawn('xsel', ["-bi"])
}

function createPasteProc() {
  return spawn('xsel', ["-bo"])
}

app.listen(2547)
