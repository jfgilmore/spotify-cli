// const chalk = require("chalk");
const fetch  = require("node-fetch");
const auth = {
  //require("spotifyAuthentication");
	apiURI: "https://api.spotify.com", // Import from auth method
	token:
  "",
};

// Method specific constants
const command = "/v1/me/player/play";
const requestType = "PUT";
const url = auth.apiURI + command;
const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + auth.token }
// const headers = new Headers(meta)
console.log(headers);
const init = { method: requestType, headers: headers };

const send = {
	command: async (url, init) => {
		try {
			const response = await fetch(url, init);
      const status = console.log(response); // .status
      // if("204 No Content") throw "Nothing to play :("
			console.log(status);
		} catch (error) {

			console.log(error);
		}
	},
};


const play = () => {
	send.command(url, init);
};

play(auth.accessToken);
