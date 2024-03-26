// React Imports
import React, {FC} from 'react'

// Component Imports
import {Item} from '../../Item'
import {Content} from '../../Content'
import {Label} from '../../Label'
import {List} from '../../List'
import {Button} from '../../Button'

import {ResultStyles} from '../styles'
import {ResultActionModel, ResultScreenParamModel} from '../models'

// Constant Imports
import {COLOURS} from '../../../constants'

// Util and Lib Imports
import {display} from '../../../utils'
import {Container} from '../../Container'
import {Header} from '../../Header'
import {Image} from '../../Image'

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

interface ResultScreenProps {
  route: any
}

export const ResultScreen: FC<ResultScreenProps> = ({route: {params: parameterList}}) => {
  const {
    headerTitle,
    status,
    title,
    description,
    actions,
    fontSize = 'xl',
  } = parameterList?.resultInfo as ResultScreenParamModel

  const itemHeight = display.heightPixel(60)

  // Listede renderlanacak Item
  const renderItem = ({
    title: renderItemTitle,
    name: renderItemName,
    action: onAction,
    variant: renderVariant,
  }: ResultActionModel) => (
    <Button
      testID={`result-data-${renderItemName}-test-id`}
      size='full'
      variant={renderVariant ?? 'primary'}
      marginBottom={15}
      paddingHorizontal={15}
      onPress={() => onAction()}>
      <Label fontSize='xl' color={COLOURS.WHITE} fontWeight={600}>
        {renderItemTitle}
      </Label>
    </Button>
  )

  return (
    <Container noPadding testID='transfer-to-ptt-account-screen-container-test-id'>
      <Header defaultBackgroundColor title={headerTitle} back />
      <Content flex={1} size='full' backgroundColor={COLOURS.GREY900}>
        <Item
          flex={1}
          alignItemsCenter
          justifyContentCenter
          paddingBottom={itemHeight * (actions?.length ?? 0) + (actions?.length ?? 0) * 15 + 30}>
          <Image
            name={status === 'success' ? 'EMPTY_MONEY_TRANSFER' : 'EMPTY_CARD_ERROR'}
            width={152}
            height={152}
            marginBottom={24}
            resizeMode='contain'
          />

          <Item>
            {title && typeof title === 'string' && (
              <Label
                fontSize={fontSize}
                variant='white'
                fontWeight='bold'
                textCenter
                marginBottom={24}>
                {title}
              </Label>
            )}
            {title && typeof title !== 'string' && <>{title}</>}
          </Item>
          <Item alignItemsCenter marginBottom={30}>
            {description && typeof description === 'string' && (
              <Label fontSize={fontSize} variant='white' textCenter>
                {description}
              </Label>
            )}

            {description && typeof description !== 'string' && <>{description}</>}
          </Item>
        </Item>

        <Item width={display.setWidth(100)} style={ResultStyles().bottomContainer}>
          {actions && actions.length > 0 && (
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
          )}
        </Item>
      </Content>
    </Container>
  )
}
