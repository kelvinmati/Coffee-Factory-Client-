import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import Upload_form from "../Dashboard/Upload_form";
import { logout } from "../../redux/actions/auth";

const Home = ({ farmers }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // get current user
  const current = useSelector((state) => state?.auth?.current_user);
  const fullname = current?.firstname?.concat(" ", current?.lastname);
  // show register form
  const [registerModal, setRegisterModal] = useState(false);
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
  // set upload form states
  const [isUploadFormOpen, setisUploadFormOpen] = useState(false);
  const [id, setId] = useState("");
  const openUploadModal = (id) => {
    setisUploadFormOpen(true);
    setId(id);
  };

  // close upload modal
  const closeUploadModal = () => {
    setisUploadFormOpen(false);
    setId("");
  };
  return (
    <div>
      <div
        className=" flex justify-between  items-center h-16 border-b-[1px]
             "
      >
        <div>
          <p className="text-lg">Logged in as {fullname}</p>
        </div>
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
      </div>

      <div className="grid grid-cols-2 gap-5 justify-between items-center my-6">
        <div className="">
          <button
            onClick={() => setRegisterModal(true)}
            className="p-2 bg-orange text-white rounded"
          >
            Add Farmer
          </button>
        </div>
        <div>
          {/* <h2 className="text-xl text-blue  w-full">Manage farmers</h2> */}
          <input
            type="text"
            className="p-2 rounded w-full focus:outline-blue"
            placeholder="Search for farmers here.."
          />
        </div>
        {/* <div className="text-right">
          <button
            onClick={() => setRegisterModal(true)}
            className="p-2 bg-orange text-white rounded"
          >
            Add Farmer
          </button>
        </div> */}
      </div>
      <div className="bg-white shadow-sm p-3 rounded-lg">
        <h1 className="text-xl text-blue py-3">Farmers</h1>

        <table className=" w-full ">
          <thead>
            <tr>
              <th className="text-start py-2">Name</th>
              <th className="text-start py-2">Farmer ID</th>
              <th className="text-start py-2">Email</th>
              <th className="text-start py-2">Phone Number</th>
              <th className="text-start py-2">Quantity(KGs)</th>
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
                      onClick={() => openUploadModal(_id)}
                      className="flex items-center space-x-1 bg-orange text-white rounded p-1 "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-blue"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>manage</span>
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
      {/* <div
        className={
          uploadModal
            ? "bg-[rgba(0,0,0,0.5)] bg-blend-multiply  flex  justify-center items-center fixed left-0 right-0 h-full  top-0 "
            : "hidden"
        }
      >
        {
          <UploadForm
            setUploadModal={setUploadModal}
            farmerIdentity={farmerIdentity}
          />
        }
      </div> */}

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
            onClick={closeUploadModal}
            className="bg-white w-16 h-16 rounded-full p-2 text-black text-bold text-4xl"
          >
            X
          </button>
        </div>
        {<Upload_form id={id} currentUser={fullname} />}
      </div>
    </div>
  );
};

export default Home;
