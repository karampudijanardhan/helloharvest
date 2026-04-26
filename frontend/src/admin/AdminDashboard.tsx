import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

const API = "http://localhost:5000/api";

const AdminDashboard = () => {

  const [orders,setOrders] = useState(0);
  const [products,setProducts] = useState(0);
  const [visitors,setVisitors] = useState(0);

  useEffect(()=>{

    const loadDashboard = async()=>{

      // Orders
      try{
        const orderRes = await axios.get(`${API}/order`);
        setOrders(orderRes.data?.length || 0);
      }catch(err){
        console.log("Orders API error",err);
      }

      // Products
      try{
        const productRes = await axios.get(`${API}/products`);
        setProducts(productRes.data?.length || 0);
      }catch(err){
        console.log("Products API error",err);
      }

      // Visitors
      try{
        const visitorRes = await axios.get(`${API}/visitor/count`);
        setVisitors(visitorRes.data?.visitors || 0);
      }catch(err){
        console.log("Visitors API error",err);
      }

    };

    loadDashboard();

  },[]);

  return (

    <AdminLayout>

      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Orders */}
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-gray-600">
            Total Orders
          </h2>
          <p className="text-3xl font-bold text-orange-600">
            {orders}
          </p>
        </div>

        {/* Products */}
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-gray-600">
            Total Products
          </h2>
          <p className="text-3xl font-bold text-blue-600">
            {products}
          </p>
        </div>

        {/* Visitors */}
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-gray-600">
            Total Visitors
          </h2>
          <p className="text-3xl font-bold text-purple-600">
            {visitors}
          </p>
        </div>

      </div>

    </AdminLayout>

  );

};

export default AdminDashboard;