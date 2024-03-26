/* eslint-disable indent */
import {FC} from 'react'

// Component Imports
import {Item} from '../../Item'
import {Label} from '../../Label'
import {Separator} from '../../Separator'
import {InputProps} from '../models'
import {DefaultInput} from './DefaultInput'
import {AmountInput} from './AmountInput'
import {NumericInput} from './NumericInput'
import {PasswordInput} from './PasswordInput'
import {IbanInput} from './IbanInput'
import {CVCInput} from './CVCInput'
import {PhoneInput} from './PhoneInput'
import {CreditCardInput} from './CreditCardInput'
import {PinPasswordInput} from './PinPasswordInput'
import {ExpireDateInput} from './ExpireDateInput'
import {PlateNumberInput} from './PlateNumberInput'
import {DateInput} from './DateInput'
import {CheckBoxInput} from './CheckBoxInput'
import {SelectInput} from './SelectInput/components/SelectInput'
import {InputValidation} from './InputValidation'
import {COLOURS} from '../../../constants'
import {Icon} from '../../Icon'
import {Pressable} from '../../Pressable'
import {colourFromVariant} from '../../../utils'
import {InputStyleNormalizer} from '../utils/inputNormalizer'

export const Input: FC<InputProps> = ({
  label,
  type = 'default',
  renderSeparator = true,
  fontSize,
  size = 'md',
  errorMessage,
  theme = 'light',
  placeholderTextColor = theme === 'light' ? COLOURS.GREY200 : COLOURS.WHITE,

  border,

  onDateChange,
  onCheckChange,
  ...props
}) => {
  const inputTypes = {
    default: (
      <DefaultInput
        label={label}
        placeholderTextColor={placeholderTextColor}
        fontSize={fontSize}
        theme={theme}
        size={size}
        {...props}
      />
    ),
    cvc: (
      <CVCInput
        placeholderTextColor={placeholderTextColor}
        fontSize={fontSize}
        theme={theme}
        size={size}
        {...props}
      />
    ),
    expireDate: (
      <ExpireDateInput
        placeholderTextColor={placeholderTextColor}
        {...props}
        fontSize={fontSize}
        theme={theme}
        size={size}
      />
    ),
    numeric: (
      <NumericInput
        placeholderTextColor={placeholderTextColor}
        label={label}
        fontSize={fontSize}
        theme={theme}
        size={size}
        {...props}
      />
    ),
    password: (
      <PasswordInput
        placeholderTextColor={placeholderTextColor}
        fontSize={fontSize}
        theme={theme}
        size={size}
        {...props}
      />
    ),
    iban: (
      <IbanInput
        placeholderTextColor={placeholderTextColor}
        fontSize={fontSize}
        theme={theme}
        size={size}
        {...props}
      />
    ),
    phone: (
      <PhoneInput
        {...props}
        fontSize={fontSize}
        theme={theme}
        size={size}
        placeholderTextColor={placeholderTextColor}
      />
    ),
    creditCard: (
      <CreditCardInput
        {...props}
        fontSize={fontSize}
        theme={theme}
        size={size}
        placeholderTextColor={placeholderTextColor}
      />
    ),
    pinPassword: (
      <PinPasswordInput
        {...props}
        fontSize={fontSize}
        theme={theme}
        size={size}
        placeholderTextColor={placeholderTextColor}
      />
    ),
    plateNumber: (
      <PlateNumberInput
        {...props}
        fontSize={fontSize}
        theme={theme}
        size={size}
        placeholderTextColor={placeholderTextColor}
      />
    ),
    amount: (
      <AmountInput
        fontSize={fontSize}
        theme={theme}
        size={size}
        placeholderTextColor={placeholderTextColor}
        {...props}
      />
    ),
    date: (
      <DateInput
        placeholderTextColor={placeholderTextColor}
        onDateChange={onDateChange}
        theme={theme}
        size={size}
        {...props}
      />
    ),
    checkbox: (
      <CheckBoxInput
        placeholderTextColor={placeholderTextColor}
        onCheckChange={onCheckChange}
        theme={theme}
        size={size}
        fontSize={fontSize}
        {...props}
      />
    ),
    select: (
      <SelectInput
        placeholderTextColor={placeholderTextColor}
        label={label}
        fontSize={fontSize}
        theme={theme}
        size={size}
        {...props}
      />
    ),
  }
  const {name} = props

  return (
    <Item marginTop={8}>
      <Item>
        {label && (
          <Item
            row
            paddingHorizontal={InputStyleNormalizer({size: size}).paddingHorizontal}
            paddingVertical={2.5}
            alignItemsCenter>
            <Label
              testID='input-label-test-id'
              fontSize={typeof label === 'object' && label.size ? label.size : 'md'}
              fontFamily={
                typeof label === 'object' && label.fontFamily ? label.fontFamily : 'Markpro-Medium'
              }
              variant={
                typeof label === 'object'
                  ? label.variant ?? (label.theme === 'dark' ? 'grey-900' : 'grey-200')
                  : theme === 'dark'
                  ? 'grey-900'
                  : 'grey-200'
              }>
              {typeof label === 'string' ? label?.toUpperCase() : label.text?.toUpperCase()}
            </Label>

            {typeof label === 'object' && label.description && (
              <Label
                testID='input-label-description-test-id'
                fontSize={label.descriptionSize ?? 'xs'}
                fontFamily={label.fontFamily ?? 'Markpro-Medium'}
                variant={label.descriptionVariant ?? 'grey-200'}
                marginLeft={4}>
                {`(${label.description?.toUpperCase()})`}
              </Label>
            )}

            {typeof label === 'object' && label.icon && (
              <Pressable
                testID='input-label-description-icon-test-id'
                flex={0}
                width={(label.icon.width && label.icon.width + 4) ?? 22}
                height={(label.icon.height && label.icon.height + 4) ?? 22}
                justifyContentCenter
                alignItemsCenter
                onPress={label.icon.onPress}>
                <Icon
                  name={label.icon.name}
                  width={label.icon.width ?? 18}
                  height={label.icon.height ?? 18}
                  variant={
                    label.icon.variant ??
                    (label.theme && label.theme === 'dark' ? 'grey-900' : 'grey-200') ??
                    (theme && theme === 'dark' ? 'grey-900' : 'grey-200')
                  }
                  mode={label.icon.mode}
                  strokeWidth={label.icon.strokeWidth}
                  noStroke={label.icon.noStroke}
                />
              </Pressable>
            )}
          </Item>
        )}

        <Item
          marginBottom={8}
          paddingHorizontal={16}
          borderWidth={border?.width}
          borderRadius={border?.radius}
          borderColor={colourFromVariant(border?.variant)}
          backgroundColor={theme === 'light' ? COLOURS.WHITE : COLOURS.GREY800}>
          {inputTypes[type]}
        </Item>
      </Item>

      {errorMessage && <InputValidation name={name} message={errorMessage} />}

      {renderSeparator && (
        <Separator size='full' orientation='horizontal' variant='neutral-alpha-200' />
      )}
    </Item>
  )
}
