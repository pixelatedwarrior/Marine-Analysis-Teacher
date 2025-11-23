import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "ocean" | "coral";
}

export const ModuleCard = ({ children, className, variant = "default" }: ModuleCardProps) => {
  const variants = {
    default: "bg-card",
    ocean: "ocean-gradient",
    coral: "coral-gradient"
  };
  
  return (
    <div className={cn(
      "rounded-3xl p-8 shadow-card transition-smooth hover:shadow-ocean",
      variants[variant],
      className
    )}>
      {children}
    </div>
  );
};
