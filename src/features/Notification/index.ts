// React Imports
import {MutableRefObject, createRef} from 'react'

// Notification Imports
import {NotificationModel} from './models'
import {useNotification} from './hooks'

export * from './contexts'
export * from './components'
export * from './hooks'
export * from './providers'

type NotificationService = ReturnType<typeof useNotification>

export const notificationRef =
  createRef<NotificationService>() as MutableRefObject<NotificationService>

export const Notification = {
  show: (notification: NotificationModel) => notificationRef.current?.show(notification),
  hide: (id: string) => notificationRef.current?.hide(id),
  hideAll: () => notificationRef.current?.hideAll,

  success: (title: string, description?: string) =>
    notificationRef.current?.success(title, description),
  warning: (title: string, description?: string) =>
    notificationRef.current?.warning(title, description),
  danger: (title: string, description?: string) =>
    notificationRef.current?.danger(title, description),
  info: (title: string, description?: string) => notificationRef.current?.info(title, description),
}
