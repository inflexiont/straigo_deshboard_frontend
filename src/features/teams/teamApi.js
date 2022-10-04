import { apiSlice } from "../api/apiSlice";

export const teamsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: (email) => `/teams?members_like=${email}&_sort=timestamp`,
      providesTags: ["Teams"],
    }),
    addTeam: builder.mutation({
      query: (data) => ({
        url: "/teams",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Teams"],
    }),
    getTeam: builder.query({
      query: (id) => ({
        url: `/teams${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Teams"],
    }),
    addTeamMember: builder.mutation({
      query: ({ id, data }) => ({
        url: `/teams/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Teams"],
    }),
    deleteTeam: builder.mutation({
      query: (id) => ({
        url: `/teams/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teams"],
    }),
    updateTeam: builder.mutation({
      query: (data) => {
        let { id, members } = data || {};
        let updatedTeam = {};
        if (members?.length) updatedTeam = { ...updatedTeam, members };
        return {
          url: `/teams/${id}`,
          method: "PATCH",
          body: updatedTeam,
        };
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        try {
          let { data: updatedTeam } = await queryFulfilled;
          let { email } = getState().auth?.user;

          dispatch(
            teamsApi.util.updateQueryData("getTeams", email, (draft) => {
              return draft.map((team) =>
                team.id === updatedTeam.id
                  ? { ...team, members: updatedTeam.members }
                  : team
              );
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useAddTeamMutation,
  useAddTeamMemberMutation,
  useDeleteTeamMutation,
  useGetTeamQuery,
} = teamsApi;
