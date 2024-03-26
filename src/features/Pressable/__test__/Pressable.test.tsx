// Component Imports
import {commonUiTestExtension} from '../../utils'
import {Pressable} from '../components/Pressable'

// Util and Lib Imports
import {render, fireEvent, act} from '../../../utils'

const testId = {
  pressableTestId: 'pressable-test-id',
  pressableLabel: 'Pressable Label',
}

describe('Pressable -> Custom Component', () => {
  it('pressable component render olmalı ve snapshot eşleşmeli', () => {
    const rendered = render(<Pressable />)

    expect(rendered).toMatchSnapshot()
  })

  it('pressable componenti label ile render olmalı', async () => {
    const {pressableTestId, pressableLabel} = testId
    const {getByTestId, getByText} = render(
      <Pressable text={pressableLabel} testID={pressableTestId} />
    )

    const pressableElement = getByTestId(pressableTestId)

    expect(pressableElement).toBeTruthy()

    const labelElement = getByText(pressableLabel)

    expect(labelElement).toBeTruthy()
  })

  it('pressable tıklanabilir olmalı', async () => {
    const {pressableTestId, pressableLabel} = testId
    const onPressMock = jest.fn()
    const {getByTestId} = render(
      <Pressable
        text={pressableLabel}
        textVariant='black'
        textSize='md'
        textWeight='bold'
        testID={pressableTestId}
        onPress={onPressMock}
      />
    )
    const pressableElement = getByTestId(pressableTestId)

    expect(pressableElement).toBeTruthy()

    await act(() => {
      fireEvent.press(pressableElement)
    })

    expect(onPressMock).toBeCalled()
  })

  it('pressable disableken tıklanmamalı', async () => {
    const {pressableTestId, pressableLabel} = testId
    const onPressMock = jest.fn()
    const {getByTestId} = render(
      <Pressable
        text={pressableLabel}
        textVariant='black'
        textSize='md'
        textWeight='bold'
        testID={pressableTestId}
        onPress={onPressMock}
        disabled
      />
    )
    const pressableElement = getByTestId(pressableTestId)

    expect(pressableElement).toBeTruthy()

    await act(() => {
      fireEvent.press(pressableElement)
    })

    expect(onPressMock).not.toBeCalled()
  })

  it('pressable componenti style ile render olmalı', () => {
    const {pressableTestId, pressableLabel} = testId
    const onPressMock = jest.fn()
    const {getByText} = render(
      <Pressable
        text={pressableLabel}
        textVariant='black'
        textSize='md'
        textWeight='bold'
        testID={pressableTestId}
        onPress={onPressMock}
      />
    )

    const textElement = getByText(pressableLabel)

    expect(textElement).toHaveStyle({fontWeight: 'bold'})
  })
})

commonUiTestExtension(<Pressable testID={testId.pressableTestId} />, testId.pressableTestId)
