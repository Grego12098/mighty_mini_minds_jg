export default function EmojiWP({ moodRating, selectedMood, handleClick, emoji }) {
  return (
    <button
      className={`text-4xl sm:text-6xl md:text-7xl transition-all duration-300 ease-in-out transform hover:scale-125 ${
        selectedMood === `${moodRating}` ? "animate-pulse" : ""
      }`}
      value={moodRating}
      onClick={(e) => handleClick(e)}
    >
      {emoji}
    </button>
  );
}
