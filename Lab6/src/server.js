const fs = require("fs");
const http = require("http");
const url = require("url");
const os = require("os");
const moment = require("moment");
const oneLinerJoke = require("one-liner-joke");
const util = require("util");
const readFile = util.promisify(fs.readFile);

async function readFileData(path) {
  const data = await fs.readFile(path);
  return new Buffer(data);
}

http
  .createServer(function (req, res) {
    var uri = url.parse(req.url).pathname;

    res.writeHead(200, { "Content-Type": "text/html" });
    switch (uri) {
      case "/ping":
        res.write("pong");
        break;
      case "/datetime":
        res.write(moment().format());
        break;
      case "/cpus":
        res.write(JSON.stringify(os.cpus()));
        break;
      case "/env":
        res.write(JSON.stringify(process.env));
        break;
      case "/joke":
        res.write(
          oneLinerJoke
            .getRandomJoke({
              exclude_tags: ["sex", "dirty", "racist", "marriage"],
            })
            .body.toString()
        );
        break;
      case "/somedata":
        const text = fs.readFileSync("assets/data.json", "utf8");
        res.write(text);
        break;
      default:
        res.write(
          `<h2>Available endpoints</h2> 
          <br><a href="/ping">/ping</a>
          <br><a href="/datetime">/datetime</a>
          <br><a href="/cpus">/cpus</a>
          <br><a href="/env">/env</a>
          <br><a href="/joke">/joke</a>
          <br><a href="/somedata">/somedata</a>`
        );
        break;
    }

    res.end();
  })
  .listen(8088);
