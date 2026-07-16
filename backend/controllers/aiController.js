import ai from "../services/geminiService.js";
import Product from "../models/Product.js";

const MODELS = [
  "gemini-flash-lite-latest",
];

async function generateResponse(prompt) {
  let lastError;

  for (const model of MODELS) {
    try {
      console.log(`Trying Model: ${model}`);

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      return response.text;

    } catch (err) {
      console.log(`❌ ${model} failed`);

      lastError = err;

      // Try next model
      continue;
    }
  }

  throw lastError;
}

export const healthAdvisor = async (req, res) => {
  try {
    const { age, gender, goal } = req.body;

    const products = await Product.find();

    const productList = products.map((p) => ({
      name: p.name,
      category: p.category,
      description: p.description,
      benefits: p.benefits,
      prices: p.prices,
    }));

    const prompt = `
You are HelloHarvest AI Health Advisor.

Recommend ONLY products available below.

Products:
${JSON.stringify(productList)}

User Details

Age: ${age}

Gender: ${gender}

Goal: ${goal}

Return ONLY valid JSON.

Example:

{
  "products":[
    {
      "name":"Foxtail Millet Powder",
      "reason":"Good for diabetes",
      "usage":"Breakfast"
    }
  ],
  "tips":[
    "Exercise daily",
    "Drink more water"
  ]
}
`;

    let text = await generateResponse(prompt);

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const data = JSON.parse(text);

    res.json(data);

  } catch (error) {

    console.error(error);

    if (error.status === 503) {
      return res.status(503).json({
        success: false,
        message: "AI is busy. Please try again after a few seconds."
      });
    }

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};