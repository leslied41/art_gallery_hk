const { i18n } = require("./next-i18next.config");
module.exports = {
  images: {
    domains: ["cdn.sanity.io"],
  },
  reactStrictMode: true,
  i18n,
};
