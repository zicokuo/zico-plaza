import { colors } from "@material-ui/core"

const BLACK = "#333333",
  GREY = "#f7f7f7",
  MAIN = "#283047"

export interface ThemeConfigFace {
  colors: {}
}

export const themeConfig: ThemeConfigFace = {
  colors: {
    ...colors,
    background: BLACK,
    font: BLACK,
    areaBackground: GREY,
    main: MAIN,
  },
}
