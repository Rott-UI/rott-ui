// React Imports
import {FC, useState} from 'react'

// Component Imports
import {Item} from '../..'
import {TabWidgetProps} from '../models'
import {TabWidgetItem} from './TabWidgetItem'

// Package Imports
import {SceneMap, TabView} from 'react-native-tab-view'

// Util and Lib Imports
import {display} from '../../../utils'

export const TabWidget: FC<TabWidgetProps> = ({
  titles,
  tabs,
  testID = 'tabview-test-id',
  flex = 1,
  onTabChange,
  defaultIndex = 0,
  ...props
}) => {
  const [index, setIndex] = useState(defaultIndex)
  const routes = Array.from(titles).map((title, routeIndex) => ({
    key: routeIndex.toString(),
    title,
  }))

  return (
    <Item flex={flex} {...props}>
      <TabView
        testID={testID}
        navigationState={{index, routes}}
        renderScene={SceneMap(
          titles.reduce((acc, cur, curIndex) => {
            return {...acc, [curIndex.toString()]: () => tabs[curIndex]}
          }, {})
        )}
        renderTabBar={(tabBarProps) => <TabWidgetItem {...tabBarProps} />}
        onIndexChange={(tabIndex) => {
          !!onTabChange && onTabChange(tabIndex)
          setIndex(tabIndex)
        }}
        initialLayout={{width: display.percentage(100)}}
      />
    </Item>
  )
}
