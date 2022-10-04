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
  useGetBlogQuery,
  useUpdateBlogMutation,
} from "../../../features/blogs/blogApi";
import { selectBlog } from "../../../features/blogs/blogsSelector";
import { setBlogToAction } from "../../../features/blogs/blogsSlice";
import { groupedOptions } from "./data";
const UseBlogUpdate = () => {
  const { blogId } = useParams();
  const blog = useSelector(selectBlog);
  const { data } = useGetBlogQuery(blogId);

  console.log("data", blog);
  useEffect(() => {
    dispatch(setBlogToAction(data));
  }, [data]);

  const [inputTitle, setInputTitle] = useState("");
  const [inputDetails, setInputDetails] = useState("");
  const [inputCoverImage, setInputCoverImage] = useState("");
  const [inputThumbImages, setInputThumbImages] = useState("");
  const [inputCategory, setInputCategory] = useState([]);
  const [photoLoading1, setPhotoLoading1] = useState(false);
  const [photoLoading2, setPhotoLoading2] = useState(false);

  // handle inputs
  const setInput = (blog) => {
    setInputTitle(blog?.title);
    setInputDetails(blog?.details);
    setInputCoverImage(blog?.cover);
    setInputThumbImages(blog?.thumb);
    setInputCategory(blog?.category);
    setConvertedContent(blog?.details);
    setEditorState(blog?.details);
  };
  useEffect(() => {
    setInput(blog);
  }, [blog]);
  console.log("blgo", blog);

  // add new project
  const [updateBlog, { isLoading, error }] = useUpdateBlogMutation();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateBlog({
        id: blogId,
        data: {
          title: inputTitle,
          details: inputDetails,
          cover: inputCoverImage,
          thumb: inputThumbImages,
          category: inputCategory,
        },
      })
    );
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
      setInputCoverImage(res.data.secure_url);
      setPhotoLoading1(false);
    });
  };

  // cover image upload
  const [selectThumbImage, setSelectThumbImage] = useState("");
  const uploadThumbImage = () => {
    setPhotoLoading2(true);
    const formData = new FormData();
    formData.append("file", selectImage);
    formData.append("upload_preset", "SerabuyImage");
    Axios.post(
      "https://api.cloudinary.com/v1_1/serabuy-com/image/upload",
      formData
    ).then((res) => {
      setInputCoverImage(res.data.secure_url);
      setPhotoLoading2(false);
    });
  };
  // select filter

  const handleChangeSelect = (newValue) => {
    const reduceValue = newValue?.map((value) => value.value);
    setInputCategory([...inputCategory, ...reduceValue]);
  };
  console.log("sdfsdf", inputCategory);

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
    inputCoverImage,
    inputThumbImages,
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

export default UseBlogUpdate;
