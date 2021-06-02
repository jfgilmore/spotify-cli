# spotify-cli

## IMPORTANT NOTICE

The authentication flow needs to be completed, right now the applications credentials SPOTIFY_ID and SPOTIFY_SECRET aren't hosted anywhere but on my dev server. You could always implement your own in your personal dev environment or await me picking up my game and finally finishing the proxy. Your choice.

## About

Spotify playback control from your terminal app using node.
Authentication with Spotify achieved using OAuth2 [Authorization Code Flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/). We are only using the following scopes:

- user-modify-playback-state
- user-read-playback-state
- user-read-currently-playing

I am fleshing out some more features after the upgrades I have made. Soon I hope to be able to select the playback device from the terminal too 🤘

## Instructions

Run `npm link spotify-cli` from within the spotify-cli directory in your terminal and the following sim-links will be created:

`sp`: play/pause
`sb`: back
`sn`: next
`sv`: volume
`sl`: login
`sd`: change playback device _note: the device must be online and recently used_
`sr`: toggle repeat mode
`ss`: toggle shuffle mode **_not yet implemented_**

These will allow you to play, pause, skip forward and back, and adjust the volume of whatever device or group of devices you are currently playing on.
`sl` will launch authentication, this will also automatically run if there isn't a current session open and you use another of the commands.

## Authentication

_spotify-cli_ uses an authorization code flow to gain an access token for Spotify's API services. You will be taken to a browser page to log in and authorize spotify-cli on your account. Once this is done you can freely use the sim linked commands from any terminal instance on your machine 🙂

## Privacy Policy

Oh yes, that... Working on it.
We believe we are compliant with the Spotify Developer Terms of Service, we only request the minimum permissions necessary to run this applications functions and all of the code is visible here. I operate the proxy server that adds our authentication keys to your spotify login request on a Heroku server, only the OAuth2 request is seen, modified with the relevant keys, passed on, and never stored in a database. All your personal information at Spotify remains between you and Spotify, that's the beauty of the OAuth process.
See _How to uninstall_ below for details on how to revoke **spotify-cli** access to your Spotify account.

### How to uninstall

Just run `npm unlink spotify-cli` from your terminal app.
You can remove **spotify-cli** access from your Spotify account at [spotify.com/au/account/apps](https://www.spotify.com/au/account/apps/)
