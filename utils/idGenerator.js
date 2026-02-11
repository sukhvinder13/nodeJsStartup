/**
 * ID Generator Utilities
 */

const generateRandomId = (prefix = "") => {
  const randomNum = Math.round(Math.random() * 100000);
  return `${prefix}${randomNum}`;
};

const generateTankId = (index) => {
  return `T${index + 1}`;
};

module.exports = {
  generateRandomId,
  generateTankId
};
