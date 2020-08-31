import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import '../../app/shared/polyfills/custom-event'
import {throttle} from '../../app/shared/throttle'

import classes from './layout.module.scss'

export const Layout = (props) => {

  useEffect(() => {
    throttle('resize', 'optimizedResize')
  }, [])

  return (
    <main className={classes.main}>
      <header></header>
      <div className={classes.wrapper}>
        {props.children}
      </div>
      <footer></footer>
    </main>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
