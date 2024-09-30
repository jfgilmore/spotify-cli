#!/usr/bin/env node
import chalk from "chalk";
import { apiUri, send } from "../index.mjs";

const endpoint = "/v1/me/player/play";
const method = "PUT";
const url = apiUri + endpoint;

send(url, method);
console.log(chalk.green(`Play`));
