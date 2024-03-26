// React Imports
import {FC} from 'react'

// React Native Imports
import {StyleSheet} from 'react-native'

// Component Imports
import {InputProps} from '../models'
import {InputStyles} from '../styles'

// Util and Lib Imports
import {formatMessage} from '../../../utils'

//Package Imports
import {MaskedTextInput} from 'react-native-mask-text'

export const ExpireDateInput: FC<Omit<InputProps, 'label' | 'placeholder' | 'name'>> = ({
  fontSize,
  onChangeText,
  theme,
  size,
  ...props
}) => {
  //TODO: formatMMYY refactor edilebilir mi?
  const formatMMYY = (inputText: string) => {
    //Numerik karakter filtresi
    inputText = inputText.replace(/[^0-9]/g, '')

    const regexPattern = /^(\d{2})(\d{2})$/
    const matchFormatValidation = inputText.match(regexPattern)

    if (!matchFormatValidation) {
      if (inputText.length === 2) return parseInt(inputText, 10) > 12 ? '12' : inputText

      return inputText
    }

    const month = matchFormatValidation[1]
    const year = matchFormatValidation[2]

    const currentYear = new Date().getFullYear() % 100

    const formattedMonth = parseInt(month, 10) > 12 ? '12' : month
    const formattedYear = parseInt(year, 10) < currentYear ? currentYear : year

    return `${formattedMonth}${formattedYear}`
  }

  return (
    <MaskedTextInput
      mask='99/99'
      placeholder={formatMessage('EXPIRE.DATE.PLACEHOLDER')}
      keyboardType='number-pad'
      onChangeText={(text, rawText) => onChangeText!(formatMMYY(rawText))}
      style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
      {...props}
    />
  )
}
