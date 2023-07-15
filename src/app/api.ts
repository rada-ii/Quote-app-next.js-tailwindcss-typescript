import axios from "axios";

const API_KEY = "LRut8B3BL7kpaUa+vaIrBQ==YVBmyfmKBAuEJ4xb";
const BASE_URL = "https://api.api-ninjas.com/v1/quotes";

export async function fetchQuotes(category: string) {
  try {
    const response = await axios.get(`${BASE_URL}?category=${category}`, {
      headers: {
        "X-Api-Key": API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch quotes.");
  }
}
