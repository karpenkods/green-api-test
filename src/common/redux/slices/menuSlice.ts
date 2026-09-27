import { createSlice } from '@reduxjs/toolkit'
import { IMenuState } from '../../models/redux'

const initialState: IMenuState = {
  openMenu: false,
  showMenu: false,
  showLogo: true,
  openCreateChat: false,
  choose: 'name',
  pathName: '',
}

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    openMenuReducer(state, action) {
      state.openMenu = action.payload
    },
    showMenuReducer(state, action) {
      state.showMenu = action.payload
    },
    showLogoReducer(state, action) {
      state.showLogo = action.payload
    },
    openCreateChatReducer(state, action) {
      state.openCreateChat = action.payload
    },
    chooseReducer(state, action) {
      state.choose = action.payload
    },
    pathNameReducer(state, action) {
      state.pathName = action.payload
    },
  },
})

export const {
  openMenuReducer,
  showMenuReducer,
  showLogoReducer,
  openCreateChatReducer,
  chooseReducer,
  pathNameReducer,
} = menuSlice.actions

export default menuSlice.reducer
