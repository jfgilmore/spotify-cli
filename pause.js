#!/usr/local/bin/node
// Import API authentication & functions
const auth = require("./spotifyAuthentication");

// Method specific constants
const endpoint = "/v1/me/player/pause";
const method = "PUT";
const url = auth.apiUri + endpoint;


auth.send(url, method);
console.log(auth.chalk.green(`Pause`));
