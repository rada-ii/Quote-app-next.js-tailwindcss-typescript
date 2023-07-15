"use client";
import { useState } from "react";
import { fetchQuotes } from "../api";

interface Quote {
  id: string;
  quote: string;
  category: string;
  author: string;
  saved: boolean;
}

const categories = [
  "age",
  "alone",
  "amazing",
  "anger",
  "architecture",
  "art",
  "attitude",
  "beauty",
  "best",
  "birthday",
  "business",
  "car",
  "change",
  "communications",
  "computers",
  "cool",
  "courage",
  "dad",
  "dating",
  "death",
  "design",
  "dreams",
  "education",
  "environmental",
  "equality",
  "experience",
  "failure",
  "faith",
  "family",
  "famous",
  "fear",
  "fitness",
  "food",
  "forgiveness",
  "freedom",
  "friendship",
  "funny",
  "future",
  "god",
  "good",
  "government",
  "graduation",
  "great",
  "happiness",
  "health",
  "history",
  "home",
  "hope",
  "humor",
  "imagination",
  "inspirational",
  "intelligence",
  "jealousy",
  "knowledge",
  "leadership",
  "learning",
  "legal",
  "life",
  "love",
  "marriage",
  "medical",
  "men",
  "mom",
  "money",
  "morning",
  "movies",
  "success",
];

const QuoteList = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [category, setCategory] = useState("");
  const [savedQuotes, setSavedQuotes] = useState<Quote[]>([]);

  const handleLoadQuotes = async () => {
    try {
      const data = await fetchQuotes(category);
      const updatedQuotes = data.map((quote: Quote) => ({
        ...quote,
        saved: false,
      }));
      setQuotes(updatedQuotes);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSaveQuote = (quote: Quote) => {
    if (!quote.saved) {
      const updatedQuotes = quotes.map((q) => {
        if (q.id === quote.id) {
          return { ...q, saved: true };
        }
        return q;
      });
      setQuotes(updatedQuotes);
      setSavedQuotes((prevSavedQuotes) => [...prevSavedQuotes, quote]);
    }
  };

  const handleDeleteQuote = (quote: Quote) => {
    const deleteIndex = savedQuotes.findIndex((q) => q.id === quote.id);

    const updatedSavedQuotes = [...savedQuotes];
    updatedSavedQuotes.splice(deleteIndex, 1);

    setSavedQuotes(updatedSavedQuotes);

    const updatedQuotes = quotes.map((q) => {
      if (q.id === quote.id) {
        return { ...q, saved: false };
      }
      return q;
    });

    setQuotes(updatedQuotes);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
  };

  return (
    <div className="w-11/12 h-screen bg-rose-100 mx-auto">
      <h1 className="text-4xl font-bold my-4 text-center text-cyan-500">
        Quote List
      </h1>
      <div className="flex mb-4 justify-center">
        <select
          value={category}
          onChange={handleCategoryChange}
          className="mr-2 px-2 py-1 border border-gray-300 rounded"
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleLoadQuotes}
        >
          Load Quotes
        </button>
      </div>
      {quotes.length > 0 ? (
        <ul className="space-y-4">
          {quotes.map((quote) => (
            <li key={quote.id} className="flex items-center justify-center">
              <div className="w-2/3">
                <p>Category: {quote.category}</p>
                <p>Quote: {quote.quote}</p>
                <p>Author: {quote.author}</p>
              </div>
              {!quote.saved && (
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleSaveQuote(quote)}
                >
                  Save
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No quotes available.</p>
      )}
      {savedQuotes.length > 0 && (
        <div className="mx-auto w-4/5">
          <h2 className="text-2xl font-bold mt-8">Saved Quotes</h2>
          <ul className="space-y-4">
            {savedQuotes.map((quote) => (
              <li key={quote.id} className="flex items-center">
                <div className="flex-grow">
                  <p>Category: {quote.category}</p>
                  <p>Quote: {quote.quote}</p>
                  <p>Author: {quote.author}</p>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDeleteQuote(quote)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuoteList;
