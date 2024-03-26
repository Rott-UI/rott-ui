// React Imports
import React, {FC, useEffect, useMemo, useRef} from 'react'

// React Native Imports
import {Animated, Easing, StyleSheet} from 'react-native'

// Component Imports
import {Item} from '../../../components'

// Constant Imports
import {COLOURS} from '../../../constants'

// Util and Lib Imports
import {display} from '../../../utils'

// Model Imports
import {SkeletonStyleProps} from '../models'

// Package Imports
import LinearGradient from 'react-native-linear-gradient'

interface SkeletonProps extends SkeletonStyleProps {
  show: boolean
  noAnimation?: boolean
  testID?: string
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
          useNativeDriver: false,
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
      backgroundColor={COLOURS.GREY100}>
      <Animated.View style={animatedGradientStyle}>
        <LinearGradient
          {...getGradientProps(width!)}
          style={{
            width: width ? display.px(width) : undefined,
            height: height ? display.px(height) : undefined,
          }}
          colors={[COLOURS.GREY100, COLOURS.WHITE, COLOURS.GREY100]}
        />
      </Animated.View>
    </Item>
  )
}
