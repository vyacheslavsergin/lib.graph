import React from 'react'
import PropTypes from 'prop-types'

import {SectionComponent} from '../shared/containers/section-component/section-component'

import { components } from './factory'

const componentHasOffset = (isOffset) => isOffset('_profitabilitychart') ||
  isOffset('_circlediagram')

export const ComponentFactory = ({ widget }) => {

  const widgetType = widget.type.toLowerCase()

  // if (!components.hasOwnProperty(widgetType) || !components[widgetType]) {
  if (!Object.prototype.hasOwnProperty.call(components, widgetType) || !components[widgetType]) {
    return null
  }

  const isOffset = (w) => widgetType === w

  const Component = components[widgetType]

  const offset = widget?.properties?.offset

  if (componentHasOffset(isOffset)) {
    return (
      <Component widget={widget} />
    )
  }

  return (
    <SectionComponent widgetType={widgetType} offset={offset}>
      <Component widget={widget} />
    </SectionComponent>
  )
}

ComponentFactory.propTypes = {
  widget: PropTypes.object
}

ComponentFactory.defaultProps = {
  widget: {}
}
