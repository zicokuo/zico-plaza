// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
import "./src/style.css"
import "./static/maize.css"
import "./static/algolia-min.css"
// import "prismjs/themes/prism.css"

const preferDefault = m => (m && m.default) || m
export const wrapRootElement = preferDefault()
