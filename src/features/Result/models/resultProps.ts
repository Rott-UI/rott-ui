// React Imports
import {ReactNode} from 'react'

// Component Imports
import {IconTypes} from '../../Icon'
import {Size, Variant} from '../../models'
import {ModalProps} from '../../Modal'
import {ResultActionModel} from './resultActionModel'
import {ImageTypes} from '../../Image'

/**
 * Result Data Tipi
 *
 * @property {string} title - Başlık
 * @property {string} name - actionName - Testler için gerekli. *Örnek Kullanım:* ```action-name```
 * @property {void} action - onPress olduğunda çalışması istenen fonksiyon
 *
 * Örnek:
 *```
 * const resultData: ResultDataProps[] = [
 *   {
 *     name: 'dekont-gonder',
 *     title: 'Dekont Gonder',
 *     action: () => {
 *       // eslint-disable-next-line no-console
 *       console.log('Dekont Gonder');
 *     },
 *   },
 *   {
 *     name: 'yeni-islem',
 *     title: 'Yeni Islem',
 *     action: () => {
 *       // eslint-disable-next-line no-console
 *       console.log('Yeni Islem');
 *     },
 *   },
 * ];
 * ```
 */
export interface ResultProps extends Omit<ModalProps, 'fullScreen'> {
  title?: string | ReactNode
  description?: string | ReactNode

  /*
   * ResultVariant, işlemin sonucunu temsil eden bir türdür.
   * Bu tür, aşağıdaki değerleri alabilir:
   * - 'success': İşlem başarıyla tamamlandı.
   * - 'warning': İşlem sırasında uyarılar meydana geldi.
   * - 'error': İşlem başarısız oldu.
   * - 'info': İşlem hakkında bilgilendirici bilgiler sağlandı.
   */
  variant: Variant
  iconName: IconTypes

  actions?: ResultActionModel[]
  fontSize?: Size

  isShow?: boolean
}

export interface ResultScreenParamModel {
  header?: string
  state: ImageTypes
  title?: string
  screensToRemove?: string[]
  description?: string
  actions?: ResultActionModel[]
  fontSize?: Size
}
