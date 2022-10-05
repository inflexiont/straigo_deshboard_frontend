import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/users`,
      providesTags: ["Users"],
    }),
    getUser: builder.query({
      query: (id) => `/users/${id}`,
    }),
    addNewUser: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    updateUser: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/users/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddNewUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = usersApi;
