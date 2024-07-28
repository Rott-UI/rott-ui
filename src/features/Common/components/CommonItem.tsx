// React Imports
import {FC, isValidElement, memo} from 'react'

// Constants Imports

// Component Imports
import {Item} from '../../Item'
import {CommonItemProps} from '../models'
import {Pressable} from '../../Pressable'
import {IconProps} from '../../Icon/models'
import {Icon} from '../../Icon/components'
import {Label, LabelProps} from '../../Label'

// Util and Lib Imports
import {colorFromVariant} from '../../../utils'

// Package Imports
import Swipeable from 'react-native-gesture-handler/Swipeable'

/**
 *  Common Item Component
 * @param width - Item Genişliği
 * @param height - Item Yüksekliği
 * @param backgroundColor - Item Arka Plan Rengi varsayilan degeri `green-vogue`
 *
 * @param leftIcon - Solda renderlanacak icon, iconProps objesi alabilir, string olabilir veya react elementi alabilir
 * @param rightIcon - Sağda renderlanacak icon, iconProps objesi alabilir, string olabilir veya react elementi alabilir
 *
 * @param title - Başlık **Zorunlu**
 * @param subTitle - Alt Başlık
 * @param description - Açıklama
 *
 * @param showSelected - Seçili Gösterilsin mi
 * @param selected - Seçili mi
 * @param swipeable - Kaydirma Efekti
 * @param renderRightActions - Kaydirma Efektinde Sag Tarafta Renderlanacak Item Degerleri
 * @param renderLeftActions - Kaydirma Efektinde Sol Tarafta Renderlanacak Item Degerleri
 * @param onPress - Tıklandığında Alacağı Fonksiyon
 *
 * @returns Standart List Item Renderlar
 */
