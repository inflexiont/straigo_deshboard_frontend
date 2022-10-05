import { Button, Input } from "@material-tailwind/react";
import "draft-js/dist/Draft.css";
import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Select from "react-select/creatable";
import NavBar from "../../../components/Navigation/NavBar";
import Error from "../../../components/ui/Error";
import UseBlogCreate from "./useBlogCreate";

const CreateBlog = () => {
  const {
    handleSubmit,
    inputTitle,
    isLoading,
    groupedOptions,
    selectImage,
    handleChangeSelect,
    setSelectImage,
    photoLoading1,
    photoLoading2,
    uploadImage,
    LoadingImage,
    editorState,
    handleEditorChange,
    convertedContent,
    error,
    setInputTitle,
    createMarkup,
    selectThumbImage,
    setSelectThumbImage,
    uploadThumbImage,
  } = UseBlogCreate();
  console.log("image", selectImage);
  console.log("thumb", selectThumbImage);
  return (
    <>
      <NavBar />
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 ">
        <div className="px-10 mt-6 flex justify-between">
          <form
            className="bg-white w-10/12 mx-auto p-5 rounded-md mt-8"
            onSubmit={handleSubmit}
          >
            <p className="text-2xl font-bold mb-3">Create New Blog</p>
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
                src={selectImage}
                className="w-10 h-10 border border-blue-400 rounded"
                alt=""
              />
              <Button
                onClick={uploadImage}
                size="sm"
                color={selectImage?.length > 3 ? "green" : "blue"}
                className=" flex items-center gap-2"
                disabled={
                  photoLoading1 || selectImage?.length > 3 || !selectImage
                }
              >
                {" "}
                {photoLoading1 && (
                  <img className="w-5" src={LoadingImage} alt="" />
                )}
                {photoLoading1
                  ? "Uploading"
                  : selectImage?.length > 3
                  ? "Uploaded"
                  : "upload"}
              </Button>
            </div>
            <div className="my-6 w-full flex">
              <Input
                label="Thumb Image"
                type="file"
                variant="standard"
                accept="image/*"
                name="Thumb Image"
                onChange={(e) => setSelectThumbImage(e.target.files[0])}
                disabled={photoLoading2 || selectThumbImage !== ""}
              />
              <img
                src={selectThumbImage}
                className="w-10 h-10 border border-blue-400 rounded"
                alt=""
              />
              <Button
                onClick={uploadThumbImage}
                size="sm"
                color={selectThumbImage?.length > 3 ? "green" : "blue"}
                className=" flex items-center gap-2"
                disabled={
                  photoLoading2 ||
                  selectThumbImage?.length > 3 ||
                  !selectThumbImage
                }
              >
                {" "}
                {photoLoading2 && (
                  <img className="w-5" src={LoadingImage} alt="" />
                )}
                {photoLoading2
                  ? "Uploading"
                  : selectThumbImage?.length > 3
                  ? "Uploaded"
                  : "upload"}
              </Button>
            </div>

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
                "Create"
              )}
            </Button>
            {error && <Error message={error?.message} />}
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
