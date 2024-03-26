/* eslint-disable indent */

// Util and Lib Imports
import {
  TranslationLanguageTypes,
  formatDate,
  formatDateTime,
  formatMessage,
  formatTime,
} from '../../../utils'

export const formatByDateMode = (mode: 'date' | 'time' | 'datetime', date: string) => {
  switch (mode) {
    case 'time':
      return formatTime(date)
    case 'date':
      return formatDate(date)
    default:
      return formatDateTime(date)
  }
}

// TODO: Genisletilecek - Refactor Edilecek
/**
 *
 * @param date YYYY.MM.DD formatinda tarih
 * @param mode donecek format tipi
 * @returns
 * mode: **'DD MM YYYY'** - ```{day: DD, month: MM, year: YYYY}```
 *
 * mode: **'DD MMMM YYYY'** - ```{day: DD, month: 'Month Text', year: YYYY}```
 */
export const dateFormatSlicer = (date: string, mode: 'DD MM YYYY' | 'DD MMMM YYYY') => {
  const dateArr = date.split('.') //YYYY.MM.DD

  if (dateArr.length === 3) {
    if (mode === 'DD MM YYYY') return {day: dateArr[2], month: dateArr[1], year: dateArr[0]}
    else {
      return {
        day: dateArr[2],
        month: formatMessage(`DATE.MONTH.${dateArr[1]}` as TranslationLanguageTypes),
        year: dateArr[0],
      }
    }
  }

  return null
}
