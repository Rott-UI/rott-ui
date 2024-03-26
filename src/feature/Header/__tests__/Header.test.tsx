//Component Imports
import {Header} from '../components'
import {IconTypes} from '../../Icon'

//Util and Lib Imports
import {act, fireEvent, render, waitFor} from './../../../utils'

describe('Header -> Custom Component', () => {
  const TestId = {
    component: 'header-test-id',
    title: 'header-title-test-id',
    logo: 'header-logo-test-id',
    rightIcon: 'header-right-icon-test-id',
    back: 'header-back-test-id',
  }
  const IMG: {logo: IconTypes; rightIcon: IconTypes} = {
    logo: 'HGS',
    rightIcon: 'REMOVE_CIRCLE',
  }
  const headerText = 'Test Başlık'

  it('Yalnızca başlık çalışmalı ve snapshot eşleşmeli', () => {
    const rendered = render(<Header testID={TestId.component} title={headerText} />)
    expect(rendered).toMatchSnapshot()

    const {queryByTestId} = rendered

    //Title ekranda olmalı
    expect(queryByTestId(TestId.title)).toBeOnTheScreen()

    //RightIcon ekranda olmamalı
    expect(queryByTestId(TestId.rightIcon)).not.toBeOnTheScreen()

    //Logo ekranda olmamalı
    expect(queryByTestId(TestId.logo)).not.toBeOnTheScreen()
  })

  it('Yalnızca Logo çalışmalı ve snapshot eşleşmeli', () => {
    const rendered = render(<Header testID={TestId.component} logo={IMG.logo} />)

    const {queryByTestId} = rendered

    //Logo ekranda olmalı
    expect(queryByTestId(TestId.logo)).toBeOnTheScreen()

    //RightIcon ekranda olmamalı
    expect(queryByTestId(TestId.rightIcon)).not.toBeOnTheScreen()

    //Title ekranda olmamalı
    expect(queryByTestId(TestId.title)).not.toBeOnTheScreen()
  })

  it('Başlık ve Icon var ise sadece icon gorunmeli', () => {
    const {queryByTestId, getByTestId} = render(
      <Header testID={TestId.component} title={headerText} logo={IMG.logo} />
    )

    const headerElement = getByTestId(TestId.component)
    const logoElement = getByTestId(TestId.logo)
    const rightIconElement = queryByTestId(TestId.rightIcon)

    expect(rightIconElement).not.toBeOnTheScreen()
    expect(logoElement).toBeOnTheScreen()
    expect(headerElement).not.toHaveTextContent(headerText)
  })

  // TODO: bu test refactor edilecek
  // it('Proje Render Edildikten Sonra HGS Ekranı Açılmalı ve Geri Tuşuna basıldığında Tekrar HGS ekrani kapanmali', () => {
  //   const renderedApp = render(<App />)
  //   expect(renderedApp).toBeTruthy()

  //   //HGS Butonu Ekranda Olmamalı
  //   expect(renderedApp.queryByTestId('app-hgs-test-id')).not.toBeOnTheScreen()

  //   setTimeout(async () => {
  //     //HGS Butonu Ekranda Olmalı
  //     const hgs_btn = renderedApp.findByTestId('app-hgs-test-id')
  //     expect(hgs_btn).toBeOnTheScreen()

  //     //HGS Butonuna basıldığında HGS Ekranı açılmalı
  //     fireEvent(await hgs_btn, 'onPress')
  //     expect(renderedApp.findByTestId(TestId.back)).toBeOnTheScreen()

  //     //Geri butonuna basildiginda HGS ekrani kapanmali
  //     fireEvent(await renderedApp.findByTestId(TestId.back), 'onPress')
  //     expect(renderedApp.queryByTestId(TestId.back)).not.toBeOnTheScreen()
  //   }, 1500)
  // })

  //TODO: RightIcon kontrol yapılacak. isExist ve onPress
  it('RightIcon görüntülenmeli ve onPress Methodu Çalışmalı', async () => {
    const {logo, rightIcon} = IMG

    const mockOnPress = jest.fn()
    const rendered = render(
      <Header
        testID={TestId.component}
        title={headerText}
        logo={logo}
        rightIcon={{
          name: rightIcon,
          onPress: mockOnPress,
        }}
      />
    )

    const {queryByTestId, getByTestId} = rendered

    //Right Icon Ekranda Olmali
    expect(queryByTestId(TestId.rightIcon)).toBeOnTheScreen()

    //RightIcon On Press
    await act(async () => {
      await waitFor(() => {
        fireEvent.press(getByTestId(TestId.rightIcon))
      })
    })

    expect(mockOnPress).toHaveBeenCalled()
  })
})
