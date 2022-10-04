import { apiSlice } from "../api/apiSlice";

const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchProjects: builder.query({
      query: () => `/projects?`,
      providesTags: ["Projects"],
    }),
    getProject: builder.query({
      query: (id) => ({
        url: `/projects/${id}`,
      }),
    }),
    addNewProject: builder.mutation({
      query: (data) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),

    updateProject: builder.mutation({
      query: ({ id, email, stage }) => {
        let toUpdate = {};
        if (stage) toUpdate = { ...toUpdate, stage };
        return {
          url: `/projects/${id}`,
          method: "PATCH",
          body: toUpdate,
        };
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        let { assignedProjectsQuery } = getState().projects;

        const patch = dispatch(
          projectsApi.util.updateQueryData(
            "fetchProjects",
            {
              assignedProjectsQuery,
              sort: "id",
              order: "desc",
            },
            (draft) => {
              return (draft = draft.map((project) =>
                project.id === arg.id
                  ? { ...project, stage: arg.stage }
                  : project
              ));
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patch.undo();
        }
      },
    }),
    updateProjectTeam: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/projects/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["Projects"],
    }),

    deleteProject: builder.mutation({
      query: ({ id, author }) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        let { assignedProjectsQuery } = getState().projects || {};
        try {
          await queryFulfilled;
          dispatch(
            projectsApi.util.updateQueryData(
              "fetchProjects",
              { assignedProjectsQuery, sort: "id", order: "desc" },
              (draft) => {
                return (draft = draft.filter(
                  (project) => project.id !== arg.id
                ));
              }
            )
          );
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useFetchProjectsQuery,
  useAddNewProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetProjectQuery,
  useUpdateProjectTeamMutation,
} = projectsApi;
