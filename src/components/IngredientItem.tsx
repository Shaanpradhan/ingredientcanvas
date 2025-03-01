
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

export interface Ingredient {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
  recommended?: boolean;
  color?: string;
}

interface IngredientItemProps {
  ingredient: Ingredient;
  isSelected: boolean;
  onToggle: (ingredient: Ingredient) => void;
  recommended?: boolean;
}

const IngredientItem = ({ ingredient, isSelected, onToggle, recommended }: IngredientItemProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "ingredient-item focus-visible-ring relative overflow-hidden group",
        isSelected ? "selected" : "",
        recommended ? "ring-2 ring-amber-300 border-amber-300" : "",
        recommended && !isSelected ? "bg-gradient-to-b from-amber-50 to-ingredient" : ""
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
      {recommended && (
        <div className="absolute top-1 right-1 text-amber-400">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
        </div>
      )}
      
      <div className="ingredient-item-icon group-hover:scale-110 transition-transform">
        {ingredient.icon}
      </div>
      
      <div className="ingredient-item-label">{ingredient.name}</div>
      
      {isSelected && (
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full p-0.5"
        >
          <Check className="w-3 h-3 text-white" />
        </motion.div>
      )}

      {/* Add a subtle pulsing effect for recommended items */}
      {recommended && !isSelected && (
        <motion.div 
          className="absolute inset-0 bg-amber-200 opacity-0 rounded-xl"
          animate={{ opacity: [0, 0.1, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            repeatType: "loop"
          }}
        />
      )}
    </motion.div>
  );
};

export default IngredientItem;
