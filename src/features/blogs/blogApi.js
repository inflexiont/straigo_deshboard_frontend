import { apiSlice } from "../api/apiSlice";

const blogsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchBlogs: builder.query({
      query: () => `/blogs?`,
      providesTags: ["Blogs"],
    }),
    getBlog: builder.query({
      query: (id) => ({
        url: `/blogs/${id}`,
      }),
    }),
    addNewBlog: builder.mutation({
      query: (data) => ({
        url: "/blogs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Blogs"],
    }),

    updateBlog: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/blogs/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["Blogs"],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),
  }),
});

export const {
  useFetchBlogsQuery,
  useAddNewBlogMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
  useGetBlogQuery,
} = blogsApi;
