import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth, LoginStatus } from "../Login/authslice";
import { Note } from "../../models";
import { AddNote } from "./add-note";
import { fetchNotes, selectAllNotes } from "./noteslice";
import { useEffect } from "react";

export function NoteElement() {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const note = useAppSelector(selectAllNotes);

  const {
    apiToken,
    user: { id: userId },
  } = auth;

  useEffect(() => {
    dispatch(fetchNotes({ userId, apiToken }));
  }, [dispatch, userId, apiToken]);

  if (auth.status !== LoginStatus.LOGGED_IN) return null;

  return (
    <div>
      {note.notes.length > 0 &&
        note.notes.map((note: Note) => (
          <NoteField
            key={note.id}
            text={note.text}
            id={note.id}
          />
        ))}
      {note.notes.length === 0 && "No notes yet"}
      <AddNote />
    </div>
  );
}

function NoteField(props: any) {
  return <textarea
    defaultValue={props.text.text || "Note goes here..."}
  ></textarea>;
}
