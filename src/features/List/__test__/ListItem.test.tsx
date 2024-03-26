// React Imports
import React from 'react'

// Component Imports
import {ListItem} from '../components'

// Util and Lib Imports
import {formatMessage, render} from '../../../utils'
import {ListItemProps} from '../utils'
import {COLOURS} from '../../../constants'
import {Pressable} from '../../Pressable/components'
import {Icon} from '../../Icon/components'
import {Label} from '../../Label/components'

describe('List Item -> Custom Component', () => {
  const dummyData: ListItemProps = {
    icon: 'SETTINGS',
    iconColor: 'white',
    title: 'TEST',
    titleColor: 'white',
    rightIcon: 'ARROW_RIGHT',
    rightIconColor: 'white',
  }

  const testId = {
    listItemTestId: `list-item-${dummyData.title.toSeoFriendly()}-test-id`,
  }

  it('list ilk render anında snapshot ile eşleşmeli', () => {
    const {icon, iconColor, title, titleColor, rightIcon, rightIconColor} = dummyData
    const rendered = render(
      <ListItem
        icon={icon}
        iconColor={iconColor}
        title={title}
        titleColor={titleColor}
        rightIcon={rightIcon}
        rightIconColor={rightIconColor}
      />
    )

    expect(rendered).toMatchSnapshot()
  })

  it('title ekranda renderlanmali', () => {
    const {title} = dummyData
    const {listItemTestId} = testId
    const {getByTestId} = render(<ListItem title={title} />)

    const listItemElement = getByTestId(listItemTestId)

    expect(listItemElement).toHaveTextContent(title)
  })

  it('title varsayilan rengi grey-900 olmali', () => {
    const {icon, title} = dummyData
    const {getByText} = render(<ListItem icon={icon} title={title} />)

    const titleElement = getByText(title)

    expect(titleElement.props.style).toHaveProperty('color', COLOURS.GREY900)
  })

  it('icon varsa ekranda renderlanmali', () => {
    const {icon, title} = dummyData
    const {listItemTestId} = testId
    const {getByTestId} = render(<ListItem icon={icon} title={title} />)

    const listItemElement = getByTestId(listItemTestId)

    // TODO: Düzenlenecek, standart oturtulacak.
    expect((listItemElement.children[0] as any).children[0].children[0].children[0]).toHaveProp(
      'name',
      icon
    )
  })

  it('iconun varsayilan rengi grey-900 olmali', () => {
    const {icon, title} = dummyData
    const {listItemTestId} = testId
    const {getByTestId} = render(<ListItem icon={icon} title={title} />)

    const listItemElement = getByTestId(listItemTestId)

    expect((listItemElement.children[0] as any).children[0].children[0].children[0]).toHaveProp(
      'variant',
      'grey-900'
    )
  })

  it('icon icin farkli bir renk verilmis ise duzgun renderlanmali', () => {
    const {icon, iconColor, title} = dummyData
    const {listItemTestId} = testId
    const {getByTestId} = render(<ListItem icon={icon} iconColor={iconColor} title={title} />)

    const listItemElement = getByTestId(listItemTestId)

    expect((listItemElement.children[0] as any).children[0].children[0].children[0]).toHaveProp(
      'variant',
      iconColor
    )
  })

  it('right icon varsa ekranda renderlanmali', () => {
    const {rightIcon, title} = dummyData
    const {listItemTestId} = testId
    const {getByTestId} = render(<ListItem rightIcon={rightIcon} title={title} />)

    const listItemElement = getByTestId(listItemTestId)

    expect(
      (listItemElement.children[listItemElement.children.length - 1] as any).children[0].children[0]
        .children[0]
    ).toHaveProp('name', rightIcon)
  })

  it('right iconun varsayilan rengi grey-900 olmali', () => {
    const {rightIcon, title} = dummyData
    const {listItemTestId} = testId
    const {getByTestId} = render(<ListItem rightIcon={rightIcon} title={title} />)

    const listItemElement = getByTestId(listItemTestId)

    expect(
      (listItemElement.children[listItemElement.children.length - 1] as any).children[0].children[0]
        .children[0]
    ).toHaveProp('variant', 'grey-900')
  })

  it('right icon icin farkli bir renk verilmis ise duzgun renderlanmali', () => {
    const {rightIcon, rightIconColor, title} = dummyData
    const {listItemTestId} = testId
    const {getByTestId} = render(
      <ListItem rightIcon={rightIcon} rightIconColor={rightIconColor} title={title} />
    )

    const listItemElement = getByTestId(listItemTestId)

    expect(
      (listItemElement.children[listItemElement.children.length - 1] as any).children[0].children[0]
        .children[0]
    ).toHaveProp('variant', rightIconColor)
  })

  it('swipe ozelliginde sag eleman var ise ekranda renderlanmali', () => {
    const {title} = dummyData
    const rightElementTestId = 'right-element-test-id'
    const {getByTestId} = render(
      <ListItem
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
      <ListItem
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
