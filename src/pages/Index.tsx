import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IngredientSelector from "@/components/IngredientSelector";
import RecipeResult from "@/components/RecipeResult";
import { Ingredient } from "@/components/IngredientItem";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { ChevronsDown } from "lucide-react";
import CravingSelector from "@/components/CravingSelector";

// Types for our app
type FlavorProfile = "spicy" | "sweet" | "savory" | "tangy" | "fresh";
type Cuisine = "italian" | "mexican" | "asian" | "mediterranean" | "american";
type PreferenceStep = "flavor" | "cuisine" | "ingredients" | "recipe";
const Index = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [currentStep, setCurrentStep] = useState<PreferenceStep>("flavor");
  const [selectedFlavor, setSelectedFlavor] = useState<FlavorProfile | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<Cuisine | null>(null);
  const {
    toast
  } = useToast();
  const handleFlavorSelected = (flavor: FlavorProfile) => {
    setSelectedFlavor(flavor);
    setCurrentStep("cuisine");
    toast({
      title: "Flavor selected!",
      description: `You've selected ${flavor} as your preferred flavor.`
    });
  };
  const handleCuisineSelected = (cuisine: Cuisine) => {
    setSelectedCuisine(cuisine);
    setCurrentStep("ingredients");
    toast({
      title: "Cuisine selected!",
      description: `You've selected ${cuisine} cuisine.`
    });
  };
  const handleSubmit = (ingredients: Ingredient[]) => {
    setSelectedIngredients(ingredients);
    setCurrentStep("recipe");
    toast({
      title: "Recipe generated!",
      description: "Your recipe has been created based on your preferences."
    });
  };
  const handleBack = () => {
    if (currentStep === "recipe") {
      setCurrentStep("ingredients");
    } else if (currentStep === "ingredients") {
      setCurrentStep("cuisine");
    } else if (currentStep === "cuisine") {
      setCurrentStep("flavor");
    }
  };
  return <div className="min-h-screen bg-background">
      <main className="container max-w-4xl px-4 py-8 mx-auto">
        <AnimatePresence mode="wait">
          {currentStep === "flavor" && <motion.div key="flavor" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} transition={{
          duration: 0.3
        }}>
              <div className="text-center mb-8 mt-4">
                <motion.div initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.1
            }}>
                  <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-3">
                    Step 1: Choose Your Flavor
                  </div>
                </motion.div>
                
                <motion.h1 initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2
            }} className="text-4xl mb-3 tracking-tight bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 text-gray-700 font-bold py-[23px]">
                  What are you craving today?
                </motion.h1>
                
                <motion.p className="text-muted-foreground max-w-lg mx-auto" initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.3
            }}>
                  Select the flavor profile you're in the mood for, and we'll help you create the perfect dish.
                </motion.p>
                
                <motion.div className="mt-8 flex justify-center" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              delay: 0.6
            }}>
                  <ChevronsDown className="animate-pulse-gentle h-6 w-6 text-purple-400" />
                </motion.div>
              </div>
              
              <CravingSelector type="flavor" onFlavorSelected={handleFlavorSelected} />
            </motion.div>}

          {currentStep === "cuisine" && <motion.div key="cuisine" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} transition={{
          duration: 0.3
        }}>
              <div className="text-center mb-8 mt-4">
                <motion.div initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.1
            }}>
                  <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-3">
                    Step 2: Choose Your Cuisine
                  </div>
                </motion.div>
                
                <motion.h1 initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2
            }} className="text-4xl font-semibold mb-3 tracking-tight bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 text-gray-700 my-0 py-[17px]">
                  Which cuisine inspires you?
                </motion.h1>
                
                <motion.p className="text-muted-foreground max-w-lg mx-auto" initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.3
            }}>
                  Let's narrow down your {selectedFlavor} cravings to a specific cuisine style.
                </motion.p>
                
                <motion.div className="mt-8 flex justify-center" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              delay: 0.6
            }}>
                  <ChevronsDown className="animate-pulse-gentle h-6 w-6 text-teal-400" />
                </motion.div>
              </div>
              
              <CravingSelector type="cuisine" onCuisineSelected={handleCuisineSelected} onBack={handleBack} selectedFlavor={selectedFlavor} />
            </motion.div>}

          {currentStep === "ingredients" && <motion.div key="ingredients" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} transition={{
          duration: 0.3
        }}>
              <div className="text-center mb-8 mt-4">
                <motion.div initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.1
            }}>
                  <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-3">
                    Step 3: Choose Your Ingredients
                  </div>
                </motion.div>
                
                <motion.h1 className="text-4xl font-semibold mb-3 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500" initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2
            }}>
                  What's in your kitchen?
                </motion.h1>
                
                <motion.p className="text-muted-foreground max-w-lg mx-auto" initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.3
            }}>
                  Select the ingredients you have for your {selectedFlavor} {selectedCuisine} dish.
                </motion.p>
                
                <motion.div className="mt-8 flex justify-center" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              delay: 0.6
            }}>
                  <ChevronsDown className="animate-pulse-gentle h-6 w-6 text-orange-400" />
                </motion.div>
              </div>
              
              <IngredientSelector onSubmit={handleSubmit} onBack={handleBack} flavorProfile={selectedFlavor} cuisine={selectedCuisine} />
            </motion.div>}

          {currentStep === "recipe" && <motion.div key="recipe" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} transition={{
          duration: 0.3
        }}>
              <RecipeResult selectedIngredients={selectedIngredients} flavorProfile={selectedFlavor} cuisine={selectedCuisine} onBack={handleBack} />
            </motion.div>}
        </AnimatePresence>
      </main>
    </div>;
};
export default Index;