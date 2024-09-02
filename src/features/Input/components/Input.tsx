// React Imports
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
import {DateInput} from './DateInput/components/DateInput'
import {CheckBoxInput} from './CheckBoxInput'
import {SelectInput} from './SelectInput/components/SelectInput'
import {InputValidation} from './InputValidation'
import {Icon} from '../../Icon'
import {Pressable} from '../../Pressable'
import {InputStyleNormalizer} from '../utils/inputNormalizer'
import {ToggleInput} from './ToggleInput'
import {InputStyles} from '../styles'

// Util and Lib Imports
import {colorFromVariant} from '../../../utils'

// Provider Imports
import {themeConfig} from '../../../providers'
import {Variant} from '../../models'

export const Input: FC<InputProps> = ({
  label,
  type = 'default',
  renderSeparator = true,
  fontSize,
  size = 'md',
  errorMessage,
  disabled,
  theme = 'light',
  placeholderTextColor = theme === 'light'
    ? themeConfig.colors['grey-200']
    : themeConfig.colors['white'],
  data,

  border,
  touched = null,
  onDateChange,
  onCheckChange,
  onToggle,
  inputLabel,
  ...props
}) => {
  const inputTypes = {
    default: (
      <DefaultInput
        label={label}
        placeholderTextColor={placeholderTextColor}
        fontSize={fontSize}
        theme={theme}
        disabled={disabled}
        size={size}
        {...props}
      />
    ),
    cvc: (
      <CVCInput
        placeholderTextColor={placeholderTextColor}
        fontSize={fontSize}
        theme={theme}
        disabled={disabled}
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
        disabled={disabled}
        size={size}
      />
    ),
    numeric: (
      <NumericInput
        placeholderTextColor={placeholderTextColor}
        label={label}
        fontSize={fontSize}
        theme={theme}
        disabled={disabled}
        size={size}
        {...props}
      />
    ),
    password: (
      <PasswordInput
        placeholderTextColor={placeholderTextColor}
        fontSize={fontSize}
        theme={theme}
        disabled={disabled}
        size={size}
        {...props}
      />
    ),
    iban: (
      <IbanInput
        placeholderTextColor={placeholderTextColor}
        fontSize={fontSize}
        theme={theme}
        disabled={disabled}
        size={size}
        {...props}
      />
    ),
    phone: (
      <PhoneInput
        {...props}
        fontSize={fontSize}
        theme={theme}
        disabled={disabled}
        size={size}
        placeholderTextColor={placeholderTextColor}
      />
    ),
    creditCard: (
      <CreditCardInput
        {...props}
        fontSize={fontSize}
        theme={theme}
        disabled={disabled}
        size={size}
        placeholderTextColor={placeholderTextColor}
      />
    ),
    pinPassword: (
      <PinPasswordInput
        {...props}
        fontSize={fontSize}
        theme={theme}
        disabled={disabled}
        size={size}
        placeholderTextColor={placeholderTextColor}
      />
    ),
    plateNumber: (
      <PlateNumberInput
        {...props}
        fontSize={fontSize}
        theme={theme}
        disabled={disabled}
        size={size}
        placeholderTextColor={placeholderTextColor}
      />
    ),
    amount: (
      <AmountInput
        fontSize={fontSize}
        theme={theme}
        disabled={disabled}
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
        data={data}
        disabled={disabled}
        size={size}
        {...props}
      />
    ),
    checkbox: (
      <CheckBoxInput
        placeholderTextColor={placeholderTextColor}
        onCheckChange={onCheckChange}
        theme={theme}
        disabled={disabled}
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
        disabled={disabled}
        size={size}
        {...props}
      />
    ),
    toggle: (
      <ToggleInput
        placeholderTextColor={placeholderTextColor}
        label={label}
        fontSize={fontSize}
        theme={theme}
        disabled={disabled}
        size={size}
        onToggle={(checked) => !!onToggle && onToggle!(checked)}
        inputLabel={inputLabel!}
        {...props}
      />
    ),
  }
  const {name} = props
  const isLabelObject = typeof label === 'object'
  const variantCalculation = () => {
    if (isLabelObject && label?.icon?.variant) return label?.icon?.variant
    else if (
      (isLabelObject && label.theme && label.theme === 'dark') ||
      (theme && theme === 'dark')
    )
      return 'grey-900'
    else if (disabled) return 'grey-900'
    else return 'grey-200'
  }
  const variant = variantCalculation()

  return (
    <Item>
      <Item paddingTop={16} style={InputStyles({disabled}).textInputContainer}>
        {label && type !== 'toggle' && (
          <Item
            row
            paddingHorizontal={InputStyleNormalizer({size: size}).paddingHorizontal}
            alignItemsCenter>
            <Label
              testID='input-label-test-id'
              fontSize={isLabelObject && label.size ? label.size : 'md'}
              fontFamily={isLabelObject && label.fontFamily ? label.fontFamily : 'Markpro-Medium'}
              variant={
                isLabelObject
                  ? (label.variant as any) ?? (label.theme === 'dark' ? 'grey-900' : 'grey-200')
                  : theme === 'dark'
                  ? 'grey-200'
                  : 'grey-900'
              }>
              {typeof label === 'string' ? label?.toUpperCase() : label.text?.toUpperCase()}
            </Label>

            {isLabelObject && label.description && (
              <Label
                testID='input-label-description-test-id'
                fontSize={label.descriptionSize ?? 'xs'}
                fontFamily={label.fontFamily ?? 'Markpro-Medium'}
                variant={(label.descriptionVariant as any) ?? 'grey-200'}
                marginLeft={4}>
                {`(${label.description?.toUpperCase()})`}
              </Label>
            )}

            {((isLabelObject && label.icon) || disabled) && (
              <Pressable
                testID='input-label-description-icon-test-id'
                flex={0}
                disabled={disabled}
                width={isLabelObject ? label?.icon?.width && label.icon.width + 4 : 22}
                height={isLabelObject ? label?.icon?.height && label.icon.height + 4 : 22}
                justifyContentCenter
                alignItemsCenter
                onPress={isLabelObject ? label?.icon?.onPress : null}>
                <Icon
                  name={isLabelObject ? (label?.icon?.name as any) : ('LOCK' as any)}
                  width={isLabelObject ? label?.icon?.width : 18}
                  height={isLabelObject ? label?.icon?.height : 18}
                  variant={variant}
                  mode={isLabelObject ? label?.icon?.mode : 'stroke'}
                  strokeWidth={isLabelObject ? label?.icon?.strokeWidth : 2}
                  noStroke={isLabelObject ? label?.icon?.noStroke : false}
                />
              </Pressable>
            )}
          </Item>
        )}

        <Item
          paddingHorizontal={type !== 'toggle' ? 16 : 0}
          borderWidth={border?.width}
          borderRadius={border?.radius}
          borderColor={colorFromVariant(border?.variant)}
          backgroundColor={
            theme === 'light' ? themeConfig.colors['white'] : themeConfig.colors['grey-800']
          }>
          {inputTypes[type]}
        </Item>
      </Item>

      {((!!props?.onBlur && !!touched) || (!props?.onBlur && touched === null)) &&
        !!errorMessage && <InputValidation name={name} message={errorMessage} />}

      {renderSeparator && (
        <Separator size='full' orientation='horizontal' variant='neutral-alpha-200' />
      )}
    </Item>
  )
}
