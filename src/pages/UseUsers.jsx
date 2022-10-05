import { useDispatch, useSelector } from "react-redux";
import { useFetchProjectsQuery } from "../features/projects/projectsApi";
import { selectProjects } from "../features/projects/projectSelector";
import { setProjectsToAction } from "../features/projects/projectsSlice";

const UseReviews = () => {
  const dispatch = useDispatch();
  const { data } = useFetchProjectsQuery();

  dispatch(setProjectsToAction(data));

  return { projects: useSelector(selectProjects) };
};

export default UseReviews;
