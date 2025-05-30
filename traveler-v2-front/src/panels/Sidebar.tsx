import { useEffect, useState } from "react";
import GoogleImageSearch from "../api/GoogleImageSearch";
import OpenAISearch from "../api/OpenAISearch";
import Carousel from "./subpanels/Carousel";
import removeUnwantedChars from "../util/RemoveUnwantedChars";
import Flag from "../components/Flag";
import Button from "../components/Button";
import RequirementHandling from "./subpanels/RequirementHandling";
import DropdownSelect from "../components/DropdownSelect";
import CountriesList from "../assets/CountriesList";

interface Image {
  link: string;
  title: string;
  label: string;
}

interface SidebarProps {
  setCountry: (country: string | null) => void;
  clickedCountry: string | null;
}

function Sidebar({ setCountry, clickedCountry }: SidebarProps) {
  const [country, setLocalCountry] = useState<string | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [, setDestinations] = useState<string[]>([]);
  const [textareaValue, setTextareaValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (clickedCountry) {
      setLocalCountry(clickedCountry); // Update local country when clickedCountry changes
    }
  }, [clickedCountry]);

  useEffect(() => {
    if (country) {
      setImages([]);
      setCountry(country);
      setIsLoading(true);
      fetchImagesAndFlag(country);
    }
  }, [country]);

  const fetchImagesForDestinations = async (destinations: string[]) => {
    try {
      const filteredDestinations = destinations.slice(1);

      const imagePromises = filteredDestinations.map(async (destination) => {
        const result = await GoogleImageSearch(
          `${removeUnwantedChars(destination)}`,
          false
        );
        return result.items
          ? result.items.map((item: Image) => ({ ...item, label: destination }))
          : [];
      });

      const results = await Promise.all(imagePromises);
      const allImages = results.flat();

      if (allImages.length > 0) {
        console.log("Successfully fetched images from Google.");
        setImages(allImages);
      } else {
        console.warn("No images found");
        setError("Error, try again.");
      }
    } catch (error) {
      console.error("Error fetching images for destinations:", error);
      setError("Error, try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchImagesAndFlag = async (selectedCountry: string) => {
    try {
      const response = await OpenAISearch(
        `list 15 unique tourist destinations in ${selectedCountry} NO ROLEPLAY TEXT, NO DIALOGUE, NO ASTERISKS, WITH NO EXTRA INFO ABOUT THE LOCATIONS, FOLLOW THIS EXACT FORMAT: 1. destination one 2. destination 3. destination.`,
        "https://api.pawan.krd/cosmosrp/v1"
      );
      console.log("ChatGPT Response:", response);

      const destinationsList = response
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      const uniqueDestinations = Array.from(new Set(destinationsList));

      setDestinations(uniqueDestinations);

      if (uniqueDestinations.length > 0) {
        setError(null);
        await fetchImagesForDestinations(uniqueDestinations);
      } else {
        console.warn("No destinations found");
        setError("Error, try again.");
      }
    } catch (error) {
      console.error("Error fetching destinations from OpenAI:", error);
      setError("Error, try again.");
      setIsLoading(false);
    }
  };

  const handleCountryChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    if (selectedOption) {
      setLocalCountry(selectedOption.label);
    }
  };

  const handleButtonClick = async () => {
    setIsLoading(true);

    try {
      const response = await OpenAISearch(
        `find a country that meets these requirements: ${textareaValue}. Dont add a period, no punctuation, in only english. Only mention one country, and don't give me information on it, no dialogue, all i want from you is the name of a country, no extra words except that, no roleplay dialogue.`,
        "https://api.pawan.krd/pai-001-light/v1"
      );
      console.log("ChatGPT Response:", response);

      const responseNew = response.replace(".", "").trim();
      setLocalCountry(responseNew);
    } catch (error) {
      console.error("Error fetching destinations from OpenAI:", error);
      setError("Error, try again.");
      setIsLoading(false);
    }
  };


  return (
    <div className="font-sans text-cyan-900 bg-slate-50 bg-cover h-full border-l-1 border-gray-200 shadow-2xl flex-grow w-1/2 absolute right-0">
      <h1 className="text-5xl font-bold px-3 py-3 text-center">Traveler V2</h1>
      <div className="flex-col">
        <DropdownSelect
          text="Choose a country to learn about:"
          options={CountriesList()}
          onChange={handleCountryChange}
          value={country ? { value: country, label: country } : null} 
        />
        <RequirementHandling />
        <div className="w-80 mt-10 ml-10 mb-3.5">
          <textarea
            placeholder="Search..."
            className="w-full shadow-xl h-40 px-3 py-2 border rounded-lg resize-none"
            rows={4}
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
          />
        </div>
      </div>
      <Carousel
        images={images}
        isLoading={isLoading}
        error={error}
        country={country}
      />
      <div className="flex w-64 right-5 h-3/6 top-24 absolute"></div>
      <div className="absolute h-2/6 top-20 px-4 py-4 w-5/12 shadow-xl rounded-xl right-0">
        <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-xl text-gray-500 text-sm text-center">
          <p>The flag of your country will appear here.</p>
        </div>
      </div>
      {country && <Flag country={country} />}
      <Button text="GO!" onClick={handleButtonClick} />
      {country ? (
        <div className="">
        <h1 className="text-center relative font-semibold text-xl ">
          {country}
        </h1>
        </div>
      ) : (
        <h1 className="text-center relative">_________________</h1>
      )}
    </div>
  );
}

export default Sidebar;
