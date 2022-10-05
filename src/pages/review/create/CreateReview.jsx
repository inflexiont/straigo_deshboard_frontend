import { Button, Input, Textarea } from "@material-tailwind/react";
import "draft-js/dist/Draft.css";
import React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import NavBar from "../../../components/Navigation/NavBar";
import Error from "../../../components/ui/Error";
import UseReviewCreate from "./useReviewCreate";

const CreateReview = () => {
  const {
    handleSubmit,
    inputName,
    isLoading,
    selectImage,
    setSelectImage,
    uploadImage,
    LoadingImage,
    error,
    setInputName,
    inputCompany,
    inputCoverImage,
    inputPosition,
    inputMessage,
    inputStar,
    setInputCompany,
    setInputPosition,
    setInputMessage,
    setInputStar,
    photoLoading1,
  } = UseReviewCreate();
  console.log(inputCoverImage);
  console.log(inputMessage);
  return (
    <>
      <NavBar />
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 ">
        <div className="px-10 mt-6 flex justify-between">
          <form
            className="bg-white w-10/12 mx-auto p-5 rounded-md mt-8"
            onSubmit={handleSubmit}
          >
            <p className="text-2xl font-bold mb-3">Update Review</p>
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
                label="Company"
                type="text"
                name="company"
                value={inputCompany}
                onChange={(e) => setInputCompany(e.target.value)}
              />
            </div>
            <div className="mb-3 w-full">
              <Input
                label="Position"
                type="text"
                name="position"
                value={inputPosition}
                onChange={(e) => setInputPosition(e.target.value)}
              />
            </div>
            <div className="mb-3 w-full">
              <Input
                label="Rating"
                type="text"
                name="rating"
                value={inputStar}
                onChange={(e) => setInputStar(e.target.value)}
              />
            </div>
            <div className="mb-3 w-full">
              <Textarea
                label="Message"
                type="text"
                name="message"
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
                disabled={photoLoading1 || !selectImage}
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

            <Button
              className="mb-3 w-full"
              type="submit"
              disabled={inputMessage?.length <= 70}
            >
              {isLoading ? (
                <img className="w-5" src={LoadingImage} alt="" />
              ) : (
                "Update"
              )}
            </Button>
            {error && <Error message={error.data} />}
          </form>
        </div>
      </div>
    </>
  );
};
export default CreateReview;
