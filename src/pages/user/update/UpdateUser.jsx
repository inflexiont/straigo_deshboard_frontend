import { Button, Input } from "@material-tailwind/react";
import "draft-js/dist/Draft.css";
import React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import LoadingImage from "../../../assets/loading.svg";
import NavBar from "../../../components/Navigation/NavBar";
import Error from "../../../components/ui/Error";
import UseUserUpdate from "./useUserUpdate";
const UpdateUser = () => {
  const {
    handleSubmit,
    setInputName,
    inputEmail,
    setInputEmail,
    inputName,
    isLoading,
    error,
  } = UseUserUpdate();

  return (
    <>
      <NavBar />
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 ">
        <div className="px-10 mt-6 flex justify-between">
          <form
            className="bg-white w-10/12 mx-auto p-5 rounded-md mt-8"
            onSubmit={handleSubmit}
          >
            <p className="text-2xl font-bold mb-3">Update User</p>
            <div className="mb-3 w-full">
              <Input
                label="Name"
                type="text"
                name="name"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
              />
            </div>
            <div className="mb-3 w-full">
              <Input
                label="Email"
                type="email"
                name="email"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
              />
            </div>
            <Button
              className="mb-3 w-full text-center"
              type="submit"
              // disabled={}
            >
              {isLoading ? (
                <img className="w-5" src={LoadingImage} alt="" />
              ) : (
                "Update"
              )}
            </Button>
            {error && <Error message={error?.data} />}
          </form>
        </div>
      </div>
    </>
  );
};
export default UpdateUser;
