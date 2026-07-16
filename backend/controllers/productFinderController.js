import ai from "../services/geminiService.js";
import { mockProducts } from "../data/mockProducts.js";

export const productFinder = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || query.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Query is required",
      });
    }

    // Mock Products
    const productList = mockProducts.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      description: p.description,
      benefits: Array.isArray(p.benefits)
        ? p.benefits.join(", ")
        : p.benefits,
      price: p.prices ? Object.values(p.prices)[0] : "",
      image: p.image,
    }));

    const prompt = `
You are HelloHarvest AI Product Finder.

Recommend ONLY from the products below.

Products:
${JSON.stringify(productList)}

User Query:
${query}

Rules:
1. Recommend at least 3 products if possible.
2. Never return an empty products array.
3. If there is no exact match, recommend the closest matching products.
4. Return ONLY valid JSON.

Example:

{
  "products":[
    {
      "id":"1",
      "name":"Foxtail Millet",
      "reason":"Good for diabetes",
      "benefits":"High Fiber, Low GI",
      "price":"220",
      "image":"image-url"
    }
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

    console.log("Gemini Response:");
    console.log(text);

    const data = JSON.parse(text);

    res.json(data);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};