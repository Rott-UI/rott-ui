// Component Imports
import {CVCInput} from '../components'

// Util and Lib Imports
import {render, fireEvent} from '../../../utils'

describe('CVC Input -> Custom Input', () => {
  const inputTestId = 'input-test-id'
  const cvcIconTestId = 'info-icon-test-id'

  it('ilk render anında snapshot ile eşleşmeli', () => {
    const renderedInput = render(<CVCInput testID={inputTestId} />)

    expect(renderedInput).toMatchSnapshot()
  })

  it('ilk renderlandiginda info iconu gorunmeli', () => {
    const {queryByTestId} = render(<CVCInput testID={inputTestId} />)

    const cvcInputElement = queryByTestId(cvcIconTestId)

    expect(cvcInputElement).not.toBeNull()
  })

  it('ilk renderlandiginda ilk renderlandiginda içerik boş olmalı', () => {
    const {getByTestId} = render(<CVCInput testID={inputTestId} />)

    const cvcInputElement = getByTestId(inputTestId)

    expect(cvcInputElement.props.value).toBeUndefined()
  })

  it('max karakter 3 olmali', () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(<CVCInput testID={inputTestId} onChangeText={onChangeTextMock} />)
    const cvcInputElement = getByTestId(inputTestId)
    fireEvent.changeText(cvcInputElement, '125552')

    expect(onChangeTextMock).toHaveBeenCalledWith('125')
  })

  it('numerik olmalı', () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(<CVCInput testID={inputTestId} onChangeText={onChangeTextMock} />)
    let cvcInputElement = getByTestId(inputTestId)
    const testText = '1A2b!'

    fireEvent.changeText(cvcInputElement, testText)

    expect(onChangeTextMock).toHaveBeenCalledWith('12')
  })

  it('cvc input render olduğu zaman klavye olarak number-pad ekranda görülmeli', () => {
    const {getByTestId} = render(<CVCInput testID={inputTestId} />)
    const cvcInputElement = getByTestId(inputTestId)

    expect(cvcInputElement.props.keyboardType).toBe('number-pad')
  })

  // TODO: bu test refactor edilecek
  // it('cvc input tıklandığı zaman ekranda klavye gözükmeli', async () => {
  //   const keyboardDidShowMock = jest.fn()
  //   Keyboard.addListener('keyboardDidShow', keyboardDidShowMock)

  //   const {getByTestId} = render(<CVCInput testID={inputTestId} />)

  //   await act(() => {
  //     fireEvent(getByTestId(inputTestId), 'press')
  //   })

  //   expect(keyboardDidShowMock).not.toHaveBeenCalled()
  //   waitFor(() => expect(keyboardDidShowMock).toHaveBeenCalled())
  // })
})
