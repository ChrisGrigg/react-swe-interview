import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Note {
  id: number;
  text: string;
}

interface NoteState {
  notes: Note[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface FetchNotesArgs {
  note?: string;
  userId: string;
  apiToken: string;
}

const initialState: NoteState = {
  notes: [],
  status: "idle",
  error: null,
};

export const fetchNotes = createAsyncThunk("notes/fetchNotes",
  async ({ userId, apiToken }: FetchNotesArgs) => {
  const response = await fetch(
    `https://60b793ec17d1dc0017b8a6bc.mockapi.io/users/${userId}`,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiToken}`,
        "content-type": "application/json"
      },
    }
  );
  const data = await response.json();
  return data;
});

export const addNote = createAsyncThunk(
  "notes/addNote",
  async ({ note, userId, apiToken }: FetchNotesArgs) => {
    const response = await fetch(
      `https://60b793ec17d1dc0017b8a6bc.mockapi.io/users/${userId}`,
      {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${apiToken}`,
          "content-type": "application/json"
        },
        body: JSON.stringify(note),
      }
    );
    const data = await response.json();
    return data;
  }
);

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || '';
      })
      .addCase(addNote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes.push(action.payload);
      })
      .addCase(addNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || '';
      });
  },
});

export const selectAllNotes = (state: RootState) => state.note;

export default noteSlice.reducer;
