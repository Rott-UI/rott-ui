// React Imports
import {FC} from 'react'

// React Native Imports
import {Alert, StyleSheet, TextInput} from 'react-native'

// Component Imports
import {InputProps} from '../models'
import {InputStyles, CVCInputStyles} from '../styles'
import {Item} from '../../Item'
import {Icon} from '../../Icon'
import {Pressable} from '../../Pressable'

// Util and Lib Imports
import {formatMessage} from '../../../utils'

export const CVCInput: FC<Omit<InputProps, 'label' | 'placeholder' | 'name'>> = ({
  fontSize,
  onChangeText,
  theme,
  size,
  ...props
}) => {
  const handleTextChange = (inputText: string) => {
    let text = inputText.replace(/[^0-9]/g, '')
    text = text.length > 3 ? text.substring(0, 3) : text
    onChangeText!(text)
  }

  return (
    <Item row>
      <TextInput
        editable={!props.disabled}
        placeholder='***'
        style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
        keyboardType='number-pad'
        maxLength={3}
        onChangeText={handleTextChange}
        {...props}
      />

      {/* TODO: CVC Info butonuna kart arkayüzü eklenmeli */}
      <Pressable
        testID='info-icon-test-id'
        style={CVCInputStyles().infoIcon}
        justifyContentCenter
        alignItemsCenter
        onPress={() =>
          Alert.alert(formatMessage('CVC.INFO.TITLE'), formatMessage('CVC.INFO.DESCRIPTION'), [
            {
              text: formatMessage('COMMON.OK'),
              style: 'cancel',
            },
          ])
        }>
        <Icon name='CHECK_CIRCLE' height={24} width={24} variant='grey-900' />
      </Pressable>
    </Item>
  )
}
