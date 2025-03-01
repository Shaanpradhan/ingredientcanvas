
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IngredientSelector from "@/components/IngredientSelector";
import RecipeResult from "@/components/RecipeResult";
import { Ingredient } from "@/components/IngredientItem";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { ChevronsDown } from "lucide-react";

const Index = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [showRecipe, setShowRecipe] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (ingredients: Ingredient[]) => {
    setSelectedIngredients(ingredients);
    setShowRecipe(true);
    
    toast({
      title: "Recipe generated!",
      description: "Your recipe has been created based on your ingredients.",
    });
  };

  const handleBack = () => {
    setShowRecipe(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-4xl px-4 py-8 mx-auto">
        <AnimatePresence mode="wait">
          {!showRecipe && (
            <motion.div
              key="selector"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8 mt-4">
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-3">
                    Ingredient-based Recipe Builder
                  </div>
                </motion.div>
                
                <motion.h1 
                  className="text-4xl font-semibold mb-3 tracking-tight"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  What's in your kitchen?
                </motion.h1>
                
                <motion.p 
                  className="text-muted-foreground max-w-lg mx-auto"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Select the ingredients you have on hand, and we'll create a delicious recipe for you to prepare.
                </motion.p>
                
                <motion.div 
                  className="mt-8 flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <ChevronsDown className="animate-pulse-gentle h-6 w-6 text-muted-foreground" />
                </motion.div>
              </div>
              
              <IngredientSelector onSubmit={handleSubmit} />
            </motion.div>
          )}

          {showRecipe && (
            <motion.div
              key="recipe"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <RecipeResult 
                selectedIngredients={selectedIngredients} 
                onBack={handleBack} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;
