// React Native Imports
import {PanResponder, Animated} from 'react-native'

export const PanResponderAnimation = (
  modalHeight: number,
  translateY: Animated.Value,
  animationCloseCallBack: any
) =>
  PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (gestureResponderEvent, gestureState) => {
      if (gestureState.dy > 10) translateY.setValue(gestureState.dy)
    },
    onPanResponderRelease: (gestureResponderEvent, gestureState) => {
      if (gestureState.dy > 100) {
        Animated.timing(translateY, {
          toValue: modalHeight,
          duration: 250,
          useNativeDriver: true,
        }).start(() => {
          !!animationCloseCallBack && animationCloseCallBack()
        })
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start()
      }
    },
  })
