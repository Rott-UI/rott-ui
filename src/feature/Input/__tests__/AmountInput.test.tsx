// React Native Imports
import {Keyboard} from 'react-native'

// Util and Lib Imports
import {render, fireEvent, act, waitFor} from '../../../utils'

// Component Imports
import {AmountInput} from '../components'

describe('Amount Input -> Custom Input', () => {
  const testId = {
    amountTestId: 'amount-test-id',
    currencyTestId: 'currency-test-id',
  }
  it('amount input ilk render anında snapshot ile eşleşmeli', () => {
    const onChangeTextMock = jest.fn()
    const renderedInput = render(<AmountInput onChangeText={onChangeTextMock} />)

    expect(renderedInput).toMatchSnapshot()
  })

  it('amount input amount ve currency inputlari var olmali', () => {
    const {amountTestId, currencyTestId} = testId
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(<AmountInput onChangeText={onChangeTextMock} />)

    const amountInput = getByTestId(amountTestId)
    const currenctInput = getByTestId(currencyTestId)

    expect(amountInput).toBeOnTheScreen()
    expect(currenctInput).toBeOnTheScreen()
  })

  it('amount input sadece numeric karakterleri kabul etmeli', () => {
    const {amountTestId, currencyTestId} = testId
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(<AmountInput onChangeText={onChangeTextMock} />)

    const amountInput = getByTestId(amountTestId)
    const currenctInput = getByTestId(currencyTestId)
    fireEvent.changeText(amountInput, 'aaA*a123')
    fireEvent.changeText(currenctInput, '1aaA*a123')

    expect(amountInput).toHaveProp('value', '123')
    expect(currenctInput).toHaveProp('value', '11')
  })

  it('amount input formata uygun olmalı', () => {
    const {amountTestId} = testId
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(<AmountInput onChangeText={onChangeTextMock} />)

    const amountInput = getByTestId(amountTestId)
    fireEvent.changeText(amountInput, '12')

    expect(onChangeTextMock).toHaveBeenCalledWith('12.00')
  })

  it('amount inputun küsüratlı tarafı değiştiği zaman boş bir değer bırakılırsa küsürat 00 olmalı', () => {
    const {currencyTestId} = testId
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(<AmountInput onChangeText={onChangeTextMock} />)

    const currencyElement = getByTestId(currencyTestId)
    fireEvent.changeText(currencyElement, '50')
    expect(currencyElement).toHaveProp('value', '50')

    fireEvent.changeText(currencyElement, '')
    fireEvent(currencyElement, 'blur')
    expect(currencyElement).toHaveProp('value', '00')
  })

  it('amount inputta küsürat 0 iken tıklandığı zaman değer 00 dan boşa çekilmeli', () => {
    const {currencyTestId} = testId
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(<AmountInput onChangeText={onChangeTextMock} />)

    const currencyElement = getByTestId(currencyTestId)
    fireEvent.changeText(currencyElement, '00')
    fireEvent(currencyElement, 'focus')

    expect(currencyElement).toHaveProp('value', '')
  })

  it('amount inputta küsürat 0 dan büyükken tıklandığı zaman değer ne ise kalmalı', async () => {
    const {currencyTestId} = testId
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(<AmountInput onChangeText={onChangeTextMock} />)

    const currencyElement = getByTestId(currencyTestId)
    await waitFor(() => {
      fireEvent.changeText(currencyElement, '50')
    })
    fireEvent(currencyElement, 'focus')

    expect(currencyElement).toHaveProp('value', '50')
  })

  it('input render olduğu zaman klavye olarak number-pad ekranda görülmeli', () => {
    const {amountTestId, currencyTestId} = testId
    const onChangeTextMock = jest.fn()
    const {getByTestId} = render(<AmountInput onChangeText={onChangeTextMock} />)

    const amountInput = getByTestId(amountTestId)
    const currenctInput = getByTestId(currencyTestId)

    expect(amountInput).toHaveProp('keyboardType', 'number-pad')
    expect(currenctInput).toHaveProp('keyboardType', 'number-pad')
  })

  // TODO: bu test refactor edilecek
  // it('input tıklandığı zaman ekranda klavye gözükmeli', async () => {
  //   const {amountTestId} = testId
  //   const onChangeTextMock = jest.fn()
  //   const keyboardDidShowMock = jest.fn()
  //   Keyboard.addListener('keyboardDidShow', keyboardDidShowMock)

  //   const {getByTestId} = render(<AmountInput onChangeText={onChangeTextMock} />)

  //   await act(() => {
  //     fireEvent(getByTestId(amountTestId), 'press')
  //   })

  //   expect(keyboardDidShowMock).not.toHaveBeenCalled()
  //   waitFor(() => expect(keyboardDidShowMock).toHaveBeenCalled())
  // })
})
