#!/usr/bin/env node
import chalk from "chalk";
import open from "open";

const apiUri = process.env.API_URI;

const authUrl = `${process.env.ACC_URI}/authorize?client_id=${process.env.CLIENT_ID}&response_type=token&redirect_uri=${process.env.REDIRECT_URI}&scope=user-modify-playback-state user-read-playback-state&dialog=false`;

try {
  await open(authUrl, { wait: true });
} catch (error) {
  console.error(error);
}

// const statusEndpoint = "/v1/me/player";
// const statusUrl = apiUri + statusEndpoint;
// const statusMethod = "GET";
// const status = send(statusUrl, statusMethod);

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.TOKEN}`,
};

const send = async (url, method) => {
  try {
    const response = await fetch(url, { method, headers });
    const status = response.status;
    if (status === 401) {
      throw status;
    }
  } catch (error) {
    console.log(error);
    console.log(chalk.red("FAILED:"), "Time to log back in!");
  }
};

export default {
  apiUri,
  send,
  chalk,
};
