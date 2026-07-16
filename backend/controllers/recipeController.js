import ai from "../services/geminiService.js";
import Product from "../models/Product.js";

export const generateRecipe = async (req, res) => {
  try {

    const { products, mealType, persons } = req.body;

    const allProducts = await Product.find();

    const productList = allProducts.map((p) => ({
      name: p.name,
      category: p.category,
      benefits: p.benefits,
      description: p.description,
    }));

    const prompt = `
You are HelloHarvest AI Recipe Generator.

Available Products

${JSON.stringify(productList)}

Selected Products

${products.join(", ")}

Meal Type

${mealType}

Persons

${persons}

Generate ONLY JSON.

{
"recipeName":"",
"ingredients":[
"",
""
],
"steps":[
"",
"",
""
],
"cookingTime":"",
"calories":"",
"benefits":[
"",
""
]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-flash-lite-latest",
      contents: prompt,
    });

    let text = response.text;

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    res.json(JSON.parse(text));

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });

  }
};