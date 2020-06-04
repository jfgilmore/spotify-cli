const chalk = require("chalk");
const fetch = require("node-fetch");
const apiUri = "https://api.spotify.com";
const token =
	"BQAeeL4FfxZTgc6I-EPNz1UCWHzT0uJxa0u2gbq3g6R_taT1ytg2CR2qoReRcUOZOtErwJAuzBie7Uf-8f32sFpYjAfLLxroBTrbN1NiWVQ5HKaced5S23RNrhXlffHuxuvdmshDMb1875tDjQrEuQ";
const statusEndpoint = "/v1/me/player";
// const statusUrl = apiUri + statusEndpoint;
// const statusMethod = "GET";
// const status = send(statusUrl, statusMethod);
const headers = {
	"Content-Type": "application/json",
	Authorization: "Bearer " + token,
};

const send = async (url, method) => {
	try {
		const init = { method: method, headers: headers };
		const response = await fetch(url, init);
		const status = response.status;
		if (status === 401) {
			throw status;
		}
	} catch (error) {
    // Authentication function
		console.log(error);
		console.log(chalk.red("FAILED:"), "Time to log back in!");
	}
};

module.exports = {
	apiUri,
  send,
	chalk,
};
