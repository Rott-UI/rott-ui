// React Imports
import React from 'react'

// Alert Dialog Imports
import {AlertDialogComponent} from '../components'
import {AlertDialogButtonProps} from '../models'

//Util and Lib Imports
import {fireEvent, render} from '../../../utils'

// Mock the required props
const mockProps = {
  title: 'Title',
  text: 'Text',
  buttons: {
    confirmButton: {
      text: 'COMMON.OK',
      onPress: jest.fn(),
    } as AlertDialogButtonProps,
    cancelButton: {
      text: 'COMMON.CANCEL',
      onPress: jest.fn(),
    } as AlertDialogButtonProps,
  },
}

describe('AlertDialog -> Component', () => {
  const testId = {
    alertDialogTestId: 'alert-dialog-test-id',
  }

  it('alert dialog ilk render anında snapshot ile eşleşmeli', () => {
    const {alertDialogTestId} = testId

    const renderedAlertDialog = render(
      <AlertDialogComponent visible testID={alertDialogTestId} {...mockProps} />
    )

    expect(renderedAlertDialog).toMatchSnapshot()
  })

  it('alert dialog doğru renderlanmalı', () => {
    const {alertDialogTestId} = testId
    const {getByText} = render(
      <AlertDialogComponent visible testID={alertDialogTestId} {...mockProps} />
    )
    const title = getByText('Title')
    const text = getByText('Text')
    const confirmButton = getByText('Ok')
    const cancelButton = getByText('Cancel')

    expect(title).toBeOnTheScreen()
    expect(text).toBeOnTheScreen()
    expect(confirmButton).toBeOnTheScreen()
    expect(cancelButton).toBeOnTheScreen()
  })

  it('buttons property dolu olmadığı zaman cancel buttonu default olarak ekranda renderlanmalı', () => {
    const {alertDialogTestId} = testId
    const {title, text} = mockProps
    const {getByText} = render(
      <AlertDialogComponent visible testID={alertDialogTestId} title={title} text={text} />
    )

    const cancelButton = getByText('Cancel')

    expect(cancelButton).toBeOnTheScreen()
  })

  it('butona tıklandığında onPress ve onClose fonksiyonları çağırılmalı', () => {
    const {alertDialogTestId} = testId
    const {
      buttons: {
        confirmButton: {onPress},
      },
    } = mockProps
    const {getByText} = render(
      <AlertDialogComponent visible testID={alertDialogTestId} {...mockProps} />
    )

    const confirmButton = getByText('Ok')
    fireEvent.press(confirmButton)

    expect(onPress).toHaveBeenCalled()
  })
})
