var express = require("express")
  , pump = require("util").pump

exports.create = function(Clipper) {
  var app = express.createServer()

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

  return app
}

function end(res) {
  return function() {
    res.end()
  }
}
