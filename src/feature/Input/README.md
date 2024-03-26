## Input Parametreleri

| Parametreler    | Type                                | Zorunluluk           | Varsayılan Değer | Açıklama                                                               |
| --------------- | ----------------------------------- | -------------------- | ---------------- | ---------------------------------------------------------------------- |
| label           | `string` or `InputLabelProps`       | :white_check_mark:   |                  | Input Başlığı                                                          |
| name            | `string`                            | :white_check_mark:   |                  | Input Adı **(testler için gerekli ve unique olmalı)**(                 |
| type            | `InputType`                         | :white_large_square: | `default`        | Input Tipi **(Klavye, Yazı Maskesi ve Validasyonlar için gerekli)**    |
| renderSeparator | `boolean`                           | :white_large_square: | `true`           | Input altında ayıtıcı çizgi olup olmama durumudu belirler              |
| fontSize        | `Size`                              | :white_large_square: | `xl`             | Yazı Karakterlerinin Boyutlarını Belirler                              |
| size            | `Size`                              | :white_large_square: | `lg`             | Input ve Yazı Karakterlerinin Boyutlarını Belirler                     |
| errorMessage    | `string`                            | :white_large_square: |                  | Hata Mesajı (Validation Mesajı)                                        |
| theme           | `Theme`                             | :white_large_square: | `light`          | Tema                                                                   |
| onDateChange    | `((date: Date) => void)`            | :white_large_square: |                  | Date tipi için gerekli bir alan. Tarih değişince tetiklenir            |
| onCheckChange   | `((checked: boolean) => void)`      | :white_large_square: |                  | Checkbox tipi için gerekli bir alan. Check durumu değişince tetiklenir |
| radius          | `number`                            | :white_large_square: |                  | Input Border Radius unu belirler                                       |
| placeholder     | `string` or `InputPlaceholderProps` | :white_large_square: |                  | Input içi boşken görünmesi istenen text değeridir.                     |

#### InputType

| Input Types   |
| ------------- |
| `default`     |
| `date`        |
| `cvc`         |
| `expireDate`  |
| `numeric`     |
| `password`    |
| `iban`        |
| `creditCard`  |
| `phone`       |
| `pinPassword` |
| `plateNumber` |
| `amount`      |
| `checkbox`    |
| `select`      |

#### Theme

| Theme   |
| ------- |
| `dark`  |
| `light` |

#### InputLabelProps

| Parametreler       | Type                  | Zorunluluk           | Varsayılan Değer | Açıklama                                                                     |
| ------------------ | --------------------- | -------------------- | ---------------- | ---------------------------------------------------------------------------- |
| text               | `string`              | :white_check_mark:   |                  | Label Text                                                                   |
| variant            | `Variant`             | :white_large_square: |                  | Label Text Rengi Ozellestirilebilir. Aksi Taktirde Theme ye gore atanacaktir |
| description        | `string`              | :white_large_square: |                  | Açıklama                                                                     |
| size               | `Size`                | :white_large_square: | `md`             | Label Text Boyutu                                                            |
| descriptionSize    | `Size`                | :white_large_square: | `md`             | Açıklama Text Boyutu                                                         |
| descriptionVariant | `Variant`             | :white_large_square: | `theme color`    | Aciklama Rengi Ozellestirilebilir. Aksi Taktirde Theme ye gore atanacaktir   |
| theme              | `Theme`               | :white_large_square: | `dark`           | Tema                                                                         |
| fontFamily         | `FontFamily`          | :white_large_square: | `Markpro`        | Font                                                                         |
| icon               | `InputLabelIconProps` | :white_large_square: | `undefined`      | Icon                                                                         |

#### InputLabelIconProps

| Parametreler | Type               | Zorunluluk           | Varsayılan Değer | Açıklama             |
| ------------ | ------------------ | -------------------- | ---------------- | -------------------- |
| name         | `IconTypes`        | :white_check_mark:   |                  | Label Text           |
| width        | `number`           | :white_large_square: | `18`             | Açıklama             |
| height       | `number`           | :white_large_square: | `18`             | Label Text Boyutu    |
| variant      | `Variant`          | :white_large_square: |                  | Açıklama Text Boyutu |
| strokeWidth  | `number`           | :white_large_square: |                  | Tema                 |
| noStroke     | `boolean`          | :white_large_square: |                  | Font                 |
| mode         | `stroke` or `fill` | :white_large_square: |                  | Icon                 |

## Örnek 1

label direk `string` verilebilir

```tsx
<Input
  testID='newPassword-input-test-id'
  label={translator('INPUT.PASSWORD')}
  theme='dark'
  type='password'
  maxLength={8}
  name='newPassword'
  value={newPassword}
  onChangeText={handleChange('newPassword')}
  renderSeparator={false}
  errorMessage={errorNewPassword}
/>
```

## Örnek 2

label icin ozel theme, size, description ve icon tanimi yapilip ilgili icon icin onPress tanimi yapilabilir

```tsx
<Input
  testID='newPassword-input-test-id'
  theme='dark'
  label={{
    text: translator('INPUT.PASSWORD'),
    description: 'Desc',
    theme='light'
    icon: {
      name: 'SETTINGS',
      width: 18,
      height: 18,
      mode: 'fill',
      noStroke: true,
      onPress: () => {
        console.log('on press', new Date())
      },
    },
  }}
  type='password'
  maxLength={8}
  name='newPassword'
  value={newPassword}
  onChangeText={handleChange('newPassword')}
  renderSeparator={false}
  errorMessage={errorNewPassword}
/>
```

## Örnek 3

label icin ozellestirme ekstralari asagidaki gibi artirilabilir

```tsx
<Input
  testID='newPassword-input-test-id'
  theme='dark'
  label={{
    text: translator('INPUT.PASSWORD'),
    variant: 'danger',
    size: 'xs',
    fontFamily: 'Markpro-Light',
    description: 'hey',
    icon: {
      name: 'SETTINGS',
      width: 18,
      height: 18,
      variant: 'grey-200',
      mode: 'fill',
      noStroke: true,
      onPress: () => {
        console.log('on press', new Date())
      },
    },
  }}
  type='password'
  maxLength={8}
  name='newPassword'
  value={newPassword}
  onChangeText={handleChange('newPassword')}
  renderSeparator={false}
  errorMessage={errorNewPassword}
/>
```
