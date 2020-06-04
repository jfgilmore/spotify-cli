const fetch  = import ("node-fetch");
const auth = {
	//require("spotifyAuthentication");
	apiURI: "https://api.spotify.com", // Import from auth method
	token:
		"BQCk0q2XccloJehDsnIJumiuF0Y_xXmY3MDQXSw84uei9Fo5OIDxg-a9yXuc7LNOI8dTxy5Mb7fLTts11Lw5Vz8xh7EcIxU8lurYeaJmMaEwjWaA9texJzExr1h-PuuT0u1svls8C0ePzom_70f2Vw",
};
const send = {
	command: async (url, init) => {
		try {
			const response = await fetch(url, init);
      const status = await response.status();
      // if("204 No Content") throw "Nothing to play :("
			console.log(status);
		} catch (error) {

			console.log(error);
		}
	},
};
// const chalk = require("chalk");

// Method specific constants
const command = "/v1/me/player/play";
const requestType = "POST";
const url = auth.apiURI + command;
const init = { method: requestType, body: auth.token };


const play = () => {
	send.command(url, init);
};

play(auth.accessToken);
