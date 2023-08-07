import JournalEntry from "./JournalEntry";
import { useGet } from "../../../hooks/useGet";

export default function Journal() {
  const { data: entries } = useGet(); 
  const filteredEntries = entries?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  ); 

  return (
    <div className=" h-full w-full">
      <h1 className="font-bold text-2xl sm:text-4xl text-center sm:my-8 my-4">
        Check out your past journals
      </h1>
      <div>
        {filteredEntries
          ? filteredEntries?.map((entry) => (
              <JournalEntry
                key={entry.uuid}
                date={new Date(entry.createdAt).toLocaleString("en-GB", {
                  weekday: "short",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                res1={entry.answer_one}
                res2={entry.answer_two}
                res3={entry.answer_three}
                q1={entry.question_one}
                q2={entry.question_two}
                q3={entry.question_three}
                id={entry.uuid}
                share={entry.share}
              />
            ))
          : null}
      </div>
    </div>
  );
}


