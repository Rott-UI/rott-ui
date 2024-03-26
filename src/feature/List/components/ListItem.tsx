/* eslint-disable react-native/no-inline-styles */
// React Imports
import {FC} from 'react'

// Component Imports
import {Icon, Item, Label, Pressable} from '../..'

// Util and Lib Imports
import {ListItemProps} from '../utils'
import {colourFromVariant} from '../../../utils'

// Package Imports
import Swipeable from 'react-native-gesture-handler/Swipeable'

/**
 *
 * @param icon - Solda renderlanacak icon
 * @param title - Başlık **Zorunlu**
 * @param subTitle - Alt Başlık
 * @param rightIcon - Sağda renderlanacak icon
 * @param color - Yazi Rengi
 * @param fontFamily - Yazı Fontu
 * @param onAction - Tıklandığında Alacağı Fonksiyon
 * @param backgroundColor - Item Arka Plan Rengi varsayilan degeri `green-vogue`
 * @param swipeable - Kaydirma Efekti
 * @param renderRightActions - Kaydirma Efektinde Sag Tarafta Renderlanacak Item Degerleri
 * @param renderLeftActions - Kaydirma Efektinde Sol Tarafta Renderlanacak Item Degerleri
 *
 * @returns Standart List Item Renderlar
 */
export const ListItem: FC<ListItemProps> = ({
  testID,
  icon,
  title,
  subTitle,
  rightIcon,
  titleColor = 'grey-900',
  iconColor = 'grey-900',
  rightIconColor = 'grey-900',
  fontFamily = 'Markpro-Medium',
  backgroundColor = 'grey-200',
  swipeable,
  renderRightActions,
  renderLeftActions,
  onAction,
}) => {
  const listItemContent = (
    <Pressable
      key={testID ?? `list-item-${title.toSeoFriendly()}`}
      backgroundColor={colourFromVariant(backgroundColor)}
      onPress={() => onAction && onAction!()}>
      <Item
        testID={testID ?? `list-item-${title.toSeoFriendly()}-test-id`}
        row
        alignItemsCenter
        justifyContentCenter
        height={56}
        width={390}
        paddingHorizontal={24}>
        <Item width={24}>
          {icon && (
            <Icon name={icon} width={24} height={24} variant={iconColor} noStroke mode='stroke' />
          )}
        </Item>

        <Item marginLeft={16} width={262}>
          {icon && rightIcon && (
            <Label variant={titleColor} fontSize='xl' fontFamily={fontFamily}>
              {title}
            </Label>
          )}

          {icon && !rightIcon && (
            <Label variant={titleColor} fontSize='xl' fontFamily={fontFamily}>
              {title}
            </Label>
          )}

          {!icon && !rightIcon && (
            <Label variant={titleColor} fontSize='xl' fontFamily={fontFamily} justifyContentCenter>
              {title}
            </Label>
          )}

          {subTitle && (
            <Label variant={titleColor} fontSize='lg' fontFamily={fontFamily} marginTop={8}>
              {subTitle}
            </Label>
          )}
        </Item>

        <Item width={24} marginLeft={16}>
          {rightIcon && <Icon name={rightIcon} width={24} height={24} variant={rightIconColor} />}
        </Item>
      </Item>
    </Pressable>
  )

  return (
    <>
      {swipeable && (
        <Swipeable renderRightActions={renderRightActions} renderLeftActions={renderLeftActions}>
          {listItemContent}
        </Swipeable>
      )}

      {!swipeable && {...listItemContent}}
    </>
  )
}
