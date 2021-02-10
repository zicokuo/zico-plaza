import {
  ClassNameMap,
  CSSProperties,
  DefaultTheme,
  makeStyles,
  Styles,
} from "@material-ui/styles"

class _CustomStyles<T> {
  _styles: T

  constructor(styles: T) {
    this._styles = styles
    Object.keys(styles).forEach(key =>
      Object.defineProperty(this, key, { get: () => this._styles[key] })
    )
  }
}

export const useStyles = (styles: Styles<DefaultTheme, {}, string>) =>
  makeStyles(styles)
