import wordOfTheDay from "../../../data/wordOfTheDay.json";

import { useEffect, useState } from 'react';

export default function WordOfTheDay() {
  const [wordData, setWordData] = useState(null);

  useEffect(() => {
    const storedWord = localStorage.getItem('wordOfTheDay');
    const storedDate = localStorage.getItem('wordOfTheDayDate');
    const currentDate = new Date().toDateString();

    if (storedWord && storedDate === currentDate) {
      setWordData(JSON.parse(storedWord));
    } else {
      const randomIndex = Math.floor(Math.random() * wordOfTheDay.length);
      const { word_of_the_day, definition, example } = wordOfTheDay[randomIndex];
      const newWordData = { word_of_the_day, definition, example };
      localStorage.setItem('wordOfTheDay', JSON.stringify(newWordData));
      localStorage.setItem('wordOfTheDayDate', currentDate);

      setWordData(newWordData);
    }
  }, []);

  if (!wordData) {
    return <div>Loading...</div>;
  }

  const { word_of_the_day, definition, example } = wordData;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl">Word of The Day</h1>
      <h1 className="text-2xl text-skin-secondary">{word_of_the_day}</h1>
      <p className="text-sm sm:text-lg mx-5 text-center">{definition}</p>
      <p className="italic text-xs sm:text-base mx-5 text-center">"{example}"</p>
    </div>
  );
}


