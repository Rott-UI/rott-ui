// React Imports
import React from 'react'

// Component Imports
import {Icon} from '../../Icon/components'
import {Label} from '../../Label/components'
import {CommonItemProps} from '../models'
import {Pressable} from '../../Pressable/components'
import {CommonItem} from '../components' // Import the CommonItem component

// Constants Imports
import {COLOURS} from '../../../constants'

// Util and Lib Imports
import {formatMessage, render} from '../../../utils'

describe('List Item -> Custom Component', () => {
  const dummyData: CommonItemProps = {
    title: formatMessage('TEST.WITH.PARAM', {testText: 'TITLE'}),
    subTitle: formatMessage('TEST.WITH.PARAM', {testText: 'SUBTITLE'}),
    description: formatMessage('TEST.WITH.PARAM', {testText: 'DESCRIPTION'}),
    leftIcon: {
      name: 'STAR',
      width: 24,
      height: 24,
      color: COLOURS.PRIMARY,
    },
    rightIcon: {
      name: 'ADD',
      width: 24,
      height: 24,
      color: COLOURS.PRIMARY,
    },
  }

  const testId = {
    titleTestId: 'title-test-id',
    subTitleTestId: 'subtitle-test-id',
    descriptionTestId: 'description-test-id',
    leftIconTestId: 'left-icon-test-id',
    rightIconTestId: 'right-icon-test-id',
  }

  it('common item ilk renderlandığında snapshot ile eşleşmeli', () => {
    const commonItem = render(<CommonItem title={dummyData.title} />)

    expect(commonItem).toMatchSnapshot()
  })

  it('common item ilk renderlandığında title ekranda renderlanmali', () => {
    const {titleTestId} = testId
    const {title} = dummyData
    const {getByTestId} = render(<CommonItem title={title} />)

    const titleElement = getByTestId(titleTestId)

    expect(titleElement).toBeOnTheScreen()
  })

  it('common item ilk renderlandığında subTitle ekranda renderlanmali', () => {
    const {subTitleTestId} = testId
    const {title, subTitle} = dummyData
    const {getByTestId} = render(<CommonItem title={title} subTitle={subTitle} />)

    const subTitleElement = getByTestId(subTitleTestId)

    expect(subTitleElement).toBeOnTheScreen()
  })

  it('common item ilk renderlandığında description ekranda renderlanmali', () => {
    const {descriptionTestId} = testId
    const {title, subTitle, description} = dummyData
    const {getByTestId} = render(
      <CommonItem title={title} subTitle={subTitle} description={description} />
    )

    const descriptionElement = getByTestId(descriptionTestId)

    expect(descriptionElement).toBeOnTheScreen()
  })

  it('common item ilk renderlandığında leftIcon ekranda renderlanmali', () => {
    const {leftIconTestId} = testId
    const {title, subTitle, description, leftIcon} = dummyData
    const {queryByTestId} = render(
      <CommonItem title={title} subTitle={subTitle} description={description} leftIcon={leftIcon} />
    )

    const leftIconElement = queryByTestId(leftIconTestId)

    expect(leftIconElement).toBeOnTheScreen()
  })

  it('common item ilk renderlandiginda left iconu ekranda renderlanmamali', () => {
    const {leftIconTestId} = testId
    const {title, subTitle, description} = dummyData
    const {queryByTestId} = render(
      <CommonItem title={title} subTitle={subTitle} description={description} />
    )

    const leftIconElement = queryByTestId(leftIconTestId)

    expect(leftIconElement).toBeNull()
  })

  it('common item ilk renderlandığında rightIcon ekranda renderlanmali', () => {
    const {rightIconTestId} = testId
    const {title, subTitle, description, rightIcon} = dummyData
    const {getByTestId} = render(
      <CommonItem
        title={title}
        subTitle={subTitle}
        description={description}
        rightIcon={rightIcon}
      />
    )

    const rightIconElement = getByTestId(rightIconTestId)

    expect(rightIconElement).toBeOnTheScreen()
  })

  it('common item ilk renderlandiginda right iconu ekranda renderlanmamali', () => {
    const {rightIconTestId} = testId
    const {title, subTitle, description, leftIcon} = dummyData
    const {queryByTestId} = render(
      <CommonItem title={title} subTitle={subTitle} description={description} leftIcon={leftIcon} />
    )

    const rightIconElement = queryByTestId(rightIconTestId)

    expect(rightIconElement).toBeNull()
  })

  it('common item ilk renderlangidinga left ve right iconu ekranda renderlanmali', () => {
    const {rightIconTestId, leftIconTestId} = testId
    const {title, subTitle, description, rightIcon, leftIcon} = dummyData
    const {getByTestId} = render(
      <CommonItem
        title={title}
        subTitle={subTitle}
        description={description}
        rightIcon={rightIcon}
        leftIcon={leftIcon}
      />
    )

    const rightIconElement = getByTestId(rightIconTestId)
    const leftIconElement = getByTestId(leftIconTestId)

    expect(rightIconElement).toBeOnTheScreen()
    expect(leftIconElement).toBeOnTheScreen()
  })

  it('common item ilk renderlandiginda left ve right iconu ekranda renderlanmamali', () => {
    const {rightIconTestId, leftIconTestId} = testId
    const {title, subTitle, description} = dummyData
    const {queryByTestId} = render(
      <CommonItem title={title} subTitle={subTitle} description={description} />
    )

    const rightIconElement = queryByTestId(rightIconTestId)
    const leftIconElement = queryByTestId(leftIconTestId)

    expect(rightIconElement).toBeNull()
    expect(leftIconElement).toBeNull()
  })

  it('swipe ozelliginde sag eleman var ise ekranda renderlanmali', () => {
    const {title} = dummyData
    const rightElementTestId = 'right-element-test-id'
    const {getByTestId} = render(
      <CommonItem
        title={title}
        swipeable
        renderRightActions={() => (
          <Pressable
            alignItemsCenter
            justifyContentCenter
            backgroundColor={COLOURS.SECONDARY}
            testID={rightElementTestId}>
            <Icon name='STAR' width={24} height={24} />
            <Label>{formatMessage('LIST.ITEM.FAVORITE.ADD')}</Label>
          </Pressable>
        )}
      />
    )

    const rightElement = getByTestId(rightElementTestId)

    expect(rightElement).toBeOnTheScreen() // Right Element Ekranda Olmali
    expect(rightElement.children[0]).toHaveProp('name', 'STAR') // Icon Ekranda Olmali
    expect(rightElement).toHaveTextContent(formatMessage('LIST.ITEM.FAVORITE.ADD')) // Right Element Text Ekranda Olmali
  })

  it('swipe ozelliginde sol eleman var ise ekranda renderlanmali', () => {
    const {title} = dummyData
    const leftElementTestId = 'left-element-test-id'
    const {getByTestId} = render(
      <CommonItem
        title={title}
        swipeable
        renderLeftActions={() => (
          <Pressable
            alignItemsCenter
            justifyContentCenter
            backgroundColor={COLOURS.SECONDARY}
            testID={leftElementTestId}>
            <Icon name='STAR' width={10} height={10} />
            <Label>{formatMessage('LIST.ITEM.FAVORITE.ADD')}</Label>
          </Pressable>
        )}
      />
    )

    const leftElement = getByTestId(leftElementTestId)

    expect(leftElement).toBeOnTheScreen() // Right Element Ekranda Olmali
    expect(leftElement.children[0]).toHaveProp('name', 'STAR') // Icon Ekranda Olmali
    expect(leftElement).toHaveTextContent(formatMessage('LIST.ITEM.FAVORITE.ADD')) // Right Element Text Ekranda Olmali
  })
})
