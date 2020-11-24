import React, { useState } from "react"
import { Fade, Grid, IconButton, Input, InputAdornment } from "@material-ui/core"
import { Search } from "@material-ui/icons"

// const useStyles = makeStyles(
//   createStyles({
//     root: {
//       margin: 12,
//       padding: 12,
//       height: (props: any) => props?.isShow ? "auto" : "0"
//     }
//   }))

export const HeaderEmbedSearchComp = ({
                                        isShow
                                      }: { isShow: boolean }) => {
  const [searchWord, setSearchWord] = useState(""),
    [isShowComp, setShowComp] = useState(isShow)

  return (
    <Grid container direction={"row"} wrap={"nowrap"} alignItems={"center"} gap-1>
      <Grid item md={10}>
        <Fade in={isShowComp}>
          <Input
            id="standard-adornment-weight"
            autoFocus={isShowComp}
            value={searchWord.toString()}
            onChange={event => setSearchWord(`${event.target.value}`)}
            onBlur={ _ => setShowComp(false)}
            startAdornment={<InputAdornment position="start">Search: </InputAdornment>}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              "aria-label": "weight"
            }}
          />
        </Fade>
      </Grid>
      <Grid item md={2}>
        <IconButton aria-label="search">
          <Search onClick={_ => {
            setShowComp(!isShowComp)
          }} />
        </IconButton>
      </Grid>
    </Grid>

  )
}
