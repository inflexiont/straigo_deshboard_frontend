import { Button, Input } from "@material-tailwind/react";
import Axios from "axios";
import DOMPurify from "dompurify";
import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Select from "react-select/creatable";
import LoadingImage from "../../../assets/loading.svg";
import NavBar from "../../../components/Navigation/NavBar";
import Error from "../../../components/ui/Error";
import {
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "../../../features/projects/projectsApi";
import { selectProject } from "../../../features/projects/projectSelector";
import { setProjectToAction } from "../../../features/projects/projectsSlice";
import { groupedOptions } from "./data";

const UpdateProject = () => {
  const { projectId } = useParams();
  const project = useSelector(selectProject);
  const { data } = useGetProjectQuery(projectId);
  console.log("data", project);
  useEffect(() => {
    dispatch(setProjectToAction(data));
  }, [data]);

  const MAX_COUNT = 5;
  const [inputTitle, setInputTitle] = useState("");
  const [inputSubtitle, setInputSubtitle] = useState("");
  const [inputDetails, setInputDetails] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [inputCoverImage, setInputCoverImage] = useState("");
  const [inputGalleryImages, setInputGalleryImages] = useState([]);
  const [inputCategory, setInputCategory] = useState([]);
  const [photoLoading1, setPhotoLoading1] = useState(false);
  const [photoLoading2, setPhotoLoading2] = useState(false);

  // handle inputs
  const setInput = (project) => {
    setInputTitle(project?.title);
    setInputSubtitle(project?.subtitle);
    setInputDetails(project?.details);
    setInputUrl(project?.url);
    setInputCoverImage(project?.coverImage);
    setInputGalleryImages(project?.galleryImages);
    setInputCategory(project?.filters);
  };
  useEffect(() => {
    setInput(project);
  }, [project]);

  //  gallery image upload
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded?.length === MAX_COUNT) setFileLimit(true);
        if (uploaded?.length > MAX_COUNT) {
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
  const [updateProject, { isLoading, error }] = useUpdateProjectMutation();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProject({
        id: projectId,
        data: {
          inputSubtitle,
          inputDetails,
          inputUrl,
          inputCoverImage,
          inputGalleryImages,
          inputCategory,
          photoLoading1,
          photoLoading2,
        },
      })
    );
  };
  console.log(inputCategory);
  console.log(inputUrl);

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
      setInputCoverImage(res.data.secure_url);
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
        setInputGalleryImages([...inputGalleryImages, fileURL]);
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
    console.log(inputCategory);
    setInputCategory(reduceValue);
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
    setInputDetails(currentContentAsHTML);
  };
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
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
                label="SubTitle"
                type="text"
                name="subtitle"
                value={inputSubtitle}
                onChange={(e) => setInputSubtitle(e.target.value)}
              />
            </div>
            <div className="mb-3 w-full">
              <Input
                label="Project URL"
                type="url"
                name="url"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
              />
            </div>
            <Select
              options={groupedOptions}
              isMulti
              defaultValue={["thsi", "lsdkfj"]}
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
              <Button
                onClick={uploadImage}
                size="sm"
                color={inputCoverImage?.length > 3 ? "green" : "blue"}
                className=" flex items-center gap-2"
                disabled={
                  photoLoading1 ||
                  inputCoverImage ||
                  photoLoading1 ||
                  !selectImage ||
                  inputCoverImage?.length > 3
                }
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
                  fileLimit || photoLoading1 || uploadedFiles?.length > 0
                }
              />
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
