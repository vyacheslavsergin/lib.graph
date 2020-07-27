import uniqueId from 'lodash/uniqueId'

const areaGradient = `lib.graph.area.gradient-${uniqueId()}`
const info = `lib.graph.info-${uniqueId()}`
const circle = `lib.graph.circle-${uniqueId()}`

export const uniqueIdList = { areaGradient, circle, info }
