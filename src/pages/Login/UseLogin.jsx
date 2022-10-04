import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApi";
const UseLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, { data, isLoading, error: responseError }] = useLoginMutation();

  const navigate = useNavigate();
  useEffect(() => {
    if (responseError?.data) {
      setError(responseError.data.error);
    }
    if (data?.accessToken && data?.user) {
      navigate("/projects");
    }
  }, [data, responseError, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    login({
      email,
      password,
    });
  };
  return {
    setEmail,
    setPassword,
    error,
    handleSubmit,
    isLoading,
    email,
    password,
  };
};

export default UseLogin;
