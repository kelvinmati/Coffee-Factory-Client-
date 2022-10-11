import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../download-removebg-preview.png";
import { set, useForm } from "react-hook-form";
import { authUser, loginUser } from "../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import coffeeImg from "../images/home.jpeg";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  // set loading state
  const [loading, setLoading] = useState(false);

  // dipatch errors
  const error = useSelector((state) => state?.errors);
  console.log("errors are", error);
  const onSubmit = (data) => {
    setLoading(true);
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (error.typeId === "LOGIN_FAIL") {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [error]);

  // check if user is authenticated & his/her role
  const role = useSelector((state) => state?.auth?.user?.existingUser?.role);
  const auth = useSelector((state) => state?.auth?.isAuthenticated);

  // console.log("auth is", auth);

  useEffect(() => {
    if (auth) {
      switch (role) {
        case "Staff":
          return navigate("/dashboard/admin");
        case "farmer":
          return navigate("/dashboard/farmer");
      }
    } else {
      navigate("/login");
    }
  }, [role]);

  return (
    <div
      className=" h-screen py-10  bg-blend-multiply  "
      style={{
        backgroundImage: `url(${coffeeImg})`,
        backgroundColor: "rgba(0,0,0,0.4)",
      }}
    >
      {" "}
      <div className="flex flex-col h-screen justify-center items-center">
        <div
          className="space-y-5 bg-orange p-3 rounded-tl-lg rounded-tr-lg"
          style={{ borderTop: "5px solid #fff" }}
        >
          <div className="flex flex-col items-center">
            <p className="h-20 w-20">
              <img src={logo} alt="" />
            </p>
            <p className="text-2xl text-center">Login To Your Account</p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4 w-96 "
          >
            <input
              type="text"
              className="border p-2 w-full"
              placeholder="Email"
              {...register("email", {
                required: true,
              })}
            />
            {errors.email && <p className="text-red"> Email is required </p>}
            <input
              type="password"
              className="border p-2 w-full"
              placeholder="Password"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password && (
              <p className="text-red"> Password is required </p>
            )}
            {/* <input
              type="submit"
              className="border-0 rounded p-2 w-full bg-black text-white"
            /> */}
            <button
              type="submit"
              className="flex justify-center items-center space-x-3 border-0 rounded p-2 w-full bg-black text-white"
            >
              <div
                className={
                  loading
                    ? "border-2 border-r-3  border-r-gray-600 animate-spin rounded-full w-6 h-6"
                    : "hidden"
                }
              ></div>
              <div>LOGIN</div>
            </button>
          </form>
          <p className="text-center ">
            Don't have an account?{" "}
            <Link to="/register">
              <span className="text-blue mx-2">Register</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
