import { createContext, useState, useContext, ReactNode } from 'react';

interface ExpandedContextType {
    toggled: boolean | null;
    setToggledState: (trueFalse: boolean) => void;
  }

const ExpandedContext = createContext<ExpandedContextType | undefined>(undefined);



export const ExpandedProvider = ({ children }: { children: ReactNode }) => {

  const [toggled, setToggled] = useState<boolean | null>(false) 

  const setToggledState = (trueFalse: boolean) => {
    setToggled(trueFalse)    
  };

  return (
    <ExpandedContext.Provider value={{ toggled, setToggledState }}>
      {children}
    </ExpandedContext.Provider>
  );
};

export const useExpandedContext = () => {
  const context = useContext(ExpandedContext);
  if (!context) {
    throw new Error("useExpandedContext must be used within an ImageProvider");
  }
  return context;
};
