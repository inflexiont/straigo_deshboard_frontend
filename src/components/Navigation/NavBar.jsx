import { Input } from "@material-tailwind/react";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import NavLogo from "../../utils/NavLogo";
import UseNavBar from "./UseNavBar";
const NavBar = () => {
  const { handleSearch, name, avatar, logout, debounce } = UseNavBar() || {};
  return (
    <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
      <NavLogo />
      <div className="flex items-center h-10 ml-5 w-4/12">
        <Input
          label="Search for products...."
          onChange={debounce(handleSearch, 400)}
          type="search"
          placeholder="Search for anything…"
        />
      </div>
      <div className="ml-10">
        <Link className="mx-2 text-sm font-bold text-indigo-600" to="/projects">
          Projects
        </Link>
        <Link
          className="mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700"
          to="/blogs"
        >
          Blogs
        </Link>
      </div>
      <div className="flex items-center ml-auto overflow-">
        <span className="font-bold cursor-pointer hover:text-purple-700 mr-1">
          {name}
        </span>
        <img
          src={avatar}
          alt=""
          className="rounded-full w-8 h-8 mr-6 cursor-pointer"
        />
        <span
          className="font-bold cursor-pointer hover:text-purple-700 flex items-center"
          onClick={logout}
        >
          Logout <FiLogOut className="ml-1 font-bold" />
        </span>
      </div>
    </div>
  );
};

export default NavBar;
