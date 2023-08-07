import { useState } from "react";

export const entryState = {
  // entryState is an object that will be used to store the user's input
  mood: 0,
  questionOne: null,
  questionTwo: null,
  questionThree: null,
  answerOne: null,
  answerTwo: null,
  answerThree: null,
  share: false,
};

export function useEntryState() {
  // useEntryState is a function that will be used to store the user's input
  const [entry, setEntry] = useState(entryState); // entry is an object that will be used to store the user's input

  return { entry, setEntry }; // return the entry object and the setEntry function
}

// code from other files in case we need it later

// filter dates
// {/* <div className="flex justify-end items-center mt-4">
/*{ <label className="font-bold sm:text-base">Search by</label>
<select
  className="bg-skin-input text-xs sm:text-base mx-4 p-2 rounded-lg shadow-md outline-none"
  defaultValue="All"
>
  <option value="All">All</option>
  <option value="7Days">Last 7 Days</option>
  <option value="LastMonth">Last Month</option>
</select>
</div> } }*/

// function for filter dates

// const [filteredEntries, setFilteredEntries] = useState();

  // useEffect(() => {
  // setFilteredEntries(entries? entries:null);
  // }, []);

  // function filterEntries(event) {
  //   console.log(event.target.value);
  //   if (event.target.value="All"){
  //     setFilteredEntries(entries);
  //   } else if (event.target.value === "7Days") {
  //     const last7Days = entries.filter((entry) => {
  //       const createdAt = new Date(entry.createdAt);
  //       const today = new Date();
  //       const timeDifference = today - createdAt;
  //       const millisecondsInOneDay = 1000 * 60 * 60 * 24;
  //       return timeDifference <= 7 * millisecondsInOneDay;
  //     });
  //     setFilteredEntries(last7Days);
  //   } else if (event.target.value === "LastMonth") {
  //     const last30Days = entries.filter((entry) => {
  //       const createdAt = new Date(entry.createdAt);
  //       const today = new Date();
  //       const timeDifference = today - createdAt;
  //       const millisecondsInOneDay = 1000 * 60 * 60 * 24;
  //       return timeDifference <= 30 * millisecondsInOneDay;
  //     });
  //     setFilteredEntries(last30Days);
  //   }
  // }






  // AppLayout commented out code:
  // messed up on some tablets -
// sm: Small screens (>= 640px)
// md: Medium screens (>= 768px)
// lg: Large screens (>= 1024px)
// xl: Extra-large screens (>= 1280px)
// 2xl: Extra-extra-large screens (>= 1536px)

// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// const {data: questions, isLoading, isError, error} = useQuery({
//   queryKey: ['questions'],
//   queryFn: async () => {
//     const data = await axios.get('https://songsexcerpt.mohd.app/api/v1/getRandomExcerpt');
//     return data;
//   },
// });



// themometer component

//   function getGradientColor(height) {
  //   let gradientColor = "";

  //   if (height <= 33) {
  //     const red = 238;
  //     const green = Math.round(30 + height * (174 - 30) / 33);
  //     const blue = Math.round(11 + height * (55 - 11) / 33);
  //     gradientColor = `rgb(${red}, ${green}, ${blue})`;
  //   } else if (height <= 66) {
  //     const red = Math.round(238 - (height - 33) * (238 - 228) / 33);
  //     const green = Math.round(174 + (height - 33) * (255 - 174) / 33);
  //     const blue = Math.round(55 + (height - 33) * (145 - 55) / 33);
  //     gradientColor = `rgb(${red}, ${green}, ${blue})`;
  //   } else {
  //     const red = Math.round(228 - (height - 66) * (228 - 0) / 34);
  //     const green = Math.round(255 - (height - 66) * (255 - 0) / 34);
  //     const blue = Math.round(145 - (height - 66) * (145 - 0) / 34);
  //     gradientColor = `rgb(${red}, ${green}, ${blue})`;
  //   }

  //   return `linear-gradient(to bottom, ${gradientColor} ${height}%,  ${gradientColor} ${height}%)`;
  // }


  // word of the day original code- word changed on every refresh
  
  // export default function WordOfTheDay() {
//   // Generate a random index within the range of the JSON data array length
//   const randomIndex = Math.floor(Math.random() * wordOfTheDay.length);

//   // Retrieve the word of the day, definition, and example based on the random index
//   const { word_of_the_day, definition, example } = wordOfTheDay[randomIndex];

