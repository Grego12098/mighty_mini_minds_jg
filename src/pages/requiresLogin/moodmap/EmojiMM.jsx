export default function EmojiMM({ mood, date }) {
  const emojis = ["🙁", "😕", "😐", "🙂", "😁"];

  return (
    <div className="flex flex-col items-center">
      <p className="sm:text-base text-sm lg:text-lg text-center">{date}</p>
      <p className="sm:text-4xl text-xl lg:text-5xl px-1 sm:px-2 md:px-4 transition-all duration-300 ease-in-out transform hover:scale-125">
        {emojis[mood]}
      </p>{" "}
    </div>
  );
}
