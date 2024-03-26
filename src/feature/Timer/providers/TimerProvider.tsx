// React Imports
import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
  useMemo,
  useEffect,
} from 'react'

// Timer Imports
import {TimerContext} from '../contexts'
import {useInterval, useTimer} from '../hooks'
import {timerRef} from '..'

export const TimerProvider: FC<PropsWithChildren> = ({children}) => {
  const initialTimeRef = useRef(0)
  const intervalIDRef = useRef<any | null>(null)

  const [time, setTime] = useState(0)
  const [finished, setFinished] = useState(false)
  const [countdownTimer, setCountdownTimer] = useState(false)
  const [circleTimer, setCircleTimer] = useState(false)

  const set = useMemo(() => {
    return (initialTime: number) => {
      setTime(initialTime)
      initialTimeRef.current = initialTime
    }
  }, [setTime, initialTimeRef])

  const countdown = useCallback(() => {
    setCountdownTimer(true)
    setFinished(false)
  }, [time])

  const circle = useCallback(() => {
    if (time === 0) {
      setTime(initialTimeRef.current)
      setCircleTimer(true)
    } else setCircleTimer(true)
  }, [initialTimeRef, time])

  const stop = () => {
    setCountdownTimer(false)
    setFinished(true)
  }

  const reset = useCallback(() => {
    setTime(0)
    setCountdownTimer(false)
    setFinished(false)
  }, [])

  const restart = useCallback(() => {
    setTime(initialTimeRef.current)
    setCountdownTimer(true)
    setFinished(false)
  }, [])

  useEffect(() => {
    if (finished) {
      clearInterval(intervalIDRef.current)
      intervalIDRef.current = null
      stop()
    }
  }, [finished, countdownTimer, time, intervalIDRef])

  intervalIDRef.current = useInterval(
    () => {
      if (time === 0) return stop()
      else if ((countdownTimer && time > 0) || (circleTimer && time > 0))
        setTime((prevTime) => prevTime - 1)
      else if (circleTimer && time === 0) circle()
    },
    1000,
    finished
  )

  const contextValue = useMemo(() => {
    return {
      time,
      set,
      reset,
      restart,
      countdown,
      circle,
      stop,
      finished,
    }
  }, [time, set, reset, restart, countdown, circle, stop])

  return (
    <TimerContext.Provider value={contextValue}>
      <InitializeTimerRef />
      {children}
    </TimerContext.Provider>
  )
}

const InitializeTimerRef = () => {
  const timerHook = useTimer()
  timerRef.current = timerHook

  return null
}
