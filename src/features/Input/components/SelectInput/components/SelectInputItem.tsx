/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
// React Imports
import {FC} from 'react'

// Component Imports
import {Item} from '../../../../Item'
import {Label} from '../../../../Label'
import {Pressable} from '../../../../Pressable'

// Constant Imports
import {COLOURS} from '../../../../../constants'
import {ITEM_HEIGHT} from '../constants'

// Feature Imports
import {SelectInputStyles} from '../styles'
import {SelectProps} from '../../../models'

interface SelectInputItemProps extends SelectProps {
  handleConfirmPress(renderItemValue: string): void
  showSelected?: boolean
  showDescription?: boolean
}

export const SelectInputItem: FC<SelectInputItemProps> = ({
  label,
  value,
  description,
  selected = false,
  showSelected = false,
  showDescription = false,
  handleConfirmPress,
}) => (
  <Pressable
    testID={`select-input-item-${value}-test-id`}
    backgroundColor={COLOURS.GREY900}
    paddingHorizontal={24}
    paddingVertical={16}
    height={ITEM_HEIGHT(showDescription)}
    style={SelectInputStyles().itemPressableStyle}
    onPress={() => handleConfirmPress(value)}>
    <Item>
      <Label variant='white' fontSize='lg' fontFamily='Markpro-Medium'>
        {label}
      </Label>
      {showDescription && description && (
        <Label variant='white' fontSize='sm' fontFamily='Markpro-Medium' marginTop={4}>
          {description}
        </Label>
      )}
    </Item>
    {showSelected && (
      <Item
        width={24}
        height={24}
        borderRadius={12}
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
            }}></Item>
        )}
      </Item>
    )}
  </Pressable>
)
