import AnimatedAvatar from "../../../components/AnimatedAvatar";
import { useOutletContext, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

import { useState, useEffect } from "react";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
export default function ThanksPage() {
  const [questions, entryId] = useOutletContext(); 
  const [share, setShare] = useState("message1"); 
  const navigate = useNavigate(); 

  const { mutate } = useMutation({
    mutationFn: async (entry) => {
      const response = await axios.patch(
        `https://mighty-mini-minds-backend.onrender.com/entries/${entryId}`, 
        entry 
      );
      return response.data; 
    },
  });

  const handleEmail = async () => {
    try {
      const response = await axios.post(
        `https://mighty-mini-minds-backend.onrender.com/sendemail/${entryId}`
      );
      return response; 
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  // function to navigate to moodmap and share entry if user chooses to
  function handleClick(event) {
    setShare(event.target.value);
    if (event.target.value === "message2") {
      handleEmail();
    }
    setTimeout(() => {
      navigate("/moodMap"); 
    }, 2000); 
  }

  function shareMessage() {
    if (share === "message1") {
      return "Would you like to share your thoughts with someone?";
    } else if (share === "message2") {
      return "Thanks for sharing your entry! It's on its way to your trusted person!";
    } else if (share === "message3") {
      return "Remember you can always share your thoughts anytime!";
    }
  }

  function updateEntry() {
    const entry = {
      share: true,
    };
    mutate(entry);
  }

  useEffect(() => {
    if (share === "message2") {
      updateEntry();
    }
  }, [share]); 

  return (
  <div>
    <div className="fixed">
    <Confetti
        wind={0.04}
        recycle={false}
        drawShape={(ctx) => {
          ctx.beginPath();
          for (let i = 0; i < 22; i++) {
            const angle = 0.35 * i;
            const x = (0.2 + 1.5 * angle) * Math.cos(angle);
            const y = (0.2 + 1.5 * angle) * Math.sin(angle);
            ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.closePath();
        }}
      />
    </div>
    <div className="flex flex-col justify-between items-center h-[70vh] md:h-[73vh] xl:h-[76vh]">
      <h1 className="text-2xl sm:text-4xl text-center px-4 py-8">
        Thanks for checking in, see you tomorrow!
      </h1>
      <AnimatedAvatar
        height={30}
        width={32}
        largeHeight="sm:h-52"
        largeWidth="sm:w-52"
      />
      <h2 className="text-xl sm:text-2xl text-center px-4">{shareMessage()}</h2>
      <div className="flex flex-row justify-around items-center w-full py-8">
        <button
          onClick={handleClick}
          value={"message3"} 
          className="text-white shadow-md text-4xl transition-colors duration-300 ease-in-out transform hover:scale-125 bg-skin-secondary rounded-md py-3 px-5"
        >
          ✕
        </button>
        <button
          onClick={handleClick}
          value={"message2"} 
          className="text-white shadow-md text-4xl transition-colors duration-300 ease-in-out transform hover:scale-125 bg-skin-secondary rounded-md py-3 px-5"
        >
          ✓
        </button>
      </div>
    </div>
  </div>
  );
}

