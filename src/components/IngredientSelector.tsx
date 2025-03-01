
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Beef, Fish, Carrot, Wheat, Cherry, 
  Egg, Milk, Search, XCircle, ArrowRight,
  Cookie, Soup, ArrowLeft
} from "lucide-react";
import IngredientCategory from "./IngredientCategory";
import IngredientItem, { Ingredient } from "./IngredientItem";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FlavorProfile = "spicy" | "sweet" | "savory" | "tangy" | "fresh";
type Cuisine = "italian" | "mexican" | "asian" | "mediterranean" | "american";

// Enhanced mock ingredient data with colors
const ingredientsData: (Ingredient & { color?: string })[] = [
  // Proteins
  { id: "beef", name: "Beef", icon: <Beef size={24} className="text-red-600" />, category: "protein", color: "text-red-600" },
  { id: "chicken", name: "Chicken", icon: <Beef size={24} className="text-amber-600" />, category: "protein", color: "text-amber-600" },
  { id: "fish", name: "Fish", icon: <Fish size={24} className="text-blue-500" />, category: "protein", color: "text-blue-500" },
  { id: "pork", name: "Pork", icon: <Beef size={24} className="text-pink-600" />, category: "protein", color: "text-pink-600" },
  { id: "tofu", name: "Tofu", icon: <Beef size={24} className="text-gray-600" />, category: "protein", color: "text-gray-600" },
  { id: "shrimp", name: "Shrimp", icon: <Fish size={24} className="text-pink-400" />, category: "protein", color: "text-pink-400" },
  { id: "eggs", name: "Eggs", icon: <Egg size={24} className="text-yellow-500" />, category: "protein", color: "text-yellow-500" },
  
  // Vegetables
  { id: "carrot", name: "Carrot", icon: <Carrot size={24} className="text-orange-500" />, category: "vegetable", color: "text-orange-500" },
  { id: "broccoli", name: "Broccoli", icon: <Carrot size={24} className="text-green-600" />, category: "vegetable", color: "text-green-600" },
  { id: "spinach", name: "Spinach", icon: <Carrot size={24} className="text-green-500" />, category: "vegetable", color: "text-green-500" },
  { id: "tomato", name: "Tomato", icon: <Cherry size={24} className="text-red-500" />, category: "vegetable", color: "text-red-500" },
  { id: "onion", name: "Onion", icon: <Carrot size={24} className="text-purple-300" />, category: "vegetable", color: "text-purple-300" },
  { id: "garlic", name: "Garlic", icon: <Carrot size={24} className="text-gray-100" />, category: "vegetable", color: "text-gray-100" },
  { id: "potato", name: "Potato", icon: <Carrot size={24} className="text-yellow-700" />, category: "vegetable", color: "text-yellow-700" },
  { id: "bellpepper", name: "Bell Pepper", icon: <Carrot size={24} className="text-green-500" />, category: "vegetable", color: "text-green-500" },
  
  // Grains
  { id: "rice", name: "Rice", icon: <Wheat size={24} className="text-amber-100" />, category: "grain", color: "text-amber-100" },
  { id: "pasta", name: "Pasta", icon: <Wheat size={24} className="text-yellow-200" />, category: "grain", color: "text-yellow-200" },
  { id: "bread", name: "Bread", icon: <Wheat size={24} className="text-amber-700" />, category: "grain", color: "text-amber-700" },
  { id: "quinoa", name: "Quinoa", icon: <Wheat size={24} className="text-amber-300" />, category: "grain", color: "text-amber-300" },
  { id: "oats", name: "Oats", icon: <Wheat size={24} className="text-yellow-600" />, category: "grain", color: "text-yellow-600" },
  
  // Dairy
  { id: "milk", name: "Milk", icon: <Milk size={24} className="text-blue-50" />, category: "dairy", color: "text-blue-50" },
  { id: "cheese", name: "Cheese", icon: <Egg size={24} className="text-yellow-400" />, category: "dairy", color: "text-yellow-400" },
  { id: "yogurt", name: "Yogurt", icon: <Milk size={24} className="text-purple-100" />, category: "dairy", color: "text-purple-100" },
  { id: "butter", name: "Butter", icon: <Egg size={24} className="text-yellow-300" />, category: "dairy", color: "text-yellow-300" },
  
  // Spices
  { id: "salt", name: "Salt", icon: <Cookie size={24} className="text-gray-200" />, category: "spice", color: "text-gray-200" },
  { id: "pepper", name: "Pepper", icon: <Cookie size={24} className="text-gray-700" />, category: "spice", color: "text-gray-700" },
  { id: "oregano", name: "Oregano", icon: <Carrot size={24} className="text-green-700" />, category: "spice", color: "text-green-700" },
  { id: "basil", name: "Basil", icon: <Carrot size={24} className="text-green-600" />, category: "spice", color: "text-green-600" },
  { id: "thyme", name: "Thyme", icon: <Carrot size={24} className="text-green-500" />, category: "spice", color: "text-green-500" },
  { id: "paprika", name: "Paprika", icon: <Cookie size={24} className="text-red-700" />, category: "spice", color: "text-red-700" },
  { id: "cumin", name: "Cumin", icon: <Cookie size={24} className="text-amber-900" />, category: "spice", color: "text-amber-900" },
];

