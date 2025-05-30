import imageUrl from "../util/bullcrap";
import { useExpandedContext } from "../context/ExpandedContext"; // Import the context
import OpenAISearch from "../api/OpenAISearch";
import { useImageContext } from "../context/ImageContext";
import { useState } from "react";
import { useEffect } from "react";
import DescConstructor from "../util/DescConstructor";

function Expanded() {
  const { toggled, setToggledState } = useExpandedContext(); // Access the context to manage the toggle state
  const { imageLabel, imageLink } = useImageContext();
  const [theDesc, setDesc] = useState<string[] | null>(null)

  const endpoint = "https://api.pawan.krd/pai-001/v1"

  const handleClose = () => {
    setToggledState(false); // Close the expanded view
    setDesc(null);
  };

  useEffect(() => {
    if (toggled && imageLabel) { // Fetch only when toggled and imageLabel is present
      fetchDesc();
    }
  }, [toggled, imageLabel]);

  if (!toggled) {
    return null; // Do not render the component if toggled is false
  }

  async function fetchDesc() {
    try {
      const geographyInfo = await OpenAISearch(
        `Describe the geography of ${imageLabel} in 2 sentences.`,
        endpoint
      );
      const ttdInfo = await OpenAISearch(
        `Describe the things to do in ${imageLabel} in 2 sentences don't refer to the place directly by its name as you have already directly referenced it.`,
        endpoint
      );

      const facts = await OpenAISearch(
        `Describe the facts about ${imageLabel} in 2 sentences don't refer to the place directly by its name  as you have already directly referenced it.`,
        endpoint
      );

      const cultureInfo = await OpenAISearch(
        `Describe the culture of ${imageLabel} in 2 sentences don't refer to the place directly by its name  as you have already directly referenced it.`,
        endpoint
      );

      const touristInfo = await OpenAISearch(
        `Describe the tourist need to knows for ${imageLabel} in 2 sentences don't refer to the place directly by its name as you have already directly referenced it.`,
        endpoint
      );

      const response = [geographyInfo,ttdInfo,facts,cultureInfo,touristInfo]

      console.log("ChatGPT Response:", response);
      setDesc(response)
    } catch (error) {
      console.warn("error fetching desc for" + imageLabel)
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-zinc-600 bg-opacity-50 z-40"></div>

      <div className="fixed inset-0 flex items-center justify-center z-50 shadow-2xl">
        <div className="w-4/6 h-4/6 rounded-2xl bg-slate-300 relative">
          <div className="h-5/6 w-4/6 rounded-2xl m-6 overflow-hidden p-1 shadow-2xl">
            <img
              src={imageLink ?? imageUrl()}
              className="object-cover rounded-2xl m-auto h-full"
            />
          </div>
          <div className="m-6 right-0 absolute top-0 w-3/12 overflow-scroll text-center shadow-lg bg-slate-200 rounded-2xl p-3 w-max-3/12 h-5/6">
            <DescConstructor theDesc={theDesc} />
          </div>

          <div
            onClick={handleClose}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mt-1 z-50 cursor-pointer"
          >
            <h1 className="text-cyan-900 font-extrabold text-3xl">X</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Expanded;
