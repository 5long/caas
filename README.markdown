# CAAS

Clipboard as a service.

If you're using stuff like [Vagrant] this might be useful.

## Installation

[xsel] is required in `$PATH`. Then:

    $ npm i caas -g

## Usage

### Standalone Service

1. Launch the `caas` bin. It'll bind port 2547.

2. Access clipboard via `GET` and `PUT`:

       # Copy:
       $ echo copy this | curl -X PUT --data-binary http://localhost:2547
       # Paste:
       $ curl http://localhost:2547

#### More CLI options

    -p, --port  The port to bind       [default: 2547]
    -H, --host  Bind to specific host  [default: "0.0.0.0"]
    -h, --help  Call for help

### Embeded in your app

You can basically use it as an [Express] app. `npm i caas` locally and:

    // WARNING: codez not tested.
    var caas = require("caas")
      , clipApp = caas.create(caas.clipper.xsel)

    // Later(still not tested)
    yourExpressOrConnectApp.use("/klip/", clipApp)

### Later

* Basic auth for security
* Support Mac via `pbcopy` and `pbpaste`
* Figure out how to handle `xclip`. It's got better manpage than `xsel` so
  it deserves some love.

Patches welcome for sure.

## LICENSE

[http://sam.zoy.org/wtfpl/](http://sam.zoy.org/wtfpl/)

[xsel]: http://www.vergenet.net/~conrad/software/xsel/
[Vagrant]: http://vagrantup.com/
[Express]: http://expressjs.com/
