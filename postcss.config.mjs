const config = {
  plugins: {
    // kni-cascade owns the responsive variables; this plugin only converts pxv.
    'postcss-pxv': { writeVars: false },
  },
};
export default config;
