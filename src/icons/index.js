const req = require.context('./svg', false, /\.svg$/);
const requireAll = (requireContext) => {
  console.log(requireContext.keys());
  const r = requireContext.keys().map(requireContext);
  console.log(r);
  return r;
};
requireAll(req);