const categories = [
  { id: "protein", title: "Proteins", icon: <Beef size={20} className="text-red-500" />, bgColor: "bg-red-50" },
  { id: "vegetable", title: "Vegetables", icon: <Carrot size={20} className="text-green-500" />, bgColor: "bg-green-50" },
  { id: "grain", title: "Grains", icon: <Wheat size={20} className="text-amber-500" />, bgColor: "bg-amber-50" },
  { id: "dairy", title: "Dairy", icon: <Milk size={20} className="text-blue-400" />, bgColor: "bg-blue-50" },
  { id: "spice", title: "Spices", icon: <Soup size={20} className="text-orange-500" />, bgColor: "bg-orange-50" },
];

// Function to filter ingredients based on flavor and cuisine
const getRecommendedIngredients = (
  flavor: FlavorProfile | null, 
  cuisine: Cuisine | null
) => {
  if (!flavor && !cuisine) return ingredientsData;
  
  // This would be more sophisticated in a real app
  let filteredIngredients = [...ingredientsData];
  
  // Example filtering based on flavor
  if (flavor) {
    switch(flavor) {
      case "spicy":
        // Highlight spicy ingredients
        filteredIngredients = filteredIngredients.map(ing => {
          if (["pepper", "paprika", "cumin"].includes(ing.id)) {
            return {...ing, recommended: true};
          }
          return ing;
        });
        break;
      case "sweet":
        // Highlight sweet ingredients
        filteredIngredients = filteredIngredients.map(ing => {
          if (["carrot", "milk", "bread"].includes(ing.id)) {
            return {...ing, recommended: true};
          }
          return ing;
        });
        break;
      // Add more cases as needed
    }
  }
  
  // Example filtering based on cuisine
  if (cuisine) {
    switch(cuisine) {
      case "italian":
        // Highlight Italian ingredients
        filteredIngredients = filteredIngredients.map(ing => {
          if (["pasta", "tomato", "basil", "oregano"].includes(ing.id)) {
            return {...ing, recommended: true};
          }
          return ing;
        });
        break;
      case "mexican":
        // Highlight Mexican ingredients
        filteredIngredients = filteredIngredients.map(ing => {
          if (["rice", "pepper", "bellpepper", "cumin"].includes(ing.id)) {
            return {...ing, recommended: true};
          }
          return ing;
        });
        break;
      // Add more cases as needed
    }
  }
  
  return filteredIngredients;
};

interface IngredientSelectorProps {
  onSubmit: (ingredients: Ingredient[]) => void;
  onBack?: () => void;
  flavorProfile?: FlavorProfile | null;
  cuisine?: Cuisine | null;
}

