// React Imports
import {FC} from 'react'

// React Native Imports
import {Linking} from 'react-native'

// Constant Imports
import {COLOURS} from '../../../constants'

// Component Imports
import {Icon} from '../../Icon'
import {Label} from '../../Label'
import {Image} from '../../Image'
import {Pressable} from '../../Pressable'
import {BottomMenuStyles} from '../styles'
import {BottomMenuItemModel} from '../models'

export const BottomMenuItem: FC<BottomMenuItemModel> = ({
  title,
  iconName,
  imageName,
  options,
  onPress,
  url,
  phone,
}) => {
  return (
    <Pressable
      alignItemsCenter
      width={!options?.containerStyle ? 56 : undefined}
      style={options?.containerStyle}
      onPress={async (event) => {
        if (!!url || !!phone) {
          ;(await Linking.canOpenURL(url ? url! : phone!))
            ? Linking.openURL(url ? url : `tel:${phone}`)
            : null
        } else if (onPress) onPress(event)
      }}>
      {iconName && !imageName && (
        <Icon
          width={options?.width ? options.width : 24}
          height={options?.height ? options.height : 24}
          variant='grey-900'
          mode={options?.iconMode}
          strokeWidth={options?.strokeWidth ? options?.strokeWidth : 2}
          marginBottom={8}
          name={iconName}
        />
      )}

      {imageName && !iconName && (
        <Image
          width={options?.width ? options.width : 24}
          height={options?.height ? options.height : 24}
          tintColor={options?.width && options?.height ? undefined : COLOURS.GREY900}
          marginBottom={8}
          resizeMode='contain'
          name={imageName}
        />
      )}

      {title && (
        <Label
          style={BottomMenuStyles().textStyle}
          variant='grey-900'
          fontSize='xs'
          fontWeight='bold'
          numberOfLines={1}>
          {title}
        </Label>
      )}
    </Pressable>
  )
}