export const CommonItem: FC<CommonItemProps> = memo(
  ({
    testID,
    width,
    height,
    backgroundColor = 'grey-200',

    leftIcon,
    rightIcon,

    title,
    subTitle,
    description,

    swipeable,
    selected = false,
    showSelected,

    paddingVertical,
    paddingHorizontal,

    renderRightActions,
    renderLeftActions,
    onPress,
    value,
  }) => {
    const listItemContent = (
      <Pressable
        testID={testID}
        backgroundColor={colorFromVariant(backgroundColor)}
        onPress={() => onPress && onPress!(value)}
        paddingVertical={paddingVertical ?? 16}
        paddingHorizontal={paddingHorizontal ?? 24}
        width={width}
        height={height}>
        <Item row alignItemsCenter justifyContentCenter>
          {/* Left Icon / Element */}
          {leftIcon && (
            <Pressable
              flex={0}
              marginRight={16}
              {...(typeof leftIcon === 'object' ? {...leftIcon} : null)}>
              {isValidElement(leftIcon) && <>{leftIcon}</>}
              {!isValidElement(leftIcon) && (
                <Item width={24} height={24}>
                  <Icon
                    testID='left-icon-test-id'
                    width={24}
                    height={24}
                    variant={(leftIcon as IconProps)?.variant ?? 'grey-900'}
                    mode={(leftIcon as IconProps)?.mode ?? 'stroke'}
                    noStroke={
                      (leftIcon as IconProps)?.noStroke ?? (leftIcon as IconProps).mode === 'fill'
                    }
                    {...(typeof leftIcon === 'object' ? (leftIcon as IconProps) : {})}
                    name={(leftIcon as IconProps)?.name ?? leftIcon}
                  />
                </Item>
              )}
            </Pressable>
          )}
          {/* Left Icon / Element */}

          {/* Middle Section / Title, Subtitle, Description */}
          <Item flex={1}>
            {isValidElement(title) && <>{title}</>}
            {!isValidElement(title) && (
              <Label
                testID='title-test-id'
                variant={(title as LabelProps)?.variant ?? 'grey-900'}
                fontSize={(title as LabelProps)?.fontSize ?? 'lg'}
                fontFamily={(title as LabelProps)?.fontFamily ?? 'Markpro-Medium'}
                {...(typeof title === 'object' ? {...title} : null)}>
                {typeof title === 'string' ? title : (title as LabelProps)?.text}
              </Label>
            )}

            {subTitle && (
              <>
                {isValidElement(subTitle) && <>{subTitle}</>}
                {!isValidElement(subTitle) && (
                  <Label
                    testID='subtitle-test-id'
                    variant={(subTitle as LabelProps)?.variant ?? 'grey-900'}
                    fontSize={(subTitle as LabelProps)?.fontSize ?? 'md'}
                    fontFamily={(subTitle as LabelProps)?.fontFamily ?? 'Markpro-Medium'}
                    marginTop={8}
                    {...(typeof subTitle === 'object' ? {...subTitle} : null)}>
                    {typeof subTitle === 'string' ? subTitle : (subTitle as LabelProps)?.text}
                  </Label>
                )}
              </>
            )}

            {description && (
              <>
                {isValidElement(description) && <>{description}</>}
                {!isValidElement(description) && (
                  <Label
                    testID='description-test-id'
                    variant={(description as LabelProps)?.variant ?? 'grey-900'}
                    fontSize={(description as LabelProps)?.fontSize ?? 'md'}
                    fontFamily={(description as LabelProps)?.fontFamily ?? 'Markpro-Medium'}
                    marginTop={8}
                    {...(typeof description === 'object' ? {...description} : null)}>
                    {typeof description === 'string'
                      ? description
                      : (description as LabelProps)?.text}
                  </Label>
                )}
              </>
            )}
          </Item>
          {/* Middle Section / Title, Subtitle, Description */}

          {/* Right Icon / Element */}
          {!showSelected && rightIcon && (
            <>
              <Pressable
                flex={0}
                marginLeft={(rightIcon as IconProps)?.marginLeft ?? 16}
                {...(typeof rightIcon === 'object' ? {...rightIcon} : null)}>
                {!showSelected && isValidElement(rightIcon) && <>{rightIcon}</>}
                {!showSelected && !isValidElement(rightIcon) && (
                  <Item width={24} height={24}>
                    <Icon
                      testID='right-icon-test-id'
                      width={24}
                      height={24}
                      variant={(rightIcon as IconProps).variant ?? 'grey-900'}
                      mode={(rightIcon as IconProps).mode ?? 'stroke'}
                      noStroke={
                        (rightIcon as IconProps).noStroke ??
                        (rightIcon as IconProps).mode === 'fill'
                      }
                      {...(typeof rightIcon === 'object' ? (rightIcon as IconProps) : {})}
                      name={(rightIcon as IconProps).name ?? rightIcon}
                    />
                  </Item>
                )}
              </Pressable>
            </>
          )}

          {showSelected && (
            <Item
              width={24}
              height={24}
              marginLeft={8}
              borderRadius={24}
              borderWidth={2}
              borderColor={selected ? COLOURS.PRIMARY : COLOURS.GREY200}
              justifyContentCenter
              alignItemsCenter>
              {selected && (
                <Item
                  width={16}
                  height={16}
                  borderRadius={13}
                  backgroundColor={COLOURS.PRIMARY}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    shadowColor: COLOURS.NEUTRAL_BLUESOFT,
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 1,
                    borderWidth: 2,
                    borderColor: COLOURS.NEUTRAL_BLUESOFT,
                  }}
                />
              )}
            </Item>
          )}
          {/* Right Icon / Element */}
        </Item>
      </Pressable>
    )

    return (
      <Item>
        {swipeable && (
          <Swipeable renderRightActions={renderRightActions} renderLeftActions={renderLeftActions}>
            {listItemContent}
          </Swipeable>
        )}

        {!swipeable && {...listItemContent}}
      </Item>
    )
  }
)
