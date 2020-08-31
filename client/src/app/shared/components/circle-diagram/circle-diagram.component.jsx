import React, {useState, useEffect, useMemo, useCallback} from 'react'
import PropTypes from 'prop-types'
import {t} from '../../../../locales/t'
import {CircleDiagram} from '../../../../circle-diagram'
import {colorPalette, isDesktopViewport} from '../../../../utils'

import {InvestedMoney} from '../invested-money/invested-money'
import {Typography} from '../typography'

import { setOptions } from './shared'
import classes from './circle-diagram-component.module.scss'

export const CircleDiagramComponent = ({widget}) => {

  const {data: {graphData, title}} = widget

  const smVisibleElementsSize = 6
  const mdVisibleElementsSize = 4
  const visibleElementsSize = isDesktopViewport() ? smVisibleElementsSize : mdVisibleElementsSize

  const transformGraphData = graphData.map((n, i) => ({...n, color: colorPalette[i % colorPalette.length]}))
  const transformGraphSize = transformGraphData.length
  const visibleElements = transformGraphData.slice(0, visibleElementsSize)

  const [circleDiagramData, setCircleDiagramData] = useState(visibleElements)
  const [circleDiagramOptions, setCircleDiagramOptions] = useState(setOptions())

  const stringifyCircleDiagramOptions = JSON.stringify(circleDiagramOptions)

  const getDiagramData = () => setCircleDiagramData(transformGraphData)

  const onResize = () => {
    setCircleDiagramData(visibleElements)
    setCircleDiagramOptions(setOptions())
  }
  const onResizeMemoized = useCallback(onResize, [stringifyCircleDiagramOptions])

  useEffect(() => {
    window.addEventListener('optimizedResize', () => onResizeMemoized())
    return () => window.removeEventListener('optimizedResize', onResizeMemoized)
  }, [onResizeMemoized])

  const circleDiagram = useMemo(() => (
    <CircleDiagram
      data={transformGraphData}
      options={circleDiagramOptions}
    />
  ), [transformGraphData, circleDiagramOptions])

  return (
    <div className={classes['circle-diagram-component']}>
      <Typography.Headline mode="h2" theme={classes.title}>{title}</Typography.Headline>
      <div className={classes.content}>
        <div className={classes['circle-diagram-wrapper']}>
          {circleDiagram}
        </div>
        <div className={classes['col-2']}>
          <InvestedMoney data={circleDiagramData}/>
          { transformGraphSize > visibleElementsSize && <div className={classes['button-wrapper']}>
            <button className={classes['show-more']} onClick={getDiagramData}>{t['show.more']}</button>
          </div> }
        </div>
      </div>
    </div>
  )
}

CircleDiagramComponent.propTypes = {
  widget: PropTypes.shape({
    type: PropTypes.string,
    data: PropTypes.shape({
      title: PropTypes.string,
      graphData: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.number,
        title: PropTypes.string
      }))
    }),
    properties: PropTypes.shape({
      tabTitle: PropTypes.string
    })
  }).isRequired
}