const IngredientSelector = ({ 
  onSubmit, 
  onBack,
  flavorProfile,
  cuisine
}: IngredientSelectorProps) => {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState(ingredientsData);

  // Update recommendations when flavor or cuisine changes
  useEffect(() => {
    const recommended = getRecommendedIngredients(flavorProfile || null, cuisine || null);
    setFilteredIngredients(recommended);
  }, [flavorProfile, cuisine]);

  const handleIngredientToggle = (ingredient: Ingredient) => {
    setSelectedIngredients((prev) => {
      const isSelected = prev.some((i) => i.id === ingredient.id);
      if (isSelected) {
        return prev.filter((i) => i.id !== ingredient.id);
      } else {
        return [...prev, ingredient];
      }
    });
  };

  const clearSelection = () => {
    setSelectedIngredients([]);
  };

  const searchedIngredients = searchTerm.trim() 
    ? filteredIngredients.filter(ing => 
        ing.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredIngredients;

  // Add some recommended ingredients based on flavor and cuisine
  const recommendedIngredients = filteredIngredients.filter(ing => ing.recommended);

  return (
    <div className="w-full">
      <div className="sticky top-0 z-10 bg-background pt-2 pb-4 mb-5">
        {onBack && (
          <Button 
            variant="ghost" 
            className="mb-4 flex items-center gap-2 text-muted-foreground"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        )}
        
        <div className="flex items-center mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 focus-visible:ring-1 focus-visible:ring-primary/30"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <XCircle className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Recommended ingredients section */}
        {recommendedIngredients.length > 0 && !searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100"
          >
            <h3 className="font-medium text-sm text-blue-800 mb-3">
              Recommended for {flavorProfile} {cuisine} dishes:
            </h3>
            <div className="flex flex-wrap gap-2">
              {recommendedIngredients.map(ing => (
                <button
                  key={ing.id}
                  onClick={() => !selectedIngredients.some(i => i.id === ing.id) && handleIngredientToggle(ing)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors",
                    "bg-white border border-blue-200 hover:bg-blue-50",
                    selectedIngredients.some(i => i.id === ing.id) && "bg-blue-100 border-blue-300"
                  )}
                >
                  <span className="opacity-70">{ing.icon}</span>
                  <span>{ing.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {selectedIngredients.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 items-center mb-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100"
          >
            <span className="text-sm font-medium text-indigo-800 mr-1">Selected:</span>
            <div className="flex flex-wrap gap-2">
              {selectedIngredients.map((ing) => (
                <div 
                  key={ing.id}
                  className="px-2.5 py-1 bg-white rounded-full border border-indigo-200 flex items-center gap-1.5 text-sm shadow-sm"
                >
                  <span>{ing.name}</span>
                  <button 
                    onClick={() => handleIngredientToggle(ing)}
                    className="text-indigo-400 hover:text-indigo-600"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <button 
              onClick={clearSelection}
              className="ml-auto text-sm text-indigo-500 hover:text-indigo-700"
            >
              Clear all
            </button>
          </motion.div>
        )}

        {selectedIngredients.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-end"
          >
            <Button 
              onClick={() => onSubmit(selectedIngredients)}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-md"
            >
              Generate Recipe
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </div>

      {searchTerm ? (
        <motion.div 
          layout 
          className="ingredient-grid"
        >
          {searchedIngredients.map((ingredient) => (
            <motion.div 
              key={ingredient.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <IngredientItem
                ingredient={ingredient}
                isSelected={selectedIngredients.some(
                  (selected) => selected.id === ingredient.id
                )}
                onToggle={handleIngredientToggle}
                recommended={ingredient.recommended}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        categories.map((category) => {
          const categoryIngredients = filteredIngredients.filter(
            (ing) => ing.category === category.id
          );
          
          return (
            <IngredientCategory
              key={category.id}
              title={category.title}
              ingredients={categoryIngredients}
              selectedIngredients={selectedIngredients}
              onIngredientToggle={handleIngredientToggle}
              icon={category.icon}
              bgColor={category.bgColor}
            />
          );
        })
      )}
    </div>
  );
};

export default IngredientSelector;
