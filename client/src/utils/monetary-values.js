import 'intl'

export const toFormat = (value, currency = null) => !currency ? new Intl.NumberFormat('ru-RU').format(Number(value)) :
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency
  }).format(Number(value))
