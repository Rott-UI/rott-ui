/* eslint-disable react-native/no-inline-styles */
// React Imports
import React, {FC} from 'react'

// React Native Imports
import {GestureResponderEvent, ScrollView} from 'react-native'

// Component Imports
import {ModalProps} from '../models'
import {Content} from '../../Content'
import {Pressable} from '../../Pressable'

interface ModalContainerProps extends ModalProps {
  onPress?: (event: GestureResponderEvent) => void
}

export const ModalContentContainer: FC<ModalContainerProps> = ({
  transparent,
  height,
  backgroundColor,
  fullScreen,
  justifyContentCenter,
  alignItemsCenter,
  modalContainerMarginBottom,
  onPress,
  children,
}) => {
  if (transparent) {
    return (
      <Content
        height={height}
        noPadding
        backgroundColor={backgroundColor}
        borderTopStartRadius={fullScreen ? 0 : 24}
        borderTopEndRadius={fullScreen ? 0 : 24}
        justifyContentCenter={justifyContentCenter}
        alignItemsCenter={alignItemsCenter}
        marginBottom={modalContainerMarginBottom}>
        <ScrollView
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={{
            flex: fullScreen ? 0 : 1,
            justifyContent: justifyContentCenter ? 'center' : undefined,
            alignItems: alignItemsCenter ? 'center' : undefined,
          }}>
          {children}
        </ScrollView>
      </Content>
    )
  } else {
    return (
      <Pressable
        onPress={onPress}
        height={height}
        backgroundColor={backgroundColor}
        borderTopStartRadius={fullScreen ? 0 : 24}
        borderTopEndRadius={fullScreen ? 0 : 24}
        justifyContentCenter={justifyContentCenter}
        alignItemsCenter={alignItemsCenter}
        marginBottom={modalContainerMarginBottom}>
        <ScrollView
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={{
            flex: fullScreen ? 0 : 1,
            justifyContent: justifyContentCenter ? 'center' : undefined,
            alignItems: alignItemsCenter ? 'center' : undefined,
          }}>
          {children}
        </ScrollView>
      </Pressable>
    )
  }
}
