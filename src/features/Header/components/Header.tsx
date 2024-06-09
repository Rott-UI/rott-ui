// React Imports
import {FC} from 'react'

// Constant Imports
import {COLOURS} from '../../../constants'

// Component Imports
import {Item} from '../../Item'
import {Icon} from '../../Icon'
import {Label} from '../../Label'
import {Image} from '../../Image'
import {HeaderProps} from '../models'
import {Content} from '../../Content'
import {Pressable} from '../../Pressable'

// Util and Lib Imports
import {goBack} from '../../../utils'

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
  goBackFunction,
  children,
  ...props
}) => {
  return (
    <Content
      testID='header-test-id'
      noPadding
      minHeight={56}
      paddingHorizontal={paddingHorizontal ?? 24}
      paddingVertical={paddingVertical ?? 0}
      backgroundColor={defaultBackgroundColor ? COLOURS.GREY800 : backgroundColor}
      {...props}>
      <Item row size='full' minHeight={56}>
        <Item justifyContentCenter size='sm'>
          <Pressable
            testID='header-left-pressable-test-id'
            width={40}
            height={40}
            justifyContentCenter
            alignItemsFlexStart={!leftIcon?.alignItemsCenter}
            alignItemsCenter={!!leftIcon?.alignItemsCenter}
            backgroundColor={leftIcon?.backgroundColor}
            borderRadius={leftIcon?.borderRadius}
            onPress={(event) => {
              !!leftIcon?.onPress && leftIcon?.onPress(event)
              goBackFunction && goBackFunction()
              back && goBack()
            }}>
            {!leftElement && (leftIcon || back) && (
              <Icon
                testID={leftIcon?.testID ?? 'header-left-icon-test-id'}
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
              backgroundColor={leftIcon?.backgroundColor}
              borderRadius={leftIcon?.borderRadius}
              onPress={(event) => !!rightIcon?.onPress && rightIcon.onPress(event)}>
              <Icon
                mode={rightIcon.mode}
                testID={rightIcon?.testID ?? 'header-right-icon-test-id'}
                name={rightIcon?.name}
                width={24}
                height={24}
                strokeWidth={rightIcon?.strokeWidth ?? 2}
                variant='white'
              />
            </Pressable>
          )}

          {rightElement}
        </Item>
      </Item>

      {children}
    </Content>
  )
}
