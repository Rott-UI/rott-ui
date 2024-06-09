// React Imports
import React, {FC} from 'react'

// Component Imports
import {AlertDialog, Item, Label, ModalProps, Pressable, Separator} from '../..'
import {AlertDialogButtonProps} from '../models'
import {AlertDialogStyles} from '../styles'

// Constant Imports
import {COLOURS} from '../../../constants'

// Util and Lib Imports
import {display, formatMessage} from '../../../utils'
import {ActivityIndicator} from 'react-native'

interface AlertDialogProps
  extends Omit<
    ModalProps,
    | 'header'
    | 'headerTitle'
    | 'fullScreen'
    | 'headerLogo'
    | 'closeButton'
    | 'height'
    | 'backgroundColor'
    | 'panResponderBackgroundColor'
    | 'headerBackgroundColor'
    | 'slideToClose'
  > {
  id?: number
  title: string
  text?: string
  buttons?: {
    cancelButton?: AlertDialogButtonProps
    confirmButton?: AlertDialogButtonProps
  }
  showActivityIndicator?: boolean
}

export const AlertDialogComponent: FC<AlertDialogProps> = ({
  id,
  title,
  text,
  buttons = {
    cancelButton: {
      text: 'COMMON.CANCEL',
      variant: 'danger',
      onPress: undefined,
    },
    confirmButton: undefined,
  },
  showActivityIndicator,
  ...props
}) => {
  return (
    <Item
      testID='alert-dialog-test-id'
      alignItemsCenter
      justifyContentCenter
      width={display.setWidth(80)}
      borderRadius={16}
      backgroundColor={COLOURS.GREY100}
      style={AlertDialogStyles(props).InformationModalView}>
      {showActivityIndicator && (
        <Item marginTop={24}>
          <ActivityIndicator size='large' color={COLOURS.PRIMARY} />
        </Item>
      )}

      <Item justifyContentCenter alignItemsCenter paddingHorizontal={16} paddingTop={24}>
        <Label variant='grey-900' textCenter fontSize='xl' fontWeight={600}>
          {title}
        </Label>

        <Label variant='grey-900' marginTop='5%' textCenter fontSize='md' fontWeight='normal'>
          {text}
        </Label>
      </Item>

      <Separator
        opacity={0.2}
        marginTop={24}
        orientation='horizontal'
        variant='neutral-alpha-300'
        size='full'
      />

      <Item
        row
        size='full'
        backgroundColor={COLOURS.GREY100}
        height={50}
        borderBottomStartRadius={16}
        borderBottomEndRadius={16}>
        {buttons?.cancelButton && (
          <Pressable
            testID='alert-dialog-cancel-button-test-id'
            height={50}
            justifyContentCenter
            alignItemsCenter
            onPress={() => {
              !!buttons?.cancelButton?.onPress && buttons.cancelButton.onPress()
              AlertDialog.hide(id)
            }}>
            <Item>
              <Label
                variant={buttons?.cancelButton?.variant || 'danger'}
                fontWeight={500}
                textCenter>
                {formatMessage(buttons.cancelButton.text)}
              </Label>
            </Item>
          </Pressable>
        )}

        {buttons?.confirmButton && (
          <Separator opacity={0.2} orientation='vertical' size='full' variant='neutral-alpha-300' />
        )}

        {buttons?.confirmButton && (
          <Pressable
            testID='alert-dialog-confirm-button-test-id'
            height={50}
            justifyContentCenter
            alignItemsCenter
            onPress={() => !!buttons?.confirmButton?.onPress && buttons?.confirmButton?.onPress()}>
            <Label
              variant={buttons.confirmButton.variant || 'grey-100'}
              fontWeight={500}
              textCenter>
              {formatMessage(buttons.confirmButton.text)}
            </Label>
          </Pressable>
        )}
      </Item>
    </Item>
  )
}
