// React Imports
import React, {FC} from 'react'

// React Native Imports
import {ActivityIndicator} from 'react-native'

// Feature Imports
import {AlertDialogStyles} from '../styles'
import {AlertDialogButtonProps} from '../models'
import {AlertDialog, Item, Label, ModalProps, Pressable, Separator} from '../..'

// Constant Imports

// Util and Lib Imports
import {display} from '../../../utils'
import {themeConfig} from '../../../providers'

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
      backgroundColor={themeConfig.colors['grey-100']}
      style={AlertDialogStyles(props).InformationModalView}>
      {showActivityIndicator && (
        <Item marginTop={24}>
          <ActivityIndicator size='large' color={themeConfig.colors['primary']} />
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
        backgroundColor={themeConfig.colors['grey-100']}
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
                variant={(buttons?.cancelButton?.variant as any) || 'danger'}
                fontWeight={500}
                textCenter>
                Cancel
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
              variant={(buttons.confirmButton.variant as any) || 'grey-100'}
              fontWeight={500}
              textCenter>
              Confirm
            </Label>
          </Pressable>
        )}
      </Item>
    </Item>
  )
}
