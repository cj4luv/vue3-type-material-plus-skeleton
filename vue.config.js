/* eslint-disable */

module.exports = {
  chainWebpack(config) {
    config.resolve.alias.clear().merge(require('./aliases.config').webpack);
  },
};
