// React Imports
import {FC, useState} from 'react'

// React Native Imports
import {StyleSheet, TextInput} from 'react-native'

// Component Imports
import {InputProps} from '../models'
import {InputStyles, PasswordInputStyles} from '../styles'
import {Item} from '../../Item'
import {Icon} from '../../Icon'
import {Pressable} from '../../Pressable'

export const PasswordInput: FC<Omit<InputProps, 'label' | 'placeholder' | 'name'>> = ({
  fontSize,
  onChangeText,
  secureTextEntry = true,
  theme,
  size,
  value,
  ...props
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry)
  const handleTextChange = (inputText: string) => {
    onChangeText!(inputText.replace(/[^0-9]/g, ''))
  }

  return (
    <Item row>
      <TextInput
        placeholder='*******'
        style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
        keyboardType='number-pad'
        secureTextEntry={isSecure}
        onChangeText={handleTextChange}
        value={value}
        {...props}
      />

      <Pressable
        testID='show-password-icon-test-id'
        style={PasswordInputStyles().showPasswordIcon}
        justifyContentCenter
        alignItemsCenter
        onPress={() => {
          setIsSecure(!isSecure)
        }}>
        <Icon
          variant={theme === 'dark' ? 'white' : !value ? 'grey-200' : 'grey-900'}
          name={isSecure ? 'EYE_DISABLE' : 'EYE'}
          height={24}
          width={24}
          mode='stroke'
          strokeWidth={1.5}
        />
      </Pressable>
    </Item>
  )
}
