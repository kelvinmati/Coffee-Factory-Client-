import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import RegisterForm from "./RegisterForm";
import Upload_form from "../Dashboard/Upload_form";

import axios from "axios";
import toast from "react-hot-toast";
import {
  getAccDetails,
  getPayableFarmers,
  MakeSinglePayment,
} from "../../redux/actions/payment";
import { authToken, getAllFarmers } from "../../redux/actions/auth";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const Home = () => {
  const dispatch = useDispatch();

  // get current user
  const current = useSelector((state) => state?.auth?.current_user);
  const fullname = current?.firstname?.concat(" ", current?.lastname);
  // get farmers
  useEffect(() => {
    dispatch(getAllFarmers());
  }, []);
  const farmers = useSelector((state) => state?.auth?.farmers);

  // show register form
  const [registerModal, setRegisterModal] = useState(false);
  // set upload form states
  const [isUploadFormOpen, setisUploadFormOpen] = useState(false);
  const [farmerObj, setFarmerObj] = useState({});
  const openUploadModal = (farmer_info) => {
    setisUploadFormOpen(true);
    setFarmerObj(farmer_info);
  };

  // load all payable farmers
  const payableFarmers = useSelector(
    (state) => state?.payment?.payable_farmers
  );
  useEffect(() => {
    dispatch(getPayableFarmers());
  }, []);
  console.log("payableFarmers", payableFarmers);
  // payable state
  const [payableBtn, setPayableBtn] = useState(false);
  useEffect(() => {
    if (payableFarmers.length > 0) return setPayableBtn(true);
  }, [payableFarmers]);
  console.log("payableBtn is", payableBtn);
  // handle payment for all
  // notify manager to pay all
  // const [buttonLoading, setbuttonLoading] = useState(false);
  const [approvedBtn, setApprovedBtn] = useState(false);
  const [waitingApproval, setwWaitingApproval] = useState(false);
  const requestApproval = async () => {
    setwWaitingApproval(true);
    try {
      const response = await axios.get(
        "http://localhost:4000/payment/notify-manager"
      );
      const data = await response.data;
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  // refresh
  const [spinSvg, setSpinSvg] = useState(false);
  const refresh = () => {
    dispatch(getAccDetails());
    setSpinSvg(true);
    setTimeout(() => {
      setSpinSvg(false);
    }, 2000);
  };
  // // get approval details
  const approval_msg = useSelector(
    (state) => state?.payment?.account_details?.paymentApproval
  );
  // disable loading if payment is aproved
  useEffect(() => {
    if (approval_msg === "approved") {
      setApprovedBtn(true);
      setSingleApprovalBtn(true);
    } else {
      setApprovedBtn(false);
      setSingleApprovalBtn(false);
    }
  }, [approval_msg]);
  console.log("approvedBtn is", approvedBtn);

  // get approval details
  // const approval_amount = useSelector(
  //   (state) => state?.payment?.account_details?.approvalAmount
  // );
  // // disable loading if payment is aproved
  // useEffect(() => {
  //   if (approval_amount > 0) {
  //     setApprovedBtn(true);
  //   } else {
  //     setApprovedBtn(false);
  //   }
  // }, [approval_amount]);
  // console.log("approval_amount is", approval_amount);
  // pay after approval
  const payAll = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/payment/pay-all",
        authToken()
      );
      const data = await response.data;
      if (data) {
        toast.success(data.message);
        setApprovedBtn(false);
        setwWaitingApproval(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  // handle single payment
  // notify manager to pay single farmer
  const [singleApprovalWaiting, setSingleApprovalWaiting] = useState(false);
  const [singleApprovalBtn, setSingleApprovalBtn] = useState(false);
  const requestSinglePaymentApproval = async (farmerId) => {
    setSingleApprovalWaiting(true);
    try {
      const response = await axios.get(
        `http://localhost:4000/payment/notify-single-payment/${farmerId}`,
        authToken()
      );
      const data = await response.data;
      toast.success(data.message);
      dispatch(getPayableFarmers());
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="space-y-8">
      <div>
        <Accordion>
          <AccordionSummary
            sx={{ borderBottom: "1px solid gray" }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div>
              <p className="text-xl font-bold">Eligible farmers for payment.</p>
            </div>
          </AccordionSummary>
          {payableFarmers?.length == 0 ? (
            <div className="p-4">No farmers at the moment.</div>
          ) : (
            <AccordionDetails>
              <div>
                <div className="text-blue text-lg flex justify-between items-center my-5">
                  <p>Payable farmers list ({payableFarmers?.length})</p>
                  <div
                    className={
                      payableFarmers?.length == 0 ? "hidden" : "flex space-x-2"
                    }
                  >
                    {approvedBtn ? (
                      <button
                        onClick={payAll}
                        className=" bg-green-400 text-white p-2 rounded"
                      >
                        Approved Pay Now
                      </button>
                    ) : (
                      <button
                        onClick={waitingApproval ? refresh : requestApproval}
                        className={
                          waitingApproval
                            ? "bg-yellow-400 p-2 rounded text-white text-lg relative"
                            : "bg-gray-100 hover:bg-gray-100 text-black p-2 rounded"
                        }
                      >
                        {waitingApproval ? (
                          <div className="flex justify-center items-center space-x-2">
                            <span className="absolute -top-6 left-0 text-black">
                              keep refreshing..
                            </span>
                            <span>Pending Approval</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className={
                                spinSvg ? "w-6 h-6 animate-spin" : "w-6 h-6"
                              }
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                              />
                            </svg>
                          </div>
                        ) : (
                          <div>Pay All Farmers</div>
                        )}
                      </button>
                    )}
                  </div>
                </div>
                <table className=" w-full ">
                  <thead>
                    <tr>
                      <th className="text-start py-2">ID</th>
                      <th className="text-start py-2">Name</th>
                      <th className="text-start py-2">Email</th>
                      <th className="text-start py-2">Phone No</th>
                      <th className="text-start py-2">Gender</th>
                      <th className="text-start py-2">Kg(s)</th>
                      <th className="text-start py-2">Amount (Ksh)</th>
                      <th className="text-start py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-start">
                    {payableFarmers?.map((payableFarmer, index) => {
                      const even = index % 2 === 0;

                      const {
                        _id,
                        value,
                        firstname,
                        lastname,
                        farmerId,
                        email,
                        phone_number,
                        totalKilos,
                        gender,
                        paymentRequest,
                      } = payableFarmer;
                      const fullname = `${firstname} ${lastname}`;
                      return (
                        <tr
                          key={_id}
                          className={even ? "bg-gray-50 " : "bg-white"}
                        >
                          <td className="py-3 ">{farmerId}</td>
                          <td className="py-3 ">{fullname}</td>
                          <td className="py-3 ">{email}</td>
                          <td className="py-3">{phone_number}</td>
                          <td className="py-3">{gender}</td>
                          <td className="py-3">
                            {totalKilos?.toLocaleString()}
                          </td>
                          <td className="py-3">{value?.toLocaleString()}</td>
                          <td className="py-3">
                            {paymentRequest === "not sent" ? (
                              <button
                                onClick={() =>
                                  requestSinglePaymentApproval(_id)
                                }
                                className="flex items-center space-x-1 bg-green-500 text-white  rounded p-1"
                              >
                                <span>Pay</span>
                              </button>
                            ) : paymentRequest === "waiting" ? (
                              <button className="flex items-center space-x-1 bg-yellow-500 text-white  rounded p-1">
                                <span>Pending</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => dispatch(MakeSinglePayment(_id))}
                                className="flex items-center space-x-1 bg-blue text-white  rounded p-1"
                              >
                                <span>Approved pay now</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </AccordionDetails>
          )}
        </Accordion>
      </div>

      <div className="bg-white shadow-sm p-3 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-xl text-blue py-3">Farmers</h1>
          <div className="">
            <button
              onClick={() => setRegisterModal(true)}
              className="p-2 bg-orange text-white rounded"
            >
              Add Farmer
            </button>
          </div>
        </div>

        <table className=" w-full ">
          <thead>
            <tr>
              <th className="text-start py-2">Name</th>
              <th className="text-start py-2">Farmer ID</th>
              <th className="text-start py-2">Email</th>
              <th className="text-start py-2">Phone Number</th>
              <th className="text-start py-2">Quantity</th>
              <th className="text-start py-2">Action</th>
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
                totalKilos,
                farmerId,
                value,
              } = farmer;

              const fullName = firstname.concat(" ", lastname);
              return (
                <tr key={_id} className={even ? "bg-gray-50 " : "bg-white"}>
                  <td className="py-3 ">{`${firstname + " " + lastname}`}</td>
                  <td className="py-3 ">{farmerId}</td>
                  <td className="py-3 ">{email}</td>
                  <td className="py-3">{phone_number}</td>
                  <td className="py-3">{totalKilos}</td>

                  <td className="py-3">
                    <button
                      // onClick={() => handleModal(fullName, _id)}
                      // onClick={handleModal}
                      onClick={() => openUploadModal(farmer)}
                      className="flex items-center space-x-1 bg-orange text-white  rounded p-1 "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>upload</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Farmer register form */}
      <div
        className={
          registerModal
            ? "fixed h-full bg-[rgba(0,0,0,0.5)] flex flex-col justify-center items-center  left-0 right-0 top-0 bottom-0"
            : "hidden"
        }
      >
        <div className="bg-white space-y-4 p-3 w-mobile md:w-[500px]  rounded shadow">
          {<RegisterForm setRegisterModal={setRegisterModal} />}
        </div>
      </div>

      {/* coffee upload form */}
      <div
        className={
          isUploadFormOpen
            ? "bg-[rgba(0,0,0,0.5)] bg-blend-multiply  flex  justify-center items-center fixed left-0 right-0 h-full  top-0 "
            : "hidden"
        }
      >
        {
          <Upload_form
            farmerInfo={farmerObj}
            closeUploadModal={setisUploadFormOpen}
          />
        }
      </div>
    </div>
  );
};

export default Home;
