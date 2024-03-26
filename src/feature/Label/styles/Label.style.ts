// React-Native Imports
import {Platform, StyleSheet} from 'react-native'

// Util and Lib Imports
import {colourFromVariant, fontFamilyNormalizer, fontSizeNormalizer} from '../../../utils'
import {commonUiStyleProperties} from '../../utils'

export const LabelStyles = (props?: any) =>
  StyleSheet.create({
    defaultLabelStyle: {
      textAlign: props?.textCenter ? 'center' : 'auto',
      fontSize: fontSizeNormalizer(props?.fontSize),
      fontFamily:
        !props?.fontFamily && props?.fontWeight
          ? fontFamilyNormalizer(props?.fontWeight)
          : props?.fontFamily ?? 'Markpro-Medium',
      fontWeight: props?.fontFamily || Platform.OS !== 'ios' ? undefined : props?.fontWeight,
      color: props?.color ?? colourFromVariant(props?.variant),

      ...commonUiStyleProperties(props),
    } as any,
  })
