var which = require("which").sync
  , spawn = require("child_process").spawn

exports.createPasteProc = function() {
  return spawn('xsel', ["-bo"])
}

exports.createCopyProc = function() {
  return spawn('xsel', ["-bi"])
}

exports.isAvailableSync = function() {
  try {
    var _ = which("xsel")
    return true
  } catch (e) {
    return false
  }
}
