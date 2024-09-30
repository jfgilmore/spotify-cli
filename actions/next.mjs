#!/usr/bin/env node
import chalk from "chalk";
import { apiUri, send } from "../index.mjs";

const endpoint = "/v1/me/player/next";
const method = "POST";
const url = apiUri + endpoint;

send(url, method);
console.log(chalk.green(`Next`));
