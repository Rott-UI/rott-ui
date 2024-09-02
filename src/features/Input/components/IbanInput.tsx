// React Imports
import {FC, useState} from 'react'

// React Native Imports
import {Platform, StyleSheet} from 'react-native'

// Component Imports
import {InputProps} from '../models'
import {InputStyles} from '../styles'
import {Item} from '../../Item'
import {Icon} from '../../Icon'
import {Pressable} from '../../Pressable'

// Util and Lib Imports
import {themeConfig} from '../../../providers'

//Package Imports
import {MaskedTextInput} from 'react-native-mask-text'
import {InputStyleNormalizer} from '../utils/inputNormalizer'

export const IbanInput: FC<Omit<InputProps, 'placeholder' | 'label' | 'name'>> = ({
  fontSize,
  onChangeText,
  theme,
  disabled,
  size,
  ...props
}) => {
  const [closeIconVisible, setCloseIconVisible] = useState(false)

  const handleTextChange = (inputText: string) => {
    const isValue = inputText === '' ? '' : 'TR' + inputText.replace(/[^0-9]/g, '')
    onChangeText!(isValue)
    setCloseIconVisible(isValue !== '')
  }

  return (
    <Item row>
      <MaskedTextInput
        editable={!disabled}
        testID='iban-input-test-id'
        mask='TR99 9999 9999 9999 9999 9999 99'
        placeholder='TR00 0000 0000 0000 0000 0000 00'
        keyboardType='number-pad'
        onChangeText={(text, rawText) => {
          handleTextChange(rawText)
        }}
        style={StyleSheet.flatten([
          InputStyles({
            fontSize,
            letterSpacing: Platform.OS === 'android' ? -1.5 : undefined,
            theme,
            size,
          }).defaultTextInputStyle,
        ])}
        numberOfLines={1}
        {...props}
      />

      {closeIconVisible && (
        <Item absolute right={0} bottom={InputStyleNormalizer({size}).icon.paddingBottom}>
          <Pressable testID='clear-iban-icon-test-id' onPress={() => handleTextChange('')}>
            <Icon
              name='REMOVE_CIRCLE'
              mode='fill'
              variant='grey-200'
              width={InputStyleNormalizer({size}).icon.width}
              height={InputStyleNormalizer({size}).icon.height}
            />
          </Pressable>
        </Item>
      )}

      {!closeIconVisible && (
        <Item absolute right={0} bottom={InputStyleNormalizer({size}).icon.paddingBottom}>
          <Icon
            name='QR_TRANSFER'
            width={InputStyleNormalizer({size}).icon.width}
            height={InputStyleNormalizer({size}).icon.height}
            color={themeConfig.colors['grey-200']}
            mode='stroke'
          />
        </Item>
      )}
    </Item>
  )
}
