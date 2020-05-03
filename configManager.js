const config = require(__dirname + "/config/config.json")["db"];

const getConfig = key => {
  return config[key];
};
exports.getConfig = getConfig;
