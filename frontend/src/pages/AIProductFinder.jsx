import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AIVoiceSearch from "./AIVoiceSearch";

const API = "http://localhost:10000/api";

export default function AIProductFinder() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const voiceSearch = (text) => {
  setQuery(text);

  setTimeout(() => {
    search(text);
  }, 500);
};

  const search = async (voiceText = null) => {

  const searchQuery = voiceText || query;

  if (!searchQuery.trim()) {
    alert("Please enter search");
    return;
  }

  try {

    setLoading(true);

    const { data } = await axios.post(
      `${API}/product-finder`,
      {
        query: searchQuery,
      }
    );

    setProducts(data.products);

  } catch (err) {

    console.log(err);

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
          <div className="mt-4 flex gap-4 items-center">

  <AIVoiceSearch onSearch={voiceSearch} />

</div>

      <button
        onClick={search}
        disabled={loading}
        className="mt-5 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"
      >
        {loading ? "Searching..." : "Ask AI"}
      </button>

      {error && (
        <div className="mt-6 bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

      {!loading && products.length === 0 && !error && (
        <p className="mt-8 text-gray-500">
          Ask a question to get AI recommendations.
        </p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {products.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl shadow-lg p-5"
          >
            <img
              src={item.image || "/placeholder.png"}
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
  className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
>
  View Product
</button>
          </div>
        ))}
      </div>

    </div>
  );
}