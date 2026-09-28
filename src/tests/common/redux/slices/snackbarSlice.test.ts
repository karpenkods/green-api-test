import { ISnackbar } from '../../../../common/models'
import snackbarReducer, {
  pushDangerNotification,
  pushInfoNotification,
  pushSnackbar,
  pushSuccessNotification,
  pushWarningNotification,
  removeSnackbar,
} from '../../../../common/redux/slices/snackbarSlice'

jest.mock('nanoid', () => ({
  nanoid: () => 'fixed-id',
}))

describe('snackbarSlice', () => {
  it('adds snackbar item via pushSnackbar', () => {
    const nextState = snackbarReducer(
      [],
      pushSnackbar({ id: '1', kind: 'success', message: 'done' }),
    )

    expect(nextState).toEqual([{ id: '1', kind: 'success', message: 'done' }])
  })

  it('removes snackbar item via removeSnackbar', () => {
    const state: ISnackbar[] = [
      { id: '1', kind: 'success', message: 'done' },
      { id: '2', kind: 'error', message: 'failed' },
    ]

    const nextState = snackbarReducer(state, removeSnackbar('1'))

    expect(nextState).toEqual([{ id: '2', kind: 'error', message: 'failed' }])
  })

  it('creates notification actions with expected kind and id', () => {
    expect(pushDangerNotification('danger').payload).toMatchObject({
      id: 'fixed-id',
      kind: 'error',
      message: 'danger',
    })

    expect(pushWarningNotification('warning').payload).toMatchObject({
      id: 'fixed-id',
      kind: 'warning',
      message: 'warning',
    })

    expect(pushSuccessNotification('success').payload).toMatchObject({
      id: 'fixed-id',
      kind: 'success',
      message: 'success',
    })

    expect(pushInfoNotification('info').payload).toMatchObject({
      id: 'fixed-id',
      kind: 'info',
      message: 'info',
    })
  })
})
