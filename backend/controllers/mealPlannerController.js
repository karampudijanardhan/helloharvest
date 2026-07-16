import ai from "../services/geminiService.js";

export const mealPlanner = async (req, res) => {
  try {
    const { age, gender, goal } = req.body;

    if (!age || !gender || !goal) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const prompt = `
Create a healthy 7-day meal plan.

Age: ${age}
Gender: ${gender}
Goal: ${goal}

Return ONLY JSON.

{
  "days":[
    {
      "day":"Monday",
      "breakfast":"...",
      "lunch":"...",
      "dinner":"..."
    }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-flash-lite-latest",
      contents: prompt,
    });

    let text = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    res.json(JSON.parse(text));

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};