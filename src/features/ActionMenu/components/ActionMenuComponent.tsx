// React Imports
import React, {FC} from 'react'

// Component Imports
import {Item, Pressable, Label, Button, List, ActionMenu} from '../..'
import {ActionMenuStyles} from '../styles'
import {ActionMenuProps, ActionModel} from '../models'

// Constant Imports

// Util and Lib Imports

/**
 * Action Menu
 *
 * @param title Başlık alanı
 * @param subTitle Alt başlık alanı
 * @param data ActionModel[] formatında veri listesi
 * @param visible ActionMenu komponentin bulunduğu yerdeki Show state i
 * @returns Action Menu Renderlanır
 *
 */
export const ActionMenuComponent: FC<ActionMenuProps> = ({
  title,
  subTitle,
  data,
  itemHeight,
  maxItem,
  separatorTotalHeight,
}) => {
  const itemCount = (data?.length ?? 0) > maxItem! ? maxItem! : data?.length ?? 0

  // Listede renderlanacak Item
  const renderItem = ({
    title: renderItemTitle,
    name: renderItemName,
    action: onAction,
  }: ActionModel) => (
    <Pressable
      testID={`action-menu-data-${renderItemName}-test-id`}
      height={itemHeight}
      justifyContentCenter
      alignItemsCenter
      onPress={() => onAction()}>
      <Label fontSize='lg' variant='grey-900' fontWeight={500}>
        {renderItemTitle}
      </Label>
    </Pressable>
  )

  return (
    <Item size='full' style={ActionMenuStyles().actionMenuContainer} alignItemsCenter>
      <Item
        width={342}
        backgroundColor={COLOURS.GREY100}
        borderTopStartRadius={!(title || subTitle) ? 12 : 0}
        borderTopEndRadius={!(title || subTitle) ? 12 : 0}
        borderBottomStartRadius={12}
        borderBottomEndRadius={12}
        marginBottom={16}>
        <List
          testID='action-menu-test-id'
          style={{minHeight: 2}}
          width={342}
          height={itemHeight! * itemCount + separatorTotalHeight!}
          data={data}
          renderItem={({item}) => renderItem(item)}
          horizontal={false}
          separatorVariant='neutral-alpha-200'
          renderSeparator
          headerSeparator
          footerSeparator
          estimatedItemSize={display.normalize(itemHeight!, 'height')}
          showsVerticalScrollIndicator={false}
          scrollEnabled={(data?.length ?? 0) > maxItem!}
        />
      </Item>

      <Button
        variant='primary'
        onPress={() => ActionMenu.hideActionMenu()}
        fontSize='xl'
        size='full'
        testID='action-menu-cancel-test-id'
        marginBottom={21}>
        {translator('COMMON.CANCEL')}
      </Button>
    </Item>
  )
}
