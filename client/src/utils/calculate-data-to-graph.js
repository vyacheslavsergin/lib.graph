export const calculateDataToGraph = (rawData) => {
  let initial = 0

  return rawData.map((n, idx) => {
    const date = new Date(n.date)

    if (idx === 0) {
      initial = n.value + 1

      return {
        date,
        value: 0
      }
    }

    initial *= n.value + 1

    return {
      date,
      value: (initial - 1) * 100
    }
  })
}
