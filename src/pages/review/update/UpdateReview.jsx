import { Button, Input, Textarea } from "@material-tailwind/react";
import "draft-js/dist/Draft.css";
import React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import NavBar from "../../../components/Navigation/NavBar";
import Error from "../../../components/ui/Error";
import UseReviewUpdate from "./useReviewUpdate";

const UpdateReview = () => {
  const {
    handleSubmit,
    inputTitle,
    isLoading,
    selectImage,
    setSelectImage,
    uploadImage,
    LoadingImage,
    error,
    setInputTitle,
    inputCompany,
    inputCoverImage,
    inputPosition,
    inputMessage,
    inputStar,
    setInputCompany,
    setInputCoverImage,
    setInputPosition,
    setInputMessage,
    setInputStar,
    photoLoading1,
  } = UseReviewUpdate();

  return (
    <>
      <NavBar />
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 ">
        <div className="px-10 mt-6 flex justify-between">
          <form
            className="bg-white w-10/12 mx-auto p-5 rounded-md mt-8"
            onSubmit={handleSubmit}
          >
            <p className="text-2xl font-bold mb-3">Update Project</p>
            <div className="mb-3 w-full">
              <Input
                label="Title"
                type="text"
                name="title"
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
              />
            </div>
            <div className="mb-3 w-full">
              <Input
                label="Company"
                type="text"
                name="company"
                value={inputCompany}
                onChange={(e) => setInputCompany(e.target.value)}
              />
            </div>
            <div className="mb-3 w-full">
              <Input
                label="Title"
                type="text"
                name="title"
                value={inputPosition}
                onChange={(e) => setInputPosition(e.target.value)}
              />
            </div>
            <div className="mb-3 w-full">
              <Input
                label="Title"
                type="text"
                name="title"
                value={inputStar}
                onChange={(e) => setInputStar(e.target.value)}
              />
            </div>
            <div className="mb-3 w-full">
              <Textarea
                label="Title"
                type="text"
                name="title"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
            </div>
            <div className="my-6 w-full flex">
              <Input
                label="Cover Image"
                type="file"
                variant="standard"
                accept="image/*"
                name="coverImage"
                onChange={(e) => setSelectImage(e.target.files[0])}
                disabled={photoLoading1 || selectImage !== ""}
              />
              <img
                src={inputCoverImage}
                className="w-10 h-10 border border-blue-400 rounded"
                alt=""
              />
              <Button
                onClick={uploadImage}
                size="sm"
                color={inputCoverImage?.length > 3 ? "green" : "blue"}
                className=" flex items-center gap-2"
                disabled={photoLoading1 || inputCoverImage || !selectImage}
              >
                {" "}
                {photoLoading1 && (
                  <img className="w-5" src={LoadingImage} alt="" />
                )}
                {photoLoading1
                  ? "Uploading"
                  : inputCoverImage?.length > 3
                  ? "Uploaded"
                  : "upload"}
              </Button>
            </div>

            <Button className="mb-3 w-full" type="submit">
              {isLoading ? (
                <img className="w-5" src={LoadingImage} alt="" />
              ) : (
                "Update"
              )}
            </Button>
            {error && <Error message={error.data} />}
          </form>
        </div>
        {error && <Error message={error.data} />}
      </div>
    </>
  );
};

export default UpdateReview;
