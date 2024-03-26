import {display} from '../../../utils'

export const modalHeightNormalizer = (
  dataLength: number,
  titleExist: boolean,
  subTitleExist: boolean,
  separatorTotalHeight: number,
  maxItem: number,
  itemHeight: number
) => {
  const showItemCount = dataLength > maxItem ? maxItem : dataLength
  const headerHeight = display.px(56)
  const listBottomPosition = display.px(93)

  return (
    ((showItemCount * itemHeight +
      (titleExist || subTitleExist ? headerHeight : 0) +
      listBottomPosition) *
      100) /
      display.percentage(100, 'height') +
    separatorTotalHeight
  )
}
