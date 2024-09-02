// React Imports
import {FC, ReactNode} from 'react'

// React Native Imports

// Component Imports
import {InputProps} from '../models'
import {Label} from '../../Label'
import {Item} from '../../Item'
import {Pressable} from '../../Pressable'

// Util and Lib Imports
import {InputStyles} from '../styles'
import {InputStyleNormalizer} from '../utils/inputNormalizer'
import {themeConfig} from '../../../providers'

interface CheckBoxProps extends Omit<InputProps, 'placeholder' | 'name' | 'label'> {
  description?: ReactNode
  checked?: boolean
  onCheckChange?: (checked: boolean) => void
}

export const CheckBoxInput: FC<CheckBoxProps> = ({
  description,
  checked,
  fontSize,
  theme,
  size,
  disabled,
  onCheckChange,
}) => {
  return (
    <Pressable
      flex={0}
      testID='checkbox-input-test-id'
      onPress={() => !disabled && onCheckChange!(!checked)}>
      <Item
        row
        alignItemsCenter
        style={InputStyles({theme, size}).defaultTextInputStyle}
        testID='checkbox-container-test-id'>
        <Item
          borderRadius={8}
          borderColor={checked ? themeConfig.colors['primary'] : themeConfig.colors['grey-200']}
          borderWidth={2}
          backgroundColor='white'
          width={24}
          height={24}
          alignItemsCenter
          justifyContentCenter>
          {checked && (
            <Item
              testID='checkbox-checked-test-id'
              borderWidth={2}
              borderColor={themeConfig.colors['neutral-blue-alpha']}
              borderRadius={4}
              backgroundColor={themeConfig.colors['primary']}
              width={15}
              height={15}
            />
          )}
        </Item>

        {description && typeof description === 'string' && (
          <Label
            testID='checkbox-default-label-test-id'
            fontSize={fontSize ?? InputStyleNormalizer({size}).placeholderSize}
            fontWeight='bold'
            marginLeft={12}
            variant={theme === 'dark' ? 'white' : 'grey-900'}>
            {description}
          </Label>
        )}

        {description && typeof description !== 'string' && <>{description}</>}
      </Item>
    </Pressable>
  )
}
