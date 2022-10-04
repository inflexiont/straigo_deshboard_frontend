import DOMPurify from "dompurify";
import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import DeleteBlog from "./delete/DeleteBlog";
const BlogCard = ({ blog }) => {
  const { _id, date, details, category, title, cover, thumb } = blog;
  // delete modal
  console.log(cover);
  const [DeleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(!DeleteOpen);
  return (
    <>
      <DeleteBlog
        id={_id}
        DeleteOpen={DeleteOpen}
        handleDeleteOpen={handleDeleteOpen}
      />
      <div className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 ">
        <div className="flex ml-auto ">
          <Link to={`/blog/${_id}`}>
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
        <SingleText keySting="Title" value={title} />
        <SingleText keySting="Details" value={details} tag="details" />
        <SingleText keySting="Date" value={date} />
        <SingleText keySting="CoverImage" value={cover} tag="img" />
        <SingleText keySting="TambnaleImage" value={thumb} tag="img" />
        {category?.map((filter, i) => (
          <SingleText
            key={i}
            keySting="  filters/category [' ']"
            value={filter}
          />
        ))}
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
export default BlogCard;
