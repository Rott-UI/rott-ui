// React Imports
import {FC, PropsWithChildren} from 'react'

// React Native Imports
import {TouchableOpacity, TouchableOpacityProps, StyleSheet, ActivityIndicator} from 'react-native'

// Component Imports
import {CommonUiProps, Size} from '../../models'
import {Label} from '../../Label'
import {Icon, IconTypes} from '../../Icon'

// Constant Imports
import {COLOURS} from '../../../constants'

// Model Imports
import {ButtonIconProps, ButtonImageProps} from '../models'

// Style Imports
import {ButtonStyles} from '../styles/Button.style'

// Util and Lib Imports
import {buttonSizeNormalizer} from '../../../utils/buttonSizeNormalizer'
import {display} from '../../../utils'
import {Image} from '../../Image'

interface ButtonProps
  extends TouchableOpacityProps,
    Omit<CommonUiProps, 'size'>,
    PropsWithChildren {
  color?: string
  isLoading?: boolean
  loadingText?: string
  backgroundColor?: string
  size?:
    | Size
    | {
        width?: Omit<Size, 'xl' | 'xxl'> | number
        height?: Omit<Size, 'xl' | 'xxl'> | number
      }

  leftImage?: ButtonImageProps
  rightImage?: ButtonImageProps
  leftIcon?: ButtonIconProps
  rightIcon?: ButtonIconProps

  height?: Size
  width?: Size
  borderWidth?: number
  borderColor?: string

  circle?: boolean
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  color,
  size = {height: 'lg'},
  isLoading,
  loadingText,
  flex = (typeof size === 'object' && size?.width) || typeof size === 'string' ? 0 : 1,

  borderWidth,
  borderColor,
  flexGrow,
  circle = false,

  leftImage,
  rightImage,

  leftIcon,
  rightIcon,

  height = 'full',
  width = 'full',

  children,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={StyleSheet.flatten([
        ButtonStyles({
          variant,
          color,
          size,
          flex,
          flexGrow,
          borderWidth,
          borderColor,
          circle,
          width,
          height,
          ...props,
        }).defaultButtonStyle,
        style,
      ])}
      {...props}>
      {leftIcon && !isLoading && (
        <Icon
          {...leftIcon}
          absolute={leftIcon.absolute}
          left={leftIcon.absolute ? display.normalize(24) : undefined}
          testID='button-left-icon-test-id'
          marginRight={leftIcon.absolute ? 0 : 8}
          variant={leftIcon?.variant}
          name={leftIcon?.name as IconTypes}
          width={
            leftIcon?.width ??
            buttonSizeNormalizer(typeof size === 'string' ? size : (size.height as Size)).icon
          }
          height={
            leftIcon?.height ??
            buttonSizeNormalizer(typeof size === 'string' ? size : (size.height as Size)).icon
          }
        />
      )}

      {leftImage && !isLoading && (
        <Image
          testID='button-left-image-test-id'
          left={leftImage.absolute ? display.normalize(24) : undefined}
          name={leftImage.name}
          absolute={leftImage.absolute}
          marginRight={leftImage.absolute ? 0 : 8}
          width={
            leftImage.width ??
            buttonSizeNormalizer(typeof size === 'string' ? size : (size.height as Size)).icon
          }
          height={
            leftImage.height ??
            buttonSizeNormalizer(typeof size === 'string' ? size : (size.height as Size)).icon
          }
          tintColor={leftImage.tintColor}
          resizeMode={leftImage.resizeMode}
        />
      )}

      {!isLoading && (
        <Label
          numberOfLines={1}
          textCenter
          fontFamily='Markpro'
          fontSize={
            typeof size === 'object'
              ? buttonSizeNormalizer(size.height as Size).fontSize
              : buttonSizeNormalizer(size).fontSize
          }
          style={ButtonStyles({variant}).buttonTextStyle}>
          {children}
        </Label>
      )}

      {isLoading && (
        <ActivityIndicator color={COLOURS.WHITE} testID='button-loading-indicator-test-id' />
      )}

      {isLoading && loadingText && (
        <Label testID='button-loading-text-test-id' style={ButtonStyles({variant}).buttonTextStyle}>
          {loadingText}
        </Label>
      )}

      {rightIcon && !isLoading && (
        <Icon
          {...rightIcon}
          absolute={rightIcon.absolute}
          right={rightIcon.absolute ? display.normalize(24) : undefined}
          testID='button-right-icon-test-id'
          marginLeft={rightIcon.absolute ? 0 : 8}
          variant={rightIcon?.variant}
          name={rightIcon?.name as IconTypes}
          width={
            rightIcon.width ??
            buttonSizeNormalizer(typeof size === 'string' ? size : (size.height as Size)).icon
          }
          height={
            rightIcon.height ??
            buttonSizeNormalizer(typeof size === 'string' ? size : (size.height as Size)).icon
          }
        />
      )}

      {rightImage && !isLoading && (
        <Image
          testID='button-right-image-test-id'
          right={rightImage.absolute ? display.normalize(24) : undefined}
          name={rightImage.name}
          absolute={rightImage.absolute}
          marginRight={rightImage.absolute ? 0 : 8}
          width={
            rightImage.width ??
            buttonSizeNormalizer(typeof size === 'string' ? size : (size.height as Size)).icon
          }
          height={
            rightImage.height ??
            buttonSizeNormalizer(typeof size === 'string' ? size : (size.height as Size)).icon
          }
          tintColor={rightImage.tintColor}
          resizeMode={rightImage.resizeMode}
        />
      )}
    </TouchableOpacity>
  )
}
