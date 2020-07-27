import { t } from '../locales/t'

const getMonthNames = () => [t['january'], t['february'], t['march'], t['april'], t['may'], t['june'],
  t['july'], t['august'], t['september'], t['october'], t['november'], t['december']
]

const getAbbreviationMonthNames = () => [t['jan'], t['feb'], t['mar'], t['apr'], t['May'], t['jun'],
  t['jul'], t['aug'], t['sep'], t['oct'], t['nov'], t['dec']
]

export const getDate = (d, mode = '') => {
  let monthNames = getMonthNames()

  if (mode === 'abbreviation') {
    monthNames = getAbbreviationMonthNames()
  }

  return `${d.getUTCDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`
}
