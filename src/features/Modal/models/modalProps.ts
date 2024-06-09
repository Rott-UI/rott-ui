// React Imports
import {PropsWithChildren, ReactNode} from 'react'

// React Native Imports
import {ModalProps as RNModalProps} from 'react-native'

// Component Imports
import {Variant} from '../../models'
import {HeaderProps} from '../../Header'

export interface ModalProps
  extends PropsWithChildren,
    Omit<RNModalProps, 'transparent' | 'animated' | 'id'> {
  id?: number
  fullScreen?: boolean

  header?: ReactNode | HeaderProps
  closeButton?: boolean
  onClose?: () => void
  disableOutsideClick?: boolean

  /**
   * Değer 0 ila 100 arasında olmalıdır.
   */
  height?: number
  backgroundColor?: string
  panResponderBackgroundColor?: Variant
  headerBackgroundColor?: Variant
  slideToClose?: boolean

  alignItemsCenter?: boolean
  justifyContentCenter?: boolean

  /**
   * transparent özelliği aktif edildiğinde item istendiği gibi sağa sola kaydırılabilir hale gelmektedir.
   *
   * InformationModal bu senaryoya ihtiyaç duymuş ve onun için geliştirilmiştir.
   * Bu özellik aktif edilmezse backgroundColor='transparent' verilse dahi arka plana tıklandığında modal kapanmamaktadır.
   * */
  transparent?: boolean
  modals?: ModalProps[]

  modalContainerMarginBottom?: number
}
