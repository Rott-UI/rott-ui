// React Imports
import {FC} from 'react'

// React Native Imports
import {Text, StyleSheet} from 'react-native'

// Component Imports
import {LabelStyles} from '../styles/Label.style'
import {LabelProps} from '../models'

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
