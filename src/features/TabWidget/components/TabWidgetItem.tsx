/* eslint-disable react-native/no-inline-styles */
// React Imports
import React, {FC} from 'react'

// Constant Imports
import {COLOURS} from '../../../constants'

// Component Imports
import {Label} from '../../Label'

// Package Imports
import {NavigationState, SceneRendererProps, TabBar} from 'react-native-tab-view'
import {display} from '../../../utils'

interface TabWidgetItemProps {
  testID?: string
}

export const TabWidgetItem: FC<
  TabWidgetItemProps &
    SceneRendererProps & {
      navigationState: NavigationState<{
        key: string
        title: string
      }>
    }
> = ({testID, ...props}) => {
  return (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: COLOURS.PRIMARY, height: 3}}
      tabStyle={{
        alignContent: 'center',
        height: 56,
        borderBottomColor: COLOURS.GREY800,
        borderBottomWidth: display.px(1),
      }}
      testID={testID}
      style={{
        marginTop: 0,
        backgroundColor: COLOURS.GREY900,
      }}
      renderLabel={(
        {route} // focused, color
      ) => (
        <Label
          fontSize='sm'
          fontWeight={700}
          fontFamily='Markpro-Bold'
          numberOfLines={1}
          color={COLOURS.WHITE}>
          {route.title}
        </Label>
      )}
      activeColor={COLOURS.WHITE}
      inactiveColor={COLOURS.NEUTRAL_BLUEALPHA300}
      // inactiveOpacity={0.5}
      // activeOpacity={1.0}
    />
  )
}
