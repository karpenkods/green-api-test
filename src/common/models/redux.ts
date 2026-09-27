import { VariantType } from 'notistack'

export interface ICheckAccountRequest {
  idInstance: string
  apiTokenInstance: string
  phoneNumber?: string | null
  username?: string | null
  force: boolean
}

export interface ICheckAccountResponse {
  exist: boolean
  chatId: string
  username?: string
  phoneNumber?: number
  fromCache: boolean
}

export interface IError {
  status: number
  reason: string
}

export interface ISnackbar {
  id: string | number
  kind: VariantType
  message: string
  isDismissed?: boolean
}

export interface IMenuState {
  openMenu: boolean
  showMenu: boolean
  showLogo: boolean
  openCreateChat: boolean
  choose: 'name' | 'phone'
  pathName: string
}

export interface IThemeState {
  theme: string
}
