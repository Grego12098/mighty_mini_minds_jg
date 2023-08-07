export default function EmojiWP({ mood, selectedMood, handleClick, emoji }) {
    console.log(selectedMood);
  return (
    <button
      className={`text-4xl sm:text-6xl md:text-7xl transition-all duration-300 ease-in-out transform hover:scale-125 ${
        mood === selectedMood ? "animate-pulse" : ""
      }`}
      value={mood}
      onClick={(e) => handleClick(e)}
    >
      {emoji}
    </button>
  );
}
