## Bildirim

Yeni paket dahil edildiği için paketleri install etmelisiniz.

Kullanilan paket : [react-native-toast-notifications](https://github.com/arnnis/react-native-toast-notifications)

```
yarn install
npx pod-install
```

| Bildirim Tipleri |
| ---------------- |
| success          |
| error            |
| warning          |
| info             |
| custom           |

#### Kullanımı

```tsx
// Libs icerisinden import edilmelidir 
// Util and Lib Imports
import {Notification} from '../../../libs'

// Kullanımı
Notification.success('Baslik', 'Aciklama')
Notification.error('Baslik', 'Aciklama')
```
