# spotify-cli

## IMPORTANT NOTICE:

This project was written over the course of an afternoon and is not fully functional right now. I am wrorking on it occasionally, but there is a little ways to go. The authentication flow needs to be completed, at this point it requires manual intervention to copy and paste the access token into `spotifyAuthentication.js` as the Authorization header Bearer token. The token currently hardcoded there won't get you anything as it has been voided 😉

Why: The token is currently returned by spotify as a query string 😒 so I can't just grab it with a local server which had been my original intention. I am however working on a proxy that should handle this, and also stop me exposing the applications Client ID so publically, not that you can get far without the secret anyway 😝. But yes it needs some work.

## About

NodeJS Terminal app that allows spotify playback control from your terminal app.

The implicit authentication will be revised as does not function outside of a browser context.

## Instructions

Run `npm link` from within the root directory of spotify-cli in your terminal and the following sim-links will be created:

`sp`: play
`ss`: pause
`sb`: back
`sn`: next
`sv`: volume
`sl`: login

These will allow you to play, pause, skip forward and back, and adjust the volume of whatever device or group of devices you are currently playing on.
`sl` will launch authentication, this will also automatically run if there isn't a current session open and you use another of the commands.

## Authentication

_spotify-cli_ uses an authorization code flow to gain an access token for Spotify's API services. You will be taken to a browser page to log in and authorize spotify-cli on your account. Once this is done you can freely use the simlinked commands from any terminal instance on your machine 🙂
