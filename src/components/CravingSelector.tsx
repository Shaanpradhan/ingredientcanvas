
import React from "react";
import { motion } from "framer-motion";
import { 
  Flame, Lollipop, UtensilsCrossed, Banana, Leaf,
  Pizza, Taco, Soup, Croissant, Beef,
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type FlavorProfile = "spicy" | "sweet" | "savory" | "tangy" | "fresh";
type Cuisine = "italian" | "mexican" | "asian" | "mediterranean" | "american";

interface CravingOption {
  id: FlavorProfile | Cuisine;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  hoverColor: string;
  description: string;
}

// Define flavor options with colors
const flavorOptions: CravingOption[] = [
  { 
    id: "spicy", 
    name: "Spicy", 
    icon: <Flame size={32} />, 
    color: "text-red-500",
    bgColor: "bg-red-50",
    hoverColor: "group-hover:bg-red-100",
    description: "Bold, fiery dishes that pack a punch"
  },
  { 
    id: "sweet", 
    name: "Sweet", 
    icon: <Lollipop size={32} />, 
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    hoverColor: "group-hover:bg-pink-100",
    description: "Delightful dishes with a touch of sweetness"
  },
  { 
    id: "savory", 
    name: "Savory", 
    icon: <UtensilsCrossed size={32} />, 
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    hoverColor: "group-hover:bg-amber-100",
    description: "Rich, umami-filled comfort foods"
  },
  { 
    id: "tangy", 
    name: "Tangy", 
    icon: <Banana size={32} />, 
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    hoverColor: "group-hover:bg-yellow-100",
    description: "Bright, acidic flavors that excite the palate"
  },
  { 
    id: "fresh", 
    name: "Fresh", 
    icon: <Leaf size={32} />, 
    color: "text-green-500",
    bgColor: "bg-green-50",
    hoverColor: "group-hover:bg-green-100",
    description: "Light, vibrant, and refreshing dishes"
  }
];

// Define cuisine options with colors
const cuisineOptions: CravingOption[] = [
  { 
    id: "italian", 
    name: "Italian", 
    icon: <Pizza size={32} />, 
    color: "text-red-600",
    bgColor: "bg-red-50",
    hoverColor: "group-hover:bg-red-100",
    description: "Pasta, pizza, and Mediterranean flavors"
  },
  { 
    id: "mexican", 
    name: "Mexican", 
    icon: <Taco size={32} />, 
    color: "text-green-600",
    bgColor: "bg-green-50",
    hoverColor: "group-hover:bg-green-100",
    description: "Bold, vibrant dishes with corn, beans, and chilies"
  },
  { 
    id: "asian", 
    name: "Asian", 
    icon: <Soup size={32} />, 
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    hoverColor: "group-hover:bg-blue-100",
    description: "Diverse flavors from across the continent"
  },
  { 
    id: "mediterranean", 
    name: "Mediterranean", 
    icon: <Croissant size={32} />, 
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    hoverColor: "group-hover:bg-cyan-100",
    description: "Healthy dishes with olive oil, herbs, and seafood"
  },
  { 
    id: "american", 
    name: "American", 
    icon: <Beef size={32} />, 
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    hoverColor: "group-hover:bg-indigo-100",
    description: "Comfort foods and classics from the USA"
  }
];

// Filter cuisine options by flavor (in a real app, this would be more sophisticated)
const getCuisinesByFlavor = (flavor: FlavorProfile | null) => {
  if (!flavor) return cuisineOptions;
  
  // This is a simple mapping - in a real app, this would be more data-driven
  switch(flavor) {
    case "spicy":
      return cuisineOptions.filter(c => ["mexican", "asian"].includes(c.id as string));
    case "sweet":
      return cuisineOptions.filter(c => ["italian", "american"].includes(c.id as string));
    case "savory":
      return cuisineOptions.filter(c => ["italian", "american", "mediterranean"].includes(c.id as string));
    case "tangy":
      return cuisineOptions.filter(c => ["mexican", "asian", "mediterranean"].includes(c.id as string));
    case "fresh":
      return cuisineOptions.filter(c => ["mediterranean", "asian"].includes(c.id as string));
    default:
      return cuisineOptions;
  }
};

interface CravingSelectorProps {
  type: "flavor" | "cuisine";
  onFlavorSelected?: (flavor: FlavorProfile) => void;
  onCuisineSelected?: (cuisine: Cuisine) => void;
  onBack?: () => void;
  selectedFlavor?: FlavorProfile | null;
}

const CravingSelector = ({ 
  type, 
  onFlavorSelected, 
  onCuisineSelected, 
  onBack,
  selectedFlavor 
}: CravingSelectorProps) => {
  
  const options = type === "flavor" 
    ? flavorOptions 
    : getCuisinesByFlavor(selectedFlavor);
  
  const handleSelect = (option: CravingOption) => {
    if (type === "flavor" && onFlavorSelected) {
      onFlavorSelected(option.id as FlavorProfile);
    } else if (type === "cuisine" && onCuisineSelected) {
      onCuisineSelected(option.id as Cuisine);
    }
  };

  return (
    <div className="w-full">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "group cursor-pointer rounded-xl border p-6 shadow-sm transition-all duration-200",
              "hover:shadow-md hover:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
            )}
            onClick={() => handleSelect(option)}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSelect(option);
              }
            }}
          >
            <div className="flex items-start gap-5">
              <div className={cn(
                "flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-colors duration-200",
                option.bgColor, option.hoverColor
              )}>
                <div className={option.color}>{option.icon}</div>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-1">{option.name}</h3>
                <p className="text-muted-foreground text-sm">{option.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CravingSelector;
