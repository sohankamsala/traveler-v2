import { useEffect, useState } from "react";
import GoogleImageSearch from "../api/GoogleImageSearch";
import DefaultFlag from "../assets/img.jpg"
import { useImageContext } from "../context/ImageContext";
import { useExpandedContext } from "../context/ExpandedContext";

interface FlagProps {
  country: string;
}

function Flag(props: FlagProps) {
  const { country } = props;
  const [flagSrc, setFlagSrc] = useState<string | null>(DefaultFlag); 
  const { setImageData } = useImageContext(); 
  const { setToggledState } = useExpandedContext();

  useEffect(() => {
    async function fetchFlagImgSrc() {
      try {
        const result = await GoogleImageSearch(country + " flag", true);
        if (result.items && result.items.length > 0) {
          setFlagSrc(result.items[0].link);
        } else {
          console.warn("No flag image found");
          setFlagSrc(null); 
        }
      } catch (error) {
        console.error("Error fetching flag for country:", country, error);
        setFlagSrc(null); 
      }
    }

    fetchFlagImgSrc();
  }, [country]);

  function handleImageExpand(flagSrc: string, country: string) {
    setImageData(country, flagSrc);
    setToggledState(true)
  }

  return (
    <>
      <div className="absolute top-20 px-4 py-4 w-5/12 shadow-xl rounded-xl right-0 h-2/6 ">
        {flagSrc ? (
          <img
            src={flagSrc}
            alt={`${country} flag`}
            className="w-full h-auto object-cover rounded-xl z-50"
            onClick={() => {handleImageExpand(flagSrc, country)}}
          />
        ) : (
          <div className="w-full h-40 flex items-center justify-center bg-gray-200 rounded-xl text-gray-500 text-lg">
            <p>Loading flag...</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Flag;

