const auth = require("./spotifyAuthentication");

// Method specific constants
const endpoint = "/v1/me/player/play";
const method = "PUT";
const url = auth.apiURI + endpoint;
const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + auth.token }
const init = { method: method, headers: headers };

auth.send(url, init);
