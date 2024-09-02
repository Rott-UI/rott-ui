/* eslint-disable indent */

//Package Imports
import {format, parseISO, parse} from 'date-fns'
import {tr, enUS} from 'date-fns/locale'
import {themeConfig} from '../providers'

export const formatMonthShort = (date: string) => {
  if (!date) return ''

  const dateArray = date.trim().split(`${date.includes('.') ? '.' : '/'}`)
  const isTurkish = themeConfig.options.appLanguage.name.includes('tr')

  return format(
    new Date(parseInt(dateArray[2]), parseInt(dateArray[1]) - 1, parseInt(dateArray[0]), 0, 0, 0),
    'MMM',
    {
      locale: isTurkish ? tr : enUS,
    }
  )
    .toUpperCase()
    .replace('I', isTurkish ? 'İ' : 'I')
}

export const formatDate = (date: string | Date, dateformat = 'dd.MM.yyyy') => {
  if (!date) return ''

  const formatedDate = format(
    typeof date === 'string' ? parse(date, 'dd.MM.yyyy', new Date()) : date,
    dateformat
  )

  return formatedDate
}

export const formatTime = (date: string | Date, timeformat = 'HH:mm') => {
  if (!date) return ''

  const formatedTime = format(typeof date === 'string' ? parseISO(date) : date, timeformat)

  return formatedTime
}

export const formatDateTime = (date: string | Date, dateTimeformat = 'dd.MM.yyyy HH:mm') => {
  if (!date) return ''

  const formatedDateTime = format(typeof date === 'string' ? parseISO(date) : date, dateTimeformat)

  return formatedDateTime
}
export const formatDateTimeENTR = (dateString: string): string => {
  const year = dateString.substring(0, 4)
  const month = dateString.substring(4, 6)
  const day = dateString.substring(6, 8)

  return `${day}.${month}.${year}`
}
export const ConvertDateTimeToDate = (date: string, dateTimeFormat = 'dd/MM/yyyy HH mm') => {
  if (!date) return ''

  const convertedDateTime = parse(
    format(parseISO(date), dateTimeFormat),
    dateTimeFormat,
    new Date()
  )

  return convertedDateTime
}

export const formatPhone = (phoneNumber: string) => {
  return /^[+90]/.test(phoneNumber)
    ? `${phoneNumber.substring(0, 3)} ${phoneNumber.substring(3, 6)} ${phoneNumber.substring(
        6,
        9
      )} ${phoneNumber.substring(9, 11)} ${phoneNumber.substring(11, 13)}`
    : `+90 ${phoneNumber.substring(0, 3)} ${phoneNumber.substring(3, 6)} ${phoneNumber.substring(
        6,
        8
      )} ${phoneNumber.substring(8, 10)}`
}

export const formatPhoneMasked = (phoneNumber: string) => {
  return /^[+90]/.test(phoneNumber)
    ? `${phoneNumber.substring(0, 3)} *** ** ${phoneNumber.substring(
        9,
        11
      )} ${phoneNumber.substring(11, 13)}`
    : `+90 ${phoneNumber.substring(0, 3)}  *** ** ${phoneNumber.substring(8, 10)}`
}

export const formatSecondsToTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${minutes <= 9 ? `0${minutes}` : minutes}dakika ${
    seconds < 9 ? `0${seconds}` : seconds
  }saniye`
}
