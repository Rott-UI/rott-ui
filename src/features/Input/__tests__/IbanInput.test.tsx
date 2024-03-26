// Util and Lib Imports
import {render, fireEvent, waitFor} from '../../../utils'
import {IbanInput} from '../components'

describe('IBAN Input -> Custom Input', () => {
  const inputTestId = 'iban-input-test-id'
  const clearIbanIconTestId = 'clear-iban-icon-test-id'

  it('ilk render anında snapshot ile eşleşmeli', () => {
    const renderedInput = render(<IbanInput testID={inputTestId} />)

    expect(renderedInput).toMatchSnapshot()
  })

  it('ilk renderlandiginda ilk renderlandiginda içerik boş olmalı', () => {
    const {getByTestId} = render(<IbanInput testID={inputTestId} />)

    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('value', '')
  })

  it('ilk renderlandiginda icerik temizleme iconu gorunmemeli', () => {
    const {queryByTestId} = render(<IbanInput testID={inputTestId} />)

    const clearInputElement = queryByTestId(clearIbanIconTestId)

    expect(clearInputElement).not.toBeOnTheScreen()
  })

  it('içerik boş olduğunda temizleme iconu görünmemeli', () => {
    const onChangeTextMock = jest.fn()
    const {getByTestId, queryByTestId} = render(<IbanInput onChangeText={onChangeTextMock} />)

    const ibanInput = getByTestId('iban-input-test-id')
    expect(ibanInput).toBeTruthy()

    const clearIcon = queryByTestId('clear-iban-icon-test-id')
    expect(clearIcon).toBeNull()

    fireEvent.changeText(ibanInput, '')

    expect(queryByTestId('clear-iban-icon-test-id')).toBeNull()
  })

  // it('içerik boş olduğunda temizleme iconu görünmemeli', async () => {
  //   const onChangeTextMock = jest.fn()
  //   const {getByTestId, queryByTestId} = render(
  //     <IbanInput testID={inputTestId} onChangeText={onChangeTextMock} />
  //   )

  //   let inputElement = getByTestId(inputTestId)
  //   fireEvent.changeText(inputElement, 'TR123')

  //   let clearInputElement = getByTestId(clearIbanIconTestId)

  //   expect(clearInputElement).toBeTruthy()
  //   expect(clearInputElement?.children[0] as any).toHaveProp('name', 'REMOVE_CIRCLE')

  //   expect(onChangeTextMock).toHaveBeenCalledWith('TR123')

  //   await waitFor(() => {
  //     let inputElement = getByTestId(inputTestId)
  //     fireEvent.changeText(inputElement, '')
  //   })

  //   expect(onChangeTextMock).toHaveBeenCalledWith('')

  //   let clearInputElement2 = queryByTestId(clearIbanIconTestId)

  //   expect(clearInputElement2).not.toBeOnTheScreen()
  // })

  // it('TR digerlerinden sonraki degerler sadece numeric karakterleri kabul etmeli', async () => {
  //   const onChangeTextMock = jest.fn()
  //   const {getByTestId} = render(<IbanInput testID={inputTestId} onChangeText={onChangeTextMock} />)

  //   await waitFor(() => {
  //     const inputElement = getByTestId(inputTestId)
  //     fireEvent.changeText(inputElement, 'A*a123 334--34')
  //   })

  //   expect(onChangeTextMock).toHaveBeenCalledWith('TR12333434')
  // })

  // describe('kopyalanan IBAN yapıştırıldığında', () => {
  //   it('Bosluklar trimlenmeli', async () => {
  //     const onChangeTextMock = jest.fn()
  //     const {getByTestId} = render(
  //       <IbanInput testID={inputTestId} onChangeText={onChangeTextMock} />
  //     )

  //     await waitFor(() => {
  //       const inputElement = getByTestId(inputTestId)
  //       fireEvent.changeText(inputElement, 'aaA*a   123')
  //     })

  //     expect(onChangeTextMock).toHaveBeenCalledWith('TR123')
  //   })
  //   it('Sadece Sayi gelmisse basina TR getirerek dogru format saglanmali', async () => {
  //     const onChangeTextMock = jest.fn()
  //     const {getByTestId} = render(
  //       <IbanInput testID={inputTestId} onChangeText={onChangeTextMock} />
  //     )

  //     await waitFor(() => {
  //       const inputElement = getByTestId(inputTestId)
  //       fireEvent.changeText(inputElement, '123')
  //     })

  //     expect(onChangeTextMock).toHaveBeenCalledWith('TR123')
  //   })
  //   it('yapistirilan degerde TR ile gelmisse dogru format saglanmali', async () => {
  //     const onChangeTextMock = jest.fn()
  //     const {getByTestId} = render(
  //       <IbanInput testID={inputTestId} onChangeText={onChangeTextMock} />
  //     )

  //     await waitFor(() => {
  //       const inputElement = getByTestId(inputTestId)
  //       fireEvent.changeText(inputElement, 'TR99 8888 7777 6666 5555 4444 33')
  //     })

  //     expect(onChangeTextMock).toHaveBeenCalledWith('TR998888777766665555444433')
  //   })

  //   it('yapistirilan degerde TR yok ise dogru format saglanmali', async () => {
  //     const onChangeTextMock = jest.fn()
  //     const {getByTestId} = render(
  //       <IbanInput testID={inputTestId} onChangeText={onChangeTextMock} />
  //     )

  //     await waitFor(() => {
  //       const inputElement = getByTestId(inputTestId)
  //       fireEvent.changeText(inputElement, '99 8888 7777 6666 5555 4444 33')
  //     })

  //     expect(onChangeTextMock).toHaveBeenCalledWith('TR998888777766665555444433')
  //   })
  // })

  it('Iban input render olduğu zaman klavye olarak number-pad ekranda görülmeli', () => {
    const {getByTestId} = render(<IbanInput testID={inputTestId} />)
    const inputElement = getByTestId(inputTestId)

    expect(inputElement).toHaveProp('keyboardType', 'number-pad')
  })

  // TODO: bu test refactor edilecek
  // it('Iban input tıklandığı zaman ekranda klavye gözükmeli', async () => {
  //   const keyboardDidShowMock = jest.fn()
  //   Keyboard.addListener('keyboardDidShow', keyboardDidShowMock)

  //   const {getByTestId} = render(<IbanInput testID={inputTestId} />)

  //   await act(() => {
  //     fireEvent(getByTestId(inputTestId), 'press')
  //   })

  //   expect(keyboardDidShowMock).not.toHaveBeenCalled()
  //   waitFor(() => expect(keyboardDidShowMock).toHaveBeenCalled())
  // })
})
