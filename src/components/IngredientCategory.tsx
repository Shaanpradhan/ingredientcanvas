
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import IngredientItem, { Ingredient } from "./IngredientItem";
import { cn } from "@/lib/utils";

interface IngredientCategoryProps {
  title: string;
  ingredients: Ingredient[];
  selectedIngredients: Ingredient[];
  onIngredientToggle: (ingredient: Ingredient) => void;
  icon: React.ReactNode;
}

const IngredientCategory = ({
  title,
  ingredients,
  selectedIngredients,
  onIngredientToggle,
  icon,
}: IngredientCategoryProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const selectedInCategory = selectedIngredients.filter(
    (selected) => selected.category === ingredients[0]?.category
  );

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6 category-transition"
    >
      <motion.button
        layout
        className="w-full flex items-center justify-between px-4 py-3 mb-3 bg-secondary rounded-lg focus-visible-ring"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <div className="mr-3 text-primary/80">{icon}</div>
          <h3 className="text-lg font-medium">{title}</h3>
          {selectedInCategory.length > 0 && (
            <div className="ml-2 px-2 py-0.5 text-xs font-medium bg-primary/10 rounded-full">
              {selectedInCategory.length}
            </div>
          )}
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5 text-primary/60" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="ingredient-grid">
              {ingredients.map((ingredient) => (
                <IngredientItem
                  key={ingredient.id}
                  ingredient={ingredient}
                  isSelected={selectedIngredients.some(
                    (selected) => selected.id === ingredient.id
                  )}
                  onToggle={onIngredientToggle}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default IngredientCategory;
