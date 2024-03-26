// Util and Lib Imports
import {formatMessage, render, fireEvent, act} from '../../../utils'

// Component Imports
import {NotificationComponent} from '../components'

const mockProps = {
  title: formatMessage('TEST.WITH.PARAM', {testText: 'Test Title'}),
  description: formatMessage('TEST.WITH.PARAM', {testText: 'Test Description'}),
  mockOnClose: jest.fn(),
}

describe('Notification -> Custom Component', () => {
  const iconName = 'REMOVE'
  const testId = {
    closeIconTestId: 'close-icon-test-id',
    descriptionTestId: 'notification-desc-test-id',
    titleTestId: 'notification-title-test-id',
  }

  it('notification ilk render anında snapshot ile eşleşmeli', () => {
    const renderedNotification = render(
      <NotificationComponent variantColor={'white'} iconElement={iconName} {...mockProps} />
    )

    expect(renderedNotification).toMatchSnapshot()
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
