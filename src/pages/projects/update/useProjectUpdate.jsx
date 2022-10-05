import Axios from "axios";
import DOMPurify from "dompurify";
import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingImage from "../../../assets/loading.svg";
import {
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "../../../features/projects/projectsApi";
import { selectProject } from "../../../features/projects/projectSelector";
import { setProjectToAction } from "../../../features/projects/projectsSlice";
import { groupedOptions } from "./data";
const UseProjectUpdate = () => {
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
    setConvertedContent(project?.details);
    setEditorState(project?.details);
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
          title: inputTitle,
          subtitle: inputSubtitle,
          details: inputDetails,
          url: inputUrl,
          coverImage: inputCoverImage,
          galleryImages: inputGalleryImages,
          filters: inputCategory,
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
    console.log(reduceValue);
    setInputCategory([...reduceValue]);
  };
  console.log(selectImage);
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
  return {
    handleSubmit,
    handleDrop,
    inputTitle,
    inputSubtitle,
    inputUrl,
    isLoading,
    groupedOptions,
    selectImage,
    handleChangeSelect,
    setSelectImage,
    photoLoading1,
    photoLoading2,
    uploadImage,
    LoadingImage,
    inputCoverImage,
    inputGalleryImages,
    handleFileEvent,
    fileLimit,
    uploadedFiles,
    editorState,
    handleEditorChange,
    convertedContent,
    error,
    setInputTitle,
    setInputSubtitle,

    setInputUrl,
    MAX_COUNT,
    createMarkup,
  };
};

export default UseProjectUpdate;
