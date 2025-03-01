import React from "react";
import { motion } from "framer-motion";
import { Clock, Users, ArrowLeft, ChefHat, Utensils, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Ingredient } from "./IngredientItem";
import { cn } from "@/lib/utils";

// Types for flavor and cuisine
type FlavorProfile = "spicy" | "sweet" | "savory" | "tangy" | "fresh";
type Cuisine = "italian" | "mexican" | "asian" | "mediterranean" | "american";

// Recipe type definition
interface Recipe {
  title: string;
  description: string;
  preparationTime: string;
  cookingTime: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  ingredients: {
    name: string;
    amount: string;
  }[];
  instructions: string[];
  tips: string[];
}

// Generate recipe based on selected ingredients, flavor, and cuisine
const generateRecipe = (ingredients: Ingredient[], flavor: FlavorProfile | null, cuisine: Cuisine | null): Recipe => {
  // Default recipe structure
  const baseRecipe: Recipe = {
    title: "Custom Recipe",
    description: "A delicious recipe based on your preferences.",
    preparationTime: "20 min",
    cookingTime: "25 min",
    servings: 4,
    difficulty: "Medium",
    ingredients: [],
    instructions: [
      "Prepare all ingredients before starting.",
      "Follow the steps carefully for best results."
    ],
    tips: [
      "Customize this recipe with your favorite herbs and spices.",
      "For a more substantial meal, add your choice of protein.",
      "Leftovers can be stored in the refrigerator for up to 3 days."
    ]
  };

  // Convert selected ingredients to recipe ingredients
  const selectedIngredientsList = ingredients.map(ing => ({
    name: ing.name,
    amount: getRandomAmount(ing.name)
  }));

  // Add selected ingredients to recipe
  baseRecipe.ingredients = selectedIngredientsList;

  // Add basic ingredients that are usually needed
  if (selectedIngredientsList.length > 0 && !selectedIngredientsList.some(ing => ing.name === "Salt")) {
    baseRecipe.ingredients.push({ name: "Salt", amount: "to taste" });
  }
  
  if (selectedIngredientsList.length > 0 && !selectedIngredientsList.some(ing => ing.name === "Pepper")) {
    baseRecipe.ingredients.push({ name: "Pepper", amount: "to taste" });
  }

  // Apply flavor modifier
  if (flavor) {
    const flavoringredient = getFlavorIngredient(flavor);
    if (flavoringredient && !baseRecipe.ingredients.some(ing => ing.name === flavoringredient.name)) {
      baseRecipe.ingredients.push(flavoringredient);
    }
  }

  // Generate title based on ingredients, flavor and cuisine
  baseRecipe.title = generateTitle(selectedIngredientsList, flavor, cuisine);

  // Generate appropriate instructions based on ingredients and cuisine
  baseRecipe.instructions = generateInstructions(selectedIngredientsList, cuisine, flavor);

  // Generate description based on ingredients, flavor, and cuisine
  baseRecipe.description = generateDescription(selectedIngredientsList, flavor, cuisine);

  // Add tips based on specific ingredients
  baseRecipe.tips = generateTips(selectedIngredientsList, flavor, cuisine);

  return baseRecipe;
};

