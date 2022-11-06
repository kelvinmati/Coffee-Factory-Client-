import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import {
  authToken,
  authUser,
  getAllFarmers,
  logout,
} from "../../redux/actions/auth";
import Farmers from "./admin_routes/Farmers";
import Home from "./admin_routes/Home";
import Staff from "./admin_routes/Staff";
import Payment from "./admin_routes/Payment";
import { Modal } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // current logged in admin
  const admin = useSelector((state) => state?.auth?.current_user);
  const fullname = `${admin?.firstname} ${admin?.lastname}`;

  useEffect(() => {
    dispatch(authUser());
  }, []);

  // load farmers
  useEffect(() => {
    dispatch(getAllFarmers());
  }, []);
  const farmers = useSelector((state) => state?.auth?.farmers);
  // handle logout
  const auth = useSelector((state) => state?.auth?.isAuthenticated);
  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!auth) {
      return navigate("/login");
    }
  }, [auth]);
  // logout if not admin

  // handle deposit
  const [depositModal, setDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [payBtnLoading, setPayBtnLoading] = useState(false);
  // close Modal
  const handleModalClose = () => {
    setDepositModal(false);
    setDepositAmount("");
  };
  // get value from the field
  const handleChange = (e) => {
    setDepositAmount(e.target.value);
    console.log(e.target.value);
  };
  const handleDeposit = async (e) => {
    setPayBtnLoading(true);
    e.preventDefault();
    // body
    // const body = JSON.par({
    //   deposit_amount: depositAmount,
    // });
    const body = {
      deposit_amount: depositAmount,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/account/deposit",
        body,
        authToken()
      );
      const data = await response.data;

      setPayBtnLoading(false);
      setDepositModal(false);
      setDepositAmount("");
      toast.success(data.message);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setPayBtnLoading(false);

      setDepositAmount("");
    }
  };
  return (
    <section className="">
      <div
        //   className="left bg-blue fixed h-screen text-white p-3"
        className="w-[20%] bg-blue fixed h-screen text-white p-3 "
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl p-2 text-orange">Ithe Mutiki Factory</p>
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
          <Link to="/dashboard/admin/staff">
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
              <span>Staff</span>
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
          <Link to="/dashboard/admin/payment">
            <li className=" flex items-center space-x-2 rounded px-3 py-2 hover:bg-gray-50 hover:text-black">
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
                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Payments</span>
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
      <div className="w-[80%] bg-gray-50 absolute right-0 min-h-screen pb-16">
        <main className="w-mobile mx-auto py-5">
          <div className="flex justify-between items-center  border-b py-3">
            <h2 className="text-xl font-bold">Admin Dashboard.</h2>
            <div className="flex space-x-3">
              <button
                onClick={handleLogout}
                className="p-2 flex justify-center bg-blue text-white rounded"
              >
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
                <span>Logout</span>
              </button>
              <button
                onClick={() => setDepositModal(true)}
                className="p-2 flex justify-center bg-gray-200 rounded"
              >
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
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <span>Deposit Cash</span>
              </button>
            </div>
          </div>
          <div className="text-lg py-3 italic">
            <h2>Logged in as {fullname}</h2>
          </div>
          <Routes>
            <Route path="/" element={<Home farmers={farmers} />} />
            <Route path="/staff" element={<Staff />} />
            <Route
              path="/farmers"
              element={<Farmers farmers={farmers} currentUser={fullname} />}
            />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </main>
      </div>
      {/*deposit modal */}
      <div
        className={
          depositModal
            ? "fixed h-full bg-[rgba(0,0,0,0.25)] flex flex-col   items-center  left-0 right-0 top-0 bottom-0 pt-24"
            : "hidden"
        }
      >
        <div className="bg-white space-y-4 p-4 w-mobile md:w-[450px]  rounded shadow">
          <h2 className="text-xl font-bold">Enter the amount to deposit.</h2>
          <form onSubmit={handleDeposit} className="space-y-6">
            <input
              type="number"
              onChange={handleChange}
              value={depositAmount}
              className="border w-full p-2 rounded border-blue outline-blue"
              placeholder="100,200,300 etc.."
            />
            <div className="flex justify-end space-x-5">
              <button
                type="submit"
                disabled={depositAmount == 0 ? true : false}
                className={
                  depositAmount == 0
                    ? "bg-blue opacity-50 text-white p-2 rounded-lg"
                    : "bg-blue  text-white p-2 rounded-lg"
                }
                // className="bg-blue  text-white p-2 rounded-lg"
              >
                {payBtnLoading ? (
                  <div className="flex justify-center items-center space-x-2">
                    <div className="border-2 border-r-3  border-r-gray-600 animate-spin rounded-full w-5 h-5"></div>
                    <span>Processing..</span>
                  </div>
                ) : (
                  <div>Continue</div>
                )}
              </button>
              <div
                onClick={handleModalClose}
                className="bg-red text-white p-2 rounded-lg cursor-pointer"
              >
                Close
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Admin;
