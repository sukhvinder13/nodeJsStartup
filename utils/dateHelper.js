/**
 * Date Helper Utilities
 */
const moment = require("moment");

const getCurrentTimestamp = () => {
  return moment().format("YYYY-MM-DD HH:mm:ss");
};

const getCurrentISTDate = () => {
  return new Date().toLocaleString("en-US", {
    timeZone: "Asia/Calcutta"
  });
};

module.exports = {
  getCurrentTimestamp,
  getCurrentISTDate
};