// New function to generate unique recipe titles
const generateTitle = (
  ingredients: { name: string, amount: string }[],
  flavor: FlavorProfile | null,
  cuisine: Cuisine | null
): string => {
  if (ingredients.length === 0) {
    return "Custom Recipe";
  }

  // Get primary ingredient - usually a protein or the first important ingredient
  const proteins = ingredients.filter(ing => 
    ["Beef", "Chicken", "Fish", "Pork", "Tofu", "Shrimp", "Eggs"].includes(ing.name)
  );
  
  const mainVegetables = ingredients.filter(ing => 
    ["Carrot", "Broccoli", "Spinach", "Tomato", "Bell Pepper", "Potato"].includes(ing.name)
  );

  const herbs = ingredients.filter(ing => 
    ["Basil", "Oregano", "Cilantro", "Parsley", "Thyme", "Rosemary"].includes(ing.name)
  );

  // Determine main ingredient for the title
  let mainIngredient = "";
  if (proteins.length > 0) {
    mainIngredient = proteins[0].name;
  } else if (mainVegetables.length > 0) {
    mainIngredient = mainVegetables[0].name;
  } else if (ingredients.length > 0) {
    mainIngredient = ingredients[0].name;
  }

  // Determine secondary ingredient for complexity
  let secondaryIngredient = "";
  if (proteins.length > 0 && mainVegetables.length > 0) {
    secondaryIngredient = ` with ${mainVegetables[0].name}`;
  } else if (mainVegetables.length > 1) {
    secondaryIngredient = ` with ${mainVegetables[1].name}`;
  } else if (herbs.length > 0) {
    secondaryIngredient = ` with ${herbs[0].name}`;
  }

  // Generate title based on cuisine
  let cuisinePrefix = "";
  if (cuisine) {
    switch (cuisine) {
      case "italian":
        cuisinePrefix = "Italian ";
        break;
      case "mexican":
        cuisinePrefix = "Mexican ";
        break;
      case "asian":
        cuisinePrefix = "Asian ";
        break;
      case "mediterranean":
        cuisinePrefix = "Mediterranean ";
        break;
      case "american":
        cuisinePrefix = "American ";
        break;
    }
  }

  // Generate title based on flavor
  let flavorAdjective = "";
  if (flavor) {
    switch (flavor) {
      case "spicy":
        flavorAdjective = "Spicy ";
        break;
      case "sweet":
        flavorAdjective = "Sweet ";
        break;
      case "savory":
        flavorAdjective = "Savory ";
        break;
      case "tangy":
        flavorAdjective = "Tangy ";
        break;
      case "fresh":
        flavorAdjective = "Fresh ";
        break;
    }
  }

  // Generate dish type based on ingredients and cuisine
  let dishType = "Dish";
  
  if (cuisine === "italian" && ingredients.some(ing => ing.name === "Pasta")) {
    dishType = "Pasta";
  } else if (cuisine === "italian" && ingredients.some(ing => ing.name === "Rice")) {
    dishType = "Risotto";
  } else if (cuisine === "mexican" && (ingredients.some(ing => ing.name === "Tortilla") || ingredients.some(ing => ing.name === "Corn"))) {
    dishType = "Tacos";
  } else if (cuisine === "asian" && ingredients.some(ing => ing.name === "Rice")) {
    dishType = "Stir-Fry";
  } else if (cuisine === "mediterranean" && (ingredients.some(ing => ing.name === "Eggplant") || ingredients.some(ing => ing.name === "Zucchini"))) {
    dishType = "Casserole";
  } else if (proteins.length > 0 && mainVegetables.length > 2) {
    dishType = "Bowl";
  } else if (ingredients.some(ing => ing.name === "Bread") || ingredients.some(ing => ing.name === "Tortilla")) {
    dishType = "Sandwich";
  } else if (ingredients.some(ing => ing.name === "Rice") || ingredients.some(ing => ing.name === "Quinoa")) {
    dishType = "Bowl";
  }

  return `${flavorAdjective}${cuisinePrefix}${mainIngredient}${secondaryIngredient} ${dishType}`;
};

// Helper functions for recipe generation
const getRandomAmount = (ingredientName: string): string => {
  const units = {
    protein: ["200g", "250g", "300g", "2 fillets", "4 pieces"],
    vegetable: ["1 cup", "200g", "2 medium", "3 small", "1 large"],
    grain: ["200g", "1 cup", "250g"],
    dairy: ["100g", "2 tbsp", "1/4 cup", "3 tbsp"],
    spice: ["1 tsp", "2 tsp", "1 tbsp", "a pinch", "to taste"]
  };

  const proteinIngredients = ["Beef", "Chicken", "Fish", "Pork", "Tofu", "Shrimp", "Eggs"];
  const vegetableIngredients = ["Carrot", "Broccoli", "Spinach", "Tomato", "Onion", "Garlic", "Potato", "Bell Pepper"];
  const grainIngredients = ["Rice", "Pasta", "Bread", "Quinoa", "Oats"];
  const dairyIngredients = ["Milk", "Cheese", "Yogurt", "Butter"];
  const spiceIngredients = ["Salt", "Pepper", "Oregano", "Basil", "Thyme", "Paprika", "Cumin"];

  let category = "vegetable";
  if (proteinIngredients.includes(ingredientName)) category = "protein";
  else if (grainIngredients.includes(ingredientName)) category = "grain";
  else if (dairyIngredients.includes(ingredientName)) category = "dairy";
  else if (spiceIngredients.includes(ingredientName)) category = "spice";

  const amountOptions = units[category as keyof typeof units];
  return amountOptions[Math.floor(Math.random() * amountOptions.length)];
};

