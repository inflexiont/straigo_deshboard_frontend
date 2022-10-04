import DOMPurify from "dompurify";
import React from "react";
const ProjectCard = ({ project }) => {
  const {
    date,
    details,
    filters,
    galleryImages,
    subtitle,
    title,
    url,
    coverImage,
  } = project;
  return (
    <>
      <div className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 ">
        <SingleText keySting="Title" value={title} />
        <SingleText keySting="Subtitle" value={subtitle} />
        <SingleText keySting="Details" value={details} tag="details" />
        <SingleText keySting="Date" value={date} />
        <SingleText keySting="CoverImage" value={coverImage} tag="img" />
        <SingleText keySting="Url" value={url} />
        {galleryImages.map((image) => (
          <SingleText keySting="GalleryImage [' ']" value={image} tag="img" />
        ))}
        {filters.map((filter) => (
          <SingleText keySting="  filters/category [' ']" value={filter} />
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
export default ProjectCard;
