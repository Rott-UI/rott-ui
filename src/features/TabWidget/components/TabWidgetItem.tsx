/* eslint-disable react-native/no-inline-styles */
// React Imports
import React, {FC} from 'react'

// Component Imports
import {Label} from '../../Label'

// Package Imports
import {NavigationState, SceneRendererProps, TabBar} from 'react-native-tab-view'
import {display} from '../../../utils'
import {themeConfig} from '../../../providers'

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
      indicatorStyle={{backgroundColor: themeConfig.colors['primary'], height: 3}}
      tabStyle={{
        alignContent: 'center',
        height: 56,
        borderBottomColor: themeConfig.colors['grey-800'],
        borderBottomWidth: display.px(1),
      }}
      testID={testID}
      style={{
        marginTop: 0,
        backgroundColor: themeConfig.colors['grey-900'],
      }}
      renderLabel={(
        {route} // focused, color
      ) => (
        <Label
          fontSize='sm'
          fontWeight={700}
          fontFamily='Markpro-Bold'
          numberOfLines={1}
          color={themeConfig.colors['white']}>
          {route.title}
        </Label>
      )}
      activeColor={themeConfig.colors['white']}
      inactiveColor={themeConfig.colors['neutral-blue-alpha']}
      // inactiveOpacity={0.5}
      // activeOpacity={1.0}
    />
  )
}
