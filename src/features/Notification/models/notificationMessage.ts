// import {IconTypes} from '../../Icon'

export interface NotificationMessageProps {
  title?: string
  description?: string | JSX.Element
  iconElement: React.ReactElement | React.ReactNode
  onClose?: (() => void) | null | undefined
  variantColor: string
}
