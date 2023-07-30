import { getToken } from "../utils/tokenUtils";
import { apiSlice } from "./apiSlice";
//import { apiSlice } from "@reduxjs/toolkit/query/react";
const USERS_URL = 'http://localhost:5000/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({ //it will create own endpoint
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            }),

        }),

        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            }),
        }),

        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }),
        }),

    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation } = usersApiSlice;
