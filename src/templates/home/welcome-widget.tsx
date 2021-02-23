import React from "react"
import { FormattedMessage } from "gatsby-plugin-intl"
import { Grid, makeStyles, Theme, Typography } from "@material-ui/core"
import { BuyMeCoffeeWidget } from "@/src/templates/header/buy-me-coffee"
import { ThemeConfigFace } from "@/src/theme/base.theme"

const useStyles = makeStyles((theme: Partial<ThemeConfigFace>) => ({
  root: {
    margin: "4% 0",
    padding: "5%",
    background: theme.colors.main,
    borderRadius: 8,
  },
  item: {},
}))
export const WelcomeWidget = () => {
  const classes = useStyles()
  return (
    <Grid classes={classes} container direction={"row"}>
      <Grid item xs>
        <Typography gutterBottom variant="h6" component="h2">
          <FormattedMessage id="welcome" />
        </Typography>
        <Typography gutterBottom variant="body2" component="p">
          这里是一个记录工作经验和个人爱好的Blog，喜欢可以收藏一下；
        </Typography>
      </Grid>
      <Grid item>
        <BuyMeCoffeeWidget />
      </Grid>
    </Grid>
  )
}
