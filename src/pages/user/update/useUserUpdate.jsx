import "draft-js/dist/Draft.css";
import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../features/user/usersApi";
import { selectUser } from "../../../features/user/userSelector";
import { setUserToAction } from "../../../features/user/userSlice";
const UseUserUpdate = () => {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  // save to redux
  const [updateUser, { isLoading, error }] = useUpdateUserMutation();
  const dispatch = useDispatch();

  const { userId } = useParams();
  const user = useSelector(selectUser);
  const { data } = useGetUserQuery(userId);

  useEffect(() => {
    dispatch(setUserToAction(data));
  }, [data]);

  // set value from database
  const setInput = (user) => {
    setInputName(user?.name);
    setInputEmail(user?.email);
  };
  useEffect(() => {
    setInput(user);
  }, [user]);
  console.log("user", user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        id: userId,
        data: {
          name: inputName,
          email: inputEmail,
        },
      })
    );
  };
  return {
    handleSubmit,
    setInputName,
    inputEmail,
    setInputEmail,
    inputName,
    isLoading,
    error,
  };
};

export default UseUserUpdate;
