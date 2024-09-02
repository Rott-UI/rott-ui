/* eslint-disable indent */

// Model Imports
import {Size} from '../../../models'

// Provider Imports
import {themeConfig} from '../../../providers'

// Util and Lib Imports
import {display} from '../../../utils'

interface InputStyleProps {
  height: number
  paddingHorizontal: number
  placeholderSize: number
  bottomElementPadding: number
  icon: {
    height: number
    width: number
    paddingBottom: number
  }
}

interface InputStyleNormalizerProps {
  size?: Size
  placeholderSize?: Keyof<typeof themeConfig.fontSizes> | number
}

export function InputStyleNormalizer({
  size = 'lg',
  placeholderSize,
}: InputStyleNormalizerProps): InputStyleProps {
  switch (size) {
    case 'xs':
    case 'sm':
      return {
        height: display.normalize(40, 'height'),
        paddingHorizontal: display.normalize(16, 'height'),
        placeholderSize:
          typeof placeholderSize === 'number' ? placeholderSize : themeConfig.fontSizes.sm,
        bottomElementPadding: display.normalize(6, 'height'),
        icon: {
          height: 18,
          width: 18,
          paddingBottom: 8,
        },
      }
    case 'lg':
    case 'xl':
    case '2xl':
    case 'full':
      return {
        height: display.normalize(56, 'height'),
        paddingHorizontal: display.normalize(16, 'height'),
        placeholderSize:
          typeof placeholderSize === 'number' ? placeholderSize : themeConfig.fontSizes.xl,
        bottomElementPadding: display.normalize(12, 'height'),
        icon: {
          height: 24,
          width: 24,
          paddingBottom: 16,
        },
      }

    case 'md':
    default:
      return {
        height: display.normalize(48, 'height'),
        paddingHorizontal: display.normalize(16, 'height'),
        placeholderSize:
          typeof placeholderSize === 'number' ? placeholderSize : themeConfig.fontSizes.lg,
        bottomElementPadding: display.normalize(8, 'height'),
        icon: {
          height: 24,
          width: 24,
          paddingBottom: 12,
        },
      }
  }
}
