// React Imports
import {FC} from 'react'

// React Native Imports
import {
  ImageBackground as RNImageBackground,
  ImageBackgroundProps as RNImageBackgroundProps,
  StyleSheet,
} from 'react-native'

// Component Imports
import {ImageBackgroundStyles} from '../styles'

// Package Imports
import {SafeAreaView} from 'react-native-safe-area-context'
import {themeConfig} from '../../../providers'

interface ImageBackgroundProps extends RNImageBackgroundProps {
  disableSafeAreaView?: boolean
}

export const ImageBackground: FC<ImageBackgroundProps> = ({
  disableSafeAreaView,
  source,
  style,
  children,
  ...props
}) => {
  const hasDynamicIsland = themeConfig.options.hasDynamicIsland
  const hasNotch = themeConfig.options.hasNotch

  return (
    <RNImageBackground
      style={StyleSheet.flatten([ImageBackgroundStyles().defaultImageContainerStyle, style])}
      source={source}
      {...props}>
      {!disableSafeAreaView && (hasDynamicIsland || hasNotch) && <SafeAreaView edges={['top']} />}

      {children}
    </RNImageBackground>
  )
}
