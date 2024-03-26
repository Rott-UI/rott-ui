// React Imports
import React from 'react'

// Component Imports
import {TimerComponent} from '../components'
import {Timer} from '..'

//Util and Lib Imports
import {render, act} from '../../../utils'

describe('Timer -> Custom Component', () => {
  const timerInitialTime = 180

  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('timer ilk render anında snapshot ile eşleşmeli', () => {
    const renderedTimer = render(<TimerComponent initialTime={timerInitialTime} />)

    expect(renderedTimer).toMatchSnapshot()
  })

  it('initial time doğru render olmalı', async () => {
    const {getByTestId, rerender} = render(<TimerComponent initialTime={timerInitialTime} />)

    await act(() => Timer.countdown())

    await act(() => rerender(<TimerComponent initialTime={timerInitialTime} />))
    const label = getByTestId('timerTestId')

    expect(label).toHaveProp('children', '3:00')
  })

  it('countdown timer azalan sekilde calismali', async () => {
    const {getByTestId, rerender} = render(<TimerComponent initialTime={timerInitialTime} />)
    await act(() => Timer.countdown())
    await act(() => rerender(<TimerComponent initialTime={timerInitialTime} />))

    const label = getByTestId('timerTestId')

    expect(label).toHaveProp('children', '3:00')
    await act(() => jest.advanceTimersByTime(1000))
    expect(label).toHaveProp('children', '2:59')
    await act(() => jest.advanceTimersByTime(2000))
    expect(label).toHaveProp('children', '2:57')
  })

  it('countdown timer tamamlandığında 0:00 olmalı', async () => {
    const {getByTestId, rerender} = render(<TimerComponent initialTime={timerInitialTime} />)
    await act(() => Timer.countdown())
    await act(() => rerender(<TimerComponent initialTime={timerInitialTime} />))

    const label = getByTestId('timerTestId')

    expect(label).toHaveProp('children', '3:00')
    await act(() => jest.advanceTimersByTime(180 * 1000))
    expect(label).toHaveProp('children', '0:00')
  })

  it('countdown timer calisirken stop olabilmeli', async () => {
    const {getByTestId, rerender} = render(<TimerComponent initialTime={timerInitialTime} />)
    await act(() => Timer.countdown())
    await act(() => rerender(<TimerComponent initialTime={timerInitialTime} />))

    const label = getByTestId('timerTestId')

    expect(label).toHaveProp('children', '3:00')
    await act(() => jest.advanceTimersByTime(10 * 1000))
    expect(label).toHaveProp('children', '2:50')
    await act(() => Timer.stop())
    expect(label).toHaveProp('children', '2:50')
  })

  it('countdown timer calisirken reset olabilmeli', async () => {
    const {getByTestId, rerender} = render(<TimerComponent initialTime={timerInitialTime} />)
    await act(() => Timer.countdown())
    await act(() => rerender(<TimerComponent initialTime={timerInitialTime} />))

    const label = getByTestId('timerTestId')

    expect(label).toHaveProp('children', '3:00')
    await act(() => jest.advanceTimersByTime(10 * 1000))
    expect(label).toHaveProp('children', '2:50')
    await act(() => Timer.reset())
    expect(label).toHaveProp('children', '0:00')
  })

  it('circle timer 0:00 olabilmeli', async () => {
    const {getByTestId, rerender} = render(<TimerComponent initialTime={timerInitialTime} />)
    await act(() => Timer.circle())
    await act(() => rerender(<TimerComponent initialTime={timerInitialTime} />))

    const label = getByTestId('timerTestId')

    expect(label).toHaveProp('children', '3:00')
    await act(() => jest.advanceTimersByTime(180 * 1000))
    expect(label).toHaveProp('children', '0:00')
  })

  it('circle timer 0:00 oldugunda yeniden baslamali', async () => {
    const {getByTestId, rerender} = render(<TimerComponent initialTime={timerInitialTime} />)
    await act(() => Timer.circle())
    await act(() => rerender(<TimerComponent initialTime={timerInitialTime} />))

    const label = getByTestId('timerTestId')

    expect(label).toHaveProp('children', '3:00')
    await act(() => jest.advanceTimersByTime(180 * 1000))
    expect(label).toHaveProp('children', '0:00')
    rerender(<TimerComponent initialTime={timerInitialTime} />)
    await act(() => Timer.circle())
    await act(() => jest.advanceTimersByTime(1 * 1000))
    expect(label).toHaveProp('children', '2:59')
  })

  it('circle timer calisirken stop olabilmeli', async () => {
    const {getByTestId, rerender} = render(<TimerComponent initialTime={timerInitialTime} />)
    await act(() => Timer.circle())
    await act(() => rerender(<TimerComponent initialTime={timerInitialTime} />))

    const label = getByTestId('timerTestId')

    expect(label).toHaveProp('children', '3:00')
    await act(() => jest.advanceTimersByTime(10 * 1000))
    expect(label).toHaveProp('children', '2:50')
    await act(() => Timer.stop())
    expect(label).toHaveProp('children', '2:50')
  })

  it('circle timer calisirken stop olmuşken tekrar start olabilmeli', async () => {
    const {getByTestId, rerender} = render(<TimerComponent initialTime={timerInitialTime} />)
    await act(() => Timer.circle())
    await act(() => rerender(<TimerComponent initialTime={timerInitialTime} />))

    const label = getByTestId('timerTestId')

    expect(label).toHaveProp('children', '3:00')
    await act(() => jest.advanceTimersByTime(10 * 1000))
    expect(label).toHaveProp('children', '2:50')
    await act(() => Timer.stop())
    expect(label).toHaveProp('children', '2:50')
    await act(() => Timer.circle())
    await act(() => jest.advanceTimersByTime(10 * 1000))
    rerender(<TimerComponent initialTime={timerInitialTime} />)
    expect(label).toHaveProp('children', '2:50')
  })

  it('circle timer calisirken reset olabilmeli', async () => {
    const {getByTestId, rerender} = render(<TimerComponent initialTime={timerInitialTime} />)
    await act(() => Timer.circle())
    await act(() => rerender(<TimerComponent initialTime={timerInitialTime} />))

    const label = getByTestId('timerTestId')

    expect(label).toHaveProp('children', '3:00')
    await act(() => jest.advanceTimersByTime(10 * 1000))
    expect(label).toHaveProp('children', '2:50')
    await act(() => Timer.reset())
    expect(label).toHaveProp('children', '0:00')
  })
})
