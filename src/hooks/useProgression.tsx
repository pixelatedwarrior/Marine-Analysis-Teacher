import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from "react";

export type LocationId = "coral-reef" | "kelp-forest" | "open-ocean" | "deep-sea";

export interface Location {
  id: LocationId;
  name: string;
  emoji: string;
  routes: string[];
  unlocked: boolean;
  completed: boolean;
}

const LOCATIONS: Location[] = [
  {
    id: "coral-reef",
    name: "Coral Reef",
    emoji: "🪸",
    routes: ["/intro", "/lesson", "/coral-reef-quiz"],
    unlocked: true, // First location is always unlocked
    completed: false,
  },
  {
    id: "kelp-forest",
    name: "Kelp Forest",
    emoji: "🌿",
    routes: ["/kelp-forest-intro", "/kelp-forest-lesson", "/kelp-forest-quiz"],
    unlocked: false,
    completed: false,
  },
  {
    id: "open-ocean",
    name: "Open Ocean",
    emoji: "🌊",
    routes: ["/analyze"],
    unlocked: false,
    completed: false,
  },
  {
    id: "deep-sea",
    name: "Deep Sea",
    emoji: "🐙",
    routes: ["/quiz", "/summary"],
    unlocked: false,
    completed: false,
  },
];

const STORAGE_KEY = "ocean-explorer-progression";

interface ProgressionContextType {
  locations: Location[];
  markLocationCompleted: (locationId: LocationId) => void;
  getLocationByRoute: (route: string) => Location | undefined;
  isLocationUnlocked: (locationId: LocationId) => boolean;
  resetProgression: () => void;
}

const ProgressionContext = createContext<ProgressionContextType | undefined>(undefined);

export function ProgressionProvider({ children }: { children: ReactNode }) {
  const [locations, setLocations] = useState<Location[]>(() => {
    // Load from localStorage on init
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const loaded = LOCATIONS.map((loc, index) => ({
          ...loc,
          unlocked: parsed[loc.id]?.unlocked ?? loc.unlocked,
          completed: parsed[loc.id]?.completed ?? false,
        }));

        // Ensure locations are unlocked based on previous completions
        // This handles cases where localStorage might be out of sync
        for (let i = 0; i < loaded.length; i++) {
          if (i === 0) {
            // First location is always unlocked
            loaded[i].unlocked = true;
          } else {
            // Unlock if previous location is completed
            // This ensures proper progression regardless of localStorage state
            if (loaded[i - 1].completed) {
              loaded[i].unlocked = true;
            }
          }
        }

        return loaded;
      } catch {
        return LOCATIONS;
      }
    }
    return LOCATIONS;
  });

  // Save to localStorage whenever locations change
  useEffect(() => {
    const toSave = locations.reduce((acc, loc) => {
      acc[loc.id] = { unlocked: loc.unlocked, completed: loc.completed };
      return acc;
    }, {} as Record<string, { unlocked: boolean; completed: boolean }>);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }, [locations]);

  const markLocationCompleted = useCallback((locationId: LocationId) => {
    setLocations((prev) => {
      const updated = prev.map((loc) =>
        loc.id === locationId ? { ...loc, completed: true } : loc
      );

      // Unlock next location when current is completed
      const currentIndex = prev.findIndex((loc) => loc.id === locationId);
      if (currentIndex >= 0 && currentIndex < prev.length - 1) {
        // Always unlock the next location when current is completed
        const nextLocation = updated[currentIndex + 1];
        if (nextLocation) {
          updated[currentIndex + 1] = { ...nextLocation, unlocked: true };
        }
      }

      // Ensure all locations are properly unlocked based on previous completions
      // This handles any edge cases where progression might be out of sync
      for (let i = 1; i < updated.length; i++) {
        if (updated[i - 1].completed && !updated[i].unlocked) {
          updated[i] = { ...updated[i], unlocked: true };
        }
      }

      // Save to localStorage immediately (synchronously) to ensure it's saved before navigation
      const toSave = updated.reduce((acc, loc) => {
        acc[loc.id] = { unlocked: loc.unlocked, completed: loc.completed };
        return acc;
      }, {} as Record<string, { unlocked: boolean; completed: boolean }>);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));

      return updated;
    });
  }, []);

  const getLocationByRoute = useCallback(
    (route: string): Location | undefined => {
      return locations.find((loc) => loc.routes.includes(route));
    },
    [locations]
  );

  const isLocationUnlocked = useCallback(
    (locationId: LocationId): boolean => {
      return locations.find((loc) => loc.id === locationId)?.unlocked ?? false;
    },
    [locations]
  );

  const resetProgression = useCallback(() => {
    setLocations(LOCATIONS);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <ProgressionContext.Provider
      value={{
        locations,
        markLocationCompleted,
        getLocationByRoute,
        isLocationUnlocked,
        resetProgression,
      }}
    >
      {children}
    </ProgressionContext.Provider>
  );
}

export function useProgression() {
  const context = useContext(ProgressionContext);
  if (context === undefined) {
    throw new Error("useProgression must be used within a ProgressionProvider");
  }
  return context;
}

