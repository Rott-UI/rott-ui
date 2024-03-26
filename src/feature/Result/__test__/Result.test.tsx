// React Imports
import React from 'react'

// Component Imports
import {Result} from '../components'
import {Label} from '../../Label'
import {Icon, IconTypes} from '../../Icon'
import {Item} from '../../Item'

// Util and Lib Imports
import {fireEvent, render, waitFor} from '../../../utils'

describe('Result -> Custom Component', () => {
  const testId = {
    resultTestId: 'result-test-id',
    headerTestId: 'result-header-test-id',
    headerTitleTestId: 'header-title-test-id',
    headerBackTestId: 'header-back-test-id',
    modalTestId: 'result-modal-test-id',
    childrenTestId: (name: string) => `result-data-${name}-test-id`,
    closeButtonTestId: 'header-right-icon-test-id',
  }

  const mockDetailElement = {
    headerTitleMock: 'Test Title',
    iconNameMock: 'RESULT_HGS' as IconTypes,
    titleMock: (
      <Item alignItemsCenter>
        <Item row>
          <Icon name='CHECK_CIRCLE' width={100} height={70} marginRight={20} />
          <Label fontSize='xl' variant='white' paddingTop={30}>
            Bakiye Yukleme
          </Label>
        </Item>
        <Item>
          <Label fontSize='xl' variant='white'>
            Islem Basariyla Tamamlandi
          </Label>
        </Item>
      </Item>
    ),
    descriptionMock: (
      <Item alignItemsCenter>
        <Label variant='white' fontSize='xl'>
          <Label fontWeight='bold' fontSize='xl'>
            06 JN 4511
          </Label>{' '}
          plakali arac icin
        </Label>
        <Label variant='white' fontSize='xl'>
          <Label fontWeight='bold' fontSize='xl'>
            25.00 TL
          </Label>{' '}
          HGS bakiyesi tanimlandi
        </Label>
      </Item>
    ),
  }

  let mockCountCheck = 0
  const mockExampleList = [
    {
      name: 'para-gonder',
      title: 'Para Gonder',
      action: () => {
        mockCountCheck++
      },
    },
    {
      name: 'hesap-hareketleri-incele',
      title: 'Hesap Hareketleri Incele',
      action: () => {
        mockCountCheck++
      },
    },
    {
      name: 'fatura-ode',
      title: 'Fatura Öde',
      action: () => {
        mockCountCheck++
      },
    },
    {
      name: 'hesap-bilgilerini-paylas',
      title: 'Hesap Bilgilerini Paylaş',
      action: () => {
        mockCountCheck++
      },
    },
    {
      name: 'yeniden-yukle',
      title: 'Yeniden Yukle',
      action: () => {
        mockCountCheck++
      },
    },
  ]

  beforeAll(() => {
    // TODO: useState mock example
    const setStateMock = jest.fn()
    const useStateMock: any = (useState: any) => [useState, setStateMock]
    jest.spyOn(React, 'useState').mockImplementation(useStateMock)
  })

  it('ilk render anında snapshot ile eşleşmeli', () => {
    const {resultTestId} = testId
    const {headerTitleMock, iconNameMock} = mockDetailElement
    const mockOnClose = jest.fn()

    const rendered = render(
      <Result
        testID={resultTestId}
        headerTitle={headerTitleMock}
        headerLogo='HGS_LOGO'
        iconName={iconNameMock}
        variant='success'
        actions={mockExampleList}
        isShow
        onClose={() => mockOnClose}
      />
    )

    expect(rendered).toMatchSnapshot()
  })

  it('title ekranda düzgün şekilde renderlanmalı', () => {
    const {resultTestId, headerTitleTestId} = testId
    const {headerTitleMock, titleMock, descriptionMock, iconNameMock} = mockDetailElement
    const mockOnClose = jest.fn()

    const {getByTestId} = render(
      <Result
        testID={resultTestId}
        headerTitle={headerTitleMock}
        title={titleMock}
        description={descriptionMock}
        actions={mockExampleList}
        iconName={iconNameMock}
        variant='success'
        onClose={mockOnClose}
        visible
        isShow
      />
    )

    const headerTitle = getByTestId(headerTitleTestId)

    expect(headerTitle).toHaveTextContent(headerTitleMock)
  })

  it('close icon ekranda düzgün şekilde renderlanmalı', () => {
    const {resultTestId, closeButtonTestId} = testId
    const {headerTitleMock, iconNameMock} = mockDetailElement
    const mockOnClose = jest.fn()

    const {getByTestId} = render(
      <Result
        testID={resultTestId}
        headerTitle={headerTitleMock}
        actions={mockExampleList}
        iconName={iconNameMock}
        variant='success'
        onClose={mockOnClose}
        closeButton
        isShow
      />
    )

    const closeButton = getByTestId(closeButtonTestId)

    expect(closeButton).toBeOnTheScreen()
  })

  it('verilen data renderlanmali', async () => {
    const {resultTestId, childrenTestId} = testId
    const {headerTitleMock, iconNameMock} = mockDetailElement
    const mockOnClose = jest.fn()

    const {getByTestId} = render(
      <Result
        testID={resultTestId}
        headerTitle={headerTitleMock}
        actions={mockExampleList}
        iconName={iconNameMock}
        variant='success'
        onClose={mockOnClose}
        isShow
      />
    )

    await waitFor(() => {
      mockExampleList.map(({name, title}) => {
        const element = getByTestId(childrenTestId(name))

        expect(element).toHaveTextContent(title)
      })
    })
  })

  it('verilen data actionlari calismali', async () => {
    const {resultTestId, childrenTestId} = testId
    const {headerTitleMock, iconNameMock} = mockDetailElement
    const mockOnClose = jest.fn()

    const {getByTestId} = render(
      <Result
        testID={resultTestId}
        headerTitle={headerTitleMock}
        iconName={iconNameMock}
        variant='success'
        actions={mockExampleList}
        onClose={mockOnClose}
        isShow
      />
    )

    mockExampleList.map(({name}, index) => {
      const element = getByTestId(childrenTestId(name))

      waitFor(() => {
        fireEvent.press(element)
      })

      expect(mockCountCheck).toBe(index + 1)
    })
  })

  it('close butonu ile modal kapatilmali', async () => {
    const {resultTestId, closeButtonTestId} = testId
    const {headerTitleMock, iconNameMock} = mockDetailElement
    const mockOnClose = jest.fn()

    const {getByTestId} = render(
      <Result
        testID={resultTestId}
        headerTitle={headerTitleMock}
        iconName={iconNameMock}
        variant='success'
        actions={mockExampleList}
        onClose={mockOnClose}
        isShow
      />
    )

    const closeElement = getByTestId(closeButtonTestId)
    await waitFor(() => fireEvent.press(closeElement))

    expect(mockOnClose).toHaveBeenCalled()
  })
})
