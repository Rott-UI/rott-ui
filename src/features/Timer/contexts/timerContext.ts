// React Imports
import {createContext} from 'react'
import {TimerContextModel} from '../models'

export const TimerContext = createContext<TimerContextModel>({
  time: 0,
  finished: false,
  set: () => {},
  reset: () => {},
  restart: () => {},
  countdown: () => {},
  circle: () => {},
  stop: () => {},
})
