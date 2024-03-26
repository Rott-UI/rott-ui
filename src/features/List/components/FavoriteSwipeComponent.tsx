// React Imports
import {FC} from 'react'

// Component Imports
import {Icon, Item, Label, Pressable} from '../../../components'

// Constant Imports
import {COLOURS} from '../../../constants'

// Util and Lib Imports
import {formatMessage} from '../../../utils'

interface FavoriteSwipeComponentProps {
  index: number
  favorite: boolean
  handleFavoriteChange: (itemIndex: number, itemFavorite: boolean) => void | undefined
}

export const FavoriteSwipeComponent: FC<FavoriteSwipeComponentProps> = ({
  index,
  favorite,
  handleFavoriteChange,
}) => (
  <Item row width={48}>
    <Pressable
      alignItemsCenter
      justifyContentCenter
      backgroundColor={favorite ? COLOURS.SEMANTIC_DANGER : COLOURS.SECONDARY}
      onPress={() => handleFavoriteChange && handleFavoriteChange!(index, !favorite)}>
      <Icon
        width={16}
        height={16}
        name={favorite ? 'STAR_FILL' : 'STAR'}
        variant={favorite ? 'secondary' : 'info'}
      />

      <Label textCenter color={favorite ? COLOURS.WHITE : COLOURS.BLACK} fontSize={8} marginTop={4}>
        {formatMessage(favorite ? 'LIST.ITEM.FAVORITE.REMOVE' : 'LIST.ITEM.FAVORITE.ADD')}
      </Label>
    </Pressable>
  </Item>
)
