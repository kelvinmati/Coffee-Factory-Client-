import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import {
  getAllTransactions,
  getPayableFarmers,
} from "../../../redux/actions/payment";
import axios from "axios";
import toast from "react-hot-toast";
import { authToken, getAllStaff } from "../../../redux/actions/auth";

const Home = ({ farmers, balance }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // get  recent transactions
  useEffect(() => {
    dispatch(getAllTransactions());
  }, []);
  const Transactions = useSelector((state) => state?.payment?.transactions);
  let filterNum = Transactions?.length - 7; /* filter from */
  const recentTransactions = Transactions?.slice(
    filterNum,
    Transactions?.length
  );
  // get total amount paid
  const totalArr = Transactions?.map((Transaction) => {
    return Transaction?.amount;
  });
  const totalPaid = totalArr?.reduce((a, b) => {
    return a + b;
  });
  // console.log("total is", totalPaid);

  // load all payable farmers
  useEffect(() => {
    dispatch(getPayableFarmers());
  }, []);
  const payableFarmers = useSelector(
    (state) => state?.payment?.payable_farmers
  );
  // console.log("payableFarmers", payableFarmers);

  // get total staff
  useEffect(() => {
    dispatch(getAllStaff());
  }, []);
  const allStaff = useSelector((state) => state?.auth?.staff);

  // pay all farmers
  const [payButtonLoading, setPayButtonLoading] = useState(false);
  const handlePayment = async () => {
    setPayButtonLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:4000/payment/pay-all-mng",
        authToken()
      );
      const data = response.data;
      if (data) {
        toast.success(data.message);
        setPayButtonLoading(false);
        dispatch(getPayableFarmers());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setPayButtonLoading(false);
    }
  };
  return (
    <section className="space-y-5">
      <div className="grid grid-cols-3 gap-5">
        {/* <div className="shadow bg-yellow-400 rounded text-white text-lg  p-2 text-center space-y-2">
          <div>Total quantity</div>
          <div>
            <span className="text-xl font-bold">20,000 Kgs</span>
          </div>
        </div> */}
        <div className="shadow bg-orange rounded text-white text-lg  p-2 text-center space-y-2">
          <div>Total amount paid</div>
          <div>
            <span className="text-xl font-bold">
              {" "}
              Ksh {totalPaid?.toLocaleString()}
            </span>
          </div>
        </div>{" "}
        <div className="shadow bg-green-400 rounded text-white text-lg  p-2 text-center space-y-2">
          <div>Account balance</div>
          <div>
            <span className="text-xl font-bold">
              Ksh {balance?.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="shadow  rounded text-lg bg-white py-5 px-2 text-center space-y-4">
          <div>Total Farmers</div>
          <div>
            <span className="text-xl font-bold ">{farmers?.length || 0}</span>
          </div>
        </div>
        <div className="shadow  rounded text-lg bg-white py-5 px-2 text-center space-y-4">
          <div>Total Staff</div>
          <div>
            <span className="text-xl font-bold ">{allStaff?.length || 0}</span>
          </div>
        </div>{" "}
        {/* <div className="shadow  rounded text-lg bg-white py-5 px-2 text-center space-y-8">
          <div>Total Staff</div>
          <div>
            <span className="text-xl ">5</span>
          </div>
        </div> */}
      </div>
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
      <div className="bg-white shadow-sm p-3 rounded-lg">
        <h2 className="my-2 py-2  border-b-[1px] border-gray-200 text-xl font-bold">
          Recent Payments Made.
        </h2>

        <table className=" w-full ">
          <thead>
            <tr>
              <th className="text-start py-2">ID</th>
              <th className="text-start py-2">Name</th>
              <th className="text-start py-2">Phone No</th>
              <th className="text-start py-2">Quantity (Kgs)</th>
              <th className="text-start py-2">Amount(Ksh)</th>
              <th className="text-start py-2">Date Paid</th>
            </tr>
          </thead>
          <tbody className="text-start">
            {recentTransactions?.map((Transaction, index) => {
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
                  <td className="py-3">{phone}</td>
                  <td className="py-3">{quantity}</td>
                  <td className="py-3">{amount}</td>
                  <td className="py-3">
                    {format(
                      new Date(createdAt),
                      "do MMM yyyy HH:mm:ss aaaaa'm'"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="text-end my-3 text-blue">
          <button
            onClick={() => navigate("/dashboard/admin/payment")}
            className="cursor-pointer"
          >
            Show more
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
