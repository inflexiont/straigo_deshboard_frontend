import { apiSlice } from "../api/apiSlice";

const reviewsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchReviews: builder.query({
      query: () => `/reviews?`,
      providesTags: ["Reviews"],
    }),
    getReview: builder.query({
      query: (id) => ({
        url: `/reviews/${id}`,
      }),
    }),
    addNewReview: builder.mutation({
      query: (data) => ({
        url: "/reviews",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reviews"],
    }),

    updateReview: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/reviews/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["Reviews"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const {
  useAddNewReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useFetchReviewsQuery,
  useGetReviewQuery,
} = reviewsApi;
