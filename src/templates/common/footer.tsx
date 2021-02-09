//  Footer 脚部

import React from "react"
import { BioWidget } from "./bio"
import { Grid } from "@material-ui/core"

const FooterWidget = () => {
  return (
    <footer>
      <BioWidget />
      <Grid alignItems={"center"}>
        © {new Date().getFullYear()}, Built with
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </Grid>
    </footer>
  )
}
export default FooterWidget
