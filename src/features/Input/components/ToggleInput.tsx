// React Imports
import React, {FC} from 'react'

// React Native Imports
import {NativeSyntheticEvent, TextInputFocusEventData} from 'react-native'

// Component Imports
import {Item} from '../../Item'
import {Label} from '../../Label'
import {InputProps} from '../models'
import {Toggle} from '../../Toggle'
import {Separator} from '../../Separator'
import {Input} from './Input'

// Feature Imports
import {InputLabelProps} from '../models/inputLabelProps'

interface ToggleInputProps extends Omit<InputProps, 'checked'> {
  disabledInput?: boolean
  checked?: boolean
  onToggle: (checked: boolean) => void
  inputLabel: string | InputLabelProps
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
}

export const ToggleInput: FC<ToggleInputProps> = ({
  testID,
  checked = false,
  onToggle,
  label,
  name,
  inputLabel,
  inputType = 'default',
  topSeparator = false,
  middleSeparator = checked || false,
  bottomSeparator = false,
  value,
  onChangeText,
  onBlur,
  touched,
  errorMessage,
  disabledInput = true,
  disabled,
  ...props
}) => {
  return (
    <Item size='full' testID={testID} width={342} {...props}>
      {topSeparator && (
        <Separator
          testID={`${name}-top-separator-test-id`}
          size='full'
          orientation='horizontal'
          variant='neutral-alpha-200'
          marginBottom='2%'
        />
      )}
      <Item
        row
        alignItemsCenter
        justifyContentSpaceBetween
        paddingHorizontal={16}
        paddingVertical={8}>
        {/* TODO: Toggle animasyonu label'a tıklandığında çalışmıyor, bir çözüm üretilmeli. */}
        {!!label && typeof label === 'string' && (
          <Label fontSize='xl' onPress={() => !disabled && !!onToggle && onToggle!(!checked)}>
            {label}
          </Label>
        )}
        {!!label && typeof label !== 'string' && <>{label}</>}

        <Toggle
          testID={`${name}-toggle-test-id`}
          isOn={checked}
          disabled={disabled}
          onToggleChange={(isChecked) => !!onToggle && onToggle!(isChecked)}
        />
      </Item>
      {middleSeparator && disabledInput && (
        <Separator
          testID={`${name}-middle-separator-test-id`}
          size='full'
          orientation='horizontal'
          variant='neutral-alpha-200'
          marginBottom='2%'
        />
      )}
      {checked && disabledInput && (
        <Input
          testID={`toggle-${name}-input-test-id`}
          label={inputLabel}
          type={inputType}
          name={name}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          touched={touched}
          errorMessage={errorMessage}
          renderSeparator={false}
          maxLength={props.maxLength}
        />
      )}
      {bottomSeparator && disabledInput && (
        <Separator
          testID={`${name}-bottom-separator-test-id`}
          size='full'
          orientation='horizontal'
          variant='neutral-alpha-200'
          marginBottom='2%'
        />
      )}
    </Item>
  )
}
