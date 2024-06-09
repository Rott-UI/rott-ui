// Component Imports
import {CreditCardInput} from '../components'

// Util and Lib Imports
import {fireEvent, render, waitFor} from '../../../utils'

describe('CreditCard Input -> Custom Input', () => {
  const creditCartInputTestId = 'input-test-id'

  it('ilk render anında snapshot ile eşleşmeli', () => {
    const renderedInput = render(<CreditCardInput testID={creditCartInputTestId} />)

    expect(renderedInput).toMatchSnapshot()
  })

  it('girilen değer sadece numeric olarak kabul edilmeli', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <CreditCardInput testID={creditCartInputTestId} onChangeText={onChangeTextMock} />
    )

    await waitFor(() => {
      const creditCardInputElement = getByTestId(creditCartInputTestId)
      fireEvent.changeText(creditCardInputElement, 'q*_!`~d$r4444333322221111')

      expect(onChangeTextMock).toHaveBeenCalledWith('4444333322221111')
    })
  })

  it('credit card inputu maksimum 16 karakter kabul etmeli', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <CreditCardInput testID={creditCartInputTestId} onChangeText={onChangeTextMock} />
    )

    await waitFor(() => {
      const creditCardInputElement = getByTestId(creditCartInputTestId)
      fireEvent.changeText(creditCardInputElement, '44443333222211110')

      expect(creditCardInputElement.props.value).toBe('4444-3333-2222-1111')
    })
  })

  it('girilen değer numaradan başka bir karakter içeriyorsa değer değişmemeli.', async () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <CreditCardInput testID={creditCartInputTestId} onChangeText={onChangeTextMock} />
    )

    await waitFor(() => {
      const creditCardInputElement = getByTestId(creditCartInputTestId)
      fireEvent.changeText(creditCardInputElement, 'q*_!`~d$r4444333322221111')
    })

    expect(onChangeTextMock).not.toHaveBeenCalledWith('q*_!`~d$r4444333322221111')
  })

  it('credit card input render olduğu zaman klavye olarak number-pad ekranda görülmeli', () => {
    const {getByTestId} = render(<CreditCardInput testID={creditCartInputTestId} />)
    const creditCardInputElement = getByTestId(creditCartInputTestId)

    expect(creditCardInputElement.props.keyboardType).toBe('number-pad')
  })

  // TODO: bu test refactor edilecek
  // it('credit card input tıklandığı zaman ekranda klavye gözükmeli', async () => {
  //   const keyboardDidShowMock = jest.fn()
  //   Keyboard.addListener('keyboardDidShow', keyboardDidShowMock)

  //   const {getByTestId} = render(<CreditCardInput testID={creditCartInputTestId} />)
  //   const CreditCardInputElement = getByTestId(creditCartInputTestId)

  //   await act(() => fireEvent.press(CreditCardInputElement))

  //   expect(keyboardDidShowMock).not.toHaveBeenCalled()

  //   waitFor(() => expect(keyboardDidShowMock).toHaveBeenCalled())
  // })
})
