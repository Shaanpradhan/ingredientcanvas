
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

// Mock recipe data
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

const mockRecipe: Recipe = {
  title: "Creamy Pasta with Vegetables",
  description: "A delicious pasta dish with fresh vegetables and a creamy sauce.",
  preparationTime: "15 min",
  cookingTime: "20 min",
  servings: 4,
  difficulty: "Easy",
  ingredients: [
    { name: "Pasta", amount: "250g" },
    { name: "Broccoli", amount: "1 head" },
    { name: "Carrots", amount: "2 medium" },
    { name: "Garlic", amount: "3 cloves" },
    { name: "Onion", amount: "1 medium" },
    { name: "Heavy Cream", amount: "200ml" },
    { name: "Parmesan", amount: "50g" },
    { name: "Olive Oil", amount: "2 tbsp" },
    { name: "Salt", amount: "to taste" },
    { name: "Pepper", amount: "to taste" }
  ],
  instructions: [
    "Bring a large pot of salted water to a boil.",
    "Meanwhile, chop all vegetables into bite-sized pieces.",
    "Heat olive oil in a large pan over medium heat.",
    "Add onion and garlic, sauté until translucent.",
    "Add carrots and cook for 5 minutes.",
    "Add broccoli and cook for another 3 minutes.",
    "Cook pasta according to package instructions.",
    "Add cream to the vegetables and bring to a simmer.",
    "Drain pasta and add to the pan with vegetables.",
    "Add grated parmesan, salt, and pepper.",
    "Toss everything together and serve hot."
  ],
  tips: [
    "Use freshly grated parmesan for best results.",
    "For a lighter version, substitute heavy cream with half-and-half.",
    "Add a splash of white wine before adding the cream for extra flavor."
  ]
};

interface RecipeResultProps {
  selectedIngredients: Ingredient[];
  flavorProfile: FlavorProfile | null;
  cuisine: Cuisine | null;
  onBack: () => void;
}

const RecipeResult = ({ selectedIngredients, flavorProfile, cuisine, onBack }: RecipeResultProps) => {
  // In a real app, we would use the selectedIngredients, flavorProfile, and cuisine to generate a recipe
  // For now, we'll just use the mock recipe

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
            <h1 className="text-3xl font-semibold">{mockRecipe.title}</h1>
            <p className="text-muted-foreground">{mockRecipe.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-8">
            <div className="bg-secondary flex flex-col items-center justify-center p-3 rounded-lg">
              <div className="flex items-center text-primary/70 mb-1">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium uppercase">Prep Time</span>
              </div>
              <span className="font-medium">{mockRecipe.preparationTime}</span>
            </div>
            <div className="bg-secondary flex flex-col items-center justify-center p-3 rounded-lg">
              <div className="flex items-center text-primary/70 mb-1">
                <Utensils className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium uppercase">Cook Time</span>
              </div>
              <span className="font-medium">{mockRecipe.cookingTime}</span>
            </div>
            <div className="bg-secondary flex flex-col items-center justify-center p-3 rounded-lg">
              <div className="flex items-center text-primary/70 mb-1">
                <Users className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium uppercase">Servings</span>
              </div>
              <span className="font-medium">{mockRecipe.servings}</span>
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
              {mockRecipe.ingredients.map((ingredient, index) => (
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
              {mockRecipe.instructions.map((instruction, index) => (
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
          {mockRecipe.tips.length > 0 && (
            <div className="bg-secondary/50 border border-border rounded-lg p-4">
              <h3 className="font-medium mb-2">Chef's Tips</h3>
              <ul className="space-y-2 text-sm">
                {mockRecipe.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="font-bold text-primary mr-2">•</span>
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
