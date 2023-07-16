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
    const updatedQuotes = quotes.map((q) => {
      if (q.id === quote.id) {
        if (!q.saved) {
          return { ...q, saved: true };
        } else {
          return q;
        }
      }
      return q;
    });
    setQuotes([]);
    setSavedQuotes((prevSavedQuotes) => [...prevSavedQuotes, quote]);
    setCategory("");
  };

  const handleDeleteQuote = (quote: Quote) => {
    const deleteIndex = savedQuotes.findIndex((q) => q.id === quote.id);

    const updatedSavedQuotes = [...savedQuotes];
    updatedSavedQuotes.splice(deleteIndex, 1);

    setSavedQuotes(updatedSavedQuotes);

    const updatedQuotes = quotes.filter((q) => q.id !== quote.id);
    setQuotes(updatedQuotes);
    setCategory("");
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
  };

  return (
    <div className="w-11/12 h-screen bg-sky-50  mx-auto  rounded-xl text-zinc-600">
      <h1 className="text-4xl font-bold my-8 text-center text-cyan-500">
        Quote App
      </h1>
      <div className="flex mb-4 justify-center ">
        <select
          value={category}
          onChange={handleCategoryChange}
          className="mr-2 px-2 py-1 border border-slate-200  rounded-xl "
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button
          className="bg-sky-500  hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-xl"
          onClick={handleLoadQuotes}
        >
          Load Quotes
        </button>
      </div>
      <p className="text-center">
        (or just click on Load Quotes button to get random quote)
      </p>
      {quotes.length > 0 ? (
        <ul className="space-y-8">
          {quotes.map((quote) => (
            <li key={quote.author} className="flex items-center justify-center">
              <div className="w-2/3">
                <p>
                  <span className="text-teal-400">Category: </span>
                  <span className="text-teal-600">{quote.category}</span>
                </p>
                <p className="mr-4">
                  <span className="text-indigo-500">Quote: </span>
                  {quote.quote}
                </p>
                <p>
                  <span className="text-indigo-400">Author: </span>
                  <span className="text-indigo-600">{quote.author}</span>
                </p>
              </div>
              {!quote.saved && (
                <button
                  className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-xl"
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
        <div className="mx-auto w-4/5 border border-neutral-300 rounded-xl p-4 mt-8 bg-cyan-100">
          <h2 className="text-2xl font-bold mt-8 mb-4 text-center text-emerald-500">
            Saved Quotes
          </h2>
          <ul className="space-y-4">
            {savedQuotes.map((quote) => (
              <li key={quote.author} className="flex items-center li">
                <div className="flex-grow">
                  <p>
                    <span className="text-orange-300 ">Category: </span>
                    <span className="text-orange-500 ">{quote.category}</span>
                  </p>
                  <p className="mr-4">
                    <span className="text-orange-500 ">Quote: </span>
                    {quote.quote}
                  </p>
                  <p>
                    <span className="text-orange-300 ">Author: </span>
                    <span className="text-orange-500 ">{quote.author}</span>
                  </p>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-xl"
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
