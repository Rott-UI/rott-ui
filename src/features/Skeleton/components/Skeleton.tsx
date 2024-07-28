// React Imports
import React, {FC, useEffect, useMemo, useRef} from 'react'

// React Native Imports
import {Animated, Easing, StyleSheet} from 'react-native'

// Feature Imports
import {Item} from '../../Item'

import display from '../../../utils/display'
// Util and Lib Imports

// Model Imports
import {SkeletonStyleProps} from '../models'

// Package Imports
import LinearGradient from 'react-native-linear-gradient'

// Provider Imports
import {themeConfig} from '../../../providers'

interface SkeletonProps extends SkeletonStyleProps {
  show: boolean
  noAnimation?: boolean
  testID?: string
  colors?: (string | number)[]
  backgroundColor?: string
}

/**
 *
 * @param width Genislik - **Zorunlu**
 * @param height Yukseklik - **Zorunlu**
 * @param radius Radius - `default: 4px`
 * @param show Renderlanma durumu - `default: false`
 * @returns
 */
export const Skeleton: FC<SkeletonProps> = ({
  testID,
  width,
  height,
  radius = 4,
  noAnimation = false,
  show = false,
  colors = [
    themeConfig.colors['grey-100'],
    themeConfig.colors['white'],
    themeConfig.colors['grey-100'],
  ],
  backgroundColor = themeConfig.colors['grey-100'],
}) => {
  const animatedValueRef = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (!show) return

    if (!noAnimation) {
      const loop = Animated.loop(
        Animated.timing(animatedValueRef, {
          toValue: 1,
          duration: 1400,
          easing: Easing.ease,
          useNativeDriver: true,
        })
      )
      loop.start()

      return () => loop.stop()
    }
  }, [show])

  const animatedGradientStyle = useMemo(() => {
    const animationWidth = display.px(width as number)

    return {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'row' as const,
      transform: [
        {
          translateX: animatedValueRef.interpolate({
            inputRange: [0, 1],
            outputRange: [-animationWidth, animationWidth],
          }),
        },
      ],
    }
  }, [])

  const getGradientProps = (_width: number) => ({
    start: {x: 0, y: 0},
    end: {x: 1, y: 0},
    style: {...StyleSheet.absoluteFillObject, _width},
  })

  if (!show) return null

  return (
    <Item
      testID={testID}
      width={width}
      height={height}
      borderRadius={radius}
      overflowHidden
      backgroundColor={backgroundColor}>
      <Animated.View style={animatedGradientStyle}>
        <LinearGradient
          {...getGradientProps(width!)}
          style={{
            width: width ? display.px(width) : undefined,
            height: height ? display.px(height) : undefined,
          }}
          colors={colors}
        />
      </Animated.View>
    </Item>
  )
}
