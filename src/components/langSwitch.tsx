import React, { useState } from "react"
import {
  Select,
  MenuItem,
  createStyles,
  makeStyles,
} from "@material-ui/core"
import { graphql, useStaticQuery } from "gatsby"

const useStyles = makeStyles((theme:any) =>
  createStyles({
    root: {},
    select: {
      color: "white",
    },
  })
)

const LangSwitchWidget = () => {
  const classes = useStyles({ color: "#FFF" }),
    { langs } = useStaticQuery(widgetQuery),
    [langChoice, setLangChoice] = useState(""),
    handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setLangChoice(event.target.value as string)
    }

  return (
    <Select
      classes={classes}
      labelId="demo-simple-select-outlined-label"
      id="demo-simple-select-outlined"
      value={langChoice}
      onChange={handleChange}
    >
      {langs?.options?.lang.map((lang:string, idx:int) => (
        <MenuItem key={idx} value={lang}>
          <em>{String(lang).toUpperCase()}</em>
        </MenuItem>
      ))}
    </Select>
  )
}

export default LangSwitchWidget

export const widgetQuery = graphql`
  query LangQuery {
    langs: sitePlugin(name: { eq: "gatsby-plugin-intl" }) {
      options: pluginOptions {
        lang: languages
      }
    }
  }
`
