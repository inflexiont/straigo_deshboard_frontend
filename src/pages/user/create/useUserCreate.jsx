import "draft-js/dist/Draft.css";
import { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";
import { useAddNewUserMutation } from "../../../features/user/usersApi";
const UseUserCreate = () => {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  // add new project
  const [addNewUser, { isLoading, error }] = useAddNewUserMutation();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addNewUser({
        name: inputName,
        email: inputEmail,
        password: inputPassword,
      })
    );
  };
  return {
    handleSubmit,
    setInputName,
    inputEmail,
    inputPassword,
    setInputEmail,
    setInputPassword,
    inputName,
    isLoading,
    error,
  };
};

export default UseUserCreate;
