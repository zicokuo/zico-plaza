import React from "react"
import { FormattedMessage } from "gatsby-plugin-intl"
import { makeStyles, Paper, Typography } from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    margin:12,
    padding:12
  }
})
export const WelcomeWidget = () => {
  const classes = useStyles();
  return (
    <Paper  elevation={0} className={classes.root}>
    <Typography gutterBottom variant="h6" component="h2">
      <FormattedMessage id="welcome" />
    </Typography>
    <Typography gutterBottom variant="body2" component="p">
      这里是一个记录工作经验和个人爱好的Blog,如果喜欢可以收藏一下;
    </Typography>
    </Paper>
  )
}

