#!/usr/local/bin/node
// Import API authentication & functions
const auth = require("../spotifyAuthentication");
const readlineSync = require("readline-sync");

// Method specific constants
const endpoint = "/v1/me/player/volume";
const method = "PUT";
let level = readlineSync.question(
  "Volume controls (+/-) or enter desired volume and hit [RETURN]: "
);
let volumeParam = `?volume_percent=${level}`;
let url = auth.apiUri + endpoint + volumeParam;

auth.send(url, method);
console.log(auth.chalk.green(`${level}%`));
