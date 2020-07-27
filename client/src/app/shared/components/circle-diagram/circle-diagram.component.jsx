import React, {useState, useEffect, useMemo, useCallback} from 'react'
import PropTypes from 'prop-types'
import {t} from '../../../../locales/t'
import {CircleDiagram} from '../../../../circle-diagram'
import {colorPalette, isPhoneViewport} from '../../../../utils'

import {InvestedMoney} from '../invested-money/invested-money'
import {Typography} from '../typography'

import classes from './circle-diagram-component.module.scss'

export const CircleDiagramComponent = ({widget}) => {

  const {data: {graphData, title}} = widget

  const visibleElements = 4

  const transformGraphData = graphData.map((n, i) => ({...n, color: colorPalette[i % colorPalette.length]}))

  const lgOptions = {
    width: 160,
    height: 160,
    radius: 80,
    innerRadius: 65,
    padAngle: 0.02
  }

  const smOptions = {
    width: 104,
    height: 104,
    radius: 50,
    innerRadius: 32,
    padAngle: 0.03
  }

  const setOptions = useCallback(() => ({
    width: isPhoneViewport() ? smOptions.width : lgOptions.width,
    height: isPhoneViewport() ? smOptions.height : lgOptions.height,
    radius: isPhoneViewport() ? smOptions.radius : lgOptions.radius,
    innerRadius: isPhoneViewport() ? smOptions.innerRadius : lgOptions.innerRadius,
    padAngle: isPhoneViewport() ? smOptions.padAngle : lgOptions.padAngle
  }), [smOptions, lgOptions])

  const [circleDiagramData, setCircleDiagramData] = useState(transformGraphData.slice(0, visibleElements))
  const [circleDiagramOptions, setCircleDiagramOptions] = useState(setOptions())

  // const stringifyCircleDiagramOptions = JSON.stringify(circleDiagramOptions)

  const getDiagramData = () => setCircleDiagramData(transformGraphData)

  const onResize = () => setCircleDiagramOptions(setOptions())
  const onResizeMemoized = useCallback(onResize, [setOptions])

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
          <div className={classes['button-wrapper']}>
            <button className={classes['show-more']} onClick={getDiagramData}>{t['show.more']}</button>
          </div>
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
