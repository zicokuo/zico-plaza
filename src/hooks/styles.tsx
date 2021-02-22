import { DefaultTheme, makeStyles, Styles } from "@material-ui/styles"
export const useStyles = (styles: Styles<DefaultTheme, {}, string>) =>
  makeStyles(styles)
