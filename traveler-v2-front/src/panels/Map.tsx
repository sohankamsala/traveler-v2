import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { useEffect, useState } from "react";
import { feature } from "topojson-client";
import bbox from "@turf/bbox";
import { FeatureCollection, GeometryObject } from "geojson";
import geoJsonData from '../assets/countries.geo.json'; 

interface MapProps {
  highlightedCountry: string | null;
  setHighlightedCountry: (country: string | null) => void;
  setClickedCountry: (country: string | null) => void;
}

function Map({ highlightedCountry, setHighlightedCountry, setClickedCountry }: MapProps) {
  const [center, setCenter] = useState<[number, number]>([0, 0]);
  const [zoom, setZoom] = useState<number>(1.5);

  useEffect(() => {
    if (highlightedCountry) {
      zoomToCountry(highlightedCountry);
    }
  }, [highlightedCountry]);

  const zoomToCountry = (countryName: string) => {
    const geoData: FeatureCollection<GeometryObject> = feature(geoJsonData, geoJsonData.objects.world) as unknown as FeatureCollection<GeometryObject>;
    const country = geoData.features.find(
      (feature: any) => feature.properties.name === countryName
    );

    if (country) {
      const bboxArray = bbox(country);
      const [west, south, east, north] = bboxArray;
      const countryCenter: [number, number] = [(west + east) / 2, (north + south) / 2];
      const countryWidth = east - west;
      const countryHeight = north - south;
      const maxDimension = Math.max(countryWidth, countryHeight);

      const baseZoom = 5;
      const zoomFactor = Math.max(1, Math.min(10, baseZoom * (1 / maxDimension * 100)));

      setCenter(countryCenter);
      setZoom(zoomFactor);
    }
  };

  const handleCountryClick = (countryName: string) => {
    setHighlightedCountry(countryName);
    setClickedCountry(countryName);
    zoomToCountry(countryName);
  };

  return (
    <div className="h-full w-1/2 absolute">
      <ComposableMap className="h-full w-full">
        <ZoomableGroup
          className="h-full w-full"
          center={center}
          zoom={zoom}
          minZoom={1.2}
        >
          <Geographies geography={geoJsonData}>
            {({ geographies }: any) =>
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleCountryClick(geo.properties.name)}
                  style={{
                    default: {
                      fill: geo.properties.name === highlightedCountry ? "#0d69a6" : "#84cbfa",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.6,
                      filter: "url(#shadow)",
                    },
                    hover: {
                      fill: geo.properties.name === highlightedCountry ? "#0a4a8c" : "#0d69a6",
                      stroke: "#FFFFFF",
                      strokeWidth: 1,
                      filter: "url(#shadow)",
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <svg width="0" height="0">
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="4"
            floodColor="#000"
            floodOpacity="0.4"
          />
        </filter>
      </svg>
    </div>
  );
}

export default Map;
