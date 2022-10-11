import React, { useState, useEffect, useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";
import { authUser, getAllFarmers } from "../../redux/actions/auth";
import Farmers from "../adminRoutes/Farmers";
import Home from "../adminRoutes/Home";
const Admin = () => {
  const [resize, setResize] = useState(false);
  const dispatch = useDispatch();
  // get all farmers
  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      loadFarmers();
    }
    return () => (subscribed = false);
  }, []);
  const loadFarmers = useCallback(() => {
    dispatch(getAllFarmers());
  });
  const farmers = useSelector((state) => state?.auth?.farmers);
  // console.log("farmers aree", farmers);
  // get current admin
  const current = useSelector((state) => state?.auth?.currentUser);
  // console.log(" current user is", current);
  const adminName = current?.firstname?.concat(" ", current?.lastname);
  // console.log("adminName", adminName);
  useEffect(() => {
    dispatch(authUser());
  }, []);

  return (
    <section className="contain ">
      <div
        //   className="left bg-blue fixed h-screen text-white p-3"
        className={
          resize
            ? "leftt bg-blue fixed h-screen text-white p-3 text-center"
            : "left bg-blue fixed h-screen text-white p-3 "
        }
      >
        <div
          className={
            resize
              ? " flex justify-center items-center"
              : "flex justify-between items-center"
          }
        >
          <div>
            <p className={resize ? "hidden" : "text-2xl p-2 text-orange"}>
              Ithe Mutiki Factory
            </p>
          </div>
          {/* <div className="menu " onClick={() => setResize(!resize)}>
            <div></div>
            <div></div>
            <div></div>
          </div> */}
        </div>
        <ul className="mt-5">
          <Link to="/dashboard/admin">
            <li className="flex items-center space-x-2 rounded px-3 py-2 hover:bg-gray-50 hover:text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <span>Home</span>
            </li>
          </Link>
          <Link to="/dashboard/admin/farmers">
            <li className=" flex items-center space-x-2 rounded px-3 py-2 hover:bg-gray-50 hover:text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
              <span>Farmers</span>
            </li>
          </Link>

          <li className=" flex  items-center space-x-2  cursor-pointer rounded px-3 py-2 hover:bg-gray-50 hover:text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>profile</span>
          </li>
        </ul>
      </div>
      <div
        className={
          resize
            ? "rightt bg-gray-50 absolute right-0 min-h-screen "
            : "right bg-gray-50 absolute right-0 min-h-screen "
        }
      >
        <main className="w-mobile mx-auto py-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/farmers"
              element={<Farmers farmers={farmers} admin={adminName} />}
            />
          </Routes>
        </main>
      </div>
    </section>
  );
};

export default Admin;
const loop = [1, 2, 3, 4];
