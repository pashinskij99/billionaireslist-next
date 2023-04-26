export const thousandToK = (num) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'K'
    : Math.sign(num) * Math.abs(num)
}

export const thousandToKQuotes = (num) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(0) + 'K'
    : Math.sign(num) * Math.abs(num)
}

export const netWorthFormat = (num) => {
  const netWorth = num.toString()

  if (netWorth.length >= 12) {
    return `$${(num / Math.pow(10, 12)).toFixed(1).toString()}T+`
  }
}

export const toTableFormat = (string) => {
  const formattedString = string.split('')
  for (let i = string.length; i > 0; i -= 3) {
    formattedString.splice(i, 0, ' ')
  }

  return formattedString.join('').trim()
}

export const mainNetWorthFormat = (num) => {
  const formattedString = num.toString().split('')
  for (let i = formattedString.length; i > 0; i -= 3) {
    formattedString.splice(i, 0, "'")
  }
  formattedString.splice(formattedString.length - 1, 1)
  return formattedString.join('')
}
