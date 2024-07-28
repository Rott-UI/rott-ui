// Util and Lib Imports
import {Notification} from '..'
import {render, fireEvent, act} from '../../../utils'

// Component Imports
import {NotificationComponent} from '../components'
import {NotificationProvider} from '../providers'

const mockProps = {
  title: 'Title',
  description: 'Description',
  mockOnClose: jest.fn(),
}

describe('Notification -> Custom Component', () => {
  const iconName = 'REMOVE'
  const testId = {
    closeIconTestId: 'close-icon-test-id',
    descriptionTestId: 'notification-desc-test-id',
    titleTestId: 'notification-title-test-id',
    blurTestId: 'notification-blur-test-id',
  }

  it('notification ilk render anında snapshot ile eşleşmeli', () => {
    const renderedNotification = render(
      <NotificationComponent variantColor={'white'} iconElement={iconName} {...mockProps} />
    )

    expect(renderedNotification).toMatchSnapshot()
  })

  it('notification açıldığında ekranda blur gözükmeli', () => {
    const {blurTestId} = testId
    const {getByTestId} = render(<NotificationProvider />)

    Notification.success('Test Title', 'Test Description')

    const blurElement = getByTestId(blurTestId)

    expect(blurElement).toBeOnTheScreen()
  })

  it('notification yokken ekranda blur gözükmemeli', () => {
    const {blurTestId} = testId
    const {queryByTestId} = render(<NotificationProvider />)

    const blurElement = queryByTestId(blurTestId)

    expect(blurElement).not.toBeOnTheScreen()
  })

  it('kapatma butonuna tıklandığında onClose fonksiyonları çağırılmalı', async () => {
    const {closeIconTestId} = testId
    const {getByTestId} = render(
      <NotificationComponent
        variantColor={'white'}
        iconElement={iconName}
        onClose={mockProps.mockOnClose}
        {...mockProps}
      />
    )

    await act(() => {
      const closeIcon = getByTestId(closeIconTestId)
      fireEvent.press(closeIcon)
    })

    expect(mockProps.mockOnClose).toHaveBeenCalled()
    expect(mockProps.mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('title verilen değerler ile ekranda gözükmeli', () => {
    const {title} = mockProps
    const {getByText} = render(
      <NotificationComponent
        variantColor={'white'}
        iconElement={iconName}
        onClose={mockProps.mockOnClose}
        title={title}
      />
    )

    const titleElement = getByText(title)

    expect(titleElement).toBeOnTheScreen()
  })

  it('description verilen değerler ile ekranda gözükmeli', () => {
    const {description} = mockProps
    const {getByText} = render(
      <NotificationComponent
        variantColor={'white'}
        iconElement={iconName}
        onClose={mockProps.mockOnClose}
        description={description}
      />
    )

    const descriptionElement = getByText(description)

    expect(descriptionElement).toBeOnTheScreen()
  })

  it('description verilmediği zaman ekranda gözükmemeli', () => {
    const {descriptionTestId} = testId
    const {queryByTestId} = render(
      <NotificationComponent
        variantColor={'white'}
        iconElement={iconName}
        onClose={mockProps.mockOnClose}
      />
    )

    const descriptionElement = queryByTestId(descriptionTestId)

    expect(descriptionElement).not.toBeOnTheScreen()
  })
})
