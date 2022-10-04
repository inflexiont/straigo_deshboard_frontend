import { Button, Input } from "@material-tailwind/react";
import Axios from "axios";
import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

import DOMPurify from "dompurify";
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";
import Select from "react-select/creatable";
import LoadingImage from "../../assets/loading.svg";
import NavBar from "../../components/Navigation/NavBar";
import { useAddNewProjectMutation } from "../../features/projects/projectsApi";
import { groupedOptions } from "./data";
import "./RichEditor.css";
const initialState = {
  title: "",
  subtitle: "",
  details: "asdfasdf",
  url: "",
  coverImage: "",
  galleryImages: [],
  category: [],
};
const MAX_COUNT = 5;
const CreateProject = () => {
  const [formStates, setFormStates] = useState({ ...initialState });
  const [photoLoading1, setPhotoLoading1] = useState(false);
  const [photoLoading2, setPhotoLoading2] = useState(false);

  // handle inputs
  const handleChange = (event) => {
    setFormStates({
      ...formStates,
      [event.target.name]: event.target.value,
    });
  };

  //  gallery image upload
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          setFileLimit(false);
          limitExceeded = true;
          return;
        }
      }
    });
    if (!limitExceeded) setUploadedFiles(uploaded);
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  // add new project
  const [addNewProject, { isLoading, error }] = useAddNewProjectMutation();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewProject({ ...formStates }));
  };

  // cover image upload
  const [selectImage, setSelectImage] = useState("");
  const uploadImage = () => {
    setPhotoLoading1(true);
    const formData = new FormData();
    formData.append("file", selectImage);
    formData.append("upload_preset", "SerabuyImage");
    Axios.post(
      "https://api.cloudinary.com/v1_1/serabuy-com/image/upload",
      formData
    ).then((res) => {
      setFormStates({ ...formStates, coverImage: res.data.secure_url });
      setPhotoLoading1(false);
    });
  };

  // gallery image upload
  const handleDrop = (files) => {
    setPhotoLoading2(true);
    // Push all the axios request promise into a single array
    const uploaders = files.map((file) => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "SerabuyImage"); // Replace the preset name with your own
      formData.append("api_key", "243918522254865"); // Replace API key with your own Cloudinary key
      formData.append("timestamp", (Date.now() / 1000) | 0);

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return Axios.post(
        "https://api.cloudinary.com/v1_1/serabuy-com/image/upload",
        formData,
        {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        }
      ).then((response) => {
        const data = response.data;
        const fileURL = data.secure_url; // You should store this URL for future references in your app
        console.log(fileURL);
        formStates.galleryImages.push(fileURL);
      });
    });

    // Once all the files are uploaded
    Axios.all(uploaders).then((response) => {
      console.log(response);
      setPhotoLoading2(false);
    });
  };

  // select filter

  const handleChangeSelect = (newValue) => {
    const reduceValue = newValue?.map((value) => value.value);
    setFormStates({ ...formStates, category: reduceValue });
  };

  // editor
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
    setFormStates({ ...formStates, details: currentContentAsHTML });
  };
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  console.log(photoLoading2);
  return (
    <>
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <NavBar />
        <form
          className="bg-white w-10/12 mx-auto p-5 rounded-md mt-8"
          onSubmit={handleSubmit}
        >
          <p className="text-2xl font-bold mb-3">Create A new Project</p>
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
              className=" flex items-center gap-2"
              disabled={
                photoLoading1 ||
                formStates.coverImage ||
                photoLoading1 ||
                !selectImage
              }
            >
              {" "}
              {photoLoading1 && (
                <img className="w-5" src={LoadingImage} alt="" />
              )}
              {photoLoading1 ? "Uploading" : "upload"}
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
              disabled={fileLimit || photoLoading1 || uploadedFiles.length > 0}
            />
            <Button
              size="sm"
              onClick={() => handleDrop(uploadedFiles)}
              className=" flex items-center gap-2"
              disabled={photoLoading2 || !uploadedFiles.length > 0}
            >
              {" "}
              {photoLoading2 && (
                <img className="w-5" src={LoadingImage} alt="" />
              )}
              {photoLoading2 ? "Uploading" : "uploads"}
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
    </>
  );
};

export default CreateProject;
