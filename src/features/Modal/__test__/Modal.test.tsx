// React Imports
import React from 'react'

// Component Imports
import {Content} from '../../Content'
import {Item} from '../../Item'
import {Label} from '../../Label'
import {ModalComponent} from '../components'

// Util and Lib Imports
import {act, fireEvent, render, translator, waitFor} from '../../../utils'

describe('Modal -> Custom Component', () => {
  const onCloseMock = jest.fn()
  const testId = {
    modalTestId: 'modal-test-id',
    headerTestId: 'modal-header-test-id',
    headerCloseButtonTestId: 'header-right-pressable-test-id',
    headerCloseIconTestId: 'header-right-icon-test-id',
    outsideTapAreaTestId: 'outside-tap-area-test-id',
    slideToCloseTestId: 'slide-to-close-button-test-id',
  }

  beforeAll(() => {
    // TODO: useState mock example
    const setStateMock = jest.fn()
    const useStateMock: any = (useState: any) => [useState, setStateMock]
    jest.spyOn(React, 'useState').mockImplementation(useStateMock)
  })

  it('modal snapshot ile eşleşmeli', () => {
    const {modalTestId} = testId

    const renderedModal = render(
      <ModalComponent
        testID={modalTestId}
        fullScreen
        visible
        headerTitle={translator('TEST')}
        headerLogo='PTTBANK_BLACK_COLORED'
        closeButton
        onClose={onCloseMock}>
        <Item>
          <Label>{translator('TEST')}</Label>
        </Item>
      </ModalComponent>
    )

    expect(renderedModal).toMatchSnapshot()
  })

  it('modal visible değilken ekranda gözükmemeli', async () => {
    const {modalTestId} = testId
    const {queryByText} = render(
      <ModalComponent
        testID={modalTestId}
        fullScreen
        headerTitle={translator('TEST')}
        headerLogo='PTTBANK_BLACK_COLORED'
        closeButton
        onClose={onCloseMock}>
        <Item>
          <Label>{translator('TEST.WITH.PARAM', {testText: 'test'})}</Label>
        </Item>
      </ModalComponent>
    )

    await act(() => {
      const testLabelByText = queryByText(translator('TEST.WITH.PARAM', {testText: 'test'}))

      expect(testLabelByText).not.toBeOnTheScreen()
    })
  })

  it('custom header verildiğinde ekranda custom header olmalı', async () => {
    const {modalTestId, headerTestId} = testId
    const {getByTestId} = render(
      <ModalComponent
        testID={modalTestId}
        fullScreen
        headerTitle={translator('TEST')}
        headerLogo='PTTBANK_BLACK_COLORED'
        closeButton
        visible
        onClose={onCloseMock}
        header={
          <Content testID={headerTestId}>
            <Label>{translator('TEST')}</Label>
          </Content>
        }>
        <Item>
          <Label>{translator('TEST.WITH.PARAM', {testText: 'test'})}</Label>
        </Item>
      </ModalComponent>
    )

    await act(() => {
      const modalHeader = getByTestId(headerTestId)

      expect(modalHeader).toBeOnTheScreen()
    })
  })

  it('modal kapatma butonu headerda olmalı', async () => {
    const {headerCloseIconTestId} = testId
    const {getByTestId} = render(
      <ModalComponent headerTitle={translator('TEST')} visible closeButton onClose={onCloseMock} />
    )

    await act(() => {
      const headerCloseButton = getByTestId(headerCloseIconTestId)

      expect(headerCloseButton).toBeOnTheScreen()
    })
  })

  it('modal kapatma butonuna tıklandığında modal kapanmalı', async () => {
    const onClosePressableMock = jest.fn()
    const {headerCloseButtonTestId} = testId
    const {getByTestId} = render(
      <ModalComponent
        headerTitle={translator('TEST')}
        visible
        closeButton
        onClose={onClosePressableMock}
      />
    )

    await act(() => {
      const headerCloseButton = getByTestId(headerCloseButtonTestId)
      fireEvent.press(headerCloseButton)
    })

    await waitFor(() => expect(onClosePressableMock).toHaveBeenCalledTimes(1))
  })

  it('modal tam ekran değilken container dışına tıklanırsa modal kapanmalı', async () => {
    const onClosePressableMock = jest.fn()
    const {outsideTapAreaTestId} = testId
    const {getByTestId} = render(
      <ModalComponent
        height={50}
        headerTitle={translator('TEST')}
        visible
        closeButton
        onClose={onClosePressableMock}
      />
    )

    await act(() => {
      const outsideContainer = getByTestId(outsideTapAreaTestId)
      fireEvent.press(outsideContainer)
    })

    await waitFor(() => expect(onClosePressableMock).toHaveBeenCalledTimes(1))
  })

  it('panResponder headerda olmalı', async () => {
    const {slideToCloseTestId, headerTestId} = testId
    const {getByTestId} = render(
      <ModalComponent headerTitle={translator('TEST')} visible slideToClose onClose={onCloseMock} />
    )

    await act(() => {
      const panResponder = getByTestId(slideToCloseTestId)

      // TODO: İç elementleri de bir katman olarak çağırıyor.
      expect(panResponder.parent?.parent?.parent?.parent).toHaveProp('testID', headerTestId)
    })
  })

  it('panResponder header dışında olmalı', async () => {
    const {slideToCloseTestId, headerTestId} = testId
    const {getByTestId} = render(<ModalComponent visible slideToClose />)

    await act(() => {
      const panResponder = getByTestId(slideToCloseTestId)

      // TODO: İç elementleri de bir katman olarak çağırıyor.
      expect(panResponder.parent?.parent?.parent).not.toHaveProp('testID', headerTestId)
    })
  })

  it('modal fullscreenken panResponder ekranda olmamalı', async () => {
    const {slideToCloseTestId} = testId
    const {queryByTestId} = render(<ModalComponent fullScreen visible slideToClose />)

    await act(() => {
      const panResponder = queryByTestId(slideToCloseTestId)

      expect(panResponder).not.toBeOnTheScreen()
    })
  })

  it('modal verilen children elementi ekranda göstermeli', async () => {
    const {getByText} = render(
      <ModalComponent fullScreen visible>
        <Label>{translator('TEST')}</Label>
      </ModalComponent>
    )

    await act(() => {
      const testLabelByText = getByText(translator('TEST'))

      expect(testLabelByText).toBeOnTheScreen()
    })
  })
})