const getFlavorIngredient = (flavor: FlavorProfile): { name: string, amount: string } | null => {
  switch (flavor) {
    case "spicy":
      return { name: "Red Chili Flakes", amount: "1 tsp" };
    case "sweet":
      return { name: "Honey", amount: "2 tbsp" };
    case "savory":
      return { name: "Herbs de Provence", amount: "1 tsp" };
    case "tangy":
      return { name: "Lemon Juice", amount: "2 tbsp" };
    case "fresh":
      return { name: "Fresh Herbs", amount: "handful" };
    default:
      return null;
  }
};

const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getCuisineAdjective = (cuisine: Cuisine): string => {
  switch (cuisine) {
    case "italian":
      return "Italian";
    case "mexican":
      return "Mexican";
    case "asian":
      return "Asian";
    case "mediterranean":
      return "Mediterranean";
    case "american":
      return "American";
    default:
      return "Fusion";
  }
};

const generateInstructions = (
  ingredients: { name: string, amount: string }[], 
  cuisine: Cuisine | null, 
  flavor: FlavorProfile | null
): string[] => {
  const instructions: string[] = [];
  
  // Basic preparation steps
  const proteins = ingredients.filter(ing => 
    ["Beef", "Chicken", "Fish", "Pork", "Tofu", "Shrimp"].includes(ing.name)
  );
  
  const vegetables = ingredients.filter(ing => 
    ["Carrot", "Broccoli", "Spinach", "Tomato", "Onion", "Garlic", "Potato", "Bell Pepper"].includes(ing.name)
  );

  const grains = ingredients.filter(ing => 
    ["Rice", "Pasta", "Bread", "Quinoa", "Oats"].includes(ing.name)
  );

  // Preparation steps
  if (vegetables.length > 0) {
    instructions.push(`Wash and chop ${vegetables.map(v => v.name.toLowerCase()).join(", ")}.`);
  }

  if (proteins.length > 0) {
    instructions.push(`Prepare ${proteins.map(p => p.name.toLowerCase()).join(", ")} by cutting into bite-sized pieces.`);
  }

  // Cooking methods based on cuisine
  if (cuisine === "italian") {
    if (ingredients.some(ing => ing.name === "Pasta")) {
      instructions.push("Bring a large pot of salted water to a boil and cook pasta according to package instructions.");
    }
    if (ingredients.some(ing => ing.name === "Garlic")) {
      instructions.push("Sauté garlic in olive oil until fragrant.");
    }
    if (vegetables.length > 0) {
      instructions.push(`Add ${vegetables.map(v => v.name.toLowerCase()).join(", ")} and cook until tender.`);
    }
    if (proteins.length > 0) {
      instructions.push(`Cook ${proteins.map(p => p.name.toLowerCase()).join(", ")} until done.`);
    }
    instructions.push("Combine all ingredients, season with salt and pepper, and serve hot.");
  } 
  else if (cuisine === "mexican") {
    if (ingredients.some(ing => ing.name === "Rice")) {
      instructions.push("Cook rice according to package instructions.");
    }
    if (ingredients.some(ing => ing.name === "Onion") || ingredients.some(ing => ing.name === "Bell Pepper")) {
      instructions.push("Sauté onions and bell peppers until soft.");
    }
    if (proteins.length > 0) {
      instructions.push(`Cook ${proteins.map(p => p.name.toLowerCase()).join(", ")} with Mexican spices until done.`);
    }
    instructions.push("Combine all ingredients, add your favorite Mexican toppings, and serve warm.");
  }
  else if (cuisine === "asian") {
    if (ingredients.some(ing => ing.name === "Rice")) {
      instructions.push("Cook rice according to package instructions.");
    }
    if (ingredients.some(ing => ing.name === "Garlic")) {
      instructions.push("Heat oil in a wok and add garlic.");
    }
    if (vegetables.length > 0) {
      instructions.push(`Stir-fry ${vegetables.map(v => v.name.toLowerCase()).join(", ")} until tender-crisp.`);
    }
    if (proteins.length > 0) {
      instructions.push(`Add ${proteins.map(p => p.name.toLowerCase()).join(", ")} and cook until done.`);
    }
    instructions.push("Season with soy sauce and serve hot over rice.");
  }
  else if (cuisine === "mediterranean") {
    if (ingredients.some(ing => ing.name === "Garlic") || ingredients.some(ing => ing.name === "Onion")) {
      instructions.push("Sauté garlic and onions in olive oil.");
    }
    if (vegetables.length > 0) {
      instructions.push(`Add ${vegetables.map(v => v.name.toLowerCase()).join(", ")} and cook until tender.`);
    }
    if (proteins.length > 0) {
      instructions.push(`Cook ${proteins.map(p => p.name.toLowerCase()).join(", ")} until done.`);
    }
    instructions.push("Add fresh herbs, lemon juice, and serve with a drizzle of olive oil.");
  }
  else if (cuisine === "american") {
    if (proteins.length > 0) {
      instructions.push(`Season ${proteins.map(p => p.name.toLowerCase()).join(", ")} and cook to desired doneness.`);
    }
    if (vegetables.length > 0) {
      instructions.push(`Prepare ${vegetables.map(v => v.name.toLowerCase()).join(", ")} as a side dish.`);
    }
    if (grains.length > 0) {
      instructions.push(`Serve with ${grains.map(g => g.name.toLowerCase()).join(", ")}.`);
    }
    instructions.push("Plate everything together and enjoy your meal.");
  }
  else {
    // Generic instructions if no cuisine specified
    if (vegetables.length > 0) {
      instructions.push(`Cook ${vegetables.map(v => v.name.toLowerCase()).join(", ")} until tender.`);
    }
    if (proteins.length > 0) {
      instructions.push(`Prepare ${proteins.map(p => p.name.toLowerCase()).join(", ")} according to your preference.`);
    }
    if (grains.length > 0) {
      instructions.push(`Serve with ${grains.map(g => g.name.toLowerCase()).join(", ")}.`);
    }
    instructions.push("Combine all ingredients, season to taste, and serve.");
  }

  // Flavor specific instructions
  if (flavor === "spicy" && instructions.length > 0) {
    instructions.splice(Math.floor(instructions.length / 2), 0, "Add red chili flakes for heat.");
  } else if (flavor === "sweet" && instructions.length > 0) {
    instructions.splice(Math.floor(instructions.length / 2), 0, "Stir in honey for sweetness.");
  } else if (flavor === "tangy" && instructions.length > 0) {
    instructions.splice(Math.floor(instructions.length / 2), 0, "Add fresh lemon juice for tanginess.");
  } else if (flavor === "fresh" && instructions.length > 0) {
    instructions.push("Garnish with fresh herbs before serving.");
  }

  return instructions;
};

