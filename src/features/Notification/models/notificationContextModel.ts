import {NotificationModel} from './notificationModel'

export interface NotificationContextModel {
  notifications: number
  show: (notification: NotificationModel) => string
  hide: (id: string) => void
  hideAll: () => void

  success: (title: string, description?: string) => string
  warning: (title: string, description?: string) => string
  danger: (title: string, description?: string) => string
  info: (title: string, description?: string) => string
}
