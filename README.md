# spotify-cli

## IMPORTANT NOTICE

The authentication flow needs to be completed, right now the applications credentials SPOTIFY_ID and SPOTIFY_SECRET aren't hosted anywhere but on my dev server. You could always implement your own in your personal dev environment or await me picking up my game and finally finishing the proxy. Your choice.

## About

Spotify playback control from your terminal app using node.

Authentication with Spotify achieved using OAuth2.

I am fleshing out some more features after the upgrades I have made. Soon I hope to be able to select the playback device from the terminal too 🤘

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
