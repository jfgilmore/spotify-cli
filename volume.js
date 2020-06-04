#!/usr/local/bin/node
// Import API authentication & functions
const auth = require("./spotifyAuthentication");
const readlineSync = require('readline-sync');

// Method specific constants
const endpoint = "/v1/me/player/volume";
const statusEndpoint = "/v1/me/player";

let method = "GET";
let url = auth.apiUri + statusEndpoint;
let current = auth.send(url, method);
let volumeParam
let level

while (condition) {
  level = readlineSync.question('Volume controls (+/-) or enter desired volume and hit [RETURN]: ');
  if (level === '+' || level === '=') {
    current ++
  } else if (level === '-' || level === '_') {
    current --
  } else {
    current = level;
  }

  method = "PUT";
  volumeParam = `?volume_percent=${current}`
  url = auth.apiUri + endpoint + volumeParam;
  auth.send(url, method);
  console.log(auth.chalk.green(`${current}%`));
}

