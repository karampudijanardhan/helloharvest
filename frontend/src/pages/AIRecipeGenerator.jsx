import { useState } from "react";
import axios from "axios";

const API =import.meta.env.VITE_API_URL + "/api";

export default function AIRecipeGenerator() {

  const [products, setProducts] = useState("");

  const [mealType, setMealType] = useState("Breakfast");

  const [persons, setPersons] = useState(2);

  const [recipe, setRecipe] = useState(null);

  const [loading, setLoading] = useState(false);

  const generate = async () => {

    try {

      setLoading(true);

      const { data } = await axios.post(
        `${API}/recipe/generate`,
        {
          products: products.split(","),
          mealType,
          persons,
        }
      );

      setRecipe(data);

    } catch (err) {

      console.log(err);

      alert("Recipe Generation Failed");

    }

    setLoading(false);

  };

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-4xl font-bold text-green-700">
        🍲 AI Recipe Generator
      </h1>

      <textarea
        placeholder="Honey,Foxtail Millet,Moringa Powder"
        className="border w-full mt-6 p-4 rounded"
        rows={4}
        value={products}
        onChange={(e)=>setProducts(e.target.value)}
      />

      <select
        className="border p-3 rounded mt-4 w-full"
        value={mealType}
        onChange={(e)=>setMealType(e.target.value)}
      >
        <option>Breakfast</option>
        <option>Lunch</option>
        <option>Dinner</option>
        <option>Snack</option>
      </select>

      <input
        type="number"
        className="border mt-4 p-3 rounded w-full"
        value={persons}
        onChange={(e)=>setPersons(e.target.value)}
      />

      <button
        onClick={generate}
        className="bg-green-600 text-white px-8 py-3 rounded mt-6"
      >
        {loading ? "Generating..." : "Generate Recipe"}
      </button>

      {recipe && (

        <div className="mt-10">

          <h2 className="text-3xl font-bold">
            {recipe.recipeName}
          </h2>

          <h3 className="mt-5 font-bold">
            Ingredients
          </h3>

          <ul className="list-disc pl-6">
            {recipe.ingredients.map((i,index)=>(
              <li key={index}>{i}</li>
            ))}
          </ul>

          <h3 className="mt-5 font-bold">
            Steps
          </h3>

          <ol className="list-decimal pl-6">
            {recipe.steps.map((s,index)=>(
              <li key={index}>{s}</li>
            ))}
          </ol>

          <div className="mt-6">
            <p>
              ⏱ {recipe.cookingTime}
            </p>

            <p>
              🔥 {recipe.calories}
            </p>
          </div>

        </div>

      )}

    </div>
  );
}