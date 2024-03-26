# Timer Component

## Açıklama

Bu Timer component'i, belirli bir süre boyunca geri sayım yapabilen ve görüntüleyebilen bir React Native componentidir.

## Props

initialTime (number, zorunlu): Timer'ın başlangıç zamanı saniye cinsinden belirtilir.
color (string, opsiyonel): Timer metni rengini belirler. Varsayılan renk kullanılır.
style (object, opsiyonel): Timer bileşeninin genel stilini özelleştirmek için kullanılır.
...props (diğer opsiyonel): Timer bileşenine ekstra özellikler eklemek için kullanılır.

## Notlar

Timer component'i, useTimer hook'u ile zaman yönetimini sağlar.
Timer component'i countdown, circle, stop, reset bileşenlerini içeren useTimer() hook'u ile kullanılmaktadır.
Renk, stil ve diğer özellikler props üzerinden özelleştirilebilir.

## Timer Tipleri

Circle: Belirlenen süre bittikçe geri sayımın tekrardan başladığı versiyondur.
Countdown: Belirlenen süre boyunce belirlenenen değerden başlayıp 0'lanana kadar devam eden versiyondur.

## Kullanım

```jsx


import React from 'react'
import {Timer} from 'path-to-your-components'

const App = () => {

  useEffect(() => {
    Timer.countdown()
    Timer.circleTimer()
    Timer.stop()
    Timer.reset()
  }, [])

  return (
    <Button
      onPress={() => {
        Timer.countdown()
      }}>
     </Button>
    <Timer initialTime={60} color="blue" style={{ marginTop: 10 }}/>
  );
};

export default App


```
