import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearFarmer, getSpecificFarmer } from "../../redux/actions/auth";
const Farmers = ({ farmers, admin }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [fullName, setfullName] = useState("");
  const [farmerId, setFarmerId] = useState("");

  // handle modal pop up
  const handleModal = (fullName, id) => {
    setOpen(true);
    setfullName(fullName);
    setFarmerId(id);
    dispatch(getSpecificFarmer(id));
  };
  const farmerDetails = useSelector(
    (state) => state?.auth?.farmer?.user?.coffeeDetails
  );
  const totalKilos = useSelector((state) => state?.auth?.farmer?.totalKilos);
  console.log("total kilos  are", totalKilos);
  // useEffect(()=>{

  // },[])
  // getting input values using react hook form
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    shouldUnregister: true,
    shouldFocusError: true,
  });
  // upload farmers data
  const onSubmit = async (data) => {
    console.log(data);
    const { coffee_type, quantity, date_submitted } = data;
    // config
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // body
    const body = JSON.stringify({
      coffee_type,
      quantity,
      date_submitted,
    });

    try {
      const response = await axios.post(
        `http://localhost:4000/user/farmer-upload/${farmerId}`,
        body,
        config
      );
      const data = await response.data;
      console.log("data is", data);
      dispatch(getSpecificFarmer(farmerId));
    } catch (error) {
      console.log(error);
    }
  };
  // close modal
  const handleModalClose = () => {
    setOpen(false);
    dispatch(clearFarmer());
  };

  return (
    <section>
      <div className="flex justify-between items-center py-5">
        <h2 className="text-xl text-blue  w-full">Manage farmers</h2>
        <input
          type="text"
          className="p-2 rounded w-full focus:outline-blue"
          placeholder="Search for farmers here.."
        />
      </div>
      <table className=" w-full ">
        <thead>
          <tr>
            <th className="text-start py-2">Name</th>
            <th className="text-start py-2">Email</th>
            <th className="text-start py-2">Phone Number</th>
            <th className="text-start py-2">Quantity(Kgs)</th>
            <th className="text-start py-2">Date registered</th>

            <th className="text-start py-2">Farmer Id</th>

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
            } = farmer;
            const fullName = firstname.concat(" ", lastname);

            return (
              <tr key={_id} className={even ? "bg-gray-100 " : "bg-white"}>
                <td className="py-3 ">{fullName}</td>
                <td className="py-3 ">{email}</td>
                <td className="py-3">{phone_number}</td>
                <td className="py-3">90</td>
                <td className="py-3">{createdAt}</td>
                <td className="py-3">{farmerId}</td>

                <td className="py-3">
                  <button
                    onClick={() => handleModal(fullName, _id)}
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
      <div
        className={
          open
            ? "bg-[rgba(0,0,0,0.5)] bg-blend-multiply  flex justify-center items-center fixed left-0 right-0 h-full top-0 "
            : "hidden"
        }
      >
        <div className="w-[80%] bg-white p-0 rounded  grid grid-cols-2 items-center">
          <div className="bg-blue text-white p-6">
            <h2 className="text-lg bg-white text-black uppercase p-1 rounded text-center">
              Submission records
            </h2>
            <h2 className="text-lg first-letter:uppercase  ">{fullName}</h2>
            <p className="text-lg ">Total kgs: {totalKilos || 0}</p>
            <div className="h-[350px] overflow-auto mt-3">
              <table className="w-full">
                <thead className="bg-orange rounded">
                  <th className="text-start py-2  ">Coffee type</th>
                  <th className="text-start py-2  ">Quantity(Kgs)</th>
                  <th className="text-start py-2 ">Date submitted</th>
                </thead>
                <tbody>
                  {farmerDetails?.length > 0 ? (
                    farmerDetails?.map((farmerDetail) => {
                      const { _id, coffee_type, quantity, createdAt } =
                        farmerDetail;
                      return (
                        <tr key={_id}>
                          <td className="py-2">{coffee_type}</td>
                          <td>{quantity}</td>
                          <td>{createdAt}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <p className=" text-lg py-2">No data</p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="p-3 space-y-3 ">
            <div className="flex justify-between items-center">
              <p className=" text-xl font-bold text-blue">UPLOAD </p>

              <button
                onClick={() => handleModalClose()}
                className="bg-blue rounded-full text-white w-8 h-8"
              >
                X
              </button>
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                <div className="flex flex-col">
                  <label>Type of coffee</label>
                  {/* <input
                  type="text"
                  className="border p-2 focus:outline-blue rounded"
                /> */}
                  <select
                    className=" p-2 bg-white border rounded"
                    {...register("coffee_type", {
                      required: true,
                    })}
                    defaultValue=""
                  >
                    <option value="" disabled hidden>
                      Select type of coffee
                    </option>

                    <option value="SL_28">SL 28</option>
                    <option value="SL_34">SL 34</option>
                    <option value="K7">K7</option>
                    <option value="ruiru_11">Ruiru 11</option>
                    <option value="batian">Batian</option>
                  </select>
                  {errors?.coffee_type && (
                    <p className="text-red-600"> Type of coffee is required </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label>Quantity(kg)</label>
                  <input
                    type="number"
                    className="border p-2 focus:outline-blue rounded"
                    {...register("quantity", { required: true })}
                  />
                  {errors?.quantity && (
                    <p className="text-red-600">Quantity is required</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label>Date submitted</label>
                  <input
                    type="Date"
                    className="border p-2 focus:outline-blue rounded"
                    {...register("date_submitted", {
                      required: false,
                    })}
                  />
                </div>
                <div>
                  <h2>served by:{admin}</h2>
                </div>
                <div>
                  <button
                    type="submit"
                    className="p-2 bg-blue text-white w-full rounded"
                  >
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Farmers;
// GodfreyNjeru;
// Goddie9753;
