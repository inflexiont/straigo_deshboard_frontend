import { Button, Input } from "@material-tailwind/react";
import "draft-js/dist/Draft.css";
import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Select from "react-select/creatable";
import NavBar from "../../../components/Navigation/NavBar";
import Error from "../../../components/ui/Error";
import UseProjectUpdate from "./useBlogUpdate";

const UpdateBlog = () => {
  const {
    handleSubmit,
    inputCategory,
    inputTitle,
    isLoading,
    groupedOptions,
    selectImage,
    inputThumbImages,
    handleChangeSelect,
    setSelectImage,
    photoLoading1,
    photoLoading2,
    uploadImage,
    LoadingImage,
    inputCoverImage,
    editorState,
    handleEditorChange,
    convertedContent,
    error,
    setInputTitle,
    createMarkup,
    selectThumbImage,
    setSelectThumbImage,
    uploadThumbImage,
  } = UseProjectUpdate();
  console.log("image", selectThumbImage);
  return (
    <>
      <NavBar />
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 ">
        <div className="px-10 mt-6 flex justify-between">
          <form
            className="bg-white w-10/12 mx-auto p-5 rounded-md mt-8"
            onSubmit={handleSubmit}
          >
            <p className="text-2xl font-bold mb-3">Update Blog</p>
            <div className="mb-3 w-full">
              <Input
                label="Title"
                type="text"
                name="title"
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
              />
            </div>
            <Select
              options={groupedOptions}
              isMulti
              // defaultValue={selectImage}
              // defaultValue={inputCategory?.join(" ")}
              onChange={handleChangeSelect}
              isClearable
            />
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
            <div className="my-6 w-full flex">
              <Input
                label="Cover Image"
                type="file"
                variant="standard"
                accept="image/*"
                name="coverImage"
                onChange={(e) => setSelectThumbImage(e.target.files[0])}
                disabled={photoLoading2 || selectThumbImage !== ""}
              />
              <img
                src={inputThumbImages}
                className="w-10 h-10 border border-blue-400 rounded"
                alt=""
              />
              <Button
                onClick={uploadThumbImage}
                size="sm"
                color={inputCoverImage?.length > 3 ? "green" : "blue"}
                className=" flex items-center gap-2"
                disabled={
                  photoLoading2 ||
                  inputThumbImages ||
                  photoLoading2 ||
                  !selectImage ||
                  inputThumbImages?.length > 3
                }
              >
                {" "}
                {photoLoading2 && (
                  <img className="w-5" src={LoadingImage} alt="" />
                )}
                {photoLoading2
                  ? "Uploading"
                  : inputThumbImages?.length > 3
                  ? "Uploaded"
                  : "upload"}
              </Button>
            </div>
            {/* <div className="mb-3 w-full flex">
              <Input
                label="galleryImages"
                type="file"
                accept="image/*"
                multiple="multiple"
                variant="standard"
                name="galleryImages"
                onChange={handleFileEvent}
                disabled={
                  fileLimit || photoLoading1 || uploadedFiles?.length > 0
                }
              />
              {inputGalleryImages?.map(((img,i)) => (
                <img
                  key={i}
                  src={img}
                  className="w-10 border border-blue-400 rounded relative"
                />
              ))}
              <Button
                size="sm"
                onClick={() => handleDrop(uploadedFiles)}
                color={inputCoverImage?.length > 0 ? "green" : "blue"}
                className=" flex items-center gap-2"
                disabled={
                  photoLoading2 ||
                  !uploadedFiles?.length > 0 ||
                  inputCoverImage?.length > 0
                }
              >
                {" "}
                {photoLoading2 && (
                  <img className="w-5" src={LoadingImage} alt="" />
                )}
                {photoLoading2
                  ? "Uploading"
                  : inputCoverImage?.length > 0
                  ? "Uploaded"
                  : "uploads"}
              </Button>
            </div> */}
            {/* editor */}
            <Editor
              defaultEditorState={editorState}
              onEditorStateChange={handleEditorChange}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
            />
            {" Preview"}
            <div
              className="preview"
              dangerouslySetInnerHTML={createMarkup(convertedContent)}
            ></div>
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
      </div>
    </>
  );
};

export default UpdateBlog;