//   return (
//     <div className="flex flex-col items-center">
//       <h1 className="text-2xl">Word of The Day</h1>
//       <h1 className="text-2xl text-skin-secondary">{word_of_the_day}</h1>
//       <p className="text-sm sm:text-lg mx-5 text-center">{definition}</p>
//       <p className="italic text-xs sm:text-base mx-5 text-center">"{example}"</p>
//     </div>
//   );
// }



// 1 minute test to see of word changes every minute
// change after 1 minute
// import { useEffect, useState } from 'react';

// export default function WordOfTheDay() {
//   const [wordData, setWordData] = useState(null);

//   useEffect(() => {
//     const storedWord = localStorage.getItem('wordOfTheDay');
//     const storedDate = localStorage.getItem('wordOfTheDayDate');

//     const currentDate = new Date().toISOString();

//     if (storedWord && storedDate && isWithinOneMinute(storedDate, currentDate)) {
//       setWordData(JSON.parse(storedWord));
//     } else {
//       const randomIndex = Math.floor(Math.random() * wordOfTheDay.length);
//       const { word_of_the_day, definition, example } = wordOfTheDay[randomIndex];
//       const newWordData = { word_of_the_day, definition, example };

//       localStorage.setItem('wordOfTheDay', JSON.stringify(newWordData));
//       localStorage.setItem('wordOfTheDayDate', currentDate);

//       setWordData(newWordData);
//     }
//   }, []);

//   if (!wordData) {
//     return <div>Loading...</div>;
//   }

//   const { word_of_the_day, definition, example } = wordData;

//   return (
//     <div className="flex flex-col items-center">
//       <h1 className="text-2xl">Word of The Day</h1>
//       <h1 className="text-2xl text-skin-secondary">{word_of_the_day}</h1>
//       <p className="text-sm sm:text-lg mx-5 text-center">{definition}</p>
//       <p className="italic text-xs sm:text-base mx-5 text-center">"{example}"</p>
//     </div>
//   );
// }

// function isWithinOneMinute(date1, date2) {
//   const ONE_MINUTE = 60 * 1000; // 1 minute in milliseconds

//   const diff = Math.abs(new Date(date1) - new Date(date2));
//   return diff <= ONE_MINUTE;
// }


// useGet fronm hooks folder
// const token = localStorage.getItem('tokenData');
      // console.log('Token:', token);
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('tokenData')}`,
      //   },
      // };


// from signup page, may be useful if we change the alert
 // check if user is authenticated if so redirect to home page
  // const auth = useAuth();
  // if(auth.isAuthenticated) {
  //   return <Navigate to="/" />;
  // }

// moodMap popup functionality
  // const [sharePopup, setSharePopup] = useState(false); // set the initial state of the share popup to false
  // const [popupDone, setPopupDone] = useState(false); // set the initial state of the popup done to false
// from within the moodPercentage function
// if (moodPercentageVariable < 40 && popupDone === false) {
//   // if the mood is less than 40, set the share popup to true and set the popup done to true
//   setTimeout(() => {
//     // set a timeout to show the popup after 1 second
//     // if(confirm("Looks like you are having a tough week, would you like us to let someone know?")){
//     //   handleEmail()
//     // }
//   }, 1000);
//   setSharePopup(true); // set the share popup to true
//   setPopupDone(true); // set the popup done to true
// }

// moodMap old mood rating function:
  // function moodPercentage() {
  //   let mood = moodData[0].posts[0].mood_rating;
  //   // turn mood into a percentage
  //   mood = (mood - 1) * 20;
  //   return mood;
  // }
  // create a function to get the mood data from the backend (json in the meantime)
  // convert rating of 1 -5 into a percentage, moodData[0].posts[0].mood_rating to send to the thermometer

  // export default function WordOfTheDay() {
//   // Generate a random index within the range of the JSON data array length
//   const randomIndex = Math.floor(Math.random() * wordOfTheDay.length);

//   // Retrieve the word of the day, definition, and example based on the random index
//   const { word_of_the_day, definition, example } = wordOfTheDay[randomIndex];

//   return (
//     <div className="flex flex-col items-center">
//       <h1 className="text-2xl">Word of The Day</h1>
//       <h1 className="text-2xl text-skin-secondary">{word_of_the_day}</h1>
//       <p className="text-sm sm:text-lg mx-5 text-center">{definition}</p>
//       <p className="italic text-xs sm:text-base mx-5 text-center">"{example}"</p>
//     </div>
//   );
// }