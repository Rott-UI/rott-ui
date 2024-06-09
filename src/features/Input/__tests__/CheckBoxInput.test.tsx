// Component Imports
import {CheckBoxInput} from '../components'
import {Label} from '../../Label'

// Util and Lib Imports
import {act, fireEvent, render} from '../../../utils'

describe('CheckBox Input -> Custom Input', () => {
  const testId = {
    checkboxInputTestId: 'checkbox-input-test-id',
    checkboxContainerTestId: 'checkbox-container-test-id',
    checkboxDefaultLabelTestId: 'checkbox-default-label-test-id',
    checkboxCheckedTestId: 'checkbox-checked-test-id',
  }

  it('checkbox input ilk render anında snapshot ile eşleşmeli', () => {
    const {checkboxInputTestId} = testId
    const renderedCheckBoxInput = render(<CheckBoxInput testID={checkboxInputTestId} />)

    expect(renderedCheckBoxInput).toMatchSnapshot()
  })

  it('checkBox ilk renderlandığında unchecked olmalı', () => {
    const {checkboxInputTestId, checkboxContainerTestId, checkboxCheckedTestId} = testId
    const {getByTestId, queryByTestId} = render(<CheckBoxInput testID={checkboxInputTestId} />)

    const inputContainerElement = getByTestId(checkboxContainerTestId)

    expect(inputContainerElement).toBeOnTheScreen()
    expect(queryByTestId(checkboxCheckedTestId)).not.toBeOnTheScreen()
  })

  it('checkbox render olduğunda description string olarak verilmişse ekranda default label ile renderlanmalı', () => {
    const {checkboxDefaultLabelTestId} = testId
    const {getByText} = render(<CheckBoxInput description={translator('TEST')} />)

    const checkboxLabel = getByText(translator('TEST'))
    expect(checkboxLabel).toHaveProp('testID', checkboxDefaultLabelTestId)
  })

  it('checkbox render olduğunda description React element olarak verilmişse default label ile renderlanmamalı', () => {
    const {checkboxDefaultLabelTestId} = testId
    const {queryByTestId} = render(
      <CheckBoxInput description={<Label>{translator('TEST')}</Label>} />
    )

    const checkboxLabel = queryByTestId(checkboxDefaultLabelTestId)
    expect(checkboxLabel).not.toBeOnTheScreen()
  })

  it('checkBox onPress methodu calismali', async () => {
    const {checkboxInputTestId} = testId
    const onPressMock = jest.fn()

    const {getByTestId} = render(
      <CheckBoxInput testID={checkboxInputTestId} onCheckChange={onPressMock} />
    )

    await act(() => {
      const inputElementPressable = getByTestId(checkboxInputTestId)
      fireEvent.press(inputElementPressable)
    })

    expect(onPressMock).toHaveBeenCalledTimes(1)
  })
})
