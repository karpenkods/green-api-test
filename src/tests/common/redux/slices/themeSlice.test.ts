import themeReducer, {
  themeReducer as setTheme,
} from '../../../../common/redux/slices/themeSlice'

describe('themeSlice', () => {
  it('returns initial state for unknown action', () => {
    const state = themeReducer(undefined, { type: 'unknown' })

    expect(state).toEqual({ theme: '' })
  })

  it('updates theme via reducer', () => {
    const state = themeReducer(undefined, setTheme('dark'))

    expect(state.theme).toBe('dark')
  })
})
