// React Imports
import React, {FC} from 'react'

// Component Imports
import {Item} from '../../Item'
import {ImageBackground} from '../../ImageBackground'
import {Content} from '../../Content'
import {Icon} from '../../Icon'
import {Label} from '../../Label'
import {ModalComponent} from '../../Modal'
import {List} from '../../List'
import {Button} from '../../Button'

import {ResultStyles} from '../styles'
import {ResultActionModel, ResultProps} from '../models'

// Constant Imports
import {COLOURS, Images} from '../../../constants'

// Util and Lib Imports
import {colourFromVariant, display} from '../../../utils'

/**
 * Result - Islem Sonucu Ekrani
 *
 * @param title Başlık alanı
 * @param subTitle Alt başlık alanı
 * @param actions ResultDataProps[] formatında veri listesi
 * @param isShow Result komponentin bulunduğu yerdeki Show state i
 * @param onClose Modal kapatıldığında tetiklenen fonksiyondur. Komponentin kullanıldığu yerdeki state ini bu fonksiyon ile güncelleyebilirsiniz
 * @param header Custom Header Content
 * @param headerTitle Sayfa Basligi
 * @param headerLogo Sayfa Basliginda Yer Alacak Logo Name
 * @returns Sonuc Ekrani Renderlanır
 *
 */
export const Result: FC<ResultProps> = ({
  headerTitle,
  headerLogo,
  header,

  variant,
  iconName,
  title,
  description,
  actions,
  isShow,
  fontSize = 'xl',
  onClose,
  ...props
}) => {
  const itemHeight = display.heightPixel(60)

  // Listede renderlanacak Item
  const renderItem = ({
    title: renderItemTitle,
    name: renderItemName,
    action: onAction,
  }: ResultActionModel) => (
    <Button
      testID={`result-data-${renderItemName}-test-id`}
      size='full'
      variant='primary'
      marginBottom={15}
      paddingHorizontal={15}
      onPress={() => onAction()}>
      <Label fontSize='xl' color={COLOURS.WHITE} fontWeight={600}>
        {renderItemTitle}
      </Label>
    </Button>
  )

  return (
    <ModalComponent
      fullScreen
      testID='result-modal-test-id'
      statusBarTranslucent
      visible={isShow}
      headerTitle={headerTitle}
      headerLogo={headerLogo}
      header={header}
      onClose={() => onClose!()}
      closeButton
      {...props}>
      <ImageBackground source={Images.GRADIENT_BG} style={ResultStyles().container}>
        <Content flex={1} size='full'>
          <Item width={display.setWidth(100)} alignItemsCenter marginTop={80}>
            <Icon
              name={iconName}
              width={display.setWidth(50)}
              height={display.setWidth(50)}
              marginBottom={30}
              mode='fill'
              noStroke
            />

            <Item>
              {title && typeof title === 'string' && (
                <Label fontSize={fontSize} variant='white'>
                  {title}
                </Label>
              )}
              {title && typeof title !== 'string' && <>{title}</>}
            </Item>
          </Item>

          <Item width={display.setWidth(100)} style={ResultStyles().bottomContainer}>
            <Item width={display.setWidth(100)} alignItemsCenter marginBottom={30}>
              {description && typeof description === 'string' && (
                <Label fontSize={fontSize} variant='white'>
                  {description}
                </Label>
              )}

              {description && typeof description !== 'string' && <>{description}</>}
            </Item>

            <List
              testID='result-test-id'
              style={ResultStyles().list}
              width={display.setWidth(90)}
              marginLeft={display.setWidth(2.5)}
              data={actions}
              renderItem={({item}) => renderItem(item)}
              horizontal={false}
              estimatedItemSize={itemHeight}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </Item>
        </Content>
      </ImageBackground>
    </ModalComponent>
  )
}
