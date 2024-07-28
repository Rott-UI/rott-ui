// React Imports
import React from 'react'

// Component Imports
import {Content} from '../../Content'
import {Item} from '../../Item'
import {Label} from '../../Label'
import {ModalComponent} from '../components'
import {ModalProps} from '../models'

// Util and Lib Imports
import {act, fireEvent, render, waitFor} from '../../../utils'

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

  const dummyDataFullScreen: ModalProps = {
    testID: testId.modalTestId,
    header: {
      title: 'Test',
      logo: 'PTTBANK_BLACK_COLORED',
    },
    slideToClose: true,
    visible: true,
    fullScreen: true,
    closeButton: true,
    onClose: onCloseMock,
  }

  const dummyData: ModalProps = {
    testID: testId.modalTestId,
    header: {
      title: 'Test',
      logo: 'PTTBANK_BLACK_COLORED',
    },
    visible: true,
    height: 50,
    fullScreen: false,
    slideToClose: true,
    closeButton: true,
    onClose: onCloseMock,
  }

  beforeAll(() => {
    // TODO: useState mock example
    const setStateMock = jest.fn()
    const useStateMock: any = (useState: any) => [useState, setStateMock]
    jest.spyOn(React, 'useState').mockImplementation(useStateMock)
  })

  it('modal ilk renderlandiginda snapshot ile eşleşmeli', () => {
    const renderedModal = render(
      <ModalComponent {...dummyData}>
        <Item>
          <Label>{'Test'}</Label>
        </Item>
      </ModalComponent>
    )

    expect(renderedModal).toMatchSnapshot()
  })

  it('modal visible değilken ekranda gözükmemeli', async () => {
    const {queryByText} = render(
      <ModalComponent {...dummyData} visible={false}>
        <Item>
          <Label>Test</Label>
        </Item>
      </ModalComponent>
    )

    await act(() => {
      const testLabelByText = queryByText('Test')

      expect(testLabelByText).not.toBeOnTheScreen()
    })
  })

  it('custom header verildiğinde ekranda custom header olmalı', async () => {
    const {headerTestId} = testId

    const {getByTestId} = render(
      <ModalComponent
        {...dummyData}
        header={
          <Content testID={headerTestId}>
            <Label>{'Test'}</Label>
          </Content>
        }>
        <Item>
          <Label>Test</Label>
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
    const {getByTestId} = render(<ModalComponent {...dummyData} />)

    await act(() => {
      const headerCloseButton = getByTestId(headerCloseIconTestId)

      expect(headerCloseButton).toBeOnTheScreen()
    })
  })

  it('modal header child elementi ekranda olmalı', async () => {
    const {getByTestId} = render(
      <ModalComponent
        {...dummyData}
        header={{
          title: 'Test',
          logo: 'PTTBANK_BLACK_COLORED',
          children: <Label testID={'header-children-test-id'}>{'Test'}</Label>,
        }}>
        <Item>
          <Label>Test</Label>
        </Item>
      </ModalComponent>
    )

    await act(() => {
      const headerChildren = getByTestId('header-children-test-id')

      expect(headerChildren).toBeOnTheScreen()
    })
  })

  it('modal kapatma butonuna tıklandığında modal kapanmalı', async () => {
    const onClosePressableMock = jest.fn()
    const {headerCloseButtonTestId} = testId
    const {getByTestId} = render(<ModalComponent {...dummyData} onClose={onClosePressableMock} />)

    await act(() => {
      const headerCloseButton = getByTestId(headerCloseButtonTestId)
      fireEvent.press(headerCloseButton)
    })

    await waitFor(() => expect(onClosePressableMock).toHaveBeenCalledTimes(1))
  })

  it('modal tam ekran değilken container dışına tıklanırsa modal kapanmalı', async () => {
    const onClosePressableMock = jest.fn()
    const {outsideTapAreaTestId} = testId
    const {getByTestId} = render(<ModalComponent {...dummyData} onClose={onClosePressableMock} />)

    await act(() => {
      const outsideContainer = getByTestId(outsideTapAreaTestId)
      fireEvent.press(outsideContainer)
    })

    await waitFor(() => expect(onClosePressableMock).toHaveBeenCalledTimes(1))
  })

  it('panResponder headerda olmalı', async () => {
    const {slideToCloseTestId} = testId
    const {getByTestId} = render(<ModalComponent {...dummyData} />)

    await act(() => {
      const panResponder = getByTestId(slideToCloseTestId)

      expect(panResponder).toBeOnTheScreen()
    })
  })

  it('panResponder headerda olmamalı', async () => {
    const {slideToCloseTestId} = testId
    const {queryByTestId} = render(<ModalComponent {...dummyData} slideToClose={false} />)

    await act(() => {
      const panResponder = queryByTestId(slideToCloseTestId)

      expect(panResponder).toBeNull()
    })
  })

  it('panResponder header dışında olmalı', async () => {
    const {slideToCloseTestId, headerTestId} = testId
    const {getByTestId} = render(<ModalComponent {...dummyData} />)

    await act(() => {
      const panResponder = getByTestId(slideToCloseTestId)

      // TODO: İç elementleri de bir katman olarak çağırıyor.
      expect(panResponder.parent?.parent?.parent).not.toHaveProp('testID', headerTestId)
    })
  })

  it('modal fullscreen modunda panResponder ekranda olmamalı', async () => {
    const {slideToCloseTestId} = testId
    const {queryByTestId} = render(<ModalComponent {...dummyDataFullScreen} />)

    await act(() => {
      const panResponder = queryByTestId(slideToCloseTestId)

      expect(panResponder).not.toBeOnTheScreen()
    })
  })

  it('modal verilen children elementi ekranda göstermeli', async () => {
    const {getByText} = render(
      <ModalComponent fullScreen visible>
        <Label>{'Test'}</Label>
      </ModalComponent>
    )

    await act(() => {
      const testLabelByText = getByText('Test')

      expect(testLabelByText).toBeOnTheScreen()
    })
  })
})
