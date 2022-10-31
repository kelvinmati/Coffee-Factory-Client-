import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAllFarmers, getSpecificFarmer } from "../../redux/actions/auth";
import axios from "axios";
import toast from "react-hot-toast";
const Upload_form = ({ id, currentUser }) => {
  // console.log("Current user is", currentUser);
  const dispatch = useDispatch();
  // console.log("upload id is", id);
  // get specific farmer
  useEffect(() => {
    dispatch(getSpecificFarmer(id));
  }, [id]);
  const farmer = useSelector((state) => state?.auth?.farmer);
  // console.log("farmer is", farmer);

  // initialize react hook form
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    shouldUnregister: true,
    shouldFocusError: true,
  });
  const [buttonLoading, setbuttonLoading] =
    useState(false); /*set button loading */
  // upload farmers data
  const onSubmit = async (data) => {
    setbuttonLoading(true);
    const { coffee_type, quantity } = data;
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
    });

    try {
      const response = await axios.post(
        `http://localhost:4000/user/farmer-upload/${id}`,
        body,
        config
      );
      const data = await response.data;
      if (data) {
        toast.success(data?.returnedFarmer?.message);
        setbuttonLoading(false);
        dispatch(getSpecificFarmer(id));
        dispatch(getAllFarmers());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="grid grid-cols-2 items-center gap-3 bg-white shadow w-mobile md:w-[70%] ">
      <div className="bg-blue p-3 text-white space-y-2">
        <h2 className="uppercase text-center bg-white text-black rounded p-2 font-bold">
          {`${farmer?.firstname} ${farmer?.lastname}`}
        </h2>
        <div>
          <h2 className="text-lg text-orange">Weight and value</h2>
          <h2>Total kgs: {farmer?.totalKilos?.toLocaleString()}</h2>
          <h2>Total Amount: Ksh {farmer?.value?.toLocaleString()}</h2>
        </div>
        <div>
          <h2 className="text-lg text-orange">Delivery records</h2>
        </div>
        {farmer?.coffeeDetails?.length == 0 ? (
          <div className="h-[220px]">
            {" "}
            <h2>No deliveries yet</h2>
          </div>
        ) : (
          <div className="h-[300px] relative overflow-auto">
            <table className=" w-full ">
              <thead>
                <tr className="bg-black  ">
                  <th className="text-start py-3 px-1.5">Type</th>
                  <th className="text-start py-3 px-1.5">Quantity(Kgs)</th>
                  <th className="text-start py-3 px-1.5">Date submitted</th>
                </tr>
              </thead>
              <tbody className="text-start">
                {farmer?.coffeeDetails?.map((coffeeDetail, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-3 text-center ">
                        {coffeeDetail?.coffee_type}
                      </td>
                      <td className="py-3 text-center ">
                        {coffeeDetail?.quantity}
                      </td>
                      <td className="py-3 text-center">
                        {coffeeDetail?.createdAt}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="p-3 space-y-5">
        <h2>UPLOAD FARMERS COFFEE</h2>
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
                <p className="text-red"> Type of coffee is required </p>
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
                <p className="text-red">Quantity is required</p>
              )}
            </div>
            <div className="flex flex-col ">
              <label>Served by</label>
              {/* <input
                // disabled
                type="text"
                // value={currentUser}
                className="border p-2 focus:outline-blue rounded"
                {...register(
                  "served_by",

                  {
                    required: false,
                  }
                )}
              /> */}
              <p className="border p-2 focus:outline-blue rounded">
                {currentUser}
              </p>
            </div>

            <div className="text-end">
              <button
                type="submit"
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
                  <div>Upload</div>
                )}
              </button>
            </div>
            {/* <div>
              <button
                type="submit"
                className="border-0 p-2 w-full rounded bg-blue text-white"
              >
                {buttonLoading ? (
                  <div className="flex justify-center items-center  space-x-2">
                    <div className="border-2 border-r-3  border-r-gray-600 animate-spin rounded-full w-6 h-6"></div>
                    <span>Please wait..</span>
                  </div>
                ) : (
                  <div>SUBMIT</div>
                )}
              </button>
            </div> */}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Upload_form;
const loop = [1, 2, 3, 4, 5];
