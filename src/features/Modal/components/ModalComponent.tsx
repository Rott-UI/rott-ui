/* eslint-disable indent */
// React Imports
import {FC, useCallback} from 'react'

// React Native Imports
import {Animated, Modal as RNModal} from 'react-native'

// Constant Imports
import {COLOURS} from '../../../constants'

// Component Imports
import {Pressable} from '../../Pressable'
import {Header} from '../../Header'
import {Icon} from '../../Icon'
import {Item} from '../../Item'
import {ModalStyles} from '../style'
import {ModalProps} from '../models'
import {ModalContentContainer} from './ModalContainer'

// Feature Imports
import {getHasDynamicIslandState, getHasNotchState} from '../../../features/app'

// Hook Imports
import {useAppSelector} from '../../../hooks'

// Util and Lib Imports
import {colourFromVariant, display} from '../../../utils'
import {PanResponderAnimation} from '../utils'
import {Modal} from '..'

export const ModalComponent: FC<ModalProps> = ({
  id,
  animationType = 'fade',
  fullScreen,
  visible = false,

  header,
  headerTitle,
  headerLogo,
  closeButton,
  onClose,
  disableOutsideClick,

  height = fullScreen ? 100 : 0,
  backgroundColor = fullScreen ? COLOURS.GREY900 : COLOURS.WHITE,
  panResponderBackgroundColor = 'grey-800',
  /**
   * Custom Header element verildiği zaman tasarımda renk bozulması yaşamamak için bu değerin tanımlanması gerekir.
   *
   */
  headerBackgroundColor = 'grey-800',
  slideToClose,

  alignItemsCenter = undefined,
  justifyContentCenter = undefined,
  transparent,

  children,
  modals,
  modalContainerMarginBottom,
  ...props
}) => {
  const hasChildModal =
    modals?.length && modals?.length > 1 && id ? modals?.some((modal) => modal.id! > id) : false
  const {outsideTapAreaTestId, headerTestId, slideToCloseTestId} = {
    outsideTapAreaTestId: 'outside-tap-area-test-id',
    headerTestId: 'modal-header-test-id',
    slideToCloseTestId: 'slide-to-close-button-test-id',
  }

  const hasNotch = useAppSelector(getHasNotchState)
  const hasDynamicIsland = useAppSelector(getHasDynamicIslandState)
  const modalHeightByPercentage =
    !fullScreen && height
      ? display.setHeight(height > 100 || height < 0 ? 100 : height)
      : display.setHeight(100)

  const translateY = new Animated.Value(0)
  const panResponder = useCallback(
    () =>
      PanResponderAnimation(
        modalHeightByPercentage,
        translateY,
        !!onClose ? () => onClose() : () => Modal.hideModal(id)
      ),
    [translateY]
  )

  const closeModalAnimation = () => {
    if (!fullScreen && animationType === 'fade') {
      Animated.timing(translateY, {
        toValue: modalHeightByPercentage,
        duration: 250,
        useNativeDriver: false,
      }).start(() => {
        !!onClose && onClose()
        Modal.hideModal(id)
      })
    } else {
      !!onClose && onClose()
      Modal.hideModal(id)
    }
  }

  return (
    <RNModal
      statusBarTranslucent
      transparent={!fullScreen}
      animationType={animationType}
      style={{height: modalHeightByPercentage}}
      visible={visible}
      onRequestClose={() => !disableOutsideClick && closeModalAnimation()}
      {...props}>
      {!fullScreen && (
        <Pressable
          testID={outsideTapAreaTestId}
          onPress={() => {
            if (!fullScreen && !!onClose && !disableOutsideClick) closeModalAnimation()
          }}
          style={ModalStyles().fadedBackgroundStyles}
        />
      )}

      <Item backgroundColor='rgba(34,63,70, 0.9)' row>
        <Animated.View style={ModalStyles({translateY}).animatedViewStyles}>
          <ModalContentContainer
            // TODO: Children Container Hesaplaması yapılıp burası düzeltilecek.
            height={modalHeightByPercentage}
            backgroundColor={transparent ? 'transparent' : backgroundColor}
            justifyContentCenter={justifyContentCenter}
            alignItemsCenter={alignItemsCenter}
            modalContainerMarginBottom={modalContainerMarginBottom}>
            {/* TODO: Bu kod bloğunun 92-142 arası refactor edilecek. */}
            {!fullScreen && slideToClose && !headerTitle && !headerLogo && (
              <Item
                size='full'
                alignItemsCenter
                justifyContentCenter
                backgroundColor={
                  panResponderBackgroundColor
                    ? colourFromVariant(panResponderBackgroundColor)
                    : undefined
                }
                borderTopStartRadius={fullScreen ? 0 : 24}
                borderTopEndRadius={fullScreen ? 0 : 24}
                {...(slideToClose ? {...panResponder().panHandlers} : undefined)}>
                <Icon
                  testID={slideToCloseTestId}
                  variant='neutral-grey-alpha-200'
                  width={40}
                  height={40}
                  name='LINE'
                />
              </Item>
            )}

            {!header && (headerTitle || headerLogo) && (
              <Item
                testID={headerTestId}
                size='full'
                paddingTop={hasNotch || hasDynamicIsland ? (fullScreen ? 50 : 10) : 5}
                backgroundColor={
                  headerBackgroundColor
                    ? colourFromVariant(headerBackgroundColor)
                    : fullScreen
                    ? COLOURS.GREY800
                    : COLOURS.GREY900
                }
                borderTopStartRadius={fullScreen ? 0 : 15}
                borderTopEndRadius={fullScreen ? 0 : 15}
                justifyContentCenter
                alignItemsCenter
                {...(!fullScreen && slideToClose ? {...panResponder().panHandlers} : undefined)}>
                {!fullScreen && slideToClose && (
                  <Icon
                    testID={slideToCloseTestId}
                    name='LINE'
                    variant='neutral-grey-alpha-200'
                    height={100}
                    width={100}
                    marginTop={16}
                    marginBottom={8}
                  />
                )}

                <Header
                  title={headerTitle}
                  logo={headerLogo}
                  paddingHorizontal={0}
                  rightIcon={
                    closeButton
                      ? {name: 'REMOVE_BIG', onPress: () => closeModalAnimation!()}
                      : undefined
                  }
                />
              </Item>
            )}

            {header && (
              <Item
                backgroundColor={colourFromVariant(headerBackgroundColor)}
                paddingTop={hasNotch || hasDynamicIsland ? (fullScreen ? 54 : 0) : 8}
                size='full'
                borderTopStartRadius={slideToClose ? 0 : 24}
                borderTopEndRadius={slideToClose ? 0 : 24}>
                {header}
              </Item>
            )}
            {children}

            {hasChildModal && <ModalComponent {...modals![id!]} modals={modals} />}
          </ModalContentContainer>
        </Animated.View>
      </Item>
    </RNModal>
  )
}