const generateDescription = (
  ingredients: { name: string, amount: string }[], 
  flavor: FlavorProfile | null, 
  cuisine: Cuisine | null
): string => {
  const flavorText = flavor ? `${flavor} ` : "";
  const cuisineText = cuisine ? `${getCuisineAdjective(cuisine)} ` : "";
  
  const mainIngredients = ingredients.slice(0, 3).map(ing => ing.name.toLowerCase());
  
  if (mainIngredients.length === 0) {
    return `A delicious ${flavorText}${cuisineText}dish prepared to your preferences.`;
  }
  
  if (mainIngredients.length === 1) {
    return `A delicious ${flavorText}${cuisineText}dish featuring ${mainIngredients[0]}.`;
  }
  
  if (mainIngredients.length === 2) {
    return `A delicious ${flavorText}${cuisineText}dish featuring ${mainIngredients[0]} and ${mainIngredients[1]}.`;
  }
  
  return `A delicious ${flavorText}${cuisineText}dish featuring ${mainIngredients[0]}, ${mainIngredients[1]}, and ${mainIngredients[2]}.`;
};

const generateTips = (
  ingredients: { name: string, amount: string }[], 
  flavor: FlavorProfile | null, 
  cuisine: Cuisine | null
): string[] => {
  const tips: string[] = [
    "Customize this recipe with your favorite herbs and spices."
  ];
  
  // Add tips based on ingredients
  if (ingredients.some(ing => ["Beef", "Chicken", "Fish", "Pork"].includes(ing.name))) {
    tips.push("Make sure to cook proteins to the proper internal temperature for food safety.");
  }
  
  if (ingredients.some(ing => ing.name === "Pasta")) {
    tips.push("For the perfect pasta, cook it al dente and save some pasta water to add to your sauce.");
  }
  
  if (ingredients.some(ing => ing.name === "Rice")) {
    tips.push("Rinse rice before cooking to remove excess starch and get fluffier results.");
  }
  
  // Add flavor-specific tips
  if (flavor === "spicy") {
    tips.push("Adjust the level of spiciness by adding more or less chili flakes.");
  } else if (flavor === "sweet") {
    tips.push("Balance the sweetness with a touch of acidity like vinegar or citrus juice.");
  } else if (flavor === "tangy") {
    tips.push("Fresh citrus zest can enhance the tangy flavor profile even more.");
  } else if (flavor === "fresh") {
    tips.push("Add the fresh herbs at the very end to preserve their flavor and aroma.");
  } else if (flavor === "savory") {
    tips.push("A splash of soy sauce or a sprinkle of nutritional yeast can enhance savory flavors.");
  }
  
  // Add cuisine-specific tips
  if (cuisine === "italian") {
    tips.push("Finish with a drizzle of good quality olive oil and fresh basil.");
  } else if (cuisine === "mexican") {
    tips.push("Serve with warm tortillas and your favorite salsa on the side.");
  } else if (cuisine === "asian") {
    tips.push("A final touch of sesame oil and seeds adds beautiful aroma and texture.");
  } else if (cuisine === "mediterranean") {
    tips.push("Try adding olives, capers, or sun-dried tomatoes for an authentic Mediterranean flavor.");
  } else if (cuisine === "american") {
    tips.push("This dish pairs well with a simple green salad and your favorite dressing.");
  }
  
  return tips;
};

