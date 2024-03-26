export interface TimerContextModel {
  time: number
  finished: boolean
  set: (initialTime: number) => void
  reset: () => void
  restart: () => void
  countdown: () => void
  circle: () => void
  stop: () => void
}
