// src/context/ImageContext.tsx
import { createContext, useState, useContext, ReactNode } from 'react';

interface ImageContextType {
  imageLabel: string | null;
  imageLink: string | null;
  setImageData: (label: string, link: string) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [imageLabel, setImageLabel] = useState<string | null>(null);
  const [imageLink, setImageLink] = useState<string | null>(null);

  const setImageData = (label: string, link: string) => {
    setImageLabel(label);
    setImageLink(link);
  };

  return (
    <ImageContext.Provider value={{ imageLabel, imageLink, setImageData }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImageContext must be used within an ImageProvider");
  }
  return context;
};
