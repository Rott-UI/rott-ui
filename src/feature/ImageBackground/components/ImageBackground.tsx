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

// Feature Imports
import {getHasDynamicIslandState, getHasNotchState} from '../../../features/app/appSelector'

// Hook Imports
import {useAppSelector} from '../../../hooks'

// Package Imports
import {SafeAreaView} from 'react-native-safe-area-context'

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
  const hasDynamicIsland = useAppSelector(getHasDynamicIslandState)
  const hasNotch = useAppSelector(getHasNotchState)

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
