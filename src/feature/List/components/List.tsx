// React Imports
import {FC, forwardRef} from 'react'

// React Native Imports
import {StyleSheet} from 'react-native'

// Component Imports
import {ListStyles} from '../styles'
import {CommonUiProps, Variant} from '../../models'
import {Item} from '../../Item'

// Package Components
import {FlashList, FlashListProps} from '@shopify/flash-list'
import {Separator} from '../../Separator'

interface ListProps<T> extends CommonUiProps, FlashListProps<T> {
  renderSeparator?: boolean
  separatorWidth?: number
  separatorHeight?: number
  separatorVariant?: Variant
  headerSeparator?: boolean
  footerSeparator?: boolean
  ref?: any
}

export const List: FC<ListProps<any>> = forwardRef(
  (
    {
      renderSeparator,
      data,
      width = '100%',
      estimatedItemSize = 5,
      style,
      horizontal = false,
      separatorVariant = 'neutral-alpha-200',
      headerSeparator = false,
      footerSeparator = false,
      ...props
    },
    ref
  ) => {
    const customRenderSeparator = () => {
      return (
        <Separator
          size='full'
          orientation={!horizontal ? 'horizontal' : 'vertical'}
          variant={separatorVariant}
          width={props.separatorWidth}
          height={props.separatorHeight}
        />
      )
    }

    return (
      <Item
        style={StyleSheet.flatten([
          ListStyles({width, ...props}).defaultListContainerStyle,
          style,
        ])}>
        <FlashList
          data={data}
          ref={ref}
          estimatedItemSize={data ? (data?.length === 0 ? 1 : data.length) : estimatedItemSize}
          ItemSeparatorComponent={renderSeparator ? () => customRenderSeparator() : undefined}
          ListHeaderComponent={headerSeparator ? () => customRenderSeparator() : undefined}
          ListFooterComponent={footerSeparator ? () => customRenderSeparator() : undefined}
          horizontal={horizontal}
          {...props}
        />
      </Item>
    )
  }
)
