// React-Native Imports
import {Platform, StyleSheet} from 'react-native'

// Util and Lib Imports
import {colorFromVariant} from '../../../utils'
import {commonUiStyleProperties} from '../../utils'
import {themeConfig} from '../../../providers'

export const LabelStyles = (props?: any) =>
  StyleSheet.create({
    defaultLabelStyle: {
      textAlign: props?.textCenter ? 'center' : 'auto',
      fontSize: themeConfig.fontSizes[props?.fontSize as Keyof<typeof themeConfig.fontSizes>] ?? 16,
      fontFamily:
        !props?.fontFamily && props?.fontWeight
          ? fontFamilyNormalizer(props?.fontWeight)
          : props?.fontFamily ?? 'Markpro-Medium',
      fontWeight: props?.fontFamily || Platform.OS !== 'ios' ? undefined : props?.fontWeight,
      color: props?.color ?? colorFromVariant(props?.variant),

      ...commonUiStyleProperties(props),
    } as any,
  })