interface RecipeResultProps {
  selectedIngredients: Ingredient[];
  flavorProfile: FlavorProfile | null;
  cuisine: Cuisine | null;
  onBack: () => void;
}

const RecipeResult = ({ selectedIngredients, flavorProfile, cuisine, onBack }: RecipeResultProps) => {
  // Generate a recipe based on the selectedIngredients, flavorProfile, and cuisine
  const recipe = generateRecipe(selectedIngredients, flavorProfile, cuisine);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="mb-8">
        <Button
          variant="ghost"
          className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to ingredients
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="space-y-2 mb-6">
            <div className="flex items-center">
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium flex items-center">
                <ChefHat className="h-3 w-3 mr-1" />
                <span>Recipe</span>
              </div>
            </div>
            <h1 className="text-3xl font-semibold">{recipe.title}</h1>
            <p className="text-muted-foreground">{recipe.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-8">
            <div className="bg-secondary flex flex-col items-center justify-center p-3 rounded-lg">
              <div className="flex items-center text-primary/70 mb-1">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium uppercase">Prep Time</span>
              </div>
              <span className="font-medium">{recipe.preparationTime}</span>
            </div>
            <div className="bg-secondary flex flex-col items-center justify-center p-3 rounded-lg">
              <div className="flex items-center text-primary/70 mb-1">
                <Utensils className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium uppercase">Cook Time</span>
              </div>
              <span className="font-medium">{recipe.cookingTime}</span>
            </div>
            <div className="bg-secondary flex flex-col items-center justify-center p-3 rounded-lg">
              <div className="flex items-center text-primary/70 mb-1">
                <Users className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium uppercase">Servings</span>
              </div>
              <span className="font-medium">{recipe.servings}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <ScrollText className="h-5 w-5 mr-2 text-primary/80" />
              <h2 className="text-xl font-medium">Ingredients</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-baseline justify-between pb-2 border-b border-border">
                  <span>{ingredient.name}</span>
                  <span className="text-muted-foreground text-sm">{ingredient.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Utensils className="h-5 w-5 mr-2 text-primary/80" />
              <h2 className="text-xl font-medium">Instructions</h2>
            </div>
            <ol className="space-y-4 list-decimal list-inside">
              {recipe.instructions.map((instruction, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="pb-2 pl-2"
                >
                  <span className="ml-2">{instruction}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {recipe.tips.length > 0 && (
            <div className="bg-secondary/50 border border-border rounded-lg p-4">
              <h3 className="font-medium mb-2">Chef's Tips</h3>
              <ul className="space-y-2 text-sm">
                {recipe.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RecipeResult;
