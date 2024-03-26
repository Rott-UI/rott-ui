// Util and Lib Imports
import {Variant} from '../../models'
import {TranslationLanguageTypes} from '../../../utils'

export interface AlertDialogButtonProps {
  variant?: Variant
  text: TranslationLanguageTypes
  onPress?: () => void
}
