const chalk = require("chalk");
const fetch  = require("node-fetch");
const apiURI = "https://api.spotify.com";
const token = "BQBCxaWbwIc4FXrqQZd6LDVj_gTbPFMLW_slAt4ik-2_Yawsz7JmifeZ-r9qoKyco0SH1O5oOGEgnrJ5NUWxCmhzFQdKlMAqbljNhZVb-720ds5cU_KL0jxhQRp5ZQ_pFHRkl1t0UEniUYzfKxpA3g";

const send = async (url, init) => {
  try {
    const response = await fetch(url, init);
    const status = response.status;
    if (status === 401) { throw "You need to re-authenticate!" }
    console.log(response);
    console.log(chalk.green(`Playing on ${}`));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  apiURI,
  send,
	token
};