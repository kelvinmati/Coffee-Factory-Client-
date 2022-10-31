import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import {
  getAllTransactions,
  getPayableFarmers,
} from "../../../redux/actions/payment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // load account balance
  const [balance, setBalance] = useState(0);
  const getAccBalance = async () => {
    try {
      const response = await axios.get("http://localhost:4000/account/balance");
      const data = await response.data;
      if (data) {
        setBalance(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  getAccBalance();
  // console.log("balance is", balance);

  // get  recent transactions
  useEffect(() => {
    dispatch(getAllTransactions());
  }, []);

  const Transactions = useSelector((state) => state?.payment?.transactions);
  console.log("Transactions are", Transactions);

  // load all payable farmers
  const payableFarmers = useSelector(
    (state) => state?.payment?.payable_farmers
  );
  useEffect(() => {
    dispatch(getPayableFarmers());
  }, [payableFarmers]);
  // pay all farmers
  const [payButtonLoading, setPayButtonLoading] = useState(false);
  const handlePayment = async () => {
    setPayButtonLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/payment/pay-all");
      const data = response.data;
      if (data) {
        toast.success(data.message);
        setPayButtonLoading(false);
      }
      dispatch(getPayableFarmers());
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setPayButtonLoading(false);
    }
  };
  return (
    <section className="space-y-5">
      <div className="grid grid-cols-3 gap-5">
        <div className="shadow bg-yellow-400 rounded text-white text-lg  p-2 text-center space-y-2">
          <div>Total Kg(s)</div>
          <div>
            <span className="text-xl">20,000</span>
          </div>
        </div>
        <div className="shadow bg-green-400 rounded text-white text-lg  p-2 text-center space-y-2">
          <div>Amount paid</div>
          <div>
            <span className="text-xl">500,000</span>
          </div>
        </div>{" "}
        <div className="shadow bg-blue rounded text-white text-lg  p-2 text-center space-y-2">
          <div>Account balance</div>
          <div>
            <span className="text-xl">{balance?.toLocaleString()}</span>
          </div>
        </div>
        <div className="shadow  rounded text-lg bg-white py-5 px-2 text-center space-y-8">
          <div>Total Farmers</div>
          <div>
            <span className="text-xl ">85</span>
          </div>
        </div>
        <div className="shadow  rounded text-lg bg-white py-5 px-2 text-center space-y-8">
          <div>Total Staff</div>
          <div>
            <span className="text-xl ">5</span>
          </div>
        </div>{" "}
        <div className="shadow  rounded text-lg bg-white py-5 px-2 text-center space-y-8">
          <div>Total Staff</div>
          <div>
            <span className="text-xl ">5</span>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-sm p-3 rounded-lg">
        <table className=" w-full ">
          <thead>
            <tr>
              <th className="text-start py-2">ID</th>
              <th className="text-start py-2">Name</th>
              <th className="text-start py-2">Kg(s)</th>
              <th className="text-start py-2">Amount</th>
              <th className="text-start py-2">Phone No</th>
              <th className="text-start py-2">Date</th>
              <th className="text-start py-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-start">
            {Transactions?.map((Transaction, index) => {
              const even = index % 2 === 0;
              // console.log("even is", even);
              const {
                _id,
                amount,
                createdAt,
                farmerId,
                name,
                phone,
                quantity,
              } = Transaction;
              return (
                <tr key={_id} className={even ? "bg-gray-50 " : "bg-white"}>
                  <td className="py-3 ">{farmerId}</td>

                  <td className="py-3 ">{name}</td>

                  <td className="py-3 ">{quantity}</td>

                  <td className="py-3">{amount}</td>

                  <td className="py-3">{phone}</td>

                  <td className="py-3">{createdAt}</td>
                  <td className="py-3">
                    <button className="bg-green-500 px-4 py-1.5 text-white rounded ">
                      Paid
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <Accordion>
          <AccordionSummary
            sx={{ borderBottom: "1px solid black" }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div>
              <p className="text-xl font-bold">Check for payable farmers</p>
            </div>
          </AccordionSummary>
          {payableFarmers?.length == 0 ? (
            <div className="p-4">No farmer at the moment</div>
          ) : (
            <AccordionDetails>
              <div>
                <div className="text-blue text-lg flex justify-between items-center my-5">
                  <p>Payable farmers list ({payableFarmers?.length})</p>
                  {/* <button
                    onClick={handlePayment}
                    className="p-2 bg-orange text-white rounded"
                  >
                    Pay All Farmers
                  </button> */}
                  <button
                    onClick={handlePayment}
                    className="p-2 bg-orange text-white rounded"
                  >
                    {payButtonLoading ? (
                      <div className="flex justify-center items-center space-x-2">
                        <div className="border-2 border-r-3  border-r-gray-600 animate-spin rounded-full w-5 h-5"></div>
                        <span>Processing..</span>
                      </div>
                    ) : (
                      <div>Pay All Farmers</div>
                    )}
                  </button>
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
    </section>
  );
};

export default Home;

const loop = [1, 2, 3, 4, 5, 6, 7];
