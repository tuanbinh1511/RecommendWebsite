import axios, { HttpStatusCode } from 'axios'

export function isAxiosError(error) {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}
export function isAxios422Error(error) {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
export function isAxios404Error(error) {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.NotFound
}

export function formatCurrency(currency) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocial(value) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
}
export const rateSale = (original, sale) => Number(Math.round(((original - sale) / original) * 100)) + '%'

const removeSpecialCharacter = (str) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

export const getIdFromNameId = (nameId) => {
  const arr = nameId.split('-i-')
  return arr[arr.length - 1]
}

export const convertTime = (time) => {
  const day = new Date(time).getDate()
  const month = new Date(time).getMonth() + 1
  const year = new Date(time).getFullYear()
  const hour = new Date(time).getHours() + 7
  const minute = new Date(time).getMinutes()
  const second = new Date(time).getSeconds()
  const timeConvert =
    'Ngày ' + day + ' tháng ' + month + ' năm ' + year + ' -' + hour + ' giờ : ' + minute + ' phút ' + second + ' giây'
  return timeConvert
}

export const ArrReverse = (arr) => {
  const newArray = []
  for (let i = arr?.length - 1; i >= 0; i--) {
    newArray.push(arr[i])
  }
  return newArray
}
