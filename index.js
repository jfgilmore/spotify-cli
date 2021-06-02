#!/usr/local/bin/node
const chalk = require("chalk");
const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const fetch = require("node-fetch");
const readlineSync = require("readline-sync");
const { AuthorizationCode } = require("simple-oauth2");
const open = require("open");
const homedir = require("os").homedir();
const prompt = require("prompts");
const { URL } = require("url");
const YAML = require("yaml");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const apiUri = "https://api.spotify.com";
const accUri = "https://accounts.spotify.com";
const scopes = "user-modify-playback-state user-read-playback-state";
const player = apiUri + "/v1/me/player/";
const file = homedir + "/.spotify-cli.yml";
const hostname = process.env.HOST;
const port = process.env.PORT;
const proxyUri = `https://${hostname}${port ? ":" : ""}${port}`;
const config = {
  client: {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET,
  },
  auth: {
    authorizeHost: accUri,
    authorizePath: "/authorize",
    tokenHost: accUri,
    tokenPath: "/api/token",
  },
};
const GET = "GET";
const PUT = "PUT";
const POST = "POST";
const UTF8 = "utf8";

const spotify = {
  successMsg: (msg) => {
    console.log(chalk.green(msg)); // Spotify green: #1DB954 unavailable in terminal
  },
  token: (tokens = false) => {
    if (tokens) {
      try {
        let { access_token, refresh_token } = tokens;

        if (!refresh_token) {
          const oldTokens = fs.readFileSync(file, UTF8);
          refresh_token = YAML.parse(oldTokens).refresh_token;
        }

        fs.writeFileSync(
          file,
          `${YAML.stringify({ access_token, refresh_token })}`,
          (err) => {
            if (err) throw err;
            console.log("Credentials saved.");
          }
        );

        return access_token;
      } catch (err) {
        console.log("Failed to create credential file:", err);
      }
    } else {
      try {
        const tokens = fs.readFileSync(file, UTF8);
        const { access_token } = YAML.parse(tokens);
        return access_token;
      } catch (err) {
        if (
          err.errno === -2 &&
          err.syscall === "open" &&
          err.code === "ENOENT" &&
          err.path === file
        ) {
          console.log("Attempting refresh...\n");
          return spotify.refresh();
        }
      }
    }
  },
  refresh: async () => {
    const tokens = fs.readFileSync(file, UTF8);
    const { refresh_token } = YAML.parse(tokens);
    const client = new AuthorizationCode(config);
    const reqParams = {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    };

    try {
      const accessToken = await client.getToken(reqParams);
      return spotify.token(accessToken.token);
    } catch (err) {
      if (err.output.statusCode === 400) {
        return spotify.auth();
      }
      console.error("UNHANDLED_ERROR: Refresh token failure", err);
      return false;
    }
  },
  auth: async () => {
    const client = new AuthorizationCode(config);
    const current_date = new Date().valueOf().toString();
    const rand = Math.random().toString(16);
    const state = crypto
      .createHash("sha1")
      .update(current_date + rand)
      .digest("hex");

    const authorizationUri = client.authorizeURL({
      redirect_uri: proxyUri,
      scope: scopes,
      response_type: "code",
      state: state,
      show_dialog: false,
    });

    const server = http.createServer((req, res) => {
      const urlObj = new URL(req.url, proxyUri);
      const code = urlObj.searchParams.get("code");
      const returnedState = urlObj.searchParams.get("state");
      const error = urlObj.searchParams.get("error");

      if (code && returnedState === state) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.setHeader("X-Frame-Options", "DENY");
        res.end("Where done here, go back to whence you came!\n");

        grabToken(code);
      } else if (error && returnedState === state) {
        server.close();
        console.error("OAUTH_PROCESS_ERROR:", error);
        return false;
      }
    });

    server.listen(port, hostname);

    open(authorizationUri);

    const grabToken = async (code) => {
      server.close();
      const tokenParams = {
        code: code,
        grant_type: "authorization_code",
        redirect_uri: proxyUri,
      };

      try {
        const accessToken = await client.getToken(tokenParams);
        return spotify.token(accessToken.token);
      } catch (error) {
        console.log("Access Token Error", error.message);
        return false;
      }
    };
  },
  send: async (url, method, returnData = false, body = null) => {
    const maxTries = 2;
    let errCount = 0;

    while (true) {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + spotify.token(),
        };
        const init = { method: method, headers: headers };
        if (body) {
          init.body = JSON.stringify(body);
        }

        const response = await fetch(url, init);
        const status = await response.status;

        if (status === 401 || status === 403) {
          throw status;
        } else if (returnData) {
          // When data requested
          if (status === 200) {
            // When payload present
            const data = await response.json();
            return data;
          }
          if (status === 204) {
            return true;
          }
          return false;
        } else {
          return status;
        }
      } catch (error) {
        // Authentication failure
        if (errCount++ < maxTries && error === 401) {
          // Unauthorized
          console.error("FAILED: Attempting to retrieve new token.\n");
          spotify.refresh();
        } else if (error === 403) {
          // Forbidden
          return false;
        } else {
          console.error("FAILED: Unable to retrieve new token.", error);
        }
      }
    }
  },
  get: async (url) => {
    const data = await spotify.send(url, GET, true);
    return data;
  },
  playPause: async () => {
    const { is_playing } = await spotify.get(player);
    if (is_playing) {
      spotify.pause();
    } else {
      spotify.play();
    }
  },
  play: async () => {
    const res = await spotify.send(player + "play", PUT);
    if (res) {
      spotify.successMsg("Play");
    }
  },
  pause: async () => {
    const res = await spotify.send(player + "pause", PUT);
    if (res) {
      spotify.successMsg("Pause");
    }
  },
  next: async () => {
    const res = await spotify.send(player + "next", POST);
    if (res) {
      spotify.successMsg("Next");
    }
  },
  back: async () => {
    const res = await spotify.send(player + "previous", POST);
    if (res) {
      spotify.successMsg("Back");
    } else {
      console.error("Not possible");
    }
  },
  repeat: async (state = "") => {
    // state: {"track" | "context" | "off"}
    const newState = { track: "off", context: "track", off: "context" };
    let stateParam = state;
    if (state === "") {
      const { repeat_state } = await spotify.get(player);
      if (repeat_state) {
        stateParam = newState[repeat_state];
      } else {
        console.error("No active player");
        return null;
      }
    }

    let url = player + "repeat?" + `state=${stateParam}`;
    const res = await spotify.send(url, PUT);
    if (res) {
      spotify.successMsg(`Repeat: ${stateParam}`);
    }
  },
  vol: async () => {
    let level = readlineSync.question(
      "Enter desired volume and hit [RETURN]: "
    );
    let volumeParam = `volume_percent=${level}`;
    let url = player + "volume?" + volumeParam;

    const success = await spotify.send(url, PUT);
    if (success) {
      spotify.successMsg(`${level}%`);
    }
  },
  device: async () => {
    try {
      const { devices } = await spotify.get(player + "devices");
      const list = [];

      if (devices.length > 1) {
        spotify.successMsg("Available devices:");
        devices.map((device) => {
          list.push({ title: device.name, value: device.id });
        });
        const body = await prompt({
          type: "autocomplete",
          name: "device_ids",
          message: "Choose your device:",
          choices: list,
          max: 5,
          initial: 1,
          hint: "Space to select. Enter to submit.",
        });
        body.device_ids = [body.device_ids];
        body.play = true;

        const response = await spotify.send(player, PUT, false, body);
        if (response) {
          spotify.successMsg(`Now playing on ${device.name}`);
        }
      } else {
        spotify.successMsg("Only one device available:");
        console.log(chalk.grey(`${devices[0].name}`));
      }
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = spotify;
