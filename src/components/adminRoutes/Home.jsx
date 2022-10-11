import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUser, getAllFarmers } from "../../redux/actions/auth";
const Home = () => {
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
  const farmers = useSelector((state) => state?.auth?.farmers?.farmers);
  // console.log("farmers are", farmers);
  // get current user
  const current = useSelector((state) => state?.auth?.currentUser);
  // console.log(" current user is", current);
  const adminName = current?.firstname?.concat(" ", current?.lastname);

  useEffect(() => {
    dispatch(authUser());
  }, []);
  return (
    <div>
      <div
        className=" flex justify-between  items-center h-16 border-b-[1px]
             "
      >
        <div>
          <p className="text-lg">Logged in as {adminName}</p>
        </div>
        <div className="text-orange flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>

          <p>Logout</p>
        </div>
      </div>
      <div className=" py-10 grid grid-cols-3 gap-5">
        <div className="text-center  space-y-2 bg-white p-3 shadow-sm rounded-lg">
          <p>Total farmers</p>
          <p className="bg-yellow-300   text-white h-11 w-11 mx-auto rounded-full justify-center items-center flex ">
            {farmers?.length}
          </p>
        </div>
        <div className="text-center  space-y-2 bg-white p-3 shadow-sm rounded-lg">
          <p>Total Kgs</p>
          <p className="bg-green-700   text-white h-11 w-11 mx-auto rounded-full justify-center items-center flex ">
            450
          </p>
        </div>
        <div className="text-center  space-y-2 bg-white p-3 shadow-sm rounded-lg">
          <p>Total Kgs</p>
          <p className="bg-red-400 text-xl  text-white h-11 w-11 mx-auto rounded-full justify-center items-center flex ">
            450
          </p>
        </div>
      </div>
      <div className="bg-white shadow-sm p-3 rounded-lg">
        <h1 className="text-xl text-blue py-3">Farmers</h1>

        <table className=" w-full ">
          <thead>
            <tr>
              <th className="text-start py-2">Name</th>
              <th className="text-start py-2">Email</th>
              <th className="text-start py-2">Phone Number</th>
              <th className="text-start py-2">Date registered</th>
            </tr>
          </thead>
          <tbody className="text-start">
            {farmers?.map((farmer, index) => {
              const even = index % 2 === 0;
              // console.log("even is", even);
              const {
                _id,
                firstname,
                lastname,
                phone_number,
                email,
                createdAt,
              } = farmer;

              return (
                <tr key={_id} className={even ? "bg-gray-50 " : "bg-white"}>
                  <td className="py-3 ">{`${firstname + " " + lastname}`}</td>
                  <td className="py-3 ">{email}</td>
                  <td className="py-3">{phone_number}</td>
                  <td className="py-3">{createdAt}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
