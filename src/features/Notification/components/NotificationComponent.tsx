// React Imports
import {FC} from 'react'

//React Native Imports
import {Pressable} from 'react-native'

// Component Imports
import {Item} from '../../Item'
import {Label} from '../../Label'
import {Icon} from '../../Icon'

// Constant Imports
import {COLOURS} from '../../../constants'
import {NotificationMessageStyle} from '../styles'

// Util and Lib Imports
import {display} from '../../../utils'

// Notification Imports
import {NotificationMessageProps} from '../models'

// Package Imports
import LinearGradient from 'react-native-linear-gradient'

export const NotificationComponent: FC<NotificationMessageProps> = ({
  title,
  description,
  iconElement,
  variantColor,
  onClose,
}) => (
  <LinearGradient
    colors={[variantColor, COLOURS.GREY900]}
    // eslint-disable-next-line react-native/no-inline-styles
    style={{
      backgroundColor: COLOURS.GREY900,
      width: display.px(343),
      borderBottomEndRadius: display.px(12),
      borderBottomStartRadius: display.px(12),
      borderEndEndRadius: display.px(12),
      borderEndStartRadius: display.px(12),
      borderRadius: display.px(12),
      marginBottom: display.px(16),
      borderWidth: display.px(1),
      borderStyle: 'solid',
      borderColor: variantColor.replace('0.6', '0.3'),
    }}
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

      <Pressable
        onPress={onClose}
        style={NotificationMessageStyle().closePressable}
        testID='close-icon-test-id'>
        <Icon name='REMOVE' width={24} height={24} variant='grey-200' />
      </Pressable>
    </Item>
  </LinearGradient>
)
