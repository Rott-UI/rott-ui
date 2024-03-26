/* eslint-disable indent */
// React Imports
import React, {FC} from 'react'

// Component Imports
import * as Icons from '../../../constants/Icons'
import {Item} from '../../../components/Item'

// Package Imports
import {colourFromVariant, display} from '../../../utils'
import {IconProps} from '../models'

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
        fill={mode === 'fill' ? color ?? colourFromVariant(variant) : 'transparent'}
        stroke={
          mode === 'stroke'
            ? color ?? colourFromVariant(variant)
            : color ?? colourFromVariant(variant)
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
