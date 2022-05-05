/* global */
const util = require('util')

const getDateAndTime = () => {
  const now = new Date()
  const dateAndTime = `${(now.getMonth() + 1).toString().padStart(2, '0')}/${now
    .getDate()
    .toString()
    .padStart(2, '0')}/${now
    .getFullYear()
    .toString()
    .padStart(4, '0')} ${now
    .getHours()
    .toString()
    .padStart(2, '0')}:${now
    .getMinutes()
    .toString()
    .padStart(2, '0')}:${now
    .getSeconds()
    .toString()
    .padStart(2, '0')}`

  return dateAndTime
}

const log = (message, params) => {
  try {
    const dateAndTime = getDateAndTime()
    console.log(`[INFO] ${dateAndTime} ${message} ${params ? util.inspect(params, { compact: true, depth: 5 }) : ''}`)
  } catch (err) {
    console.warn(err)
  }
}

module.exports = {
  log
}
