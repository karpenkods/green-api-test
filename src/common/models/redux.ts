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

export interface ISendMessageRequest {
  idInstance: string
  apiTokenInstance: string
  chatId: string
  message: string
}

export type IGetMessageRequest = Omit<ISendMessageRequest, 'chatId' | 'message'>

export interface IGetMessageResponse {
  receiptId: number
  body: IBody
}

export interface IBody {
  typeWebhook: string
  instanceData: IInstanceData
  timestamp: number
  idMessage: string
  senderData: ISenderData
  messageData: IMessageData
}

export interface IInstanceData {
  idInstance: number
  wid: string
  typeInstance: string
}

export interface ISenderData {
  chatId: string
  chatName: string
  chatType: string
  sender: string
  senderName: string
  senderType: string
  senderContactName: string
  senderPhoneNumber: number
}

export interface IMessageData {
  typeMessage: string
  textMessageData: ITextMessageData
}

export interface ITextMessageData {
  textMessage: string
}

export interface IDeleteMessageRequest {
  idInstance: string
  apiTokenInstance: string
  receiptId: number
}

export interface IChatState extends Omit<
  ICheckAccountResponse,
  'exist' | 'fromCache' | 'phoneNumber'
> {
  idInstance: string
  apiTokenInstance: string
  messagesHas: IMessageHas[]
}

export interface IMessageHas {
  type: string
  textMessage: string
  senderName?: string
  time?: number
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
