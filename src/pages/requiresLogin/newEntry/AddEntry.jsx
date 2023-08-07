import { NavLink, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";


export default function AddEntry() {
  // must declare all variables from useOutletContext, except setter function
  const [questions, entryId] = useOutletContext();

  const { mutate } = useMutation({
    mutationFn: async (entry) => {
      const response = await axios.patch(
        `https://mighty-mini-minds-backend.onrender.com/entries/${entryId}`,
        entry
      ); 
      return response.data;
    },
    onError: (error) => {
      console.log(error);
    },
  });
 
  const [positiveA, setPositiveA] = useState(""); 
  const [challengeA, setChallengeA] = useState(""); 
  const [openA, setOpenA] = useState(""); 

  // function to patch the entry to the server
  function submit() {
    const entry = {
      question_one: questions[0],
      question_two: questions[1],
      question_three: questions[2],
      answer_one: positiveA, 
      answer_two: challengeA, 
      answer_three: openA, 
    };
    mutate(entry); 
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col mt-2">
        <label className="text-sm sm:text-xl py-2 px-8 sm:mt-6">
          {questions[0]}
        </label>
        <textarea
          type="text"
          aria-label="input your answer to the positive question"
          className="bg-skin-input shadow-md h-24 sm:h-28 py-2 px-3 mx-8 text-sm sm:text-lg"
          onChange={(e) => setPositiveA(e.target.value)}
        ></textarea>
      </div>

      <div className="flex flex-col">
        <label className="text-sm sm:text-xl py-2 p-8 sm:mt-6">
          {questions[1]}
        </label>
        <textarea
          type="text"
          aria-label="input your answer to the challenge question"
          className="bg-skin-input shadow-md h-24 sm:h-28 py-2 px-3 mx-8 text-sm sm:text-lg"
          onChange={(e) => setChallengeA(e.target.value)}
        ></textarea>
      </div>

      <div className="flex flex-col">
        <label className="text-sm sm:text-xl py-2 px-8 sm:mt-6">
          {questions[2]}
        </label>
        <textarea
          type="text"
          aria-label="input your answer to the open question"
          className="bg-skin-input shadow-md h-24 sm:h-28 py-2 px-3 mx-8 text-sm sm:text-lg"
          onChange={(e) => setOpenA(e.target.value)}
        ></textarea>
      </div>
      <div className="flex justify-center mt-2 sm:mb-4 md:mt-8">
        <NavLink to="/thanksPage">
          <button
            onClick={submit}
            className="text-white shadow-md text-lg sm:text-3xl transition-colors duration-300 ease-in-out transform hover:scale-125 bg-skin-secondary rounded-md py-1.5 px-3 m-6 mt-2 "
          >
            Post!
          </button>
        </NavLink>
      </div>
    </div>
  );
}
