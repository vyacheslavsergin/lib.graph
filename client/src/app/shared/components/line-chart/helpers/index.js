import classes from '../line-chart-value/line-chart-value.module.scss'

// This way is necessary to improve performance Internet Explorer 11
export const setLineChartValueHandler = (node, value) => {

  const el = node
  const digits = 3
  const val = `${value.toFixed(digits)}%`
  const res = value > 0 ? `+${val}` : val

  if (value > 0) {
    el.classList.remove(classes['is-negative'])
    el.classList.add(classes['is-positive'])
  }

  if (value < 0) {
    el.classList.remove(classes['is-positive'])
    el.classList.add(classes['is-negative'])
  }

  if (value === 0) {
    el.classList.remove(classes['is-positive'])
    el.classList.remove(classes['is-negative'])
  }

  el.textContent = res
}
