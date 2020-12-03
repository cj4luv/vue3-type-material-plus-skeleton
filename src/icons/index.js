const req = require.context('./svg', false, /\.svg$/);
const requireAll = (requireContext) => {
  const r = requireContext.keys().map(requireContext);
  return r;
};
requireAll(req);
