// React Imports
import React, {FC} from 'react'

// Component Imports
import {Item} from '../../Item'

// Feature Imports
import {IconProps} from '../models'

// Package Imports
import {display} from '../../../utils'
import {colorFromVariant} from '../../../utils'

import {themeConfig} from '../../../providers'

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
  const IconComponent = themeConfig.icons[name]

  if (!IconComponent) return null

  return (
    <Item {...props} hitSlop={undefined}>
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
