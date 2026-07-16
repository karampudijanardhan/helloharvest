import { useState } from "react";
import axios from "axios";

const API =import.meta.env.VITE_API_URL + "/api";

const AIHealthAdvisor = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [goal, setGoal] = useState("Diabetes");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const askAI = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(`${API}/ai/health`, {
  age,
  gender,
  goal,
});

      setResult(data);

    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-4xl font-bold text-center text-green-700">
        🌿 HelloHarvest AI Health Advisor
      </h1>

      <p className="text-center text-gray-500 mt-3">
        Get AI recommendations based on your health goal.
      </p>

      <div className="bg-white rounded-xl shadow-lg p-6 mt-10">

        <div className="grid md:grid-cols-3 gap-5">

          <div>
            <label className="font-semibold">
              Age
            </label>

            <input
              type="number"
              value={age}
              onChange={(e)=>setAge(e.target.value)}
              className="w-full border rounded-lg p-3 mt-2"
              placeholder="Enter Age"
            />
          </div>

          <div>

            <label className="font-semibold">
              Gender
            </label>

            <select
              className="w-full border rounded-lg p-3 mt-2"
              value={gender}
              onChange={(e)=>setGender(e.target.value)}
            >

              <option>Male</option>
              <option>Female</option>
              <option>Other</option>

            </select>

          </div>

          <div>

            <label className="font-semibold">
              Health Goal
            </label>

            <select
              className="w-full border rounded-lg p-3 mt-2"
              value={goal}
              onChange={(e)=>setGoal(e.target.value)}
            >

              <option>Diabetes</option>
              <option>Weight Loss</option>
              <option>Immunity</option>
              <option>Heart Health</option>
              <option>Digestion</option>
              <option>Energy</option>
              <option>Hair Growth</option>
              <option>Skin Care</option>
              <option>Protein</option>

            </select>

          </div>

        </div>

        <button
          onClick={askAI}
          className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

      </div>

      {result && (

        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-5">
            AI Recommendations
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {result.products.map((item,index)=>(

              <div
                key={index}
                className="border rounded-xl p-5 shadow hover:shadow-xl"
              >

                <h3 className="text-xl font-bold text-green-700">
                  {item.name}
                </h3>

                <p className="mt-3">
                  <strong>Reason :</strong>
                  <br/>
                  {item.reason}
                </p>

                <p className="mt-3">
                  <strong>Usage :</strong>
                  <br/>
                  {item.usage}
                </p>

                <button
                  className="mt-5 w-full bg-green-600 text-white rounded-lg py-2"
                >
                  View Product
                </button>

              </div>

            ))}

          </div>

          <div className="bg-green-50 p-5 rounded-xl mt-8">

            <h3 className="font-bold text-xl">
              Diet Tips
            </h3>

            <ul className="list-disc pl-5 mt-3">

              {result.tips.map((tip,index)=>(
                <li key={index}>
                  {tip}
                </li>
              ))}

            </ul>

          </div>

        </div>

      )}

    </div>
  );
};

export default AIHealthAdvisor;