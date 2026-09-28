import menuReducer, {
  chooseReducer,
  openCreateChatReducer,
  openMenuReducer,
  pathNameReducer,
  showLogoReducer,
  showMenuReducer,
} from '../../../../common/redux/slices/menuSlice'

describe('menuSlice', () => {
  it('returns initial state for unknown action', () => {
    const state = menuReducer(undefined, { type: 'unknown' })

    expect(state).toEqual({
      openMenu: false,
      showMenu: false,
      showLogo: true,
      openCreateChat: false,
      choose: 'name',
      pathName: '',
    })
  })

  it('updates menu state via reducers', () => {
    let state = menuReducer(undefined, openMenuReducer(true))
    state = menuReducer(state, showMenuReducer(true))
    state = menuReducer(state, showLogoReducer(false))
    state = menuReducer(state, openCreateChatReducer(true))
    state = menuReducer(state, chooseReducer('phone'))
    state = menuReducer(state, pathNameReducer('/chat'))

    expect(state.openMenu).toBe(true)
    expect(state.showMenu).toBe(true)
    expect(state.showLogo).toBe(false)
    expect(state.openCreateChat).toBe(true)
    expect(state.choose).toBe('phone')
    expect(state.pathName).toBe('/chat')
  })
})
