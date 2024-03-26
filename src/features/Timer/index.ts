export * from './components'
export * from './providers'
export * from './hooks'

// React Imports
import {MutableRefObject, createRef} from 'react'

// Alert Dialog Imports
import {useTimer} from './hooks'

type TimerService = ReturnType<typeof useTimer>

export const timerRef = createRef<TimerService>() as MutableRefObject<TimerService>

export const Timer: TimerService = {
  time: timerRef.current?.time,
  finished: timerRef.current?.finished,
  restart: timerRef.current?.restart,
  countdown: () => timerRef.current?.countdown(),
  stop: () => timerRef.current?.stop(),
  reset: () => timerRef.current?.reset(),
  circle: () => timerRef.current?.circle(),
  set: (initialTime: number) => timerRef.current?.set(initialTime),
}
