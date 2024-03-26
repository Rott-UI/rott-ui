// Util and Lib Imports
import {Keyboard} from 'react-native'
import {render, fireEvent, act, waitFor} from '../../../utils'

// Compenent Imports
import {PinPasswordInput} from '../components'

describe('Pin Password Input -> Custom Input', () => {
  const pinPasswordInputTestId = 'input-test-id'

  it('pin password input ilk render anında snapshot ile eşleşmeli', () => {
    const renderedInput = render(<PinPasswordInput testID={pinPasswordInputTestId} />)

    expect(renderedInput).toMatchSnapshot()
  })

  it('pin password input sadece numeric karakterleri kabul etmeli', () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <PinPasswordInput testID={pinPasswordInputTestId} onChangeText={onChangeTextMock} />
    )
    const pinPasswordInputElement = getByTestId(pinPasswordInputTestId)
    fireEvent.changeText(pinPasswordInputElement, 'aaA*a123')

    expect(onChangeTextMock).toHaveBeenCalledWith('123')
  })

  it('pin password input harf ve özel karakter kabul etmemeli', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <PinPasswordInput testID={pinPasswordInputTestId} onChangeText={onChangeTextMock} />
    )
    const pinPasswordInputElement = getByTestId(pinPasswordInputTestId)
    await waitFor(() => {
      fireEvent.changeText(pinPasswordInputElement, 'aaA*a123')
    })

    expect(onChangeTextMock).not.toHaveBeenCalledWith('aaA*a123')
    expect(onChangeTextMock).toHaveBeenCalledWith('123')
  })

  it('pin password input ilk renderlandiginda text gorunur olmamali', () => {
    const {getByTestId} = render(<PinPasswordInput testID={pinPasswordInputTestId} />)

    const pinPasswordInputElement = getByTestId(pinPasswordInputTestId)

    expect(pinPasswordInputElement).toHaveProp('secureTextEntry', true)
  })

  it('pin password input render olduğu zaman klavye olarak number-pad ekranda görülmeli', () => {
    const {getByTestId} = render(<PinPasswordInput testID={pinPasswordInputTestId} />)

    const pinPasswordInputElement = getByTestId(pinPasswordInputTestId)

    expect(pinPasswordInputElement).toHaveProp('keyboardType', 'number-pad')
  })

  // TODO: bu test refactor edilecek.
  // it('pin password input tıklandığı zaman ekranda klavye gözükmeli', async () => {
  //   const keyboardDidShowMock = jest.fn()
  //   Keyboard.addListener('keyboardDidShow', keyboardDidShowMock)
  //   const {getByTestId} = render(<PinPasswordInput testID={pinPasswordInputTestId} />)

  //   expect(keyboardDidShowMock).not.toHaveBeenCalled()

  //   await act(() => {
  //     const pinPasswordInput = getByTestId(pinPasswordInputTestId)
  //     fireEvent.press(pinPasswordInput)
  //   })

  //   waitFor(() => expect(keyboardDidShowMock).toHaveBeenCalled())
  // })
})
