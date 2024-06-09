// React Imports
import React, {FC} from 'react'

// Component Imports
import {Item} from '../../Item'
import {Content} from '../../Content'
import {Label} from '../../Label'
import {List} from '../../List'
import {Button} from '../../Button'
import {EmptyState} from '../../EmptyState'
import {ResultStyles} from '../styles'
import {ResultActionModel, ResultScreenParamModel} from '../models'
import {Header} from '../../Header'
import {Container} from '../../Container'

// Constant Imports
import {COLOURS} from '../../../constants'

// Util and Lib Imports
import {display} from '../../../utils'

/**
 * Result - Islem Sonucu Ekrani
 *
 * @param title Başlık alanı
 * @param screensToRemove Sonuç ekranı açıldığında kapatılacak ekranlar
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
  route: {
    [key: string]: any
    params: ResultScreenParamModel
  }
}

export const ResultScreen: FC<ResultScreenProps> = ({route: {params}}) => {
  const {header, state, title, description, actions} = params
  const itemHeight = display.heightPixel(60)

  // Listede renderlanacak Item
  const renderItem = ({title: renderItemTitle, action, variant, testID}: ResultActionModel) => (
    <Button
      testID={testID}
      size='full'
      variant={variant ?? 'primary'}
      marginBottom={15}
      paddingHorizontal={15}
      onPress={() => action && action()}>
      <Label fontSize='xl' color={COLOURS.WHITE} fontWeight={600}>
        {renderItemTitle}
      </Label>
    </Button>
  )

  return (
    <Container noPadding testID='result-container-test-id'>
      <Header defaultBackgroundColor title={header} />

      <Content flex={1} size='full' backgroundColor={COLOURS.GREY900}>
        <Item
          flex={1}
          alignItemsCenter
          justifyContentCenter
          paddingBottom={itemHeight * (actions?.length ?? 0)}>
          <EmptyState
            name={state}
            description={
              description && typeof description === 'string' ? (
                description
              ) : (
                <Item alignItemsCenter marginBottom={30}>
                  {description && typeof description !== 'string' && <>{description}</>}
                </Item>
              )
            }
            title={
              title && typeof title === 'string' ? (
                title
              ) : (
                <Item>{title && typeof title !== 'string' && <>{title}</>}</Item>
              )
            }
          />
        </Item>

        {actions && actions.length > 0 && (
          <Item width={display.setWidth(100)} style={ResultStyles().bottomContainer}>
            <List
              testID='result-action-list-test-id'
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
        )}
      </Content>
    </Container>
  )
}
