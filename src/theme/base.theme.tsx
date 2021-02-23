import { colors, createMuiTheme, Theme } from "@material-ui/core"

const BLACK = "#333333",
  GREY = "#f7f7f7",
  MAIN = colors.lightBlue["100"]

export interface ThemeConfigFace extends Theme {
  colors: any
}

export const themeConfig: Partial<ThemeConfigFace> = createMuiTheme(
  {},
  {
    colors: {
      ...colors,
      background: BLACK,
      font: BLACK,
      areaBackground: GREY,
      main: MAIN,
    },
  }
)
