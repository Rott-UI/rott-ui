// Component Imports
import {BottomMenu} from '../components'
import {bottomMenuListItemMock, menuItems} from '../__mocks__'

// Util and Lib Imports
import {render} from '../../../utils'

describe('Component -> BottomMenu', () => {
  const bottomMenuTestId = {
    bottomMenuContainerTestId: 'bottom-menu-container',
  }

  it('bottom menu componenti snapshotı ile eşleşmeli', () => {
    const rendered = render(<BottomMenu menuItems={bottomMenuListItemMock} />)

    expect(rendered).toMatchSnapshot()
  })

  it('ekranda görülmeli', () => {
    const {getByTestId} = render(<BottomMenu menuItems={bottomMenuListItemMock} />)
    const bottomMenuContainer = getByTestId('bottom-menu-container')

    expect(bottomMenuContainer).toBeTruthy()
  })

  it('bottom menu componenti ekranda gözükmeli', () => {
    const {bottomMenuContainerTestId} = bottomMenuTestId

    const {getByTestId} = render(<BottomMenu menuItems={menuItems} />)

    const bottomMenu = getByTestId(bottomMenuContainerTestId)

    expect(bottomMenu).toBeOnTheScreen()
  })
})
