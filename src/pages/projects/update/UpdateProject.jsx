import { Button, Input } from "@material-tailwind/react";
import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useParams } from "react-router-dom";
import Select from "react-select/creatable";
import NavBar from "../../../components/Navigation/NavBar";
import Error from "../../../components/ui/Error";
import { groupedOptions } from "./data";
import UseProjectUpdate from "./useProjectUpdate";

const UpdateProject = () => {
  const { projectId } = useParams();

  const {
    handleSubmit,
    handleDrop,
    formStates,
    isLoading,
    error,
    handleChange,
    groupOptions,
    handleChangeSelect,
    setSelectImage,
    photoLoading1,
    photoLoading2,
    selectImage,
    uploadImage,
    LoadingImage,
    handleFileEvent,
    fileLimit,
    uploadedFiles,
    editorState,
    handleEditorChange,
    convertedContent,
    createMarkup,
  } = UseProjectUpdate(projectId);
  console.log(formStates);
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
                value={formStates.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 w-full">
              <Input
                label="SubTitle"
                type="text"
                name="subtitle"
                value={formStates.subtitle}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 w-full">
              <Input
                label="Project URL"
                type="url"
                name="url"
                value={formStates.url}
                onChange={handleChange}
              />
            </div>
            <Select
              options={groupedOptions}
              isMulti
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
              <Button
                onClick={uploadImage}
                size="sm"
                color={formStates?.coverImage?.length > 3 ? "green" : "blue"}
                className=" flex items-center gap-2"
                disabled={
                  photoLoading1 ||
                  formStates?.coverImage ||
                  photoLoading1 ||
                  !selectImage ||
                  formStates?.coverImage?.length > 3
                }
              >
                {" "}
                {photoLoading1 && (
                  <img className="w-5" src={LoadingImage} alt="" />
                )}
                {photoLoading1
                  ? "Uploading"
                  : formStates?.coverImage?.length > 3
                  ? "Uploaded"
                  : "upload"}
              </Button>
            </div>
            <div className="mb-3 w-full flex">
              <Input
                label="galleryImages"
                type="file"
                accept="image/*"
                multiple="multiple"
                variant="standard"
                name="galleryImages"
                onChange={handleFileEvent}
                disabled={
                  fileLimit || photoLoading1 || uploadedFiles.length > 0
                }
              />
              <Button
                size="sm"
                onClick={() => handleDrop(uploadedFiles)}
                color={formStates?.galleryImages?.length > 0 ? "green" : "blue"}
                className=" flex items-center gap-2"
                disabled={
                  photoLoading2 ||
                  !uploadedFiles.length > 0 ||
                  formStates?.galleryImages?.length > 0
                }
              >
                {" "}
                {photoLoading2 && (
                  <img className="w-5" src={LoadingImage} alt="" />
                )}
                {photoLoading2
                  ? "Uploading"
                  : formStates?.galleryImages?.length > 0
                  ? "Uploaded"
                  : "uploads"}
              </Button>
            </div>
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
                "ADD"
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

export default UpdateProject;
