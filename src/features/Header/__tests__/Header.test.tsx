//Component Imports
import {Header} from '../components'
import {Icon, IconTypes} from '../../Icon'

//Util and Lib Imports
import {act, fireEvent, render, waitFor} from './../../../utils'

describe('Header -> Custom Component', () => {
  const testId = {
    component: 'header-test-id',
    title: 'header-title-test-id',
    logo: 'header-logo-test-id',
    leftIcon: 'header-left-icon-test-id',
    leftIconPressable: 'header-left-pressable-test-id',
    rightIconPressable: 'header-right-pressable-test-id',
    rightIcon: 'header-right-icon-test-id',
    back: 'header-back-test-id',
  }

  const IMG: {logo: IconTypes; rightIcon: IconTypes} = {
    logo: 'HGS',
    rightIcon: 'REMOVE_CIRCLE',
  }
  const headerText = 'Test Başlık'

  it('yalnızca başlık çalışmalı ve snapshot eşleşmeli', () => {
    const {component} = testId

    const rendered = render(<Header testID={component} title={headerText} />)

    expect(rendered).toMatchSnapshot()
  })

  it('verilen testId ekranda olmalı', () => {
    const {title, rightIcon, logo, component} = testId
    const {queryByTestId} = render(<Header testID={component} title={headerText} />)

    //Title ekranda olmalı
    expect(queryByTestId(title)).toBeOnTheScreen()

    //RightIcon ekranda olmamalı
    expect(queryByTestId(rightIcon)).not.toBeOnTheScreen()

    //Logo ekranda olmamalı
    expect(queryByTestId(logo)).not.toBeOnTheScreen()
  })

  it('yalnızca logo çalışmalı ve snapshot eşleşmeli', () => {
    const {title, rightIcon, logo, component} = testId
    const {queryByTestId} = render(<Header testID={component} logo={IMG.logo} />)

    const logoElement = queryByTestId(logo)
    const rightIconElement = queryByTestId(rightIcon)
    const titleElement = queryByTestId(title)

    expect(logoElement).toBeOnTheScreen()
    expect(rightIconElement).not.toBeOnTheScreen()
    expect(titleElement).not.toBeOnTheScreen()
  })

  it('başlık ve icon var ise sadece icon gorunmeli', () => {
    const {rightIcon, logo, component} = testId
    const {queryByTestId, getByTestId} = render(
      <Header testID={component} title={headerText} logo={IMG.logo} />
    )

    const headerElement = getByTestId(component)
    const logoElement = getByTestId(logo)
    const rightIconElement = queryByTestId(rightIcon)

    expect(rightIconElement).not.toBeOnTheScreen()
    expect(logoElement).toBeOnTheScreen()
    expect(headerElement).not.toHaveTextContent(headerText)
  })

  it('rightIcon görüntülenmeli ve onPress Methodu Çalışmalı', async () => {
    const {component, rightIcon: rightIconTestId, rightIconPressable} = testId
    const {rightIcon} = IMG

    const mockOnPress = jest.fn()
    const {getByTestId} = render(
      <Header
        testID={component}
        title={headerText}
        rightIcon={{
          testID: rightIconTestId,
          name: rightIcon,
          onPress: mockOnPress,
        }}
      />
    )

    const rightIconElement = getByTestId(rightIconTestId)
    const rightIconPressableElement = getByTestId(rightIconPressable)
    //RightIcon On Press
    await act(async () => {
      await waitFor(() => {
        fireEvent.press(rightIconPressableElement!)
      })
    })

    expect(rightIconElement).toBeOnTheScreen()
    expect(mockOnPress).toHaveBeenCalled()
  })

  it('rightIcon verilmediğinde ekranda gözükmemeli', () => {
    const {component, rightIcon: rightIconTestId} = testId
    const {queryByTestId} = render(<Header testID={component} title={headerText} />)

    const rightIconElement = queryByTestId(rightIconTestId)

    expect(rightIconElement).not.toBeOnTheScreen()
  })

  it('rightElement görüntülenmeli', () => {
    const {component, rightIcon: rightIconTestId} = testId
    const {rightIcon} = IMG

    const {queryByTestId} = render(
      <Header
        testID={component}
        title={headerText}
        rightElement={<Icon testID={rightIconTestId} name={rightIcon} />}
      />
    )

    const rightIconElement = queryByTestId(rightIconTestId)

    expect(rightIconElement).toBeOnTheScreen()
  })

  it('leftIcon görüntülenmeli ve onPress Methodu Çalışmalı', async () => {
    const {component, leftIcon: leftIconTestId, leftIconPressable} = testId
    const {rightIcon} = IMG

    const mockOnPress = jest.fn()
    const {getByTestId} = render(
      <Header
        testID={component}
        title={headerText}
        leftIcon={{
          testID: leftIconTestId,
          name: rightIcon,
          onPress: mockOnPress,
        }}
      />
    )

    const leftIconElement = getByTestId(leftIconPressable)
    const leftIconPressableElement = getByTestId(leftIconPressable)
    //LeftIcon On Press
    await act(async () => {
      await waitFor(() => {
        fireEvent.press(leftIconPressableElement!)
      })
    })

    expect(leftIconElement).toBeOnTheScreen()
    expect(mockOnPress).toHaveBeenCalled()
  })

  it('leftIcon verilmediğinde ekranda gözükmemeli', () => {
    const {component, leftIcon: leftIconTestId} = testId
    const {queryByTestId} = render(<Header testID={component} title={headerText} />)

    const leftIconElement = queryByTestId(leftIconTestId)

    expect(leftIconElement).not.toBeOnTheScreen()
  })

  it('leftElement görüntülenmeli', () => {
    const {component, rightIcon: rightIconTestId} = testId
    const {rightIcon} = IMG

    const {queryByTestId} = render(
      <Header
        testID={component}
        title={headerText}
        rightElement={<Icon testID={rightIconTestId} name={rightIcon} />}
      />
    )

    const rightIconElement = queryByTestId(rightIconTestId)

    expect(rightIconElement).toBeOnTheScreen()
  })

  it('rightIcon ve leftIcon verildiğinde, ekranda gözükmeli', () => {
    const {component, rightIcon: rightIconTestId, leftIcon: leftIconTestId} = testId
    const {rightIcon} = IMG

    const {queryByTestId} = render(
      <Header
        testID={component}
        title={headerText}
        leftIcon={{
          testID: leftIconTestId,
          name: rightIcon,
        }}
        rightIcon={{
          testID: rightIconTestId,
          name: rightIcon,
        }}
      />
    )

    const rightIconElement = queryByTestId(rightIconTestId)
    const leftIconElement = queryByTestId(leftIconTestId)

    expect(rightIconElement).toBeOnTheScreen()
    expect(leftIconElement).toBeOnTheScreen()
  })

  it('children verildiğinde, ekranda gözükmeli', () => {
    const {component} = testId
    const {queryByTestId} = render(
      <Header testID={component} title={headerText}>
        <Icon testID='header-children-icon-test-id' name='HGS' />
      </Header>
    )

    const childrenElement = queryByTestId('header-children-icon-test-id')

    expect(childrenElement).toBeOnTheScreen()
  })
})
