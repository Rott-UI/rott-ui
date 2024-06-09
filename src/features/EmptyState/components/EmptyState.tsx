// React Imports
import React, {FC} from 'react'

// Component Imports
import {EmptyStateProps} from '../models'
import {Item} from '../../Item'
import {Image} from '../../Image'
import {Label} from '../../Label'

// Util and Lib Imports

/**
 * Result - Islem Sonucu Ekrani
 *
 * @param name Image alanı
 * @param description Açıklama  alanı
 * @param title Başlık alanı

 * @returns Sonuc Ekrani Renderlanır
 *
 */

export const EmptyState: FC<EmptyStateProps> = ({
  name,
  description,
  title,
  testID,
  backgroundColor,
  width,
  height,
}) => {
  return (
    <Item testID={testID} justifyContentCenter alignItemsCenter backgroundColor={backgroundColor}>
      <Image
        name={name}
        resizeMode='contain'
        width={width ?? 152}
        height={height ?? 152}
        testID='empty-state-image-test-id'
      />

      {title && (
        <Item>
          {(typeof title === 'string' || typeof title === 'object') && (
            <Label
              variant={(title as any)?.variant ?? 'white'}
              fontSize={(title as any)?.fontSize ?? 'xl'}
              fontFamily={(title as any)?.fontFamily ?? 'Markpro-Bold'}
              fontWeight={(title as any)?.fontWeight ?? 400}
              testID={(description as any)?.testID ?? 'empty-state-title-test-id'}
              textCenter
              marginBottom={24}>
              {(title as any)?.text ?? title}
            </Label>
          )}
          {title && typeof title !== 'string' && typeof title !== 'object' && <>{title}</>}
        </Item>
      )}

      {description && (
        <Item alignItemsCenter>
          {(typeof description === 'string' || typeof description === 'object') && (
            <Label
              marginBottom={8}
              variant={(description as any)?.variant ?? 'white'}
              fontSize={(description as any)?.fontSize ?? 'xl'}
              fontFamily={(description as any)?.fontFamily ?? 'Markpro-Medium'}
              fontWeight={(description as any)?.fontWeight ?? 400}
              textCenter
              testID={(description as any)?.testID ?? 'empty-state-desc-test-id'}>
              {(description as any)?.text ?? description}
            </Label>
          )}

          {description && typeof description !== 'string' && typeof description !== 'object' && (
            <>{description}</>
          )}
        </Item>
      )}
    </Item>
  )
}
