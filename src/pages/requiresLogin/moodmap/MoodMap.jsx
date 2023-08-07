import AnimatedAvatar from "../../../components/AnimatedAvatar";
import EmojiMM from "./EmojiMM";
import Thermometer from "./Thermometer";
import WordOfTheDay from "./WordOfTheDay";
import ReminderQuote from "./ReminderQuote";
import { useGet } from "../../../hooks/useGet";

export default function MoodMap() {
  const { data: entries} = useGet(); 
  const sortedEntries = entries
    ?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0, 7)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); 

  const uuid = localStorage.getItem("userId");

  function moodPercentage() {
    if (!sortedEntries || sortedEntries.length === 0) {
      return 0;
    }
    let totalMood = 0;
    sortedEntries.forEach((entry) => {
      totalMood += entry.mood; 
    });

    const averageMood = totalMood / sortedEntries.length; 
    const MoodPercentage = averageMood * 25; 
    return MoodPercentage;
  }

  return (
    <div className="flex flex-col justify-between items-center w-full h-full">
      <h1
        data-testid="h1"
        className="text-4xl sm:text-4xl text-center px-4 my-8"
      >
        My Week
      </h1>
      <div className="flex justify-between mb-8">
        {sortedEntries
          ? sortedEntries.map((entry) => (
              <EmojiMM
                data-testid="emoji-component"
                key={entry.id}
                mood={entry.mood}
                date={new Date(entry.createdAt).toLocaleString("en-GB", {
                  weekday: "short",
                })}
              />
            ))
          : null}
      </div>
      <WordOfTheDay data-testid="word-of-the-day" />
      <div className="flex w-full justify-evenly ">
        <Thermometer mood={moodPercentage()} />
        <div className="flex flex-row relative">
          <div className="flex flex-wrap mb-32 text-center items-center justify-center w-36 sm:w-44 sm:max-h-48 sm:max-w-48 bg-contain bg-no-repeat bg-center bg-[url('/speech-bubble.avif')]">
            <ReminderQuote />
          </div>
          <div className="transform -scale-x-100 mt-36 sm:mt-40 mr-4 sm:mr-0">
            <AnimatedAvatar height={20} width={20} smh={32} smw={32}/>
          </div>
        </div>
      </div>
    </div>
  );
}
