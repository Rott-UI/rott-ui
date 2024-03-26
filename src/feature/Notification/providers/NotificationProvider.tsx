// React Imports
import {FC, PropsWithChildren} from 'react'

// Component Impots
import {NotificationComponent} from '../components'

// Package Imports
import {ToastProvider} from 'react-native-toast-notifications'
import {Icon} from '../../Icon'

interface NotificationProviderProps extends PropsWithChildren {}

export const NotificationProvider: FC<NotificationProviderProps> = ({children}) => {
  return (
    <ToastProvider
      placement='top'
      duration={3000}
      animationType='slide-in'
      animationDuration={250}
      offset={50}
      offsetTop={30}
      offsetBottom={40}
      swipeEnabled={true}
      renderType={{
        success: ({onHide, data: {title, description}}) => (
          <NotificationComponent
            title={title}
            description={description}
            variantColor='rgba(68, 238, 162, 0.60)'
            iconElement={
              <Icon name='CHECK_CIRCLE' width={24} height={24} mode='stroke' strokeWidth={1.5} />
            }
            onClose={() => {
              onHide()
            }}
          />
        ),
        danger: ({onHide, data: {title, description}}) => (
          <NotificationComponent
            title={title}
            description={description}
            variantColor='rgba(228, 65, 96, 0.60)'
            iconElement={
              <Icon name='WARNING_ERROR' width={24} height={24} mode='stroke' strokeWidth={1.5} />
            }
            onClose={() => {
              onHide()
            }}
          />
        ),
        warning: ({onHide, data: {title, description}}) => (
          <NotificationComponent
            title={title}
            description={description}
            variantColor='rgba(255, 117, 24, 0.60)'
            iconElement={
              <Icon name='WARNING' width={24} height={24} mode='stroke' strokeWidth={1.5} />
            }
            onClose={() => {
              onHide()
            }}
          />
        ),
        info: ({onHide, data: {title, description}}) => (
          <NotificationComponent
            title={title}
            description={description}
            variantColor='rgba(63, 182, 210, 0.60)'
            iconElement={
              <Icon name='NOTIFICATION' width={24} height={24} mode='fill' strokeWidth={1} />
            }
            onClose={() => {
              onHide()
            }}
          />
        ),
      }}>
      {children}
    </ToastProvider>
  )
}
