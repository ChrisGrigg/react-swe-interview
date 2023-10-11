import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addNote } from "./noteslice";
import { selectAuth } from "../Login/authslice";

export function AddNote() {
  const [input, setInput] = useState<string>("");
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const {
    apiToken,
    user: { id: userId },
  } = auth;

  const handleAddNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addNote({ note: input, userId, apiToken }));
    setInput("");
  };

  return (
    <form onSubmit={handleAddNote}>
      <input type="text" value={input} onInput={(e) => setInput((e.target as HTMLInputElement).value)} />
      <button type="submit">Add Note</button>
    </form>
  );
}
