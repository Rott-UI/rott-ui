// Component Imports
import {HEADER_HEIGHT, LIST_BOTTOM_MARGIN} from '../constants'
import {listHeightNormalizer} from './listHeightNormalizer'

// Utils and Lib Imports
import {display} from '../../../../../utils'

/**
 * Modal Yuksekligini Eleman Sayisina Gore Yuzde (%) Olarak Hesaplar
 * @param itemCount eleman sayisi
 * @returns Modal Yukseklik Yuzdesi
 */
export const modalHeightPercentageNormalizer = (
  itemCount: number,
  searchable: boolean,
  showDescription: boolean
) => {
  const listHeight = listHeightNormalizer(itemCount, showDescription)

  const modalHeightPX = display.normalize(
    listHeight + HEADER_HEIGHT(searchable) + LIST_BOTTOM_MARGIN,
    'height'
  )

  return (modalHeightPX * 100) / display.percentage(100, 'height') + 1
}
