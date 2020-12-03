/* eslint-disable */
const path = require('path');

const aliases = {
  '@': '.',
  '@src': 'src',
  '@router': 'src/router',
  '@views': 'src/views',
  '@layouts': 'src/layouts',
  '@components': 'src/components',
  '@assets': 'src/assets',
  '@utils': 'src/utils',
  '@store': 'src/store',
  '@styles': 'src/styles',
  '@config': 'src/config',
  '@constants': 'src/constants',
  '@api': 'src/api',
  '@plugins': 'src/plugins',
  '@modules': 'src/modules',
};

module.exports = {
  webpack: {},
};

for (const alias in aliases) {
  const aliasTo = aliases[alias];
  module.exports.webpack[alias] = resolveSrc(aliasTo);
}

function resolveSrc(_path) {
  return path.resolve(__dirname, _path);
}
