import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Beef, Fish, Carrot, Wheat, Cherry, 
  Egg, Milk, Search, XCircle, ArrowRight,
  Cookie, Soup
} from "lucide-react";
import IngredientCategory from "./IngredientCategory";
import IngredientItem, { Ingredient } from "./IngredientItem";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock ingredient data
const ingredientsData: Ingredient[] = [
  // Proteins
  { id: "beef", name: "Beef", icon: <Beef size={24} />, category: "protein" },
  { id: "chicken", name: "Chicken", icon: <Beef size={24} />, category: "protein" },
  { id: "fish", name: "Fish", icon: <Fish size={24} />, category: "protein" },
  { id: "pork", name: "Pork", icon: <Beef size={24} />, category: "protein" },
  { id: "tofu", name: "Tofu", icon: <Beef size={24} />, category: "protein" },
  { id: "shrimp", name: "Shrimp", icon: <Fish size={24} />, category: "protein" },
  { id: "eggs", name: "Eggs", icon: <Egg size={24} />, category: "protein" },
  
  // Vegetables
  { id: "carrot", name: "Carrot", icon: <Carrot size={24} />, category: "vegetable" },
  { id: "broccoli", name: "Broccoli", icon: <Carrot size={24} />, category: "vegetable" },
  { id: "spinach", name: "Spinach", icon: <Carrot size={24} />, category: "vegetable" },
  { id: "tomato", name: "Tomato", icon: <Cherry size={24} />, category: "vegetable" },
  { id: "onion", name: "Onion", icon: <Carrot size={24} />, category: "vegetable" },
  { id: "garlic", name: "Garlic", icon: <Carrot size={24} />, category: "vegetable" },
  { id: "potato", name: "Potato", icon: <Carrot size={24} />, category: "vegetable" },
  { id: "bellpepper", name: "Bell Pepper", icon: <Carrot size={24} />, category: "vegetable" },
  
  // Grains
  { id: "rice", name: "Rice", icon: <Wheat size={24} />, category: "grain" },
  { id: "pasta", name: "Pasta", icon: <Wheat size={24} />, category: "grain" },
  { id: "bread", name: "Bread", icon: <Wheat size={24} />, category: "grain" },
  { id: "quinoa", name: "Quinoa", icon: <Wheat size={24} />, category: "grain" },
  { id: "oats", name: "Oats", icon: <Wheat size={24} />, category: "grain" },
  
  // Dairy
  { id: "milk", name: "Milk", icon: <Milk size={24} />, category: "dairy" },
  { id: "cheese", name: "Cheese", icon: <Egg size={24} />, category: "dairy" },
  { id: "yogurt", name: "Yogurt", icon: <Milk size={24} />, category: "dairy" },
  { id: "butter", name: "Butter", icon: <Egg size={24} />, category: "dairy" },
  
  // Spices
  { id: "salt", name: "Salt", icon: <Cookie size={24} />, category: "spice" },
  { id: "pepper", name: "Pepper", icon: <Cookie size={24} />, category: "spice" },
  { id: "oregano", name: "Oregano", icon: <Carrot size={24} />, category: "spice" },
  { id: "basil", name: "Basil", icon: <Carrot size={24} />, category: "spice" },
  { id: "thyme", name: "Thyme", icon: <Carrot size={24} />, category: "spice" },
  { id: "paprika", name: "Paprika", icon: <Cookie size={24} />, category: "spice" },
  { id: "cumin", name: "Cumin", icon: <Cookie size={24} />, category: "spice" },
];

const categories = [
  { id: "protein", title: "Proteins", icon: <Beef size={20} /> },
  { id: "vegetable", title: "Vegetables", icon: <Carrot size={20} /> },
  { id: "grain", title: "Grains", icon: <Wheat size={20} /> },
  { id: "dairy", title: "Dairy", icon: <Milk size={20} /> },
  { id: "spice", title: "Spices", icon: <Soup size={20} /> },
];

interface IngredientSelectorProps {
  onSubmit: (ingredients: Ingredient[]) => void;
}

const IngredientSelector = ({ onSubmit }: IngredientSelectorProps) => {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredIngredients = searchTerm.trim() 
    ? ingredientsData.filter(ing => 
        ing.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : ingredientsData;

  return (
    <div className="w-full">
      <div className="sticky top-0 z-10 bg-background pt-2 pb-4 mb-5">
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

        {selectedIngredients.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 items-center mb-4 p-4 bg-secondary rounded-lg"
          >
            <span className="text-sm font-medium text-muted-foreground mr-1">Selected:</span>
            <div className="flex flex-wrap gap-2">
              {selectedIngredients.map((ing) => (
                <div 
                  key={ing.id}
                  className="px-2.5 py-1 bg-white rounded-full border border-input flex items-center gap-1.5 text-sm"
                >
                  <span>{ing.name}</span>
                  <button 
                    onClick={() => handleIngredientToggle(ing)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <button 
              onClick={clearSelection}
              className="ml-auto text-sm text-muted-foreground hover:text-foreground"
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
              className="flex items-center gap-2"
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
          {filteredIngredients.map((ingredient) => (
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
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        categories.map((category) => {
          const categoryIngredients = ingredientsData.filter(
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
            />
          );
        })
      )}
    </div>
  );
};

export default IngredientSelector;
