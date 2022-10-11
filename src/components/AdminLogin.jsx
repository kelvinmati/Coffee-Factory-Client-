import React, { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { adminLogin } from "../redux/actions/auth";

const AdminLogin = () => {
  const dispatch = useDispatch();
  // initialize react hook form
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
  //   get form values
  const onSubmit = (data) => {
    // console.log(data);
    dispatch(adminLogin(data));
  };
  //   const onSubmit = async (data) => {
  //     const { email, password } = data;
  //     try {
  //       // request body
  //       const body = JSON.stringify({
  //         email,
  //         password,
  //       });
  //       const response = await axios.post(
  //         "http://localhost:4000/admin/admin-login",
  //         body
  //       );
  //       const data = await response.data;
  //       console.log("admin login data is", data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <section className="bg-[#8080801f] h-screen py-10 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white  w-mobile sm:w-[30%]  p-3 rounded space-y-3"
      >
        <h2 className="bg-blue p-5 text-white text-center rounded">
          ADMIN LOGIN
        </h2>
        <div className="flex flex-col">
          <label>
            Email <span className="text-red-600">*</span>{" "}
          </label>
          <input
            className="p-2 border outline-none rounded"
            type="email"
            placeholder="enter email"
            {...register("email", { required: true })}
          />
        </div>
        {errors.email && <p className="text-red-600"> Email is required </p>}
        <div className="flex flex-col">
          <label>
            Password <span className="text-red-600">*</span>{" "}
          </label>
          <input
            className="p-2 border outline-none rounded"
            type="password"
            placeholder="enter password"
            {...register("password", { required: true })}
          />
        </div>
        {errors.password && (
          <p className="text-red-600"> Password is required </p>
        )}
        <div>
          <button
            type="submit"
            className="bg-blue text-white p-2 rounded  w-full"
          >
            Login
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdminLogin;
