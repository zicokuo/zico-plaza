import React, { useState } from "react"
import { Container, FormControl, FormHelperText, Input, InputAdornment, makeStyles, TextField } from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    margin: 12,
    padding: 12,
    display: props => (props.isShow ? "flex" : "none")
  }
})

export const HeaderEmbedSearchComp = ({
                                        isShow
                                      }: { isShow: boolean }) => {
  const classes = useStyles({ isShow: isShow })
  let [ searchWord, setSearchWord ] = useState("")

  return (<>
    <Container fixed className={classes.root}>
      <TextField
        label="With normal TextField"
        id="standard-start-adornment"
        InputProps={{
          startAdornment: <InputAdornment position="start">Kg</InputAdornment>
        }}
      />
      <FormControl>
        <Input
          id="standard-adornment-weight"
          value={searchWord}
          onChange={val => setSearchWord(`${val}`)}
          endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
          aria-describedby="standard-weight-helper-text"
          inputProps={{
            "aria-label": "weight"
          }}
        />
        <FormHelperText id="standard-weight-helper-text">Weight</FormHelperText>
      </FormControl>

    </Container>
  </>)
}

