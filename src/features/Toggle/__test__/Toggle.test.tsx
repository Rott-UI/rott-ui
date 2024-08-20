// React Imports
import React from 'react'

// Component Imports
import {Toggle} from '../components'

// Util and Lib Imports
import {act, fireEvent, render, waitFor} from './../../../utils'

// Provider Imports
import {themeConfig} from '../../../providers'

describe('Toggle -> Custom Component', () => {
  const toggleContainerTestId = 'toggle-container-test-id'
  const toggleTestId = 'toggle-test-id'

  it('toggle ilk render anında snapshot ile eşleşmeli', () => {
    const renderedToggle = render(<Toggle isOn={false} />)

    expect(renderedToggle).toMatchSnapshot()
  })

  it('toggle default propslar ile render olmalı', async () => {
    const {getByTestId} = render(<Toggle isOn={false} />)

    await act(() => {
      const toggleContainer = getByTestId(toggleContainerTestId)

      expect(toggleContainer).toBeDefined()
    })
    await act(() => {
      const toggleWheel = getByTestId(toggleTestId)

      expect(toggleWheel).toBeDefined()
    })
  })

  it('tıklandığında onToggleChange çağırılmalı', async () => {
    const onToggleMock = jest.fn()
    const {getByTestId} = render(<Toggle onToggleChange={onToggleMock} isOn={false} />)

    await act(() => {
      const toggleContainer = getByTestId(toggleContainerTestId)

      fireEvent.press(toggleContainer)
    })

    await waitFor(() => {
      expect(onToggleMock).toHaveBeenCalled()
    })
  })

  describe('isOn özelliği değiştiğinde stil özellikleri değişmeli', () => {
    const onToggleMock = jest.fn()

    it('pasif ise', async () => {
      const {getByTestId} = render(<Toggle onToggleChange={onToggleMock} isOn={false} />)

      await act(() => {
        const toggleContainer = getByTestId(toggleTestId)

        expect(toggleContainer).toHaveStyle({
          backgroundColor: themeConfig?.colors?.['grey-200'],
        })
      })
    })
    it('aktif ise', async () => {
      const {getByTestId} = render(<Toggle onToggleChange={onToggleMock} isOn={true} />)

      await act(() => {
        const toggleContainer = getByTestId(toggleTestId)

        expect(toggleContainer).toHaveStyle({
          backgroundColor: themeConfig?.colors?.primary,
        })
      })
    })
  })
})
