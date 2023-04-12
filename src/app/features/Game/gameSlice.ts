import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iGame } from "../../../types/iGame";
import { iPlayer } from "../../../types/iPlayer";

type InitialState = {
  games: iGame[];
  players: iPlayer[];
};

const initialState: InitialState = {
  games: [
    {
      id: 1,
      gameName: "Ludo1",
      gameScores: [
        { playerId: 1, name: "Fahim", score: 10 },
        { playerId: 2, name: "Ruman", score: 0 },
      ],
    },
  ],
  players: [
    { id: 1, name: "Fahim" },
    { id: 2, name: "Ruman" },
    { id: 3, name: "Fozol" },
  ],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    createPlayer: (state, action: PayloadAction<iPlayer>) => {
      state.players = [...state.players, action.payload];
    },
    updateScore: (state, action: PayloadAction<iGame>) => {
      state.games.map((x) => (x.id === action.payload.id ? action.payload : x));
    },
  },
});

export default gameSlice.reducer;
export const { createPlayer, updateScore } = gameSlice.actions;
