// React Imports
import React, {FC, PropsWithChildren, useCallback, useMemo, useState} from 'react'

// Notification Imports
import {NotificationModel} from '../models'
import {NotificationContext} from '../contexts'
import {ToasterNotificationProvider} from './ToasterNotificationProvider'
import {useNotification} from '../hooks'
import {notificationRef} from '..'

// Package Imports
import {Toast} from 'react-native-toast-notifications'
import {NotificationStyle} from '../styles'
import {Item} from '../../Item'

let notifications = 0
export const NotificationProvider: FC<PropsWithChildren> = ({children}) => {
  const [hasAnyNotification, setHasAnyNotification] = useState<boolean>(false)

  const baseNotification = ({title, description, variant}: NotificationModel) =>
    Toast.show(title, {
      type: variant,
      data: {title, description, variant},
      onClose: () => decrement(),
    })

  const show = useCallback(
    (notification: NotificationModel) => {
      increment()

      return baseNotification(notification)
    },
    [notifications]
  )
  const hide = useCallback(
    (id: string) => {
      decrement()

      return Toast.hide(id)
    },
    [notifications]
  )
  const hideAll = useCallback(() => {
    return Toast.hideAll()
  }, [])

  const success = useCallback(
    (title: string, description?: string) => {
      increment()

      return baseNotification({title, description, variant: 'success'})
    },
    [notifications]
  )
  const warning = useCallback(
    (title: string, description?: string) => {
      increment()

      return baseNotification({title, description, variant: 'warning'})
    },
    [notifications]
  )
  const danger = useCallback(
    (title: string, description?: string) => {
      increment()

      return baseNotification({title, description, variant: 'danger'})
    },
    [notifications]
  )
  const info = useCallback(
    (title: string, description?: string) => {
      increment()

      return baseNotification({title, description, variant: 'info'})
    },
    [notifications]
  )

  const increment = () => {
    notifications = notifications + 1

    if (notifications > 0) setHasAnyNotification(true)
  }

  const decrement = () => {
    if (notifications > 0) notifications = notifications - 1

    if (notifications === 0) setHasAnyNotification(false)
  }

  const contextValues = useMemo(() => {
    return {
      notifications,
      show,
      hide,
      hideAll,

      success,
      warning,
      danger,
      info,
    }
  }, [notifications, show, hide, hideAll, success, warning, danger, info, increment, decrement])

  return (
    <NotificationContext.Provider value={contextValues}>
      <InitializeModalRef />
      {hasAnyNotification && (
        <Item testID='notification-blur-test-id' style={NotificationStyle().blur} />
      )}
      <ToasterNotificationProvider>{children}</ToasterNotificationProvider>
    </NotificationContext.Provider>
  )
}

const InitializeModalRef = () => {
  const notificationHook = useNotification()
  notificationRef.current = notificationHook

  return null
}
