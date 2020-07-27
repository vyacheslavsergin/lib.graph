import { t } from '../../locales/t'

export const throttleWait = 300

export const directionAxis = { right: 'right', bottom: 'bottom', left: 'left' }

export const linearGradient = {
  toTop: {
    to: 'rgba(101, 60, 173, 0)',
    top: 'rgba(101, 60, 173, 0.1)'
  }
}

export const mathRound = (array, number) => {
  const arrayAbs = array.map((value) => Math.abs(value - number))
  const minArrayAbs = Math.min(...arrayAbs)
  const indexMinArrayAbs = arrayAbs.findIndex((value) => value === minArrayAbs)
  return array[indexMinArrayAbs]
}

export const getMonthNames = () => [
  t['january'], t['february'], t['march'], t['april'], t['may'], t['june'],
  t['july'], t['august'], t['september'], t['october'], t['november'], t['december']
]

export const getAbbreviationMonthNames = () => [t['jan'], t['feb'], t['mar'], t['apr'], t['May'], t['jun'],
  t['jul'], t['aug'], t['sep'], t['oct'], t['nov'], t['dec']
]

export const getDate = (d, mode = '') => {
  let monthNames = getMonthNames()

  if (mode === 'abbreviation') {
    monthNames = getAbbreviationMonthNames()
  }

  return `${d.getUTCDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`
}
