import { cn } from "@/lib/utils";

interface ProgressBubblesProps {
  total: number;
  current: number;
  className?: string;
}

export const ProgressBubbles = ({ total, current, className }: ProgressBubblesProps) => {
  return (
    <div className={cn("flex gap-3 justify-center items-center", className)}>
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "rounded-full transition-smooth",
            index < current 
              ? "w-4 h-4 bg-teal shadow-float" 
              : index === current
              ? "w-5 h-5 bg-primary animate-pulse shadow-ocean"
              : "w-3 h-3 bg-muted"
          )}
        />
      ))}
    </div>
  );
};
