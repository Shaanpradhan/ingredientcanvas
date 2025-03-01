
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export interface Ingredient {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
}

interface IngredientItemProps {
  ingredient: Ingredient;
  isSelected: boolean;
  onToggle: (ingredient: Ingredient) => void;
}

const IngredientItem = ({ ingredient, isSelected, onToggle }: IngredientItemProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "ingredient-item focus-visible-ring",
        isSelected && "selected"
      )}
      onClick={() => onToggle(ingredient)}
      tabIndex={0}
      role="checkbox"
      aria-checked={isSelected}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle(ingredient);
        }
      }}
    >
      <div className="ingredient-item-icon">{ingredient.icon}</div>
      <div className="ingredient-item-label">{ingredient.name}</div>
      
      {isSelected && (
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="absolute top-2 right-2 bg-primary rounded-full p-0.5"
        >
          <Check className="w-3 h-3 text-white" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default IngredientItem;
