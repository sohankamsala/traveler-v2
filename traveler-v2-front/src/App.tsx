// src/App.tsx
import { useState } from "react";
import Map from "./panels/Map";
import Sidebar from "./panels/Sidebar";
import Expanded from "./panels/Expanded";
import { ImageProvider } from "./context/ImageContext";
import { ExpandedProvider } from "./context/ExpandedContext";

function App() {
  const [highlightedCountry, setHighlightedCountry] = useState<string | null>(
    null
  );
  const [clickedCountry, setClickedCountry] = useState<string | null>(null);

  return (
    <ExpandedProvider>
      <ImageProvider>
        <div className="h-screen flex" >
          <Map
            highlightedCountry={highlightedCountry}
            setHighlightedCountry={setHighlightedCountry}
            setClickedCountry={setClickedCountry}
          />
          <Sidebar
            setCountry={setHighlightedCountry}
            clickedCountry={clickedCountry}
          />
          <Expanded />
        </div>
      </ImageProvider>
    </ExpandedProvider>
  );
}

export default App;
