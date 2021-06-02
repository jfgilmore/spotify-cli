#!/usr/local/bin/node
const spotify = require("../index");

let option = process.argv.slice(2)[0];

const helpText =
  "\nUSEAGE: sr [OPTION]\n\n[OPTION]          ACTION\n\
track t -t 1      Repeat current track\n\
a all context     Repeat all tracks in current playlist\n\
off 0             Turn off repeat\n\
h -h -help help   Your looking at it 🙂\n";

switch (option) {
  case "track":
  case "context":
  case "off":
    spotify.repeat(option);
    break;
  case "t":
  case "-t":
  case 1:
    spotify.repeat("track");
    break;
  case "a":
  case "all":
    spotify.repeat("context");
    break;
  case "-h":
  case "-help":
  case "help":
  case "h":
    console.log(helpText);
    break;
  default:
    spotify.repeat();
    break;
}
