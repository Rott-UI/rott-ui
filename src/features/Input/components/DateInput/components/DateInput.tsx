/* eslint-disable indent */

// React Imports
import React, {FC, useEffect} from 'react'

// Component Imports
import {DataModel, InputProps} from '../../../models'
import {Item} from '../../../../Item'
import {Pressable} from '../../../../Pressable'
import {DateInputStyles} from '../../../styles'
import {Modal, useModal} from '../../../../Modal'
import {Icon} from '../../../../Icon'
import {List} from '../../../../List'
import {formatByDateMode} from '../../../utils'
import {InputStyleNormalizer} from '../../../utils/inputNormalizer'
import {ModalIdEnum} from '../../../../models'
import {Label} from '../../../../Label'
import {Separator} from '../../../../Separator'

// Util and Lib Imports
import {display, formatMessage} from '../../../../../utils'

// Package Imports
import DatePicker from 'react-native-date-picker'
import {themeConfig} from '../../../../../providers'

interface DateInputProps extends Omit<InputProps, 'label' | 'name' | 'mode'> {
  mode?: 'date' | 'time' | 'datetime' | 'modal-date' | 'modal-time' | 'modal-datetime'
  data?: DataModel[]
}

/**
 *
 * DateInput'un kullanımı diğer inputlara göre biraz daha farklı.
 * Yapısı gereği diğer inputlarda kullandığımız "onChangeText" event'i ile değişen değeri almamız mümkün olmadığı için
 * formik'in içinde yer alan "setFieldValue" metodunu kullanmamız gerek.
 *
 * ### **Örnek**:
 *   <Input
      label='Date Deneme'
      name='order-date'
      onDateChange={(date) => setFieldValue('orderDate', date)}
      type='date'
      mode='modal-date'
      value={orderDate}
      data={[
        {
          label: 'Bugün',
          value: new Date(),
        },
        {
          label: 'Yarın',
          value: add(new Date(), {days: 1}),
        },
      ]}
    />
 *
 * @property {(date: Date) => void)} onDateChange: seçilen tarih değerini almak içim bu property'nin kullanılması gerekmektedir.
 * @property {'date' | 'time' | 'datetime'} mode: İstenilen mod neyse ona göre belirtilmelidir. Default değer datetime olarak ayarlanmıştır.
 * @property {boolean} dontAllowClearing: Eğer date input'un değerinin temizlenmesine izin verilmemesi gerekiyorsa bu propert kullanılmalıdır.
 * dontAllowClearing={true} yerine sadece downAllowClearing olarak verirseniz değer otomatik olarak true kabul edilir. False olmadığı durumlarda
 * lütfen ={true} şeklinde tanımlama yapmayınız.
 */
