import React from "react";
import { Link } from "react-router-dom";
import BlogCard from "../../components/blogs/BlogCard";
import NavBar from "../../components/Navigation/NavBar";
import Error from "../../components/ui/Error";
import { useFetchBlogsQuery } from "../../features/blogs/blogApi";
import Loader from "../../utils/Loader";
import NavLogo from "../../utils/NavLogo";

const Blogs = () => {
  const { data: fetchBlogs, isLoading, isError, error } = useFetchBlogsQuery();

  // decide what to render
  let content = null;
  if (isLoading) {
    content = (
      <p className="m-2 text-center">
        <Loader />
      </p>
    );
  } else if (!isLoading && isError) {
    content = (
      <div className="m-2 text-center">
        <Error message={error?.data} />
      </div>
    );
  } else if (!isLoading && !isError && fetchBlogs?.length === 0) {
    content = <p className="m-2 text-center">No Project found!</p>;
  } else if (!isLoading && !isError && fetchBlogs?.length > 0) {
    content = fetchBlogs?.map((blog) => (
      <BlogCard key={blog._id} blog={blog} />
    ));
  }
  console.log(fetchBlogs);
  return (
    <>
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <NavBar />
        <div className="px-10 mt-6 flex justify-between">
          <h1 className="text-2xl font-bold">Blogs</h1>
          <Link to="/blogs/create">
            <button className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-10 mt-4 gap-6 overflow-auto">
          {content}
        </div>
      </div>

      <a
        className="fixed bottom-0 right-0 flex items-center justify-center h-8 pl-1 pr-2 mb-6 mr-4 text-blue-100 bg-indigo-600 rounded-full shadow-lg hover:bg-blue-600"
        href="https://straigo.com"
        target="_top"
      >
        <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full">
          <NavLogo />
        </div>
        <span className="ml-1 text-sm leading-none">Straigo</span>
      </a>
    </>
  );
};

export default Blogs;
