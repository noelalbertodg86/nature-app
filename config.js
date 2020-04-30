const config = require("config");

const getConfig = key => {
  return config.get(key);
};
exports.getConfig = getConfig;
