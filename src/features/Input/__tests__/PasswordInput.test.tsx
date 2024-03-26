// React Native Imports
// import {Keyboard} from 'react-native'

// Util and Lib Imports
import {render, fireEvent, act, waitFor} from '../../../utils'

// Component Imports
import {PasswordInput} from '../components'

describe('Password Input -> Custom Input', () => {
  const inputTestId = 'input-test-id'
  const showPasswordIconTestId = 'show-password-icon-test-id'

  it('password input ilk render anında snapshot ile eşleşmeli', () => {
    const renderedInput = render(<PasswordInput testID={inputTestId} />)

    expect(renderedInput).toMatchSnapshot()
  })

  it('password input sadece numeric karakterleri kabul etmeli', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <PasswordInput testID={inputTestId} onChangeText={onChangeTextMock} />
    )

    await waitFor(() => {
      const inputElement = getByTestId(inputTestId)
      fireEvent.changeText(inputElement, 'aaA*a123')
    })

    await act(() => {
      expect(onChangeTextMock).toHaveBeenCalledWith('123')
    })
  })

  it('password input harf ve özel karakter kabul etmemeli', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <PasswordInput testID={inputTestId} onChangeText={onChangeTextMock} />
    )

    await waitFor(() => {
      const inputElement = getByTestId(inputTestId)
      fireEvent.changeText(inputElement, 'aaA*a123')
    })

    await act(() => {
      expect(onChangeTextMock).not.toHaveBeenCalledWith('aaA*a123')
    })
  })

  it('input ilk renderlandiginda text gorunur olmamali', () => {
    const {getByTestId} = render(<PasswordInput testID={inputTestId} />)

    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('secureTextEntry', true)
  })

  it('input ilk renderlandiginda sifre goster iconu gorunmeli', () => {
    const {getByTestId} = render(<PasswordInput testID={inputTestId} />)

    const showPasswordIconElement = getByTestId(showPasswordIconTestId)

    expect(showPasswordIconElement).toBeTruthy()

    expect(showPasswordIconElement.children[0]).toHaveProp('name', 'EYE_DISABLE')
  })

  it('input ilk renderlandiginda sifre goster iconuna tiklandiginda sifre gorunur olmali', async () => {
    const {getByTestId} = render(<PasswordInput testID={inputTestId} />)

    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('secureTextEntry', true)

    await act(() => {
      const showPasswordIconElement = getByTestId(showPasswordIconTestId)
      fireEvent.press(showPasswordIconElement)
    })

    await waitFor(() => expect(inputElement).toHaveProp('secureTextEntry', false))
  })

  it('input sifre gorunurken sifre gizle butonuna tiklandiginda sifre gizlenmeli', async () => {
    const {getByTestId} = render(<PasswordInput testID={inputTestId} secureTextEntry={false} />)

    const inputElement = getByTestId(inputTestId)

    await act(() => {
      const showPasswordIconElement = getByTestId(showPasswordIconTestId)
      fireEvent.press(showPasswordIconElement)
    })

    await waitFor(() => expect(inputElement).toHaveProp('secureTextEntry', true))
  })

  it('input render olduğu zaman klavye olarak number-pad ekranda görülmeli', () => {
    const {getByTestId} = render(<PasswordInput testID={inputTestId} />)
    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('keyboardType', 'number-pad')
  })

  // TODO: bu test refactor edilecek
  // it('input tıklandığı zaman ekranda klavye gözükmeli', async () => {
  //   const keyboardDidShowMock = jest.fn()
  //   Keyboard.addListener('keyboardDidShow', keyboardDidShowMock)

  //   const {getByTestId} = render(<PasswordInput testID={inputTestId} />)

  //   await waitFor(() => expect(keyboardDidShowMock).not.toHaveBeenCalled())

  //   await act(async () => {
  //     fireEvent.press(getByTestId(inputTestId))
  //   })

  //   await waitFor(() => expect(keyboardDidShowMock).toHaveBeenCalled())
  // })
})
