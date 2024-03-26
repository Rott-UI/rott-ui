import {useEffect, useRef} from 'react'

type CallbackFunction = () => void

export const useInterval = (
  callback: CallbackFunction,
  delay: Nullable<number>,
  reset?: boolean
): void => {
  const savedCallback = useRef<Nullable<CallbackFunction>>(null)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) savedCallback.current()
    }

    let intervalId: Nullable<NodeJS.Timeout | null> = null

    if (delay !== null) intervalId = setInterval(tick, delay)
    if (intervalId !== null && reset) clearInterval(intervalId)

    return () => {
      if (intervalId !== null) clearInterval(intervalId)
    }
  }, [delay, reset])
}
