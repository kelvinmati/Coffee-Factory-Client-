import React from "react";

const Farmer = () => {
  return (
    <section className="bg-gray-50 h-screen">
      <nav className="bg-blue text-white h-[80px]">
        <div className="w-mobile md:w-container_width mx-auto flex justify-between items-center h-full  ">
          <div>
            <h2 className="">Ithe Mutiki Factory</h2>
          </div>
          <div>
            <button className="bg-orange text-white px-4 py-2 rounded ">
              Wallet
            </button>
          </div>
        </div>
      </nav>
      <div className="w-mobile md:w-container_width mx-auto grid sm:grid-cols-2 gap-5 py-16">
        <div className="space-y-5 pt-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-3 text-center space-y-2">
              <h2>Total number of kilos</h2>

              <p className="bg-red-700 w-1/2 mx-auto rounded-lg text-white p-2">
                20
              </p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center space-y-2">
              <h2>Paid amount</h2>

              <p className="bg-green-600 w-1/2 mx-auto rounded-lg text-white p-2">
                300,000
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-blue text-lg">Transaction history</h2>
            <table className=" w-full overflow-auto">
              <thead>
                <tr>
                  <th className="text-start py-2">Amount(Ksh)</th>
                  <th className="text-start py-2">Date</th>
                  <th className="text-start py-2">Transacted by</th>
                </tr>
              </thead>
              <tbody className="text-start  ">
                {loop.map((ele, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-3 ">5000</td>
                      <td className="py-3 ">27th june 2022</td>
                      <td className="py-3">John Doe</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="my-2  text-blue">
            <h2 className="text-lg">My Profile</h2>
            <p>You can edit your personal details here</p>
          </div>
          <form className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex flex-col">
                <label>Firstname</label>
                <input
                  className="p-2 rounded focus:outline-dotted"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label>Lastname</label>
                <input
                  className="p-2 rounded focus:outline-dotted"
                  type="text"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label>Email</label>
              <input
                className="p-2 rounded focus:outline-dotted"
                type="email"
              />
            </div>
            <div className="flex flex-col">
              <label>Phone Number</label>
              <input
                className="p-2 rounded focus:outline-dotted"
                type="numbers"
              />
            </div>
            <div>
              <button className="bg-orange text-white p-2 rounded w-full">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Farmer;

const loop = [1, 2, 3];
