import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTransactions } from "../../../redux/actions/payment";
const Payment = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTransactions());
  }, []);

  const Transactions = useSelector((state) => state?.payment?.transactions);
  console.log("Transactions are", Transactions);
  return (
    <section>
      <div className="flex justify-between items-center my-7">
        <h2 className="text-2xl">Payment List</h2>
        <button className="p-2 bg-gray-200 rounded"></button>
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
    </section>
  );
};

export default Payment;
