import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "@/components/AdminSidebar";

const AdminPayments = () => {

  const [orders,setOrders] = useState([]);

  const fetchOrders = async () => {

    try{

      const res = await axios.get(
        "https://vov-foods-1.onrender.com/api/order"
      );

      setOrders(res.data);

    }catch(err){

      console.log(err);

    }

  };

  useEffect(()=>{
    fetchOrders();
  },[]);


  // NEW FUNCTION (VERIFY PAYMENT)
  const verifyPayment = async (id:any) => {

    try {

      await axios.put(
        `https://vov-foods-1.onrender.com/api/order/verify/${id}`
      );

      // refresh orders
      fetchOrders();

    } catch(err) {

      console.log("Verification error:", err);

    }

  };


  const upiOrders = orders.filter((o:any)=>o.paymentMethod==="UPI");

  return (

    <div className="flex min-h-screen bg-gray-100 mt-12">

      {/* Sidebar */}
      <AdminSidebar/>

      {/* Content */}
      <div className="flex-1 p-4 lg:p-6">

        <h1 className="text-xl lg:text-2xl font-bold mb-6">
          Payment Verification
        </h1>


        {/* DESKTOP TABLE */}

        <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">UTR</th>
                <th className="p-3 text-left">Action</th>

              </tr>

            </thead>

            <tbody>

              {upiOrders.map((order:any)=>(
                <tr key={order._id} className="border-t">

                  <td className="p-3">{order.orderRef}</td>

                  <td className="p-3">{order.name}</td>

                  <td className="p-3">{order.phone}</td>

                  <td className="p-3 font-semibold">
                    ₹{order.totalAmount}
                  </td>

                  <td className="p-3">
                    {order.utr || "-"}
                  </td>

                  <td className="p-3">

                    {order.paymentStatus === "Pending Verification" ? (

                      <button
                        onClick={()=>verifyPayment(order._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                      >
                        Confirm Payment
                      </button>

                    ) : (

                      <span className="text-green-600 font-medium">
                        Verified
                      </span>

                    )}

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>


        {/* MOBILE CARDS */}

        <div className="md:hidden space-y-4">

          {upiOrders.map((order:any)=>(

            <div
              key={order._id}
              className="bg-white p-4 rounded-xl shadow"
            >

              <div className="flex justify-between mb-2">

                <span className="text-sm text-gray-500">
                  Order
                </span>

                <span className="font-semibold">
                  {order.orderRef}
                </span>

              </div>

              <div className="flex justify-between mb-2">

                <span className="text-sm text-gray-500">
                  Customer
                </span>

                <span>
                  {order.name}
                </span>

              </div>

              <div className="flex justify-between mb-2">

                <span className="text-sm text-gray-500">
                  Phone
                </span>

                <span>
                  {order.phone}
                </span>

              </div>

              <div className="flex justify-between mb-2">

                <span className="text-sm text-gray-500">
                  Amount
                </span>

                <span className="font-semibold">
                  ₹{order.totalAmount}
                </span>

              </div>

              <div className="flex justify-between mb-3">

                <span className="text-sm text-gray-500">
                  UTR
                </span>

                <span>
                  {order.utr || "-"}
                </span>

              </div>

              {order.paymentStatus === "Pending Verification" ? (

                <button
                  onClick={()=>verifyPayment(order._id)}
                  className="w-full bg-green-600 text-white py-2 rounded-lg text-sm"
                >
                  Confirm Payment
                </button>

              ) : (

                <div className="text-center text-green-600 font-medium">
                  Verified
                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default AdminPayments;