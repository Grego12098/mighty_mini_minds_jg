import quotes from "../../data/loginQuotes.json";
import { useState, useEffect } from "react";


export function getRandomQuote() {
  const [randomQuote, setRandomQuote] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];
    setRandomQuote(selectedQuote);
  }, []);

  return randomQuote;
}