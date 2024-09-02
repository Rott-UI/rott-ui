// React Imports
import {FC, useCallback, useEffect, useRef, useState} from 'react'

// React Native Imports
import {StyleSheet, TextInput} from 'react-native'

// Component Imports
import {InputProps} from '../models'
import {InputStyles} from '../styles'
import {Item} from '../../Item'
import {Label} from '../../Label'
import {Icon} from '../../Icon'

// Util and Lib Imports
import {themeConfig} from '../../../providers'

// Package Imports
import {AmountInputStyles} from '../styles/AmountInput.style'
import {InputStyleNormalizer} from '../utils/inputNormalizer'

export const AmountInput: FC<Omit<InputProps, 'placeholder' | 'label' | 'name'>> = ({
  fontSize,
  onChangeText,
  value,
  theme,
  disabled,
  size,
  ...props
}) => {
  const amountRef = useRef<TextInput>(null)
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('')

  const resetInternalStates = useCallback(() => {
    setAmount('')
    setCurrency('')
    onChangeText!('0.00')
  }, [])

  const replaceTextWithNumberOrEmpty = (text: string) =>
    text.replace(/[^0-9]/g, '').replace(/^0+/, '')

  const amountNormalizer = (text: string) => {
    if (!text) return resetInternalStates()

    const replacedAmount = replaceTextWithNumberOrEmpty(text)
    const reversedText = replacedAmount.split('').reverse().join('') ?? ''
    const dottedText = reversedText?.match(/.{1,3}/g)?.join('.')
    const normalizedText = dottedText?.split('').reverse().join('')

    setAmount(normalizedText ?? '')
  }

  const handleTextChange = (inputTextAmount: string, inputTextCurrency: string) => {
    if (!inputTextAmount && !inputTextCurrency) return

    let amountFormat = replaceTextWithNumberOrEmpty(inputTextAmount)
    let currencyFormat = replaceTextWithNumberOrEmpty(inputTextCurrency)

    amountFormat = amountFormat.length === 0 ? '0' : amountFormat

    currencyFormat = currencyFormat.length === 0 ? '00' : currencyFormat
    currencyFormat = currencyFormat.length === 1 ? `${currencyFormat}0` : currencyFormat

    onChangeText!(`${amountFormat}.${currencyFormat}`)
  }

  const placeholderColorNormalizer =
    theme === 'dark'
      ? themeConfig.colors['white']
      : (!amount && !currency) ||
        ((amount === '0' || amount === '') && (!currency || currency === '' || currency === '00'))
      ? themeConfig.colors['grey-200']
      : themeConfig.colors['grey-900']

  useEffect(() => {
    const initialAmount = value?.split(',')[0]
    const initialCurrency = value?.split(',')[1]

    setAmount(initialAmount ?? '')
    setCurrency(initialCurrency ?? '')
  }, [])

  useEffect(() => {
    if (value === '' || !value || value === '0') resetInternalStates()
  }, [value])

  useEffect(() => {
    handleTextChange(amount, currency)
  }, [amount, currency])

  return (
    <Item relative onTouchStart={() => amountRef.current?.focus()}>
      <Item row {...props}>
        <TextInput
          ref={amountRef}
          nativeID='amount-native-id'
          testID='amount-test-id'
          editable={!disabled}
          placeholder='0'
          maxLength={11}
          value={amount}
          keyboardType='number-pad'
          onChangeText={(text) => amountNormalizer(text)}
          style={StyleSheet.flatten([
            InputStyles({fontSize, theme, size}).defaultTextInputStyle,
            AmountInputStyles().amountInputStyle,
            {
              color: placeholderColorNormalizer,
            },
          ])}
          placeholderTextColor={placeholderColorNormalizer}
        />

        <Item
          justifyContentFlexEnd
          paddingBottom={InputStyleNormalizer({size}).bottomElementPadding}>
          <Label
            fontSize={
              fontSize ??
              InputStyleNormalizer({
                size,
              }).placeholderSize
            }
            fontWeight='bold'
            color={placeholderColorNormalizer as string}>
            ,
          </Label>
        </Item>

        <TextInput
          testID='currency-test-id'
          maxLength={2}
          placeholder='00'
          value={currency}
          keyboardType='number-pad'
          onChangeText={(text) => setCurrency(replaceTextWithNumberOrEmpty(text).substring(0, 2))}
          onFocus={() => (currency === '00' ? setCurrency('') : undefined)}
          onBlur={() => (currency.isEmpty() || currency === '0' ? setCurrency('00') : undefined)}
          style={StyleSheet.flatten([
            InputStyles({fontSize, theme, size}).defaultTextInputStyle,
            AmountInputStyles().amountInputStyle,
            {
              color: placeholderColorNormalizer,
            },
          ])}
          placeholderTextColor={placeholderColorNormalizer}
        />
      </Item>

      <Item absolute right={0} bottom={InputStyleNormalizer({size}).icon.paddingBottom}>
        <Icon
          name='TL'
          width={InputStyleNormalizer({size}).icon.width}
          height={InputStyleNormalizer({size}).icon.height}
          color={themeConfig.colors['grey-200']}
          mode='fill'
          noStroke
        />
      </Item>
    </Item>
  )
}
