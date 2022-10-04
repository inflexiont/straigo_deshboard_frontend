import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../../features/auth/authSlice";

export default function Avatar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth) || {};

  //logedout
  const handleLogOut = () => {
    dispatch(userLoggedOut());
  };

  return (
    <>
      <div className="flex items-center">
        <p className="mr-4 text-white">{user?.name}</p>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="avatar h-10 w-10">
            <div className="w-24 rounded-full ring ring-blue-700 ring-offset-base-100 ring-offset-2">
              <img src="https://placeimg.com/192/192/people" />
            </div>
          </div>
          <ul
            onClick={handleLogOut}
            tabIndex={0}
            className="dropdown-content menu p-2 shadow-black shadow-md bg-slate-800 rounded-box w-44 mt-2"
          >
            <li className="px-4">Log Out</li>
          </ul>
        </div>
      </div>
    </>
  );
}
