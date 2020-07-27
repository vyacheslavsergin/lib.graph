import React from 'react'
import PropTypes from 'prop-types'

import classes from './section-component.module.scss'

export const SectionComponent = (props) => {
  return (
    <section className={classes.section}>
      {props.children}
    </section>
  )
}

SectionComponent.propTypes = {
  children: PropTypes.node
}

export default SectionComponent
