// The number of digits per scale, i.e. 100200, 3 would group 200 (hundreds) and 100 (thousands)
const DIGITS_PER_SCALE = 3

const units = [
  '', 'one', 'two', 'three', 'four',
  'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
  'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
]

const tens = [
  '', '', 'twenty', 'thirty', 'fourty', 'fifty',
  'sixty', 'seventy', 'eighty', 'ninety'
]

const scales = [
  '', 'thousand', 'million'
]

const getUnit = (unit: number) => {
  if (unit >= units.length) {
    return ''
  }
  return units[unit]
}

const getTens = (numberOfTens: number) => {
  if (numberOfTens >= tens.length) {
    return ''
  }
  return tens[numberOfTens]
}

const getScale = (scale: number) => {
  if (scale >= scales.length) {
    return ''
  }
  return scales[scale]
}

const digitToSaneNumber = (digit: string) => Number(digit) || 0

const numberChunkToText = ([ones, tens, hundreds]: string[]) => {
  const hundredsNumber = digitToSaneNumber(hundreds)
  const tensNumber = digitToSaneNumber(tens)
  const onesNumber = digitToSaneNumber(ones)

  const parts: string[] = [
    hundredsNumber === 0 ? '' : `${getUnit(hundredsNumber)} hundred`,
    getTens(tensNumber),
    getUnit(digitToSaneNumber(tens + ones)) || getUnit(onesNumber)
  ]

  if (hundredsNumber && (tensNumber || onesNumber)) {
    // This number has hundreds with a remainder, so we should put an 'and' at the expected position
    const andPosition = tensNumber ? 1 : 2
    parts.splice(andPosition, 0, 'and')
  }

  return parts.filter((part) => part).join(' ')
}

const applyScaleToNumberText = (numberText: string, index: number) => {
  const scale = getScale(index)
  if (scale === '' || numberText === '') {
    return numberText
  }
  return `${numberText} ${scale}`
}

const chunk = (digits: string[], chunkSize: number) => {
  const chunks: string[][] = []
  for (let i = 0; i < digits.length; i += chunkSize) {
    chunks.push(digits.slice(i, i + chunkSize))
  }
  return chunks
}

const convertNumberToWord = (number: number) => {
  const reversedDigits = Array.from(String(number)).reverse()
  const numberChunks = chunk(reversedDigits, DIGITS_PER_SCALE)
  return numberChunks
    .map(numberChunkToText)
    .map(applyScaleToNumberText)
    .filter((word) => word)
    .reverse()
    .join(' ')
}

export { convertNumberToWord };
