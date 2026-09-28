import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ICheckAccountRequest, ICheckAccountResponse } from '../../models'

export const checkAccountApi = createApi({
  reducerPath: 'checkAccountApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_API,
  }),

  endpoints: (build) => ({
    checkAccount: build.mutation<ICheckAccountResponse, ICheckAccountRequest>({
      query: ({
        idInstance,
        apiTokenInstance,
        username,
        phoneNumber,
        force,
      }) => ({
        url: `waInstance${idInstance}/checkAccount/${apiTokenInstance}`,
        method: 'POST',
        body: {
          ...(username ? { username } : {}),
          ...(phoneNumber ? { phoneNumber: Number(phoneNumber) } : {}),
          force,
        },
      }),
    }),
  }),
})

export const { useCheckAccountMutation } = checkAccountApi
