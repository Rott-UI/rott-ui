// Component Imports
import {PhoneInput} from '../components'

// Util and Lib Imports
import {render, fireEvent} from '../../../utils'

describe('Phone Input -> Custom Input', () => {
  const inputTestId = 'input-test-id'

  it('phone input ilk render anında snapshot ile eşleşmeli', () => {
    const renderedPhoneInput = render(<PhoneInput testID={inputTestId} />)

    expect(renderedPhoneInput).toMatchSnapshot()
  })

  it('ilk renderlandiginda içerik boş olmalı', () => {
    const {getByTestId} = render(<PhoneInput testID={inputTestId} />)

    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('value', '')
  })

  it('phone input harf ve özel karakter kabul etmemeli', () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(
      <PhoneInput testID={inputTestId} onChangeText={onChangeTextMock} />
    )
    const inputElement = getByTestId(inputTestId)
    fireEvent.changeText(inputElement, 'aaA*a123')

    expect(onChangeTextMock).not.toHaveBeenCalledWith('aaA*a123')
  })

  describe('kopyalanan phone number yapıştırıldığında', () => {
    it('Bosluklar trimlenmeli', () => {
      const onChangeTextMock = jest.fn()
      const {getByTestId} = render(
        <PhoneInput testID={inputTestId} onChangeText={onChangeTextMock} />
      )
      const inputElement = getByTestId(inputTestId)
      fireEvent.changeText(inputElement, 'aaA*a 123')

      expect(onChangeTextMock).not.toHaveBeenCalledWith('aaA*a123')
    })

    it('yapistirilan degerde +90 ile gelmisse dogru format saglanmali', () => {
      const onChangeTextMock = jest.fn()
      const {getByTestId} = render(
        <PhoneInput testID={inputTestId} onChangeText={onChangeTextMock} />
      )
      const inputElement = getByTestId(inputTestId)
      fireEvent.changeText(inputElement, '+90123')

      expect(onChangeTextMock).toHaveBeenCalledWith('0123')
    })
  })
})
