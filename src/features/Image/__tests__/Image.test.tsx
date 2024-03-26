// Component Imports
import {Image} from '../components'

// Util and Lib Imports
import {render} from '../../../utils'

describe('Image -> Custom Component', () => {
  const testId = {
    imageTestId: 'image-test-id',
  }
  const testIconName = 'ARROW_LEFT'

  it('image elementi snapshot ile eşleşmeli', () => {
    const {imageTestId} = testId
    const renderedIcon = render(
      <Image testID={imageTestId} name={testIconName} width={50} height={50} />
    )

    expect(renderedIcon).toMatchSnapshot()
  })

  it('image elementi renderlandığında gerçekten ekranda olmalı', () => {
    const {imageTestId} = testId
    const {getByTestId} = render(<Image testID={imageTestId} name={testIconName} width={50} />)

    const imageElement = getByTestId(imageTestId)

    expect(imageElement).toBeOnTheScreen()
  })

  it('image elementi verilen width ile renderlanmalı', () => {
    const {imageTestId} = testId
    const {getByTestId} = render(<Image testID={imageTestId} name={testIconName} width={50} />)

    const imageElement = getByTestId(imageTestId)

    expect(imageElement).toHaveProp('width', 50)
  })

  it('image elementi verilen height ile renderlanmalı', () => {
    const {imageTestId} = testId
    const {getByTestId} = render(<Image testID={imageTestId} name={testIconName} height={50} />)

    const imageElement = getByTestId(imageTestId)

    expect(imageElement).toHaveProp('height', 50)
  })
})
