import React from 'react'
import MaskedView from '@react-native-masked-view/masked-view'
import styles from './MaskedViewComponent.style'

const MaskedViewComponent = ({children, element}) => {
  return (
    <MaskedView style={styles.container} maskElement={element} mask>
      {children}
    </MaskedView>
  )
}

export default MaskedViewComponent
