import { useState } from "react";
import axios from "axios";

const API = "http://localhost:10000/api";

export default function AIMealPlanner() {

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [goal, setGoal] = useState("Weight Loss");

  const [loading, setLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState([]);
  const [error, setError] = useState("");

  const generateMealPlan = async () => {

    if (!age) {
      alert("Please enter your age");
      return;
    }

    try {

      setLoading(true);
      setError("");

      const { data } = await axios.post(
        `${API}/meal-planner`,
        {
          age,
          gender,
          goal
        }
      );

      console.log(data);

      setMealPlan(data.days || []);

    } catch (err) {

      console.log(err);

      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Server Error");
      }

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-green-50">

      <div className="max-w-6xl mx-auto py-10 px-5">

        <h1 className="text-4xl font-bold text-center text-green-700">

          🥗 AI Meal Planner

        </h1>

        <p className="text-center text-gray-500 mt-2">

          Get your personalized 7-day healthy meal plan.

        </p>

        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

          <div className="grid md:grid-cols-3 gap-5">

            <div>

              <label className="font-semibold">

                Age

              </label>

              <input
                type="number"
                className="w-full border rounded-lg p-3 mt-2"
                placeholder="Enter Age"
                value={age}
                onChange={(e)=>setAge(e.target.value)}
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

              </select>

            </div>

            <div>

              <label className="font-semibold">

                Goal

              </label>

              <select
                className="w-full border rounded-lg p-3 mt-2"
                value={goal}
                onChange={(e)=>setGoal(e.target.value)}
              >

                <option>Weight Loss</option>
                <option>Weight Gain</option>
                <option>Diabetes</option>
                <option>Immunity</option>
                <option>Heart Health</option>
                <option>Protein</option>

              </select>

            </div>

          </div>

          <button

            onClick={generateMealPlan}

            className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"

          >

            {

              loading

              ?

              "Generating..."

              :

              "Generate AI Meal Plan"

            }

          </button>

          {

            error && (

              <p className="text-red-600 mt-4">

                {error}

              </p>

            )

          }

              </div>
              {/* Meal Plan */}

        {mealPlan.length > 0 && (

          <div className="mt-12">

            <h2 className="text-3xl font-bold text-center text-green-700 mb-8">

              📅 Your 7-Day AI Meal Plan

            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {mealPlan.map((day, index) => (

                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-green-100"
                >

                  <div className="flex justify-between items-center">

                    <h3 className="text-2xl font-bold text-green-700">

                      {day.day}

                    </h3>

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                      Day {index + 1}

                    </span>

                  </div>

                  <div className="mt-6 space-y-5">

                    <div className="bg-yellow-50 rounded-xl p-4">

                      <h4 className="font-bold text-lg">

                        🍳 Breakfast

                      </h4>

                      <p className="mt-2 text-gray-700">

                        {day.breakfast}

                      </p>

                    </div>

                    <div className="bg-orange-50 rounded-xl p-4">

                      <h4 className="font-bold text-lg">

                        🍛 Lunch

                      </h4>

                      <p className="mt-2 text-gray-700">

                        {day.lunch}

                      </p>

                    </div>

                    <div className="bg-blue-50 rounded-xl p-4">

                      <h4 className="font-bold text-lg">

                        🌙 Dinner

                      </h4>

                      <p className="mt-2 text-gray-700">

                        {day.dinner}

                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

      </div>

    </div>

  );

}