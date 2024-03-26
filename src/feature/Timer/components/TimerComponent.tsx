// React Imports
import React, {FC, useEffect} from 'react'

// React Native Imports
import {StyleSheet, ViewProps} from 'react-native'

// Component Imports
import {Item, Label} from '../../../components'
import {CommonUiProps} from '../../models'
import {useTimer} from '../hooks'
import {TimerStyles} from '../style'

interface TimerProps extends ViewProps, CommonUiProps {
  initialTime: number
  color?: string
}

export const TimerComponent: FC<TimerProps> = ({color, initialTime, style, ...props}) => {
  const {time, set, stop} = useTimer()

  useEffect(() => {
    set(initialTime)

    return () => {
      stop()
    }
  }, [initialTime])

  const renderTime = () => {
    const formattedTime = `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`

    return formattedTime
  }

  return (
    <Item style={StyleSheet.flatten([TimerStyles(props).defaultTimerContainer, style])}>
      <Label fontSize='xl' fontWeight='bold' testID='timerTestId' color={color}>
        {renderTime()}
      </Label>
    </Item>
  )
}
