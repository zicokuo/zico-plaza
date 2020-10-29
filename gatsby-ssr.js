require('isomorphic-fetch')

const preferDefault = m => (m && m.default) || m
exports.wrapRootElement = preferDefault(require('./src/lib/inject-provider'))