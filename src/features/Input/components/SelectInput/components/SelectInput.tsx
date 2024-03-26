/* eslint-disable indent */
/* eslint-disable react/no-unstable-nested-components */
// React Imports
import React, {FC, useEffect, useState} from 'react'

// Component Imports
import {Item} from '../../../../Item'
import {InputProps, SelectProps} from '../../../models'
import {Icon, Pressable, Label, List, useModal, Modal} from '../../../..'
import {SelectInputItem} from './SelectInputItem'
import {DefaultInput} from '../../DefaultInput'
import {SelectInputStyles} from '../styles'
import {ITEM_HEIGHT, LIST_MAX_ITEM_COUNT} from '../constants'
import {listHeightNormalizer, modalHeightPercentageNormalizer} from '../utils'

// Constant Imports
import {COLOURS} from '../../../../../constants'

// Util and Lib Imports
import {display, formatMessage, translator} from '../../../../../utils'
import {InputStyleNormalizer} from '../../../utils/inputNormalizer'

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
export const SelectInput: FC<Omit<InputProps, 'name' | 'onChangeText'>> = ({
  label,
  placeholder = translator('INPUT.DROPDOWN'),
  onSelectChange,
  searchable = false,
  defaultValue,
  testID,
  list,
  size,
  theme,
  description = false,
  fontSize,
  descriptionFontSize,
  showSelected = false,
  showDescription = false,
}) => {
  const modalId = 98
  const {showModal, hasModalById} = useModal()

  const [selectItem, setSelectItem] = useState<Nullable<SelectProps>>(null)
  const [searchText, setSearchText] = useState<string>('')

  const clearSearchText = () => setSearchText('')
  const handleConfirmPress = (selectedValue: Nullable<string>) => {
    onSelectChange!(selectedValue as any)
    handleItem(selectedValue)
    Modal.hideModal(modalId)
  }
  const handleItem = (selectedValue: Nullable<string>) => {
    if (selectedValue) {
      const filteredItem = list?.find(({value: filterValue}) => filterValue === selectedValue)

      if (filteredItem) setSelectItem(filteredItem)
    }
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
      id: modalId,
      backgroundColor: COLOURS.GREY900,
      testID: 'select-modal-test-id',
      visible: true,
      slideToClose: true,
      height: modalHeightPercentageNormalizer(
        filteredListData?.length ?? list?.length ?? 50,
        searchable,
        showDescription
      ),
      closeButton: true,
      headerBackgroundColor: 'grey-900',
      panResponderBackgroundColor: 'grey-900',
      header: (
        <Item justifyContentCenter alignItemsCenter width='full' relative>
          <Item
            size='full'
            justifyContentCenter
            alignItemsCenter
            height={40}
            marginBottom={!searchable ? 15 : undefined}>
            <Pressable
              backgroundColor={COLOURS.GREY800}
              width={40}
              height={40}
              borderRadius={20}
              justifyContentCenter
              alignItemsCenter
              absolute
              left={20}
              onPress={() => Modal.hideModal(modalId)}>
              <Icon mode='stroke' name='CHEVRON_LEFT' width={24} height={24} strokeWidth={2} />
            </Pressable>
            <Label color='white' fontSize='xl' fontFamily='Markpro-Bold'>
              {(typeof label === 'string' ? label : undefined) ?? placeholder}
            </Label>
          </Item>

          {searchable && (
            <Item row marginTop={8} marginBottom={16} paddingHorizontal={24}>
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
                  <Icon
                    name='REMOVE_CIRCLE'
                    height={24}
                    width={24}
                    mode='fill'
                    variant='grey-200'
                  />
                </Pressable>
              )}
            </Item>
          )}
        </Item>
      ),
      children: (
        <Item paddingTop={8}>
          <List
            testID='select-list-test-id'
            renderSeparator
            footerSeparator
            headerSeparator
            estimatedItemSize={ITEM_HEIGHT(showDescription)}
            height={
              listHeightNormalizer(filteredListData?.length ?? 0, showDescription) + display.px(1)
            }
            separatorVariant='neutral-grey-alpha-200'
            data={filteredListData}
            keyExtractor={(item) => item.value}
            renderItem={({item}) => (
              <SelectInputItem
                label={item.label}
                value={item.value}
                description={item.description}
                handleConfirmPress={handleConfirmPress}
                selected={item.value === selectItem?.value}
                showSelected={showSelected}
                showDescription={showDescription}
              />
            )}
            showsVerticalScrollIndicator={false}
            scrollEnabled={(filteredListData?.length ?? 0) > LIST_MAX_ITEM_COUNT ? true : false}
          />
        </Item>
      ),
    })

  useEffect(() => {
    if (defaultValue) handleConfirmPress(defaultValue!)
    else handleItem(null)
  }, [])

  useEffect(() => {
    if (hasModalById(modalId)) showSelectInputModal()
  }, [selectItem, searchText])

  return (
    <Item testID={testID}>
      <Pressable
        testID='select-input-selection-test-id'
        size='full'
        flex={0}
        height={InputStyleNormalizer({size}).height}
        alignItemsCenter
        justifyContentCenter
        marginBottom={description || selectItem?.description ? 8 : undefined}
        onPress={() => showSelectInputModal()}>
        <Item row alignItemsCenter height={42}>
          <Label
            testID='select-input-selected-item-test-id'
            fontSize={fontSize ?? InputStyleNormalizer({size}).placeholderSize}
            fontFamily='Markpro-Medium'
            variant={theme === 'dark' ? 'white' : selectItem ? 'grey-900' : 'grey-200'}
            style={SelectInputStyles().pressableTextStyle}>
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
