
import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedContainerProps {
  children: ReactNode;
  isVisible: boolean;
  className?: string;
  animation?: "fade" | "slide" | "scale";
  duration?: number;
  delay?: number;
}

const AnimatedContainer = ({
  children,
  isVisible,
  className,
  animation = "fade",
  duration = 0.3,
  delay = 0,
}: AnimatedContainerProps) => {
  const getAnimationVariants = () => {
    switch (animation) {
      case "slide":
        return {
          hidden: { y: 20, opacity: 0 },
          visible: { y: 0, opacity: 1 },
          exit: { y: -20, opacity: 0 },
        };
      case "scale":
        return {
          hidden: { scale: 0.9, opacity: 0 },
          visible: { scale: 1, opacity: 1 },
          exit: { scale: 0.9, opacity: 0 },
        };
      case "fade":
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
          exit: { opacity: 0 },
        };
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className={cn(className)}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={getAnimationVariants()}
          transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedContainer;
