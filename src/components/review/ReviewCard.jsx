import DOMPurify from "dompurify";
import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import DeleteReview from "./delete/DeleteReview";
const ReviewCard = ({ review }) => {
  const { _id, name, company, position, message, image, star } = review;
  // delete modal

  const [DeleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(!DeleteOpen);
  return (
    <>
      <DeleteReview
        id={_id}
        DeleteOpen={DeleteOpen}
        handleDeleteOpen={handleDeleteOpen}
      />
      <div className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 ">
        <div className="flex ml-auto ">
          <Link to={`/review/${_id}`}>
            <FaEdit
              size="29"
              className="hover:scale-125 duration-200 hover:text-blue-600 mr-10 text-blue-400"
            />
          </Link>
          <AiFillDelete
            onClick={handleDeleteOpen}
            size="29"
            className="hover:scale-125 duration-200 hover:text-red-500 text-red-300"
          />
        </div>
        <SingleText keySting="Name" value={name} />
        <SingleText keySting="Company" value={company} tag="details" />
        <SingleText keySting="Position" value={position} />
        <SingleText keySting="Image" value={image} tag="img" />
        <SingleText keySting="Message" value={message} />
        <SingleText keySting="Star" value={star} />
      </div>
    </>
  );
};

const SingleText = ({ keySting, value, tag }) => {
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  return (
    <div className="mt-3 text-sm font-medium bg-green-100 rounded p-4 grid grid-cols-2 justify-between items-center w-full">
      <p className="font-black bg-green-300 text white rounded px-2 py-1  mr-3">
        {keySting}
      </p>
      {tag === "details" ? (
        <p
          className="ml-auto"
          dangerouslySetInnerHTML={createMarkup(value)}
        ></p>
      ) : (
        <p className="ml-auto">
          {tag ? <img className="h-20" src={value} /> : value}
        </p>
      )}
    </div>
  );
};
export default ReviewCard;
