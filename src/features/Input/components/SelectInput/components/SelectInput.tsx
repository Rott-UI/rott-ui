/* eslint-disable indent */
// React Imports
import React, {FC, useEffect, useState} from 'react'

// Component Imports
import {Item} from '../../../../Item'
import {InputProps, SelectProps} from '../../../models'
import {InputStyleNormalizer} from '../../../utils/inputNormalizer'
import {EmptyStateProps} from '../../../../EmptyState'
import {Modal, useModal} from '../../../../Modal'
import {ModalIdEnum} from '../../../../models'
import {Label} from '../../../../Label'
import {Icon} from '../../../../Icon'
import {Pressable} from '../../../../Pressable'

import {List} from '../../../../List'
import {DefaultInput} from '../../DefaultInput'
import {SelectInputStyles} from '../styles'
import {ITEM_HEIGHT, LIST_MAX_ITEM_COUNT} from '../constants'
import {listHeightNormalizer, modalHeightPercentageNormalizer} from '../utils'

// Constant Imports

// Util and Lib Imports

import {CommonItem} from '../../../../Common/components/CommonItem'
import {display, formatMessage} from '../../../../../utils'
import {themeConfig} from '../../../../../providers'

interface SelectInputProps {
  emptyState?: EmptyStateProps
  onTouched?: () => void
}

/**
 *
 * @typedef {Object} SelectProps - Secenek tipi
 * @property {string} label - Ekranda görünen etiket. ZORUNLU
 * @property {string} value - Değer. ZORUNLU
 *
 *
 * @param {SelectProps[]} selectListExample - Örnek bir seçenek listesi.

 *
 * Input prop lari
 * @param {string} defaultValue - Varsayılan olarak seçilen değerin değeri.
 * @param {function} onSelectChange - Değer değiştiğinde çağrılacak işlev.
 * @param {SelectProps[]} list - Seçenekler listesi.
 * @param {boolean} searchable - Arama özelliğini etkinleştirme/engelleme ayarı.
 * @returns {object} Secilebilir liste renderlanir
 */
