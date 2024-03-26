export * from './components'
export * from './providers'

// Component Imports
import {Variant} from '../models'

// Package Imports
import {Toast} from 'react-native-toast-notifications'

export const Notification = {
  /**
   *
   * @param title Başlık
   * @param description Açıklama
   * @returns Başarılı Bildirimini Renderlar
   */
  success: (title: string, description?: string) =>
    baseNotification({title: title, description: description, variant: 'success'}),

  /**
   *
   * @param title Başlık
   * @param description Açıklama
   * @returns Hata Bildirimini Renderlar
   */
  danger: (title: string, description?: string) =>
    baseNotification({title: title, description: description, variant: 'danger'}),

  /**
   *
   * @param title Başlık
   * @param description Açıklama
   * @returns Hata Bildirimini Renderlar
   */
  warning: (title: string, description?: string) =>
    baseNotification({title: title, description: description, variant: 'warning'}),

  /**
   *
   * @param title Başlık
   * @param description Açıklama
   * @returns Hata Bildirimini Renderlar
   */
  info: (title: string, description?: string) =>
    baseNotification({title: title, description: description, variant: 'info'}),
}

export interface NotificationProps {
  title: string
  description?: string
  variant?: Variant
}

const baseNotification = ({title, description, variant}: NotificationProps) =>
  Toast.show(title, {type: variant, data: {title, description, variant}})
