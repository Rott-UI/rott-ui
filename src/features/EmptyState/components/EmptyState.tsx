// React Imports
import React, {FC} from 'react'

// Component Imports
import {EmptyStateProps} from '../models'
import {Item} from '../../Item'
import {Content} from '../../Content'
import {Image} from '../../Image'
import {Label} from '../../Label'

// Util and Lib Imports
import {display} from '../../../utils'

/**
 * Result - Islem Sonucu Ekrani
 *
 * @param name Image alanı
 * @param description Açıklama başlık alanı
 
 * @returns Sonuc Ekrani Renderlanır
 *
 */

export const EmptyState: FC<EmptyStateProps> = ({name, description}) => {
  return (
    <Content flex={1} size='full'>
      <Item justifyContentCenter alignItemsCenter marginTop={50} height={display.heightPixel(230)}>
        <Image
          name={name}
          resizeMode='contain'
          width={152}
          height={152}
          marginBottom={32}
          testID='empty-state-image-test-id'
        />

        {description && (
          <Item>
            {typeof description === 'string' && (
              <Label
                marginBottom={8}
                fontSize='lg'
                fontFamily='Markpro-Medium'
                textCenter
                variant='white'
                testID='empty-state-desc-test-id'>
                {description}
              </Label>
            )}

            {typeof description !== 'string' && description}
          </Item>
        )}
      </Item>
    </Content>
  )
}