export const SelectInput: FC<Omit<InputProps, 'name' | 'onChangeText'> & SelectInputProps> = ({
  label,
  placeholder = 'Dropdown',
  onSelectChange,
  searchable = false,
  value,
  defaultValue,
  testID,
  list,
  size,
  theme,
  disabled,
  description = false,
  fontSize,
  descriptionFontSize,
  showSelected = false,
  showDescription = false,
  emptyState = {
    name: 'EMPTY_LIST_ERROR',
    height: 355,
  },
  onTouched,
}) => {
  const {showModal, hasModalById} = useModal()

  const [selectItem, setSelectItem] = useState<Nullable<SelectProps>>(null)
  const [searchText, setSearchText] = useState<string>('')

  const clearSearchText = () => setSearchText('')
  const handleConfirmPress = (selectedValue: Nullable<string>) => {
    onSelectChange!(selectedValue as any)
    handleItem(selectedValue)
    searchable && clearSearchText()
    Modal.hideModal(ModalIdEnum.SelectInput)
  }
  const handleItem = (selectedValue: Nullable<string>) => {
    const filteredItem = list?.find(({value: filterValue}) => filterValue === selectedValue)

    setSelectItem(filteredItem ?? null)
  }

  const filteredListData = list?.filter(
    (data) =>
      data?.label
        ?.toLowerCase()
        .trim()
        .replace(/\s\s+/g, ' ')
        .includes(searchText?.toLowerCase().trim().replace(/\s\s+/g, ' ')) || searchText === ''
  )

  const showSelectInputModal = () =>
    showModal({
      id: ModalIdEnum.SelectInput,
      backgroundColor: themeConfig.colors['grey-900'],
      testID: 'select-modal-test-id',
      visible: true,
      slideToClose: true,
      height:
        !filteredListData || filteredListData?.length === 0
          ? 55
          : modalHeightPercentageNormalizer(
              filteredListData?.length ?? list?.length ?? 50,
              searchable,
              showDescription
            ),
      closeButton: false,
      headerBackgroundColor: 'grey-900',
      panResponderBackgroundColor: 'grey-900',
      header: {
        justifyContentCenter: true,
        alignItemsCenter: true,
        title: (typeof label === 'string' ? label : undefined) ?? placeholder,
        leftIcon: {
          mode: 'stroke',
          name: 'CHEVRON_LEFT',
          width: 40,
          height: 40,
          strokeWidth: 2,
          backgroundColor: themeConfig.colors['grey-800'],
          alignItemsCenter: true,
          justifyContentCenter: true,
          borderRadius: 99,
          onPress: () => {
            searchable && clearSearchText()
            Modal.hideModal(ModalIdEnum.SelectInput)
          },
          marginBottom: !searchable ? 15 : undefined,
        },
        children: searchable ? (
          <Item size='full' row marginTop={8} marginBottom={16}>
            <DefaultInput
              testID='select-search-input-test-id'
              label={formatMessage('INPUT.DROPDOWN.SEARCH', {
                name: placeholder || label,
              })}
              style={SelectInputStyles({fontSize}).searchInputStyle}
              paddingHorizontal={8}
              value={searchText}
              onChangeText={setSearchText}
              autoFocus
            />

            {searchText.length > 0 && (
              <Pressable
                testID='select-search-clear-test-id'
                style={SelectInputStyles().closeIcon}
                onPress={() => clearSearchText()}>
                <Icon name='REMOVE_CIRCLE' height={24} width={24} mode='fill' variant='grey-200' />
              </Pressable>
            )}
          </Item>
        ) : undefined,
      },
      children: (
        <Item paddingTop={8}>
          <List
            testID='select-list-test-id'
            renderSeparator
            footerSeparator
            headerSeparator
            estimatedItemSize={ITEM_HEIGHT(showDescription)}
            height={
              !filteredListData || filteredListData?.length === 0
                ? emptyState.height
                : listHeightNormalizer(filteredListData?.length ?? 0, showDescription) +
                  display.px(1)
            }
            separatorVariant='neutral-grey-alpha-200'
            data={filteredListData}
            keyExtractor={(item) => item.value}
            renderItem={({item}) => {
              return (
                <CommonItem
                  backgroundColor='grey-900'
                  value={item.value}
                  title={{text: item.label, variant: 'white'}}
                  subTitle={
                    showDescription
                      ? {
                          text: item.description,
                          variant: 'white',
                          fontSize: 'sm',
                          fontFamily: 'Markpro-Medium',
                          marginTop: 4,
                        }
                      : undefined
                  }
                  showSelected={showSelected}
                  selected={item.value === selectItem?.value}
                  onPress={handleConfirmPress}
                />
              )
            }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={(filteredListData?.length ?? 0) > LIST_MAX_ITEM_COUNT ? true : false}
            emptyState={{
              name: emptyState?.name ?? 'EMPTY_LIST_ERROR',
              background: emptyState?.background ?? themeConfig.colors['transparent'],
              title: emptyState?.title,
              description: emptyState?.title,
              height: emptyState.height,
            }}
          />
        </Item>
      ),
      onClose: () => {
        searchable && clearSearchText()
        Modal.hideModal(ModalIdEnum.SelectInput)
      },
    })

  useEffect(() => {
    if (defaultValue) handleItem(defaultValue)
    else handleItem(null)
  }, [])

  useEffect(() => {
    if (!value) handleItem(null)
  }, [value])

  useEffect(() => {
    if (hasModalById(ModalIdEnum.SelectInput)) showSelectInputModal()
  }, [selectItem, searchText])

  return (
    <Item testID={testID}>
      <Pressable
        testID='select-input-selection-test-id'
        size='full'
        flex={0}
        alignItemsCenter
        justifyContentCenter
        marginBottom={description || selectItem?.description ? 8 : undefined}
        onPress={() => {
          if (disabled) return
          !!onTouched && onTouched()
          showSelectInputModal()
        }}>
        <Item
          row
          alignItemsCenter
          height={
            InputStyleNormalizer({size}).height - (selectItem?.description || description ? 8 : 0)
          }>
          <Label
            testID='select-input-selected-item-test-id'
            fontSize={fontSize ?? InputStyleNormalizer({size}).placeholderSize}
            fontFamily='Markpro-Medium'
            variant={theme === 'dark' ? 'white' : selectItem ? 'grey-900' : 'grey-200'}
            style={SelectInputStyles().pressableTextStyle}
            numberOfLines={1}>
            {selectItem ? selectItem?.label : placeholder ?? label}
          </Label>

          <Icon
            name='ARROW_RIGHT'
            height={25}
            width={25}
            variant={theme === 'dark' ? 'white' : selectItem ? 'grey-900' : 'grey-200'}
          />
        </Item>

        {(description || selectItem?.description) && (
          <Item size='full' justifyContentFlexStart>
            <Label
              testID='selected-description-test-id'
              fontSize={
                descriptionFontSize ?? fontSize ?? InputStyleNormalizer({size}).placeholderSize
              }
              fontFamily='Markpro-Medium'
              variant={theme === 'dark' ? 'white' : selectItem ? 'grey-900' : 'grey-200'}>
              {selectItem?.description ?? description}
            </Label>
          </Item>
        )}
      </Pressable>
    </Item>
  )
}
