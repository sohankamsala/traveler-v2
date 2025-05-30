async function OpenAISearch(term: string, endpoint: string): Promise<string> {
  try {
    const response = await fetch(import.meta.env.VITE_OPENAI_PROXY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ term, endpoint }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from server");
    }

    const data = await response.json();
    return data.response || "No description available";
  } catch (error) {
    console.error("Error fetching description from server:", error);
    return "Error fetching description";
  }
}

export default OpenAISearch;
