import React from "react";

const UserList = () => {
  return (
    <div className="rounded-md shadow-sm bg-gray-100 px-20 py-5 -mt-60">
      <ul>
        <li className=" p-1 mt-1 font-bold text-xl">Email:</li>
        <li className=" p-1 ml-6 font-bold mt-1">nayem@gmail.com</li>
        <li className=" p-1 ml-6 font-bold">ibrahim@gmail.com</li>
        <li className=" p-1 ml-6 font-bold mt-1">sifat@gmail.com</li>
        <li className=" p-1 ml-6 font-bold mt-1">sumit@gmail.com</li>
        <li className=" p-1 ml-6 font-bold mt-1">akash@gmail.com</li>
        <li className=" p-1 ml-6 font-bold mt-1">saad@gmail.com</li>
        <li className=" p-1 ml-6 font-bold mt-1">----------------------</li>
        <li className=" p-1 mt-1 font-bold text-xl">Password: pass123</li>
        <li className=" p-1 ml-6 font-bold mt-1 "></li>
      </ul>
    </div>
  );
};

export default UserList;
