import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
  IDeleteMessageRequest,
  IGetMessageRequest,
  IGetMessageResponse,
  ISendMessageRequest,
} from '../../models'

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_API,
  }),

  endpoints: (build) => ({
    sendMessage: build.mutation<void, ISendMessageRequest>({
      query: ({ idInstance, apiTokenInstance, ...body }) => ({
        url: `waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
        method: 'POST',
        body,
      }),
    }),
    getMessage: build.query<IGetMessageResponse, IGetMessageRequest>({
      query: ({ idInstance, apiTokenInstance }) => ({
        url: `waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
        method: 'GET',
      }),
    }),
    deleteMessage: build.mutation<void, IDeleteMessageRequest>({
      query: ({ idInstance, apiTokenInstance, receiptId }) => ({
        url: `waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useSendMessageMutation,
  useGetMessageQuery,
  useDeleteMessageMutation,
} = messagesApi
