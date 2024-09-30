#!/usr/bin/env node
import chalk from "chalk";

export const apiUri = process.env.API_URI;

// const statusEndpoint = "/v1/me/player";
// const statusUrl = apiUri + statusEndpoint;
// const statusMethod = "GET";
// const status = send(statusUrl, statusMethod);

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.TOKEN}`,
};

export const send = async (url, method) => {
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
