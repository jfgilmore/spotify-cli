import open from "open";

const authUrl = `${process.env.ACC_URI}/authorize?client_id=${process.env.CLIENT_ID}&response_type=token&redirect_uri=${process.env.REDIRECT_URI}&scope=user-modify-playback-state user-read-playback-state&dialog=false`;

try {
  await open(authUrl, { wait: true });
} catch (error) {
  console.error(error);
}
