// Twinkling Night Sky by Sharna
// @ts-ignore
import anime from "animejs/lib/anime.es.js"
import React, { CSSProperties, useEffect } from "react"
import { createStyles, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { getDocument, getWindow } from "ssr-window"

const userStyles = makeStyles(
  createStyles({
    root: {
      zIndex: 0,
      position: `fixed`,
      width: `99vw`,
      height: `30vh`,
      top: 0,
      left: 0
    },
    sky: {
      width: `100vw`,
      height: `100vh`,
      position: `fixed`,
      overflow: `hidden`,
      margin: `0`,
      padding: `0`
    },

    shootingstars: {
      margin: `0`,
      padding: `0`,
      width: `150vh`,
      height: `100vw`,
      position: `fixed`,
      overflow: `hidden`,
      transform: `
      translatex(calc(50vw - 50%)) 
      translatey(calc(50vh - 50%)) 
      rotate(120deg)`
    },

    wish: {
      height: `5px`,
      top: `300px`,
      width: `100px`,
      margin: `0`,
      opacity: `0`,
      padding: `0`,
      backgroundColor: `grey`,
      position: `absolute`,
      background: `linear-gradient(-45deg, grey, rgba(0, 0, 255, 0))`,
      filter: `drop-shadow(0 0 6px grey)`,
      overflow: `hidden`
    }
  })
)
const document = getDocument()
const window = getWindow()

class StarrySky {
  state = {
    num: 100,
    vw: Math.max(
      document.documentElement?.clientWidth,
      window?.innerWidth || 1280
    ),
    vh: Math.max(
      document.documentElement?.clientHeight,
      window?.innerHeight || 900
    )
  }
  starryNight = () => {
    anime({
      targets: ["#sky .star"],
      opacity: [
        {
          duration: 700,
          value: "0"
        },
        {
          duration: 700,
          value: "1"
        }
      ],
      easing: "linear",
      loop: true,
      delay: (el: any, i: number) => 50 * i
    })
  }
  shootingStars = () => {
    anime({
      targets: ["#shootingstars .wish"],
      easing: "linear",
      loop: true,
      delay: (el: any, i: number) => 1000 * i,
      opacity: [
        {
          duration: 700,
          value: "1"
        }
      ],
      width: [
        {
          value: "150px"
        },
        {
          value: "0px"
        }
      ],
      translateX: 350
    })
  }
  randomRadius = () => {
    return Math.random() * 0.7 + 0.6
  }
  getRandomX = () => {
    return Math.floor(Math.random() * Math.floor(this.state.vw)).toString()
  }
  getRandomY = () => {
    return Math.floor(Math.random() * Math.floor(this.state.vh)).toString()
  }
}

const FallingStart = () => {
  let starInstance = new StarrySky(),
    classes = userStyles(),
    { num } = starInstance.state,
    expCss = {
      wish: {
        height: `2px`,
        top: `300px`,
        width: `100px`,
        margin: `0`,
        opacity: `0`,
        padding: `0`,
        backgroundColor: `grey`,
        position: `absolute`,
        background: `linear-gradient(-45deg, grey, rgba(0, 0, 255, 0))`,
        filter: `drop-shadow(0 0 6px grey)`,
        overflow: `hidden`
      }
    }

  useEffect(() => {
    starInstance.starryNight()
    starInstance.shootingStars()
  })

  return (
    <Grid id="fallingStar" className={classes.root}>
      {/*<svg id="sky" className={classes.sky}>*/}
      {/*  {[...Array(num)].map((x: number, y: number) => (*/}
      {/*    <circle*/}
      {/*      cx={starInstance.getRandomX()}*/}
      {/*      cy={starInstance.getRandomY()}*/}
      {/*      r={starInstance.randomRadius()}*/}
      {/*      strokeWidth="50"*/}
      {/*      fill="black"*/}
      {/*      key={y}*/}
      {/*      className="star"*/}
      {/*      strokeLinecap={"square"}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</svg>*/}
      <div id="shootingstars" className={classes.shootingstars}>
        {[...Array(300)].map((x: number, y: number) => (
          <div
            key={y}
            className={"wish"}
            style={
              {
                ...expCss.wish,
                left: `${starInstance.getRandomY()}px`,
                top: `${starInstance.getRandomX()}px`
              } as CSSProperties
            }
          />
        ))}
      </div>
    </Grid>
  )
}

export default FallingStart
