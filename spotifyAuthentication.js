#!/usr/local/bin/node
const chalk = require("chalk");
const fetch = require("node-fetch");
const open = require("open");
const token = "BQBbyTgXd_pzLdePPhNJ5768cbnUyxNtimHxKyrCC3D06D1D7wSrK_jpvNbhpvXdlIX5IxufqKVKhYGeTmvW1SP0Ts7UKoriS1c05Go6B8hvLs3dzhr42BXb10FbXXMks-uhEwh8p4DAm2p5lVYm3wtgVpY";
const apiUri = "https://api.spotify.com";
const accUri = "https://accounts.spotify.com";
const clientId = "client_id=7c3e071d9a924d1bb2c9ca3c63b3d963";
const responseType = "response_type=token";
const redirectUri = "redirect_uri=http://localhost:3000";
const scope = "scope=user-modify-playback-state user-read-playback-state";
const dialogue = "dialog=false";

const authUrl =
	accUri +
	"/authorize?" +
	clientId +
	"&" +
	responseType +
	"&" +
	redirectUri +
	"&" +
	scope +
	"&" +
	dialogue;

// open(authUrl, { wait: true });

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
