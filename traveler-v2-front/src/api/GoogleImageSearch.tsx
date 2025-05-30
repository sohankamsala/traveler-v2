import axios from "axios";

export const GoogleImageSearch = async (term: string, flag: boolean) => {
  console.log("searching for image " + term);

  const cx = flag
    ? import.meta.env.VITE_GOOGLE_CX_FLAG
    : import.meta.env.VITE_GOOGLE_CX_GENERAL;

  const flag_or_nah = flag ? "flag" : "";

  const { data } = await axios.get(
    "https://www.googleapis.com/customsearch/v1",
    {
      params: {
        key: import.meta.env.VITE_GOOGLE_API_KEY,
        cx,
        q: term + flag_or_nah,
        searchType: "image",
        num: 3,
      },
    }
  );

  return data;
};

export default GoogleImageSearch;
