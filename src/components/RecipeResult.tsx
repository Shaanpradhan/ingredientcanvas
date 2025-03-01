
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

// Mock recipe data based on selected ingredients and preferences
const generateRecipe = (ingredients: Ingredient[], flavor: FlavorProfile | null, cuisine: Cuisine | null): Recipe => {
  // Base recipes by cuisine type
  const cuisineRecipes: Record<string, Partial<Recipe>> = {
    italian: {
      title: "Italian Pasta Primavera",
      description: "A light and fresh pasta dish with seasonal vegetables.",
      ingredients: [
        { name: "Pasta", amount: "250g" },
        { name: "Olive Oil", amount: "3 tbsp" },
        { name: "Garlic", amount: "3 cloves" },
        { name: "Cherry Tomatoes", amount: "200g" },
        { name: "Basil", amount: "handful" },
        { name: "Parmesan", amount: "50g" }
      ],
      instructions: [
        "Bring a large pot of salted water to a boil.",
        "Cook pasta according to package instructions.",
        "Heat olive oil and sauté garlic until fragrant.",
        "Add cherry tomatoes and cook until they begin to burst.",
        "Drain pasta and add to the pan with vegetables.",
        "Toss with fresh basil and grated parmesan."
      ]
    },
    mexican: {
      title: "Mexican Bean Bowl",
      description: "A hearty bowl with beans, rice, and fresh vegetables.",
      ingredients: [
        { name: "Black Beans", amount: "400g" },
        { name: "Rice", amount: "200g" },
        { name: "Avocado", amount: "1" },
        { name: "Lime", amount: "1" },
        { name: "Cilantro", amount: "handful" },
        { name: "Chili", amount: "1 small" }
      ],
      instructions: [
        "Cook rice according to package instructions.",
        "Heat beans in a saucepan with a pinch of cumin.",
        "Slice avocado and cut lime into wedges.",
        "Chop cilantro and thinly slice chili.",
        "Assemble bowl with rice, beans, avocado, and toppings.",
        "Squeeze lime juice over the top and garnish with cilantro."
      ]
    },
    asian: {
      title: "Asian Stir-Fry",
      description: "A quick and flavorful stir-fry with vegetables and your choice of protein.",
      ingredients: [
        { name: "Rice Noodles", amount: "200g" },
        { name: "Soy Sauce", amount: "3 tbsp" },
        { name: "Ginger", amount: "1 inch piece" },
        { name: "Garlic", amount: "2 cloves" },
        { name: "Mixed Vegetables", amount: "300g" },
        { name: "Sesame Oil", amount: "1 tbsp" }
      ],
      instructions: [
        "Soak rice noodles according to package instructions.",
        "Heat a wok or large pan over high heat.",
        "Add oil and quickly stir-fry ginger and garlic.",
        "Add vegetables and stir-fry until tender-crisp.",
        "Add drained noodles and soy sauce, toss to combine.",
        "Drizzle with sesame oil before serving."
      ]
    },
    mediterranean: {
      title: "Mediterranean Salad",
      description: "A fresh salad with olives, feta, and a lemon vinaigrette.",
      ingredients: [
        { name: "Cucumber", amount: "1" },
        { name: "Cherry Tomatoes", amount: "200g" },
        { name: "Red Onion", amount: "1/2" },
        { name: "Feta Cheese", amount: "100g" },
        { name: "Kalamata Olives", amount: "100g" },
        { name: "Olive Oil", amount: "3 tbsp" },
        { name: "Lemon", amount: "1" }
      ],
      instructions: [
        "Dice cucumber and halve cherry tomatoes.",
        "Thinly slice red onion.",
        "Combine vegetables in a large bowl.",
        "Crumble feta cheese over the top.",
        "Add kalamata olives.",
        "Whisk together olive oil, lemon juice, salt, and pepper.",
        "Drizzle dressing over salad and toss gently."
      ]
    },
    american: {
      title: "Classic Burger",
      description: "A juicy burger with all the toppings.",
      ingredients: [
        { name: "Ground Beef", amount: "500g" },
        { name: "Burger Buns", amount: "4" },
        { name: "Lettuce", amount: "4 leaves" },
        { name: "Tomato", amount: "1" },
        { name: "Onion", amount: "1/2" },
        { name: "Cheese", amount: "4 slices" },
        { name: "Ketchup", amount: "to taste" },
        { name: "Mustard", amount: "to taste" }
      ],
      instructions: [
        "Form beef into 4 equal-sized patties.",
        "Season patties with salt and pepper.",
        "Cook on a hot grill or pan for 3-4 minutes per side.",
        "Toast the burger buns lightly.",
        "Add cheese to patties in the last minute of cooking.",
        "Assemble burgers with lettuce, tomato, onion, and condiments."
      ]
    }
  };

  // Flavor modifiers
  const flavorModifiers: Record<string, { title: string, ingredient: { name: string, amount: string } }> = {
    spicy: { 
      title: "Spicy ", 
      ingredient: { name: "Red Chili Flakes", amount: "1 tsp" } 
    },
    sweet: { 
      title: "Sweet ", 
      ingredient: { name: "Honey", amount: "1 tbsp" } 
    },
    savory: { 
      title: "Savory ", 
      ingredient: { name: "Herbs de Provence", amount: "1 tsp" } 
    },
    tangy: { 
      title: "Tangy ", 
      ingredient: { name: "Lemon Juice", amount: "2 tbsp" } 
    },
    fresh: { 
      title: "Fresh ", 
      ingredient: { name: "Fresh Herbs", amount: "handful" } 
    }
  };

  // Default to Italian if no cuisine selected
  const selectedCuisine = cuisine || "italian";
  const baseRecipe = cuisineRecipes[selectedCuisine];
  
  // Create recipe with proper typing
  const recipe: Recipe = {
    title: baseRecipe.title || "Custom Recipe",
    description: baseRecipe.description || "A delicious recipe based on your preferences.",
    preparationTime: "20 min",
    cookingTime: "25 min",
    servings: 4,
    difficulty: "Medium",
    ingredients: [...(baseRecipe.ingredients || [])],
    instructions: [...(baseRecipe.instructions || [])],
    tips: [
      "Customize this recipe with your favorite herbs and spices.",
      "For a more substantial meal, add your choice of protein.",
      "Leftovers can be stored in the refrigerator for up to 3 days."
    ]
  };

  // Apply flavor modifier if selected
  if (flavor && flavorModifiers[flavor]) {
    recipe.title = flavorModifiers[flavor].title + recipe.title;
    recipe.ingredients.push(flavorModifiers[flavor].ingredient);
  }

  // Add any matching ingredients from user selection
  const selectedIngredientNames = ingredients.map(ing => ing.name.toLowerCase());
  
  // Add a tip about the selected ingredients
  if (ingredients.length > 0) {
    recipe.tips.unshift(`Make good use of your ${ingredients.map(i => i.name).join(', ')}.`);
  }

  return recipe;
};

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
