// Component Imports
import {DateInput} from '../components'

// Util and Lib Imports
import {act, fireEvent, render, waitFor} from '../../../utils'

describe('Date Input -> Custom Input', () => {
  const dateInputTestId = 'date-input-test-id'
  const dateInputValueContainerTestId = 'date-input-value-container'
  const dateInputConfirmButtonTestId = 'date-input-confirm-button'
  const dateInputClearmButtonTestId = 'date-input-clear-button'
  const dateInputModalTestId = 'date-input-modal'
  const currentDate = new Date()

  it('ilk render anında snapshot ile eşleşmeli', () => {
    const renderedDateInput = render(<DateInput testID={dateInputTestId} date={currentDate} />)

    expect(renderedDateInput).toMatchSnapshot()
  })

  it('date inputa tıklandığında input modal olarak açılmalı', () => {
    const {getByTestId} = render(<DateInput testID={dateInputTestId} date={currentDate} />)

    const dateInputValueContainer = getByTestId(dateInputValueContainerTestId)
    fireEvent.press(dateInputValueContainer)

    const dateInputModal = getByTestId(dateInputModalTestId)
    expect(dateInputModal).toBeVisible()
  })

  it('date input allowClear propertysi almadıysa değer temizleme butonu ekranda gözükmemeli.', () => {
    const {getByTestId, queryByTestId} = render(
      <DateInput testID={dateInputTestId} date={currentDate} />
    )

    const dateInputValueContainer = getByTestId(dateInputValueContainerTestId)
    fireEvent.press(dateInputValueContainer)

    const clearButton = queryByTestId(dateInputClearmButtonTestId)
    expect(clearButton).toBeNull()
  })

  it('date input allowClear propertysi aldıysa Temizle butonuna tıklandığında değer temizlenmeli.', async () => {
    const onDateChangeMock = jest.fn()
    const {getByTestId, queryByTestId} = render(
      <DateInput
        testID={dateInputTestId}
        value={currentDate.toISOString()}
        date={currentDate}
        allowClear
        onDateChange={onDateChangeMock}
      />
    )

    const dateInputValueContainer = getByTestId(dateInputValueContainerTestId)
    await act(() => {
      fireEvent.press(dateInputValueContainer)
    })
    const modalElement = getByTestId(dateInputModalTestId)
    expect(modalElement).toBeVisible()
    await waitFor(() => {
      const dateInput = getByTestId(dateInputTestId)
      expect(dateInput).toBeOnTheScreen()
      expect(dateInput).toHaveProp('date')
    })
    const clearButton = getByTestId(dateInputClearmButtonTestId)
    fireEvent.press(clearButton)

    const modalShouldNotVisible = queryByTestId(dateInputModalTestId)
    expect(modalShouldNotVisible).not.toBeOnTheScreen()
  })

  it('date input mode date olarak renderlanmalı', async () => {
    const {getByTestId} = render(<DateInput testID={dateInputTestId} mode='date' />)

    const dateInputValueContainer = getByTestId(dateInputValueContainerTestId)
    await act(() => {
      fireEvent.press(dateInputValueContainer)
    })

    await waitFor(() => {
      const dateInput = getByTestId(dateInputTestId)
      expect(dateInput).toBeOnTheScreen()
      expect(dateInput).toHaveProp('mode', 'date')
    })
  })

  it('date input mode time olarak renderlanmalı', async () => {
    const {getByTestId} = render(<DateInput testID={dateInputTestId} mode='time' />)

    const dateInputValueContainer = getByTestId(dateInputValueContainerTestId)
    await act(() => {
      fireEvent.press(dateInputValueContainer)
    })

    await waitFor(() => {
      const dateInput = getByTestId(dateInputTestId)
      expect(dateInput).toBeOnTheScreen()
      expect(dateInput).toHaveProp('mode', 'time')
    })
  })

  it('date input mode datetime olarak renderlanmalı', async () => {
    const {getByTestId} = render(<DateInput testID={dateInputTestId} mode='datetime' />)

    const dateInputValueContainer = getByTestId(dateInputValueContainerTestId)
    await act(() => {
      fireEvent.press(dateInputValueContainer)
    })

    await waitFor(() => {
      const dateInput = getByTestId(dateInputTestId)
      expect(dateInput).toBeOnTheScreen()
      expect(dateInput).toHaveProp('mode', 'datetime')
    })
  })

  it('minimum date verildikten sonra daha geçmiş bir gün seçilirse tanımlanan minimum date değer olarak atanmalı.', async () => {
    const onDateChangeMock = jest.fn()
    const {getByTestId} = render(
      <DateInput
        testID={dateInputTestId}
        mode='date'
        date={new Date()}
        minimumDate={currentDate}
        onDateChange={onDateChangeMock}
      />
    )

    const dateInputValueContainer = getByTestId(dateInputValueContainerTestId)
    await act(() => {
      fireEvent.press(dateInputValueContainer)
    })

    const dateInput = getByTestId(dateInputTestId)
    expect(dateInput).toBeOnTheScreen()
    await waitFor(() => {
      fireEvent(dateInput, 'onDateChange', new Date('2023.09.14'))

      setTimeout(() => {}, 150)
    })

    const confirmButton = getByTestId(dateInputConfirmButtonTestId)
    await act(() => {
      fireEvent.press(confirmButton)
    })

    expect(onDateChangeMock).toHaveBeenCalledWith(currentDate)
  })

  it('maximum date verildikten sonra daha ileri bir gün seçilirse tanımlanan maximum date değer olarak atanmalı.', async () => {
    const onDateChangeMock = jest.fn(() => currentDate)
    const {getByTestId} = render(
      <DateInput
        testID={dateInputTestId}
        mode='date'
        date={currentDate}
        maximumDate={currentDate}
        onDateChange={onDateChangeMock}
      />
    )

    const dateInputValueContainer = getByTestId(dateInputValueContainerTestId)
    await act(() => {
      fireEvent.press(dateInputValueContainer)
    })

    await waitFor(() => {
      const dateInput = getByTestId(dateInputTestId)
      expect(dateInput).toBeOnTheScreen()

      fireEvent(dateInput, 'onDateChange', new Date(currentDate.setHours(24)))

      const confirmButton = getByTestId(dateInputConfirmButtonTestId)
      fireEvent.press(confirmButton)
    })

    expect(onDateChangeMock).toHaveBeenCalledWith(currentDate)
  })
})
