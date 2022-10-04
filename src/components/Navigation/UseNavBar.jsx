import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../../features/auth/authSlice";
import { search } from "../../features/projects/projectsSlice";
const UseNavBar = () => {
  const dispatch = useDispatch();
  const {
    user: { avatar, name },
  } = useSelector((state) => state.auth);
  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
  };

  // search projects

  const handleSearch = (e) => {
    dispatch(search(e.target.value));
  };

  const debounce = (fn, delay) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };
  return { handleSearch, name, avatar, logout, debounce };
};

export default UseNavBar;
