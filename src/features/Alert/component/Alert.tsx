// React Imports
import React, {FC} from 'react'

// Feature Imports
import {Icon} from '../../Icon'
import {Item} from '../../Item'
import {Label} from '../../Label'
import {AlertModel} from '../models'

// Util and Lib Imports
import {colorFromVariant} from '../../../utils'

export const Alert: FC<AlertModel> = ({text, size, variant, leftIcon, rightIcon}) => {
  return (
    <Item
      testID='alert-test-id'
      row
      size={size}
      backgroundColor={colorFromVariant(variant)}
      paddingHorizontal={16}
      paddingVertical={8}
      alignItemsCenter>
      {leftIcon && (
        <Icon
          testID='alert-left-icon'
          width={24}
          height={24}
          mode='stroke'
          strokeWidth={1.5}
          variant='white'
          marginRight={8}
          {...leftIcon}
        />
      )}

      <Label
        width={330}
        height={16}
        variant='white'
        size='sm'
        {...(typeof text === 'object' ? {...text} : null)}>
        {typeof text === 'string' ? text : text.text}
      </Label>

      {rightIcon && (
        <Icon
          testID='alert-right-icon'
          width={24}
          height={24}
          mode='stroke'
          strokeWidth={1.5}
          variant='white'
          marginRight={8}
          {...rightIcon}
        />
      )}
    </Item>
  )
}
