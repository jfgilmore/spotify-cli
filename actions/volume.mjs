#!/usr/bin/env node
import chalk from "chalk";
import { apiUri, send } from "../index.mjs";
import { question } from "readline-sync";

const endpoint = "/v1/me/player/volume";
const method = "PUT";
let level = question(
  "Volume controls (+/-) or enter desired volume and hit [RETURN]: "
);
let volumeParam = `?volume_percent=${level}`;
let url = apiUri + endpoint + volumeParam;

send(url, method);
console.log(chalk.green(`${level}%`));
