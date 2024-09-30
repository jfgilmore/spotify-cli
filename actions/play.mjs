#!/usr/bin/env node
import { apiUri, send, chalk } from "../spotifyAuthentication";

const endpoint = "/v1/me/player/play";
const method = "PUT";
const url = apiUri + endpoint;

send(url, method);
console.log(chalk.green(`Play`));