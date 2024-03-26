// Component Imports
import {Label, Tab} from '../../../components'

// Util and Lib Imports
import {act, fireEvent, render, waitFor} from '../../../utils'
import {commonUiTestExtension} from '../../utils'

const testId = {
  tabTestId: (name: string) => `${name}-test-id`,
}

describe('Tab -> Custom Component', () => {
  it('Tab snapshotı ile eşleşmeli', () => {
    const {tabTestId} = testId
    const rendered = render(
      <Tab testID={tabTestId('tab')} isSelected={false} onLayout={jest.fn()}>
        <Label>Test</Label>
      </Tab>
    )

    expect(rendered).toMatchSnapshot()
  })

  it('Tab onPress calismali', async () => {
    const {tabTestId} = testId
    const onPressMock = jest.fn()

    const {getByTestId} = render(
      <Tab testID={tabTestId('tab')} onPress={onPressMock}>
        <Label>Test-1</Label>
      </Tab>
    )

    await act(() => {
      let tabElement = getByTestId(tabTestId('tab'))
      fireEvent.press(tabElement)
    })

    expect(onPressMock).toHaveBeenCalled()
  })

  it('Tab accessibility state degerlerinden selected olup olmadigi kontrol edilebilmeli', async () => {
    const {tabTestId} = testId
    const returnsTrueMock = jest.fn(() => true)

    const {getByTestId} = render(
      <Tab testID={tabTestId('tab')} isSelected={returnsTrueMock()}>
        <Label>Test-1</Label>
      </Tab>
    )

    let tabElement = getByTestId(tabTestId('tab'))

    expect(tabElement).toHaveAccessibilityState({selected: true})
  })

  it('Tab selected degistigi zaman AccessibilityState degerlerinden selected degeri degismeli', async () => {
    const {tabTestId} = testId
    let isSelectedMock = true

    const {getByTestId, rerender} = render(
      <Tab
        testID={tabTestId('tab')}
        isSelected={isSelectedMock}
        onPress={() => {
          isSelectedMock = !isSelectedMock
        }}>
        <Label>Test-1</Label>
      </Tab>
    )

    await act(() => {
      const tabElement = getByTestId(tabTestId('tab'))

      expect(tabElement).toHaveAccessibilityState({selected: true})

      fireEvent.press(tabElement)
    })
    rerender(
      <Tab
        testID={tabTestId('tab')}
        isSelected={isSelectedMock}
        onPress={() => {
          isSelectedMock = !isSelectedMock
        }}>
        <Label>Test-1</Label>
      </Tab>
    )

    const tabElement = getByTestId(tabTestId('tab'))

    expect(tabElement).toHaveAccessibilityState({selected: false})
  })
})

//TODO: commonUITest eklenecek
commonUiTestExtension(<Tab testID={testId.tabTestId('tab')} />, testId.tabTestId('tab'))