let externalDate = new Date()
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
  data,
  disabled,
  size,
  ...props
}) => {
  const appLanguage = themeConfig.options.appLanguage

  const handleConfirmPress = (date?: Date) => {
    let validDate: Date

    if (minimumDate && (date ? date.getTime() : externalDate.getTime()) < minimumDate?.getTime())
      validDate = minimumDate
    else if (
      maximumDate &&
      (date ? date.getTime() : externalDate.getTime()) > maximumDate?.getTime()
    )
      validDate = maximumDate
    else validDate = date ?? externalDate

    onDateChange!(validDate)
    Modal.hideModal(ModalIdEnum.NativeDatePicker)
  }

  const handleClearPress = () => {
    hideModal()
    externalDate = new Date()
    onDateChange!(null as any)
  }

  const isSameDay = (date1: Date, date2: Date) =>
    date1?.getDate() === date2?.getDate() &&
    date1?.getMonth() === date2?.getMonth() &&
    date1?.getFullYear() === date2?.getFullYear()

  const modalHeightCalculator = (dataCount?: number) => {
    if (dataCount === 0 || !dataCount) return 30

    const headerHeightInPercentage = 12.1 // 102 / 8.44
    const dataHeight = (dataCount + 2) * 52 // +1 for the default date picker item
    const calculatedModalHeightPercentage = dataHeight / 8.44 + headerHeightInPercentage

    return calculatedModalHeightPercentage >= 100 ? 100 : calculatedModalHeightPercentage
  }
  const {showModal: showNativeDatePicker, hideModal} = useModal(
    {
      id: ModalIdEnum.NativeDatePicker,
      testID: 'date-input-modal',
      visible: true,
      height: modalHeightCalculator(),
      header: (
        <Item
          justifyContentCenter
          backgroundColor={themeConfig.colors['grey-900']}
          height={50}
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
            mode={mode?.replace('modal-', '') as any}
            date={value ? new Date(value) : new Date()}
            textColor={themeConfig.colors['grey-900']}
            locale={appLanguage?.name}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            onDateChange={(date: Date) => (externalDate = date)}
            {...props}
          />
        </Item>
      ),
    },
    []
  )
  const {showModal} = useModal()

  const showModalDatePicker = () =>
    showModal({
      id: ModalIdEnum.DatePickerModal,
      testID: 'date-input-modal-picker-test-id',
      visible: true,
      height: modalHeightCalculator(data?.length),
      slideToClose: true,
      closeButton: false,
      onClose: () => hideModal(ModalIdEnum.DatePickerModal),
      headerBackgroundColor: 'grey-900',
      panResponderBackgroundColor: 'grey-900',
      header: {
        leftIcon: {
          testID: 'cancel-button-test-id',
          name: 'CHEVRON_LEFT',
          mode: 'stroke',
          width: 40,
          height: 40,
          strokeWidth: 2,
          backgroundColor: themeConfig.colors['grey-800'],
          borderColor: themeConfig.colors['primary'],
          borderRadius: 24,
          alignItemsCenter: true,
          onPress: () => hideModal(ModalIdEnum.DatePickerModal),
        },
        title: 'İşlem Tarihi',
      },
      children: (
        <Item paddingTop={16} flex={1} backgroundColor={themeConfig.colors['grey-900']}>
          <Separator
            width='full'
            height={1}
            backgroundColor={themeConfig.colors['neutral-grey-alpha-200']}
          />
          <List
            height={display.setHeight(modalHeightCalculator(data?.length))}
            data={
              data
                ? [
                    ...data,
                    {
                      label: formatMessage('COMMON.SELECT.DATE'),
                      action: () => {
                        hideModal(ModalIdEnum.DatePickerModal)
                        showNativeDatePicker()
                      },
                    },
                  ]
                : []
            }
            renderItem={({item}) => {
              const selected = item.value
                ? isSameDay(item.value, new Date(value!))
                : item.value
                ? true
                : false

              return (
                <>
                  <Pressable
                    testID='date-input-modal-picker-item-test-id'
                    onPress={() => {
                      if (item.value) {
                        externalDate = item.value
                        handleConfirmPress(item.value)
                        Modal.hideModal()
                      } else item.action()
                    }}
                    height={52}
                    justifyContentCenter
                    paddingHorizontal={24}>
                    <Item row size='full' relative>
                      <Label variant='white' fontSize='lg' fontFamily='Markpro-Medium'>
                        {item.label}
                      </Label>

                      <Item
                        width={24}
                        height={24}
                        borderRadius={24}
                        borderWidth={2}
                        borderColor={
                          selected ? themeConfig.colors['primary'] : themeConfig.colors['grey-200']
                        }
                        justifyContentCenter
                        alignItemsCenter
                        absolute
                        right={0}>
                        {selected && (
                          <Item
                            width={16}
                            height={16}
                            borderRadius={16}
                            backgroundColor={themeConfig.colors['primary']}
                            // eslint-disable-next-line react-native/no-inline-styles
                            style={{
                              shadowColor: themeConfig.colors['neutral-blue-soft'],
                              shadowOffset: {
                                width: 0,
                                height: 0,
                              },
                              shadowOpacity: 1,
                              shadowRadius: 1,
                              borderWidth: 2,
                              borderColor: themeConfig.colors['neutral-blue-soft'],
                            }}
                          />
                        )}
                      </Item>
                    </Item>
                  </Pressable>
                  <Separator
                    width='full'
                    height={1}
                    backgroundColor={themeConfig.colors['neutral-grey-alpha-200']}
                  />
                </>
              )
            }}
          />
        </Item>
      ),
    })

  useEffect(() => {
    externalDate = new Date(value ? new Date(value) : new Date())

    return () => {
      externalDate = new Date()
    }
  }, [])

  return (
    <Item row>
      <Pressable
        size='full'
        height={InputStyleNormalizer({size}).height}
        testID='date-input-value-container'
        flex={0}
        justifyContentCenter
        textSize='xl'
        text={
          data && value
            ? data.find((item) => {
                const valueAsDate = new Date(value)

                return isSameDay(item.value!, valueAsDate)
              })?.label ??
              formatByDateMode(mode.replace('modal-', '') as 'date' | 'time' | 'datetime', value)
            : value
            ? formatByDateMode(mode, value)
            : placeholder
        }
        textStyle={DateInputStyles().pressableTextStyle}
        textVariant={theme === 'dark' ? 'white' : value ? 'grey-900' : 'grey-200'}
        onPress={() => {
          !disabled && mode.includes('modal') ? showModalDatePicker() : showNativeDatePicker()
        }}
      />

      <Item absolute right={0} bottom={InputStyleNormalizer({size}).icon.paddingBottom}>
        <Icon
          name='CALENDAR'
          width={InputStyleNormalizer({size}).icon.width}
          height={InputStyleNormalizer({size}).icon.height}
          color={themeConfig.colors['grey-200']}
          mode='stroke'
        />
      </Item>
    </Item>
  )
}
