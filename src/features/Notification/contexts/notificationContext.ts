/* eslint-disable @typescript-eslint/no-unused-vars */
// React Imports
import {createContext} from 'react'

// Notification Imports
import {NotificationContextModel, NotificationModel} from '../models'

export const NotificationContext = createContext<NotificationContextModel>({
  notifications: 0,
  show: (notification: NotificationModel) => '',
  hide: (id: string) => {},
  hideAll: () => {},

  success: (title: string, description?: string) => '',
  warning: (title: string, description?: string) => '',
  danger: (title: string, description?: string) => '',
  info: (title: string, description?: string) => '',
})
