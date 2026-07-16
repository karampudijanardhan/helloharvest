import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:10000/api";

export default function AIImageScanner() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const analyze = async () => {
    if (!image) {
      alert("Please select image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("image", image);

      const { data } = await axios.post(
        `${API}/image-scanner`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(data);
    } catch (err) {
      console.log(err);
      alert("AI Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-10">

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-center text-green-700">
          📷 AI Food Image Scanner
        </h1>

        <p className="text-center text-gray-500 mt-3">
          Upload food image and get AI analysis.
        </p>

        <div className="mt-8">

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full border p-3 rounded-lg"
          />

        </div>

        {preview && (

          <div className="mt-8 flex justify-center">

            <img
              src={preview}
              alt=""
              className="w-80 h-80 object-cover rounded-xl shadow-lg"
            />

          </div>

        )}

        <div className="text-center">

          <button
            onClick={analyze}
            disabled={loading}
            className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"
          >
            {loading ? "Analyzing..." : "Analyze Food"}
          </button>

        </div>

        {result && (

          <div className="mt-10">

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-green-100 p-5 rounded-xl">

                <h2 className="text-2xl font-bold">
                  🍽 Food
                </h2>

                <p className="mt-3 text-xl">
                  {result.food}
                </p>

              </div>

              <div className="bg-blue-100 p-5 rounded-xl">

                <h2 className="text-2xl font-bold">
                  ⭐ Health Score
                </h2>

                <p className="mt-3 text-xl">
                  {result.healthScore}
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-5 mt-6">

              <div className="bg-yellow-100 p-5 rounded-xl">
                <h3 className="font-bold">
                  Calories
                </h3>

                <p className="mt-3">
                  {result.calories}
                </p>
              </div>

              <div className="bg-pink-100 p-5 rounded-xl">
                <h3 className="font-bold">
                  Protein
                </h3>

                <p className="mt-3">
                  {result.protein}
                </p>
              </div>

              <div className="bg-orange-100 p-5 rounded-xl">
                <h3 className="font-bold">
                  Fat
                </h3>

                <p className="mt-3">
                  {result.fat}
                </p>
              </div>

            </div>

            <div className="bg-purple-100 p-5 rounded-xl mt-6">

              <h2 className="text-2xl font-bold">
                Carbohydrates
              </h2>

              <p className="mt-3">
                {result.carbs}
              </p>

            </div>

            <div className="bg-green-100 p-5 rounded-xl mt-8">

              <h2 className="text-2xl font-bold mb-5">

                🌿 Recommended HelloHarvest Products

              </h2>

              <div className="grid md:grid-cols-3 gap-4">
{result.recommendedProducts.map((item) => (
  <div
    key={item.id}
    className="bg-white rounded-xl shadow-lg p-5"
  >
    <img
      src={item.image}
      alt={item.name}
      className="w-full h-40 object-cover rounded-lg"
    />

    <h2 className="text-xl font-bold mt-3">
      {item.name}
    </h2>

    <p className="text-green-700 font-bold mt-2">
      ₹{item.price}
    </p>

    <button
      onClick={() => navigate(`/product/${item.id}`)}
      className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
    >
      View Product
    </button>
  </div>
))}
                
              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}