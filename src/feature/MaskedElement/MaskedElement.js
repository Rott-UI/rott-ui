import {View} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import styles from './MaskedElement.style'

const MaskedElement = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFFFFF00', '#FFFFFF', '#FFFFFF00']}
        start={{x: 1, y: 0.09}}
        end={{x: 0.1, y: 1}}
        style={styles.linearGradientStyle}
      />
    </View>
  )
}

export default MaskedElement
