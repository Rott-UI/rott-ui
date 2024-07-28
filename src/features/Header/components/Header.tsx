// React Imports
import {FC, isValidElement} from 'react'

// Feature Imports
import {Item} from '../../Item'
import {Icon, IconProps} from '../../Icon'
import {Label} from '../../Label'
import {Image} from '../../Image'
import {HeaderProps} from '../models'
import {Content} from '../../Content'
import {Pressable} from '../../Pressable'
import {themeConfig} from '../../../providers'

// Provider Imports

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
  height = 56,
  ...props
}) => {
  return (
    <Content
      testID='header-test-id'
      minHeight={height}
      noPadding
      paddingHorizontal={paddingHorizontal ?? 24}
      paddingVertical={paddingVertical ?? 0}
      backgroundColor={defaultBackgroundColor ? themeConfig.colors['grey-800'] : backgroundColor}
      justifyContentCenter
      alignItemsCenter
      {...props}>
      <Item row height={height}>
        {/* Left Side */}
        <Item relative flexShrink={1} height={height} minWidth={height} justifyContentCenter>
          {!leftElement && !isValidElement(leftElement) && (
            <Pressable
              {...(typeof leftIcon === 'object' ? {...leftIcon} : null)}
              testID='header-left-pressable-test-id'
              width={height}
              height={height}
              minWidth={height}
              alignItemsFlexStart={!leftIcon?.alignItemsCenter}
              alignItemsCenter={!!leftIcon?.alignItemsCenter}
              backgroundColor={leftIcon?.backgroundColor}
              borderRadius={leftIcon?.rounded ? height : leftIcon?.borderRadius}
              justifyContentCenter
              onPress={(event) => {
                !!leftIcon?.onPress && leftIcon?.onPress(event)
                back && !!goBackFunction && goBackFunction()
              }}>
              <Icon
                testID='header-left-icon-test-id'
                width={24}
                height={24}
                strokeWidth={back ? 2 : leftIcon?.strokeWidth}
                variant={(leftIcon as IconProps)?.variant}
                mode={(leftIcon as IconProps)?.mode ?? 'stroke'}
                noStroke={
                  (leftIcon as IconProps)?.noStroke ?? (leftIcon as IconProps)?.mode === 'fill'
                }
                {...(typeof leftIcon === 'object' ? (leftIcon as IconProps) : {})}
                name={back ? 'CHEVRON_LEFT' : (leftIcon as IconProps)?.name ?? leftIcon}
              />
            </Pressable>
          )}

          {leftElement && isValidElement(leftElement) && leftElement}
        </Item>
        {/* Left Side */}

        {/* Middle */}
        <Item
          relative
          flex={1}
          height={height}
          minWidth={height}
          // backgroundColor='red'
          justifyContentCenter
          alignItemsCenter>
          {logo && <Image testID='header-logo-test-id' width={127} height={24} name={logo} />}

          {!logo && title && (
            <Label
              testID='header-title-test-id'
              textCenter
              fontSize='lg'
              fontFamily='Markpro-Bold'
              justifyContentCenter
              variant='white'
              numberOfLines={1}
              {...(typeof title === 'object' ? {...title} : null)}>
              {typeof title === 'string' ? title : title.text}
            </Label>
          )}
          {!logo && subTitle && (
            <Label
              testID='header-subtitle-test-id'
              textCenter
              fontSize='md'
              justifyContentCenter
              fontFamily='Markpro-Bold'
              variant='white'
              numberOfLines={1}
              {...(typeof subTitle === 'object' ? {...subTitle} : null)}>
              {typeof subTitle === 'string' ? subTitle : subTitle.text}
            </Label>
          )}
        </Item>
        {/* Middle */}

        {/* Right Side */}
        <Item
          relative
          flexShrink={1}
          height={height}
          minWidth={height}
          justifyContentCenter
          alignItemsFlexEnd>
          <Pressable
            {...(typeof rightIcon === 'object' ? {...rightIcon} : null)}
            testID='header-right-pressable-test-id'
            height={height}
            minWidth={height}
            alignItemsFlexStart={!rightIcon?.alignItemsCenter}
            alignItemsCenter={!!rightIcon?.alignItemsCenter}
            backgroundColor={rightIcon?.backgroundColor}
            borderRadius={leftIcon?.rounded ? height : leftIcon?.borderRadius}
            justifyContentCenter
            alignItemsFlexEnd
            onPress={(event) => !!rightIcon?.onPress && rightIcon?.onPress(event)}>
            {!rightElement && !isValidElement(rightElement) && (
              <Icon
                testID='header-right-icon-test-id'
                width={24}
                height={24}
                strokeWidth={back ? 2 : rightIcon?.strokeWidth}
                variant={(rightIcon as IconProps)?.variant}
                mode={(rightIcon as IconProps)?.mode ?? 'stroke'}
                noStroke={
                  (rightIcon as IconProps)?.noStroke ?? (rightIcon as IconProps)?.mode === 'fill'
                }
                {...(typeof rightIcon === 'object' ? (rightIcon as IconProps) : {})}
                name={(rightIcon as IconProps)?.name ?? rightIcon}
              />
            )}
          </Pressable>

          {rightElement && isValidElement(rightElement) && rightElement}
        </Item>
        {/* Right Side */}
      </Item>

      {children}
    </Content>
  )
}
