// React Imports
import {FC, PropsWithChildren} from 'react'

// React Native Imports
import {Text, TextProps, StyleSheet} from 'react-native'

// Component Imports
import {LabelStyles} from '../styles/Label.style'
import {CommonUiProps} from '../../models'
import {FontFamily, FontWeight} from '../models'

interface LabelProps extends TextProps, CommonUiProps, PropsWithChildren {
  textCenter?: boolean
  fontWeight?: FontWeight
  fontFamily?: FontFamily
  letterSpacing?: number
}

export const Label: FC<LabelProps> = ({
  fontSize = 'md',
  variant = 'black',
  textCenter,
  fontWeight,
  fontFamily,
  letterSpacing = undefined,
  color,
  style,
  children,
  ...props
}) => {
  return (
    <Text
      style={StyleSheet.flatten([
        LabelStyles({
          textCenter,
          flex: 1,
          fontSize,
          variant,
          fontWeight,
          fontFamily,
          letterSpacing,
          color,
          includeLatterSpacing: true,
          ...props,
        }).defaultLabelStyle,
        style,
      ])}
      {...props}>
      {children}
    </Text>
  )
}
