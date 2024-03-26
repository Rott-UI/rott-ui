// React Imports
import {FC} from 'react'

//React Native Imports
import {ViewProps} from 'react-native'

// Constant Imports
import {COLOURS} from '../../../constants'

// Component Imports
import {Content} from '../../Content'
import {Item} from '../../Item'
import {Icon, IconTypes} from '../../Icon'
import {Label} from '../../Label'
import {CommonUiProps} from '../../models'
import {Pressable} from '../../Pressable'

// Util and Lib Imports
import {goBack} from '../../../utils'
import {Image, ImageTypes} from '../../Image'
import {HeaderIconProps} from '../models'

interface HeaderProps extends ViewProps, CommonUiProps {
  back?: boolean
  title?: string
  subTitle?: string
  logo?: ImageTypes | IconTypes
  leftElement?: React.ReactElement | React.ReactNode
  leftIcon?: HeaderIconProps
  rightElement?: React.ReactElement | React.ReactNode
  rightIcon?: HeaderIconProps
  defaultBackgroundColor?: boolean
  paddingHorizontal?: number
  paddingVertical?: number
}

/**
 *
 * @param title - Eğer Icon yerine bir title gözükmesi isteniyorsa bu property kullanılabilir.
 * @param subTitle - Alt Baslik.
 * @param back - Bir önceki sayfaya dönülmek istendiğinde bu property'nin verilmesi yeterli olacaktır. Historyde kayıtlı geridönülebilir sayfa varsa otomatikman o sayfaya gidecektir.
 * @param logo - Verilen logo header'ın ortasında renderlanacaktır.
 * @param rightElement - Sağ tarafta render olacak elementi verebilirsiniz
 * @param rightIcon - Icon setlerinden herhangi birini verirseniz ekranda renderlanır
 * @param rightIconOnPress - Sağ tarafta renderlanan icon'a basıldığından gerçekleşmesi gereken bir işlem varsa bu prop kullanılabilir.
 * @param leftElement - Sol tarafta render olacak elementi verebilirsiniz
 * @param leftIcon - Icon setlerinden herhangi birini verirseniz ekranda renderlanır
 * @param leftIconOnPress - Sol tarafta renderlanan icon'a basıldığından gerçekleşmesi gereken bir işlem varsa bu prop kullanılabilir.
 * @param casal - Arka planın casal renkte olmasını istediğinizde kullanabilirsiniz.
 * @param paddingHorizontal - Yatayda kisisellestirilebilir bosluk
 * @param paddingVertical - Dikeyde kisisellestirilebilir bosluk
 *
 */
export const Header: FC<HeaderProps> = ({
  back,
  title,
  subTitle,
  logo,
  leftIcon,
  leftElement,
  rightIcon,
  rightElement,
  defaultBackgroundColor,
  backgroundColor,
  paddingHorizontal,
  paddingVertical,
}) => {
  return (
    <Content
      testID='header-test-id'
      row
      noPadding
      height={56}
      paddingHorizontal={paddingHorizontal ?? 24}
      paddingVertical={paddingVertical ?? 0}
      backgroundColor={defaultBackgroundColor ? COLOURS.GREY800 : backgroundColor}>
      <Item justifyContentCenter size='sm'>
        <Pressable
          width={40}
          height={40}
          justifyContentCenter
          alignItemsFlexStart
          onPress={(event) => {
            !!leftIcon?.onPress && leftIcon?.onPress(event)
            back && goBack()
          }}>
          {!leftElement && (leftIcon || back) && (
            <Icon
              mode={leftIcon?.mode}
              name={back ? 'CHEVRON_LEFT' : leftIcon?.name!}
              width={24}
              height={24}
              noStroke={leftIcon?.noStroke}
              strokeWidth={back ? 2 : leftIcon?.strokeWidth}
            />
          )}

          {leftElement}
        </Pressable>
      </Item>

      <Item alignItemsCenter size='md' paddingTop={16}>
        {logo && <Image testID='header-logo-test-id' width={127} height={24} name={logo} />}

        {!logo && title && (
          <Label
            testID='header-title-test-id'
            textCenter
            fontSize='xl'
            fontFamily='Markpro-Bold'
            justifyContentCenter
            variant='white'
            numberOfLines={1}
            marginTop={subTitle && -15}>
            {title}
          </Label>
        )}

        {!logo && subTitle && (
          <Label
            textCenter
            fontSize='lg'
            justifyContentCenter
            fontFamily='Markpro-Light'
            variant='white'
            numberOfLines={1}
            marginTop={10}
            testID='header-subtitle-test-id'>
            {subTitle}
          </Label>
        )}
      </Item>

      <Item alignItemsFlexEnd justifyContentCenter size='sm'>
        {!rightElement && rightIcon && (
          <Pressable
            testID='header-right-pressable-test-id'
            width={40}
            height={40}
            justifyContentCenter
            alignItemsCenter
            onPress={(event) => !!rightIcon?.onPress && rightIcon.onPress(event)}>
            <Icon
              mode={rightIcon.mode}
              testID='header-right-icon-test-id'
              name={rightIcon?.name}
              width={24}
              height={24}
              strokeWidth={1.5}
              variant='white'
            />
          </Pressable>
        )}

        {rightElement}
      </Item>
    </Content>
  )
}
