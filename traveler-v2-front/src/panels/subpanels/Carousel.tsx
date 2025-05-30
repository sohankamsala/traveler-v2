// src/panels/Carousel.tsx
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import removeUnwantedChars from "../../util/RemoveUnwantedChars";
import { useImageContext } from "../../context/ImageContext";
import { useExpandedContext } from "../../context/ExpandedContext";

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function Carousel(props: any) {
  const [emblaRef, embla] = useEmblaCarousel();
  const { images, isLoading, error } = props;

  const [filteredImages, setFilteredImages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { setImageData } = useImageContext();
  const { setToggledState } = useExpandedContext();

  useEffect(() => {
    if (images.length > 0) {
      const imagesByDestination = new Map<string, any>();
      const shuffledImages = shuffleArray(images);

      shuffledImages.forEach((image) => {
        if (!imagesByDestination.has(image.label)) {
          imagesByDestination.set(image.label, image);
        }
      });

      const uniqueImages = Array.from(imagesByDestination.values()).slice(0, 10);
      setFilteredImages(uniqueImages);
      setLoading(false);
    } else if (isLoading) {
      setLoading(true);
    }
  }, [images, isLoading]);

  function handleExpand(imageLink: string, imageLabel: string) {
    setImageData(imageLabel, imageLink);
    setToggledState(true);
  }

  function scrollPrev() {
    embla?.scrollPrev();
  }

  function scrollNext() {
    embla?.scrollNext();
  }

  return (
    <div className="fixed bottom-0 w-6/12 max-w-screen-xl mx-auto px-4 py-4 shadow-xl flex items-center justify-between gap-4">
      {/* Left Button */}
      <button
        onClick={scrollPrev}
        className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
        aria-label="Scroll Left"
      >
        ◀
      </button>

      {/* Carousel */}
      <div className="overflow-hidden shadow-xl flex-1" ref={emblaRef}>
        <div className="flex gap-4 shadow-xl">
          {error ? (
            <div className="bg-gray-200 flex-[0_0_100%] min-w-0 shadow-xl flex items-center justify-center rounded-xl">
              <div className="text-gray-500 text-lg flex items-center justify-center h-40 w-full">
                {error}
              </div>
            </div>
          ) : loading ? (
            <div className="bg-gray-200 flex-[0_0_100%] min-w-0 shadow-xl flex items-center justify-center rounded-xl">
              <div className="text-gray-500 text-lg flex items-center justify-center h-40 w-full">
                {isLoading ? "Loading images, this may take a minute." : "Choose a country to get started."}
              </div>
            </div>
          ) : (
            filteredImages.map((image, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 shadow-xl">
                <div className="relative rounded-xl overflow-hidden shadow-xl">
                  <h1 className="text-blue-900 font-roboto text-center absolute top-2 left-0 right-0 z-10 bg-white bg-opacity-70 p-2 rounded-md">
                    {removeUnwantedChars(image.label)}
                  </h1>
                  <img
                    src={image.link}
                    alt={image.title}
                    className="w-full h-40 object-cover rounded-xl shadow-xl cursor-pointer"
                    onClick={() => handleExpand(image.link, removeUnwantedChars(image.label))}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Button */}
      <button
        onClick={scrollNext}
        className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
        aria-label="Scroll Right"
      >
        ▶
      </button>
    </div>
  );
}

export default Carousel;
