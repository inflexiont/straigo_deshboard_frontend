import Axios from "axios";
import "draft-js/dist/Draft.css";
import { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";
import LoadingImage from "../../../assets/loading.svg";
import { useAddNewReviewMutation } from "../../../features/review/reviewApi";
const UseReviewCreate = () => {
  const [inputName, setInputName] = useState("");
  const [inputCompany, setInputCompany] = useState("");
  const [inputCoverImage, setInputCoverImage] = useState("");
  const [inputPosition, setInputPosition] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [inputStar, setInputStar] = useState("");
  const [photoLoading1, setPhotoLoading1] = useState(false);
  // add new project
  const [addNewReview, { isLoading, error }] = useAddNewReviewMutation();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addNewReview({
        name: inputName,
        company: inputCompany,
        image: inputCoverImage,
        position: inputPosition,
        message: inputMessage,
        star: inputStar,
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

  return {
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
    photoLoading1,
    setInputCompany,
    setInputPosition,
    setInputMessage,
    setInputStar,
  };
};

export default UseReviewCreate;
