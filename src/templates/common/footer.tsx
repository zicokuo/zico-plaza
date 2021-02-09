//  Footer 脚部

import React from "react"
import { BioWidget } from "./bio"
import { Grid } from "@material-ui/core"

const FooterWidget = () => {
  return (
    <footer>
      <Grid container justify={"center"}>
        <BioWidget />
        <Grid item justify={"center"}>
          © {new Date().getFullYear()}, Built with
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </Grid>
      </Grid>
    </footer>
  )
}
export default FooterWidget
