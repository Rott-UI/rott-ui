// React Imports
import {FC, useEffect, useRef, useState} from 'react'

// React Native Imports
import {ColorValue, StyleSheet, TextInput} from 'react-native'

// Component Imports
import {InputProps} from '../models'
import {InputStyles} from '../styles'
import {Item} from '../../Item'
import {Label} from '../../Label'
import {Pressable} from '../../Pressable'

// Package Imports
import {MaskedTextInput, MaskedTextProps} from 'react-native-mask-text'
import {AmountInputStyles} from '../styles/AmountInput.style'
import {Icon} from '../../Icon'
import {InputStyleNormalizer} from '../utils/inputNormalizer'
import {COLOURS} from '../../../constants'

export const AmountInput: FC<Omit<InputProps, 'placeholder' | 'label' | 'name'>> = ({
  fontSize,
  onChangeText,
  value,
  theme,
  size,
  placeholderTextColor,
  ...props
}) => {
  const amountRef = useRef<TextInput>(null)
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('')

  useEffect(() => {
    const initialAmount = value?.split(',')[0]
    const initialCurrency = value?.split(',')[1]

    setAmount(initialAmount ?? '')
    setCurrency(initialCurrency ?? '')
  }, [])

  useEffect(() => {
    handleTextChange(amount, currency)
  }, [amount, currency])

  const replaceTextWithNumberOrEmpty = (text: string) => text.replace(/[^0-9]/g, '')

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
      ? COLOURS.WHITE
      : !amount || (amount === '0' && (!currency || currency === '' || currency === '00'))
        ? COLOURS.GREY200
        : COLOURS.GREY900

  return (
    <Item relative onTouchStart={() => amountRef.current?.focus()}>
      <Item row {...props}>
        <MaskedTextInput
          ref={amountRef}
          nativeID='amount-native-id'
          testID='amount-test-id'
          type={
            !amount || (amount === '0' && (!currency || currency === '' || currency === '00'))
              ? undefined
              : 'currency'
          }
          placeholder='0'
          maxLength={11}
          options={{
            groupSeparator: '.',
            precision: 0,
          }}
          value={amount}
          keyboardType='number-pad'
          onChangeText={(text, rawText) => setAmount(replaceTextWithNumberOrEmpty(rawText))}
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

        <MaskedTextInput
          testID='currency-test-id'
          mask='99'
          maxLength={2}
          placeholder='00'
          value={currency}
          keyboardType='number-pad'
          onChangeText={(text, rawText) => setCurrency(replaceTextWithNumberOrEmpty(rawText))}
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
          color={placeholderColorNormalizer}
          mode='fill'
          noStroke
        />
      </Item>
    </Item>
  )
}
