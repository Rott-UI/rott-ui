// React Imports
import {useContext, useMemo} from 'react'

// Context Imports
import {TimerContext} from '../contexts'

export const useTimer = () => {
  const {time, finished, countdown, circle, reset, restart, stop, set} = useContext(TimerContext)

  const timerHook = useMemo(
    () => ({
      time,
      finished,
      set,
      reset,
      restart,
      countdown,
      circle,
      stop,
    }),
    [time, set, reset, countdown, circle, stop]
  )

  return timerHook
}
