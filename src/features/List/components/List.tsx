/* eslint-disable indent */
// React Imports
import {FC, LegacyRef, ReactNode, forwardRef, isValidElement} from 'react'

// React Native Imports
import {StyleSheet} from 'react-native'

// Feature Imports Imports
import {Item} from '../../Item'
import {ListStyles} from '../styles'
import {Separator} from '../../Separator'
import {EmptyState, EmptyStateProps} from '../../EmptyState'
import {ListSkeletonItem} from './ListSkeletonItem'

// Package Components
import {FlashList, FlashListProps} from '@shopify/flash-list'

// Model Imports
import {CommonUiProps, Variant} from '../../../models'

interface ListProps<T> extends CommonUiProps, FlashListProps<T> {
  renderSeparator?: boolean
  separatorWidth?: number
  separatorHeight?: number
  separatorVariant?: Variant
  headerSeparator?: boolean
  footerSeparator?: boolean
  ref?: LegacyRef<T> | undefined

  emptyState?: EmptyStateProps | ReactNode
  isLoading?: boolean
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
      isLoading,
      emptyState,
      renderItem,
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
    const calculatedEstimatedItemSize = data
      ? data?.length === 0
        ? 1
        : data.length
      : estimatedItemSize
    const dataType = isLoading ? Array.from(Array(estimatedItemSize).keys()) : data

    return (
      <Item
        style={StyleSheet.flatten([
          ListStyles({width, ...props}).defaultListContainerStyle,
          style,
        ])}>
        <FlashList
          data={dataType}
          ref={ref}
          // eslint-disable-next-line react/no-unstable-nested-components
          ListEmptyComponent={() => (
            <>
              {!isValidElement(emptyState) && (
                <Item
                  width={(emptyState as EmptyStateProps)?.width ?? 'full'}
                  height={(emptyState as EmptyStateProps)?.height ?? 283}
                  alignItemsCenter
                  justifyContentCenter
                  paddingVertical={16}
                  borderBottomStartRadius={8}
                  borderBottomEndRadius={8}
                  backgroundColor={
                    (emptyState as EmptyStateProps)?.backgroundColor ?? 'transparent'
                  }
                  marginBottom={80}>
                  <EmptyState
                    width={182}
                    height={182}
                    name={(emptyState as EmptyStateProps)?.name ?? 'EMPTY_TRANSACTIONS_LIGHT'}
                    testID='list-empty-test-id'
                    title={(emptyState as EmptyStateProps)?.title ?? 'boş'}
                    description={(emptyState as EmptyStateProps)?.description}
                  />
                </Item>
              )}

              {isValidElement(emptyState) && emptyState}
            </>
          )}
          estimatedItemSize={calculatedEstimatedItemSize}
          ItemSeparatorComponent={renderSeparator ? () => customRenderSeparator() : undefined}
          ListHeaderComponent={headerSeparator ? () => customRenderSeparator() : undefined}
          ListFooterComponent={footerSeparator ? () => customRenderSeparator() : undefined}
          horizontal={horizontal}
          renderItem={
            isLoading
              ? () => {
                  return <ListSkeletonItem />
                }
              : renderItem
          }
          {...props}
        />
      </Item>
    )
  }
)
