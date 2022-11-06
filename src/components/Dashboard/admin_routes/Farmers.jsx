import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFarmers, getSpecificFarmer } from "../../../redux/actions/auth";
import { makePayment } from "../../../redux/actions/payment";
import RegisterForm from "../../Staff_routes/RegisterForm";
import Upload_form from "../Upload_form";
import { format } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
const Farmers = ({ farmers, currentUser }) => {
  const dispatch = useDispatch();
  console.log(farmers);
  // get paid status
  const paidStatus = farmers?.map((farmer) => {
    // let status = farmer.paid ? "paid" : "not paid";
    return farmer?.paid;
  });
  // console.log("paidStatus is", paidStatus?.[0]);

  const [registerModal, setRegisterModal] = useState(false);
  // payment modal
  const [paymentModal, setPaymentModal] = useState(false);
  const [farmerId, setFarmerId] = useState(0);
  const handlePaymentModal = (farmer) => {
    setPaymentModal(true);
    dispatch(getSpecificFarmer(farmer?._id));
    setFarmerId(farmer?._id);
  };
  const closeModal = () => {
    setPaymentModal(false);
  };
  const farmer = useSelector((state) => state?.auth?.farmer);
  // console.log("farmer", farmer);

  // set button loading
  const ppayment = useSelector((state) => state?.payment?.msg);
  const error = useSelector((state) => state?.errors);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [paymentButtonLoading, setPaymentButtonLoading] = useState(false);

  // console.log("ppayment message", ppayment);
  useEffect(() => {
    if (ppayment) {
      setButtonLoading(false);
      setPaymentModal(false);
    }
  }, [ppayment]);
  useEffect(() => {
    if (error.typeId === "PAYMENT_FAIL") {
      setButtonLoading(false);
    } else {
      setButtonLoading(false);
    }
  }, [error]);
  // make single payment
  const handlePayment = () => {
    dispatch(makePayment(farmerId));
    setButtonLoading(true);
  };

  // set upload form states
  const [isUploadFormOpen, setisUploadFormOpen] = useState(false);
  const [id, setId] = useState("");
  const openUploadModal = (id) => {
    setisUploadFormOpen(true);
    setId(id);
  };
  // console.log("id is", id);
  // close upload modal
  const closeUploadModal = () => {
    setisUploadFormOpen(false);
    setId("");
  };
  // delete modal
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  return (
    <section className="space-y-0">
      <div className="flex justify-between items-center my-7">
        <h2 className="text-2xl">Farmers List</h2>
        <div className="space-x-4">
          <button
            onClick={() => setRegisterModal(true)}
            className="p-2 rounded bg-orange text-white"
          >
            Create farmer
          </button>
        </div>
      </div>
      <div className="bg-white shadow-sm p-3 rounded-lg">
        {/* <h1 className="text-xl text-blue py-3">Farmers</h1> */}

        <table className="w-full">
          <thead>
            <tr>
              <th className="text-start py-2">Name</th>
              <th className="text-start py-2">Farmer ID</th>
              <th className="text-start py-2">Email</th>
              {/* <th className="text-start py-2">Phone Number</th> */}
              <th className="text-start py-2">Quantity (Kgs)</th>
              <th className="text-start py-2">Registered Date </th>
              {/* <th className="text-start py-2">Pay status</th> */}
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
                farmerId,
                totalKilos,
                paid,
              } = farmer;
              const fullName = firstname.concat(" ", lastname);
              return (
                <tr key={_id} className={even ? "bg-gray-50 " : "bg-white"}>
                  <td className="py-3 ">{fullName}</td>
                  <td className="py-3 ">{farmerId}</td>
                  <td className="py-3 ">{email}</td>
                  {/* <td className="py-3">{phone_number}</td> */}
                  <td className="py-3">{totalKilos}</td>
                  <td className="py-3">
                    {/* {format(new Date(createdAt), "yyyy-MM-dd")} */}
                    {format(
                      new Date(createdAt),
                      "do MMM yyyy HH:mm:ss aaaaa'm'"
                    )}
                  </td>
                  {/* <td className="py-3">
                    {paid ? (
                      <p className="text-green-400">Paid</p>
                    ) : (
                      <p className="text-yellow-400">Unpaid</p>
                    )}
                  </td> */}

                  <td className="py-3 space-x-2 ">
                    {/* <button
              
                      disabled={paid ? true : false}
                      onClick={() => handlePaymentModal(farmer)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        // className="w-6 h-6  text-green-700"
                        className={
                          paid
                            ? "w-6 h-6  bg-green-700 rounded text-white cursor-not-allowed"
                            : "w-6 h-6  text-yellow-400"
                        }
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          // d=""
                          d={
                            paid
                              ? "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                              : "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          }
                        />
                      </svg>
         
                    </button> */}
                    <button onClick={() => openUploadModal(_id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-blue"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                        />
                      </svg>
                    </button>
                    <button>
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
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>

                    <button onClick={() => setdeleteModal(true)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-red"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
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
        <div className="absolute top-10 right-16">
          <button
            // onClick={() => setisUploadFormOpen(false)}
            onClick={closeUploadModal}
            className="bg-white w-16 h-16 rounded-full p-2 text-black text-bold text-4xl"
          >
            X
          </button>
        </div>
        {<Upload_form id={id} currentUser={currentUser} />}
      </div>
      {/* payment modal */}
      <div
        className={
          paymentModal
            ? "fixed h-full bg-[rgba(0,0,0,0.5)]   flex flex-col justify-center items-center  left-0 right-0 top-0 bottom-0"
            : "hidden"
        }
      >
        <div className="w-[40%] bg-white py-5 rounded px-3 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Farmer Details</h2>
            <div className="space-x-5">
              <button onClick={closeModal} className="p-2 bg-gray-100 rounded">
                CANCEL
              </button>
              {/* <button
                onClick={handlePayment}
                className="p-2 bg-orange  text-white rounded"
              >
                PAY NOW
              </button> */}

              <button
                onClick={handlePayment}
                disabled={buttonLoading ? true : false}
                className={
                  buttonLoading
                    ? "bg-blue opacity-50 text-white p-2 rounded-lg"
                    : "bg-blue  text-white p-2 rounded-lg"
                }
                // className="bg-blue  text-white p-2 rounded-lg"
              >
                {buttonLoading ? (
                  <div className="flex justify-center items-center space-x-2">
                    <div className="border-2 border-r-3  border-r-gray-600 animate-spin rounded-full w-5 h-5"></div>
                    <span>Processing..</span>
                  </div>
                ) : (
                  <div>PAY NOW</div>
                )}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="">Name</label>
            <p className="border p-2 font-bold bg-gray-50">
              {`${farmer?.firstname} ${farmer?.lastname}`}
            </p>
          </div>
          <div>
            <label htmlFor="">Farmer ID</label>
            <p className="border p-2 font-bold bg-gray-50">
              {farmer?.farmerId}
            </p>
          </div>
          <div>
            <label htmlFor="">Quantity(Kg)</label>
            <p className="border p-2 font-bold bg-gray-50">
              {farmer?.totalKilos}
            </p>
          </div>
          <div>
            <label htmlFor="">Amount</label>
            <p className="border p-2 font-bold bg-gray-50">
              {farmer?.value?.toLocaleString()}
            </p>
          </div>{" "}
          <div>
            <label htmlFor="">Phone Number</label>
            <p className="border p-2 font-bold bg-gray-50">
              {farmer?.phone_number}
            </p>
          </div>
        </div>
      </div>
      {/* delete modal */}
      {/* modal */}
      <div
        className={
          deleteModal
            ? "fixed h-full bg-[rgba(0,0,0,0.34)] flex flex-col   items-center  left-0 right-0 top-0 bottom-0 pt-24"
            : "hidden"
        }
      >
        <div className="bg-white space-y-8 p-4 w-mobile md:w-[450px]  rounded shadow">
          <h2 className="text-xl  text-center">
            Are you sure you want to delete Jane Wanjiku?
          </h2>

          <div className="flex justify-end space-x-2">
            <button
              // type="submit"
              // disabled={amount == "" ? true : false}
              // className={
              //   amount == ""
              //     ? "bg-blue opacity-50 text-white p-2 rounded-lg"
              //     : "bg-blue  text-white p-2 rounded-lg"
              // }
              className="bg-red  text-white p-2 rounded-lg"
            >
              {deleteLoading ? (
                <div className="flex justify-center items-center space-x-2">
                  <div className="border-2 border-r-3  border-r-gray-600 animate-spin rounded-full w-5 h-5"></div>
                  <span>Processing..</span>
                </div>
              ) : (
                <div>Yes</div>
              )}
            </button>
            <div
              onClick={() => setdeleteModal(false)}
              className="cursor-pointer bg-gray-200  p-2 rounded-lg"
            >
              No
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Farmers;
