// React Imports
import {FC} from 'react'

// Component Imports
import {Item} from '../../Item'
import {Label} from '../../Label'
import {Icon} from '../../Icon'
import {Pressable} from '../../Pressable'

// Notification Imports
import {NotificationStyle} from '../styles'

// Constant Imports
import {COLOURS} from '../../../constants'

// Package Imports
import LinearGradient from 'react-native-linear-gradient'

interface NotificationMessageProps {
  title?: string
  description?: string | JSX.Element
  iconElement: React.ReactElement | React.ReactNode
  onClose?: (() => void) | null | undefined
  variantColor: string
}

export const NotificationComponent: FC<NotificationMessageProps> = ({
  title,
  description,
  iconElement,
  variantColor,
  onClose,
}) => (
  <LinearGradient
    colors={[variantColor, COLOURS.GREY900]}
    style={NotificationStyle({variantColor}).linearGradient}
    start={{x: 0, y: 1}}
    end={{x: 0, y: 1}}
    useAngle
    angle={90}>
    <Item
      row
      relative
      width={343}
      paddingHorizontal={16}
      paddingVertical={16}
      marginBottom={4}
      marginTop={4}
      alignItemsCenter>
      <Item
        width={40}
        height={40}
        backgroundColor={COLOURS.NEUTRAL_ALPHA200}
        justifyContentCenter
        alignItemsCenter
        borderRadius={12}>
        {iconElement}
      </Item>

      <Item marginLeft={16} width={255}>
        {title && (
          <Label
            fontSize='xl'
            fontWeight={700}
            testID='notification-title-test-id'
            variant='grey-100'
            marginBottom={4}
            lineBreakMode='tail'>
            {title}
          </Label>
        )}

        {description && (
          <Label
            fontSize='sm'
            testID='notification-desc-test-id'
            variant='grey-100'
            fontWeight={500}>
            {description}
          </Label>
        )}
      </Item>

      <Pressable onPress={onClose} testID='close-icon-test-id' absolute right={10} top={10}>
        <Icon name='REMOVE' width={24} height={24} variant='grey-200' />
      </Pressable>
    </Item>
  </LinearGradient>
)
