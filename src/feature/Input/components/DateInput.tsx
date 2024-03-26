// React Native Imports
// import {Modal} from 'react-native'

// React Imports
import React, {FC, useState} from 'react'

// Component Imports
import {InputProps} from '../models'
import {Item} from '../../Item'
import {Pressable} from '../../Pressable'
import {DateInputStyles} from '../styles'
import {Modal, useModal} from '../../Modal'

// Feature Imports
import {getLanguageState} from '../../../features/app'

// Util and Lib Imports
import {display} from '../../../utils'
import {formatByDateMode} from '../utils'

// Package Imports
import DatePicker from 'react-native-date-picker'
import {COLOURS} from '../../../constants'
import {InputStyleNormalizer} from '../utils/inputNormalizer'
import {useAppSelector} from '../../../hooks'

interface DateInputProps extends Omit<InputProps, 'label' | 'name'> {}

/**
 *
 * DateInput'un kullanımı diğer inputlara göre biraz daha farklı.
 * Yapısı gereği diğer inputlarda kullandığımız "onChangeText" event'i ile değişen değeri almamız mümkün olmadığı için
 * formik'in içinde yer alan "setFieldValue" metodunu kullanmamız gerek.
 *
 * ### **Örnek**:
 * <Input onDateChange={(date) => setFieldValue('date', date)} />
 *
 * @property {(date: Date) => void)} onDateChange: seçilen tarih değerini almak içim bu property'nin kullanılması gerekmektedir.
 * @property {'date' | 'time' | 'datetime'} mode: İstenilen mod neyse ona göre belirtilmelidir. Default değer datetime olarak ayarlanmıştır.
 * @property {boolean} dontAllowClearing: Eğer date input'un değerinin temizlenmesine izin verilmemesi gerekiyorsa bu propert kullanılmalıdır.
 * dontAllowClearing={true} yerine sadece downAllowClearing olarak verirseniz değer otomatik olarak true kabul edilir. False olmadığı durumlarda
 * lütfen ={true} şeklinde tanımlama yapmayınız.
 */
export const DateInput: FC<DateInputProps> = ({
  placeholder = 'Lütfen bir tarih seçiniz',
  onDateChange,
  mode = 'date',
  allowClear = false,
  minimumDate,
  maximumDate,
  value,
  testID,
  theme,
  size,
  ...props
}) => {
  const appLanguage = useAppSelector(getLanguageState)

  const [datePickerValue, setDatePickerValue] = useState<Date>(new Date())

  const handleConfirmPress = () => {
    let validDate: Date
    if (minimumDate && datePickerValue.getTime() < minimumDate?.getTime()) validDate = minimumDate
    else if (maximumDate && datePickerValue.getTime() > maximumDate?.getTime())
      validDate = maximumDate
    else validDate = datePickerValue

    onDateChange!(validDate)
    Modal.hideModal(98)
  }

  const handleClearPress = () => {
    hideModal()
    setDatePickerValue(new Date())
    onDateChange!(null as any)
  }

  const {showModal, hideModal} = useModal(
    {
      id: 98,
      testID: 'date-input-modal',
      visible: true,
      height: 30,
      header: (
        <Item
          justifyContentCenter
          backgroundColor={COLOURS.GREY900}
          height={display.heightPixel(50)}
          style={DateInputStyles().dateInputHeaderStyle}>
          <Pressable
            testID='date-input-confirm-button'
            onPress={() => handleConfirmPress()}
            text='Tamam'
            textVariant='white'
            textSize='xl'
            textWeight={700}
            style={DateInputStyles().confirmButtonStyle}
          />

          {allowClear && value && (
            <Pressable
              testID='date-input-clear-button'
              onPress={handleClearPress}
              text='Temizle'
              textVariant='white'
              textSize='xl'
              textWeight={700}
              style={DateInputStyles().cancelButtonStyle}
            />
          )}
        </Item>
      ),
      children: (
        <Item size='full' alignItemsCenter justifyContentCenter>
          <DatePicker
            testID={testID}
            mode={mode}
            date={datePickerValue}
            textColor={COLOURS.GREY900}
            locale={appLanguage?.name}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            onDateChange={(date) => setDatePickerValue(date)}
            {...props}
          />
        </Item>
      ),
    },
    [datePickerValue]
  )

  return (
    <Item row>
      <Pressable
        size='full'
        height={InputStyleNormalizer({size}).height}
        testID='date-input-value-container'
        flex={0}
        justifyContentCenter
        textSize='xl'
        text={value ? formatByDateMode(mode, value) : placeholder}
        textStyle={DateInputStyles({theme, value}).pressableTextStyle}
        textVariant={theme === 'dark' ? 'white' : value ? 'grey-900' : 'grey-200'}
        onPress={() => {
          showModal()
        }}
        marginTop='2.5%'
      />
    </Item>
  )
}
