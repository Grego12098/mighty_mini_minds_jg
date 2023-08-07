import { useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useGetUser } from "../../../hooks/useGetUser";
import EmojiWP from "./EmojiWP";
export default function WelcomePage() {
  const userId = localStorage.getItem("userId");

  const { data: user } = useGetUser();

  // useOutletContext - must declare all variables from the context, even if you don't use them
  const [questions, entryId, setEntryId] = useOutletContext();

  const navigate = useNavigate(); 
  const { mutate } = useMutation({
    mutationFn: async (entry) => {
      const url = `https://mighty-mini-minds-backend.onrender.com/entries/${userId}`; 
      const response = await axios.post(url.replace(/"/g, ""), entry); 
      return response.data; 
    },
    onSuccess: (data) => {
      setEntryId(data.uuid); 
    },
  });

  const [mood, setMood] = useState(5); 

  // function to post the entry to the server
  function submitMood() {
    const entry = {
      mood: mood, 
      share: false, 
    };
    if (mood !== 5) {
      mutate(entry); 
      navigate("/addEntry"); 
    } else {
      alert("Please select a mood"); 
    }
  }

  function handleClick(event) {
    setMood(event.target.value); 
  }

  const emojis = ["🙁", "😕", "😐", "🙂", "😁"];
  console.log(mood)

  return (
    <>
      <div className="flex flex-col justify-between items-center w-full h-full">
        <h1 className="text-2xl sm:text-4xl text-center px-4 my-12">
          Welcome, {user ? user.name : ""}! How are you feeling today?
        </h1>
        <div className="flex justify-around w-full">
          {emojis.map((item, index) => (
            <EmojiWP
              key={index}
              moodRating={index}
              emoji={item}
              selectedMood={mood}
              handleClick={handleClick}
            />
          ))}
        </div>
        <button
          className="text-white shadow-md text-4xl transition-colors duration-300 ease-in-out transform hover:scale-125 bg-skin-secondary rounded-md my-8 px-5 w-32 h-14 sm:w-40 sm:h-16"
          onClick={submitMood}
        >
          Go!
        </button>
      </div>
    </>
  );
}
