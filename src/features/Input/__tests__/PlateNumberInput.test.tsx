// Compenent Imports
import {PlateNumberInput} from '../components'

// Util and Lib Imports
import {render, fireEvent, act, waitFor} from '../../../utils'

describe('Plate Number Input -> Custom Input', () => {
  const plateNumberInputTestId = 'input-test-id'

  it('plate number input ilk render anında snapshot ile eşleşmeli', () => {
    const renderedInput = render(<PlateNumberInput testID={plateNumberInputTestId} />)

    expect(renderedInput).toMatchSnapshot()
  })

  it('plate number input numeric karakterleri ve uppercase karakterleri kabul etmeli', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <PlateNumberInput testID={plateNumberInputTestId} onChangeText={onChangeTextMock} />
    )

    await waitFor(() => {
      const plateNumberInputElement = getByTestId(plateNumberInputTestId)
      fireEvent.changeText(plateNumberInputElement, 'abc*D123')
    })

    await act(() => {
      expect(onChangeTextMock).toHaveBeenCalledWith('ABCD123')
    })
  })

  it('plate number input küçük harf ve özel karakter kabul etmemeli', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <PlateNumberInput testID={plateNumberInputTestId} onChangeText={onChangeTextMock} />
    )

    await waitFor(() => {
      const plateNumberInputElement = getByTestId(plateNumberInputTestId)
      fireEvent.changeText(plateNumberInputElement, 'abc*D123')
    })

    expect(onChangeTextMock).not.toHaveBeenCalledWith('ABc*D123')
  })

  it('plate number input render olduğu zaman klavye default olarak ekranda görülmeli', () => {
    const {getByTestId} = render(<PlateNumberInput testID={plateNumberInputTestId} />)
    const plateNumberInputElement = getByTestId(plateNumberInputTestId)

    expect(plateNumberInputElement.props.keyboardType).toBe('default')
  })

  // TODO: bu test refactor edilecek
  // it('plate number input tıklandığı zaman ekranda klavye gözükmeli', async () => {
  //   const keyboardDidShowMock = jest.fn()
  //   Keyboard.addListener('keyboardDidShow', keyboardDidShowMock)

  //   const {getByTestId} = render(<PlateNumberInput testID={plateNumberInputTestId} />)
  //   await act(() => {
  //     fireEvent(getByTestId(plateNumberInputTestId), 'press')
  //   })

  //   expect(keyboardDidShowMock).not.toHaveBeenCalled()
  //   waitFor(() => expect(keyboardDidShowMock).toHaveBeenCalled())
  // })

  describe('kopyalanan plate number yapıştırıldığında', () => {
    it('Bosluklar trimlenmeli ve Uppercase harf kabul etmeli', async () => {
      const onChangeTextMock = jest.fn()
      const {getByTestId} = render(
        <PlateNumberInput testID={plateNumberInputTestId} onChangeText={onChangeTextMock} />
      )

      await waitFor(() => {
        const plateNumberInputElement = getByTestId(plateNumberInputTestId)
        fireEvent.changeText(plateNumberInputElement, 'Abc 1234')
      })

      expect(onChangeTextMock).toHaveBeenCalledWith('ABC1234')
    })
  })
})
