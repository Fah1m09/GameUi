import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iPlayer } from "../../../types/iPlayer";

type InitialState = {
  games: [];
  players: iPlayer[];
};

const initialState: InitialState = {
  games: [],
  players: [
    { id: 1, name: "John", score: 5 },
    { id: 2, name: "Jane", score: 0 },
  ],
};

const gameSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    fetchPlayer: (state, action: PayloadAction<iPlayer[]>) => {
      state.players = action.payload;
    },
  },
});

export default gameSlice.reducer;
export const { fetchPlayer } = gameSlice.actions;
