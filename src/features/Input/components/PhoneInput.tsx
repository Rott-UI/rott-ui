// React Imports
import {FC} from 'react'

// React Native Imports
import {StyleSheet} from 'react-native'

// Component Imports
import {InputProps} from '../models'
import {InputStyles} from '../styles'
import {Icon} from '../../Icon'

// Util and Lib Imports
import {themeConfig} from '../../../providers'

//Package Imports
import {MaskedTextInput} from 'react-native-mask-text'
import {Item} from '../../Item'
import {InputStyleNormalizer} from '../utils/inputNormalizer'

export const PhoneInput: FC<Omit<InputProps, 'placeholder' | 'label' | 'name'>> = ({
  fontSize,
  onChangeText,
  theme,
  disabled,
  size,
  ...props
}) => {
  const handleTextChange = (inputText: string) => {
    const formattedText = inputText.replace(/^(\+90|90)/, '0').replace(/[^0-9]/g, '')
    onChangeText!(formattedText)
  }

  return (
    <Item row>
      <MaskedTextInput
        testID='phone-input-test-id'
        editable={!disabled}
        mask='0(999) 999 99 99'
        placeholder='0(999) 999 99 99'
        keyboardType='number-pad'
        onChangeText={(text, rawText) => handleTextChange(rawText)}
        style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
        {...props}
      />
      <Item absolute right={0} bottom={InputStyleNormalizer({size}).icon.paddingBottom}>
        <Icon
          name='PHONE_BOOK'
          width={InputStyleNormalizer({size}).icon.width}
          height={InputStyleNormalizer({size}).icon.height}
          color={themeConfig.colors['grey-200']}
          mode='stroke'
        />
      </Item>
    </Item>
  )
}
