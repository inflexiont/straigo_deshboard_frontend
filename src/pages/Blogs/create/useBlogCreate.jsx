import Axios from "axios";
import DOMPurify from "dompurify";
import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingImage from "../../../assets/loading.svg";
import { useAddNewBlogMutation } from "../../../features/blogs/blogApi";
import { groupedOptions } from "./data";
const UseBlogCreate = () => {
  const [inputTitle, setInputTitle] = useState("");
  const [inputDetails, setInputDetails] = useState("");
  const [inputCategory, setInputCategory] = useState([]);
  const [photoLoading1, setPhotoLoading1] = useState(false);
  const [photoLoading2, setPhotoLoading2] = useState(false);

  // add new project
  const [addNewBlog, { isLoading, error, isSuccess }] = useAddNewBlogMutation();
  const notify = () => toast("Wow so easy!");
  const dispatch = useDispatch();
  const clearBlog = () => {
    setInputTitle("");
    setInputDetails("");
    setInputCategory([]);
    setSelectImage("");
    setSelectThumbImage("");
    setPhotoLoading1(false);
    setPhotoLoading2(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addNewBlog({
        title: inputTitle,
        details: inputDetails,
        category: inputCategory,
        cover: selectImage,
        thumb: selectThumbImage,
      })
    );
    clearBlog();
    isSuccess && notify("added");
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
      setSelectImage(res.data.secure_url);
      setPhotoLoading1(false);
    });
  };

  // cover image upload
  const [selectThumbImage, setSelectThumbImage] = useState("");
  const uploadThumbImage = () => {
    setPhotoLoading2(true);
    const formData = new FormData();
    formData.append("file", selectThumbImage);
    formData.append("upload_preset", "SerabuyImage");
    Axios.post(
      "https://api.cloudinary.com/v1_1/serabuy-com/image/upload",
      formData
    ).then((res) => {
      setSelectThumbImage(res.data.secure_url);
      setPhotoLoading2(false);
    });
  };
  // select filter

  const handleChangeSelect = (newValue) => {
    const reduceValue = newValue?.map((value) => value.value);
    setInputCategory([...reduceValue]);
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
  return {
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
    inputCategory,
    createMarkup,
    selectThumbImage,
    setSelectThumbImage,
    uploadThumbImage,
  };
};

export default UseBlogCreate;
