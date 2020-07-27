import {CircleDiagramComponent} from '../shared/components/circle-diagram/circle-diagram.component'
import LineChartComponent from '../shared/components/line-chart/line-chart-component'

const isProfitabilityChartRender = true
const isStrategyCompositionRender = true

export const components = {
  circlediagram: isStrategyCompositionRender && CircleDiagramComponent,
  profitabilitychart: isProfitabilityChartRender && LineChartComponent,
}
