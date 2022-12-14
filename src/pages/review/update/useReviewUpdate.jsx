import Axios from "axios";
import "draft-js/dist/Draft.css";
import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingImage from "../../../assets/loading.svg";
import {
  useGetReviewQuery,
  useUpdateReviewMutation,
} from "../../../features/review/reviewApi";
import { selectReview } from "../../../features/review/reviewsSelector";
import { setReviewToAction } from "../../../features/review/reviewsSlice";
const UseReviewUpdate = () => {
  const { reviewId } = useParams();
  const review = useSelector(selectReview);
  const { data } = useGetReviewQuery(reviewId);

  console.log("data", review);
  useEffect(() => {
    dispatch(setReviewToAction(data));
  }, [data]);

  const [inputName, setInputName] = useState("");
  const [inputCompany, setInputCompany] = useState("");
  const [inputCoverImage, setInputCoverImage] = useState("");
  const [inputPosition, setInputPosition] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [inputStar, setInputStar] = useState("");
  const [photoLoading1, setPhotoLoading1] = useState(false);
  console.log(inputName);
  // handle inputs
  const setInput = (review) => {
    setInputName(review?.name);
    setInputCompany(review?.company);
    setInputCoverImage(review?.image);
    setInputPosition(review?.position);
    setInputMessage(review?.message);
    setInputStar(review?.star);
  };
  useEffect(() => {
    setInput(review);
  }, [review]);
  console.log("review", review);

  // add new project
  const [UpdateReview, { isLoading, error }] = useUpdateReviewMutation();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      UpdateReview({
        id: reviewId,
        data: {
          name: inputName,
          company: inputCompany,
          image: inputCoverImage,
          position: inputPosition,
          message: inputMessage,
          star: inputStar,
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

export default UseReviewUpdate;
