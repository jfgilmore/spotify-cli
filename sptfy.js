
// const chalk = require('chalk');
const fetch = require('node-fetch')
async function authenticate() { }




fetch('https://api.spotify.com/v1/me/albums', {
  headers: {
    Authorization: "Bearer BQDJ8hMikNrajs-niPeJ15TqQKYCr38NL3kqbYMSIfzCYx1RRR8Mh73zdG8jL7AstdJurssHiw6PXsn3EppOY9FGHZ6JbuNUEUEa5IUFBZHEscrJ9yK9KF740eyMvYaMSCa70H60tn3x0UIQRctd9q98Olw"
  }
}).then(function(response){
  
  return response.json()
  
}).then(function(data){

  console.log(data.items)
})










//
// user-read-currently-playing user-modify-playback-state user-read-playback-state

// https://accounts.spotify.com/authorize?client_id=7c3e071d9a924d1bb2c9ca3c63b3d963&response_type=token&redirect_uri=http://localhost:3000&scope=app-remote-control&show_dialog=false&state=123

// Pause a User's Playback
// Seek To Position In Currently Playing Track
// Set Repeat Mode On User’s Playback
// Set Volume For User's Playback
// Skip User’s Playback To Next Track
// Skip User’s Playback To Previous Track
// Start/Resume a User's Playback
// Toggle Shuffle For User’s Playback
// Transfer a User's Playback
// Add An Item To The End Of User's Current Playback Queue

// console.log(chalk.green("Hello world!"));


// https://accounts.spotify.com/authorize?client_id=7c3e071d9a924d1bb2c9ca3c63b3d963&redirect_uri=localhost:5500&response_type=token&scope=app-remote-control&show_dialog=false  