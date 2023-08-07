import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Header from "./Header";
import "../../../App.css";
import questionData from "../../../data/questions.json";
import { useEffect, useState } from "react";

export default function AppLayout({ handleThemeChange }) {
  
  const [entryId, setEntryId] = useState(null); 

  // use usecontext
  const [questions, setQuestions] = useState([]); 
  useEffect(() => {
    function randomQuestions() {
      
      const randomQuestions = []; 
      for (const key in questionData) {
        const questionArray = questionData[key]; 
        const randomQuestion = 
          questionArray[Math.floor(Math.random() * questionArray.length)]; 
        randomQuestions.push(randomQuestion); 
      }
      return randomQuestions; 
    }
    setQuestions(randomQuestions()); 
  }, []);

  return (
    <div className="flex flex-col justify-between h-screen">
      <Header />
      <main className="flex justify-center h-[70vh] md:h-[73vh] xl:h-[76vh]">
        <div className="overflow-y-scroll scrollbar w-11/12 md:w-9/12 lg:w-8/12 xl:w-7/12 bg-white rounded-lg shadow-lg">
          <Outlet context={[questions, entryId, setEntryId]} />
        </div>
      </main>
      <NavBar handleThemeChange={handleThemeChange} />
    </div>
  );
}


