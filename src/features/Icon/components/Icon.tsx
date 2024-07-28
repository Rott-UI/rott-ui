// React Imports
import React, {FC} from 'react'

// Feature Imports
import {Item} from '../../Item'
import {IconProps} from '../models'
import * as Icons from '../../../constants/Icons'

// Package Imports
import display from '../../../utils/display'
import {colorFromVariant} from '../../../utils'

export const Icon: FC<IconProps> = ({
  name,
  width = 16,
  height = 16,
  variant = 'white',
  strokeWidth = 1,
  mode = 'stroke',
  noStroke,
  color,
  ...props
}) => {
  const IconComponent = Icons[name]

  if (!IconComponent) return null

  return (
    <Item {...props}>
      <IconComponent
        fill={mode === 'fill' ? color ?? colorFromVariant(variant) : 'transparent'}
        stroke={
          mode === 'stroke'
            ? color ?? colorFromVariant(variant)
            : color ?? colorFromVariant(variant)
        }
        strokeWidth={
          mode === 'fill' && noStroke
            ? 0
            : mode === 'fill'
            ? 0.5
            : mode === 'stroke' && noStroke
            ? 0
            : strokeWidth
        }
        strokeLinecap='round'
        strokeLinejoin='round'
        width={display.px(width)}
        height={display.px(height)}
      />
    </Item>
  )
}
