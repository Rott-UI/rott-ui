// React Native Imports
import {FlexAlignType} from 'react-native'

// Util and Lib Imports
import {alignItemsConvert} from '../../utils/alignItemsConverter'
import {justifyContentConvert} from '../../utils/justifyContentConverter'
import {display, sizeToPercentage} from '../../utils'

/* eslint-disable indent */
export const commonUiStyleProperties = (props?: any) => {
  return {
    width:
      typeof props?.width === 'number'
        ? display.normalize(props?.width)
        : props?.size
        ? sizeToPercentage(props?.size)
        : undefined,
    height:
      typeof props?.height === 'number'
        ? display.normalize(props?.height, props.heightNormalizeBased ? 'height' : 'width')
        : undefined,

    maxWidth: typeof props?.maxWidth === 'number' ? display.normalize(props?.maxWidth) : undefined,
    maxHeight:
      typeof props?.height === 'number'
        ? display.normalize(props?.height, props.heightNormalizeBased ? 'height' : 'width')
        : undefined,

    backgroundColor: props?.backgroundColor,

    marginTop: Number(props?.marginTop)
      ? display.normalize(props?.marginTop, props.heightNormalizeBased ? 'height' : 'width')
      : props?.marginTop,
    marginBottom: Number(props?.marginBottom)
      ? display.normalize(props?.marginBottom, props.heightNormalizeBased ? 'height' : 'width')
      : props?.marginBottom,
    marginLeft: Number(props?.marginLeft)
      ? display.normalize(props?.marginLeft, props.heightNormalizeBased ? 'height' : 'width')
      : props?.marginLeft,
    marginRight: Number(props?.marginRight)
      ? display.normalize(props?.marginRight, props.heightNormalizeBased ? 'height' : 'width')
      : props?.marginRight,
    paddingTop: Number(props?.paddingTop)
      ? display.normalize(props?.paddingTop, props.heightNormalizeBased ? 'height' : 'width')
      : props?.paddingTop,
    paddingBottom: Number(props?.paddingBottom)
      ? display.normalize(props?.paddingBottom, props.heightNormalizeBased ? 'height' : 'width')
      : props?.paddingBottom,
    paddingLeft: Number(props?.paddingLeft)
      ? display.normalize(props?.paddingLeft, props.heightNormalizeBased ? 'height' : 'width')
      : props?.paddingLeft,
    paddingRight: Number(props?.paddingRight)
      ? display.normalize(props?.paddingRight, props.heightNormalizeBased ? 'height' : 'width')
      : props?.paddingRight,
    paddingVertical: Number(props?.paddingVertical)
      ? display.normalize(props?.paddingVertical, props.heightNormalizeBased ? 'height' : 'width')
      : props?.paddingVertical,
    paddingHorizontal: Number(props?.paddingHorizontal)
      ? display.normalize(props?.paddingHorizontal, props.heightNormalizeBased ? 'height' : 'width')
      : props?.paddingHorizontal,

    position: props?.position
      ? props?.position
      : props?.absolute
      ? 'absolute'
      : props?.relative
      ? 'relative'
      : undefined,
    zIndex: props?.zIndex,
    left: Number(props?.left)
      ? display.normalize(props?.left, props.heightNormalizeBased ? 'height' : 'width')
      : props?.left,
    right: Number(props?.right)
      ? display.normalize(props?.right, props.heightNormalizeBased ? 'height' : 'width')
      : props?.right,
    top: Number(props?.top)
      ? display.normalize(props?.top, props.heightNormalizeBased ? 'height' : 'width')
      : props?.top,
    bottom: Number(props?.bottom)
      ? display.normalize(props?.bottom, props.heightNormalizeBased ? 'height' : 'width')
      : props?.bottom,
    flexGrow: Number(props?.flexGrow) ? props.flexGrow : undefined,
    gap: Number(props?.gap) ? props.gap : undefined,

    ...{
      ...(props?.includeBorderRadius
        ? {
            ...{borderRadius: props?.borderRadius},
            ...{borderTopEndRadius: props?.borderTopEndRadius},
            ...{borderTopStartRadius: props?.borderTopStartRadius},
            ...{borderBottomStartRadius: props?.borderBottomStartRadius},
            ...{borderBottomEndRadius: props?.borderBottomEndRadius},
          }
        : undefined),
      ...(props?.includeAlignItems
        ? {
            ...{
              alignItems: alignItemsConvert({
                alignItemsBaseline: props?.alignItemsBaseline,
                alignItemsCenter: props?.alignItemsCenter,
                alignItemsFlexStart: props?.alignItemsFlexStart,
                alignItemsFlexEnd: props?.alignItemsFlexEnd,
                alignItemsStretch: props?.alignItemsStretch,
              }) as FlexAlignType | undefined,
            },
          }
        : undefined),
      ...(props?.includeJustifyContent
        ? {
            ...{
              justifyContent: justifyContentConvert({
                justifyContentCenter: props?.justifyContentCenter,
                justifyContentFlexStart: props?.justifyContentFlexStart,
                justifyContentFlexEnd: props?.justifyContentFlexEnd,
                justifyContentSpaceAround: props?.justifyContentSpaceAround,
                justifyContentSpaceBetween: props?.justifyContentSpaceBetween,
                justifyContentSpaceEvenly: props?.justifyContentSpaceEvenly,
              }) as string | undefined,
            },
          }
        : undefined),
      ...(props?.includeLatterSpacing
        ? {
            ...{
              letterSpacing: props?.letterSpacing,
            },
          }
        : undefined),

      overflow: props?.overflowHidden ? 'hidden' : undefined,
    },
  }
}
