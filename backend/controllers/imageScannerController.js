import path from "path";

export const scanFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image required",
      });
    }

    const fileName = path
      .basename(req.file.originalname)
      .toLowerCase();

    let result = {
      food: "Unknown Food",
      calories: "N/A",
      protein: "N/A",
      fat: "N/A",
      carbs: "N/A",
      healthScore: "7/10",
      recommendedProducts: [],
    };

    // Apple
    if (fileName.includes("apple")) {
      result = {
        food: "Apple",
        calories: "95 kcal",
        protein: "0.5 g",
        fat: "0.3 g",
        carbs: "25 g",
        healthScore: "9.5 / 10",
        recommendedProducts: [
          "Apple Powder",
          "Natural Honey",
          "Dry Dates Powder",
        ],
      };
    }

    // Banana
    else if (fileName.includes("banana")) {
      result = {
        food: "Banana",
        calories: "105 kcal",
        protein: "1.3 g",
        fat: "0.4 g",
        carbs: "27 g",
        healthScore: "9 / 10",
        recommendedProducts: [
          "Banana Powder",
          "Natural Honey",
          "Foxtail Millet",
        ],
      };
    }

    // Mango
    else if (fileName.includes("mango")) {
      result = {
        food: "Mango",
        calories: "99 kcal",
        protein: "1.4 g",
        fat: "0.6 g",
        carbs: "25 g",
        healthScore: "8.8 / 10",
        recommendedProducts: [
          "Mango Powder",
          "Natural Honey",
          "Little Millet",
        ],
      };
    }

    // Rice
    else if (fileName.includes("rice")) {
      result = {
        food: "Rice",
        calories: "205 kcal",
        protein: "4.3 g",
        fat: "0.4 g",
        carbs: "45 g",
        healthScore: "7.8 / 10",
        recommendedProducts: [
          "Foxtail Millet",
          "Little Millet",
          "Barnyard Millet",
        ],
      };
    }

    // Tomato
    else if (fileName.includes("tomato")) {
      result = {
        food: "Tomato",
        calories: "22 kcal",
        protein: "1 g",
        fat: "0.2 g",
        carbs: "5 g",
        healthScore: "9.2 / 10",
        recommendedProducts: [
          "Tomato Powder",
          "Moringa Powder",
          "Natural Honey",
        ],
      };
    }

    // Default
    else {
      result = {
        food: "Healthy Food",
        calories: "100 kcal",
        protein: "3 g",
        fat: "2 g",
        carbs: "20 g",
        healthScore: "8 / 10",
       recommendedProducts: [
  {
    id: "v3",
    name: "Tomato Powder",
    image: "/tomatopowder.png",
    price: 179
  },
  {
    id: "l1",
    name: "Moringa Powder",
    image: "/maringa leaves powder.png",
    price: 209
  },
  {
    id: "h1",
    name: "Natural Raw Honey",
    image: "/image (1).png",
    price: 224
  }
]      };
    }

    res.json(result);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};