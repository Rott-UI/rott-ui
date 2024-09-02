/* eslint-disable react-native/no-inline-styles */
// React Imports
import React, {FC} from 'react'

// Component Imports
import {Item} from '../../../../Item'
import {Icon} from '../../../../Icon'
import {Label} from '../../../../Label'

// Constant Imports
import {CommonUiProps, Variant} from '../../../../models'

// Utils Imports
import {colorFromVariant} from '../../../../../utils'

export interface InputValidationProps extends CommonUiProps {
  name: string
  variant?: Variant
  message: string
}

export const InputValidation: FC<InputValidationProps> = ({
  name,
  variant = 'danger',
  message,
  ...props
}) => {
  return (
    <Item
      row
      backgroundColor={colorFromVariant(variant as any)}
      paddingVertical={8}
      paddingHorizontal={16}
      alignItemsCenter
      {...props}>
      <Icon name='WARNING_ERROR' width={24} height={24} variant='white' marginRight={8} />

      <Label
        testID={`${name}-error-label-test-id`}
        fontSize='md'
        fontFamily='Markpro-Medium'
        variant='white'
        paddingRight={8}
        flex={1}
        style={{flexWrap: 'wrap'}}>
        {message}
      </Label>
    </Item>
  )
}
