import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AIVoiceSearch from "./AIVoiceSearch";

const API = import.meta.env.VITE_API_URL + "/api";

export default function AIProductFinder() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  // Voice Search
  const voiceSearch = (text) => {
    setQuery(text);
    search(text);
  };

  // AI Search
  const search = async (searchText = null) => {
    const finalQuery = searchText || query;

    if (!finalQuery.trim()) {
      alert("Please enter your health problem.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setProducts([]);

      console.log("Searching:", finalQuery);

      const { data } = await axios.post(`${API}/product-finder`, {
        query: finalQuery,
      });

      console.log("AI Response:", data);

      if (data.success === false) {
        setError(data.message);
      } else if (Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        setError("No products found.");
      }
    } catch (err) {
      console.error(err);

      if (err.response) {
        setError(err.response.data.message || "Server Error");
      } else {
        setError("Unable to connect to server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold text-green-700 text-center">
        🤖 AI Product Finder
      </h1>

      <p className="text-center text-gray-500 mt-3">
        Ask AI to recommend HelloHarvest products.
      </p>

      <textarea
        rows={4}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Example: I have diabetes and knee pain"
        className="border rounded-xl p-4 w-full mt-8"
      />

      <div className="mt-4">
        <AIVoiceSearch onSearch={voiceSearch} />
      </div>

      <button
        type="button"
        onClick={() => search()}
        disabled={loading}
        className="mt-5 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"
      >
        {loading ? "Searching..." : "Ask AI"}
      </button>

      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {!loading && products.length === 0 && !error && (
        <p className="mt-8 text-center text-gray-500">
          Ask a question to get AI recommendations.
        </p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

        {products.map((item) => (

          <div
            key={item.id}
            className="border rounded-xl shadow-lg p-5 hover:shadow-xl transition"
          >

            <img
              src={item.image}
              alt={item.name}
              className="h-52 w-full object-cover rounded-lg"
            />

            <h2 className="text-2xl font-bold mt-4">
              {item.name}
            </h2>

            <p className="mt-3">
              <strong>Reason</strong>
              <br />
              {item.reason}
            </p>

            <p className="mt-3">
              <strong>Benefits</strong>
              <br />
              {item.benefits}
            </p>

            <p className="mt-3 font-bold text-green-700">
              ₹{item.price}
            </p>

            <button
              onClick={() => navigate(`/product/${item.id}`)}
              className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
            >
              View Product
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}