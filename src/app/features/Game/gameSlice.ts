import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iGame } from "../../../types/iGame";
import { iPlayer } from "../../../types/iPlayer";
import { iScore } from "../../../types/iScore";

type InitialState = {
  games: iGame[];
  players: iPlayer[];
  score: iScore[];
};

const initialState: InitialState = {
  games: [
    {
      id: 1,
      gameName: "Ludo1",
      participants: [
        { id: 1, name: "Fahim" },
        { id: 2, name: "Ruman" },
      ],
    },
  ],
  players: [
    { id: 1, name: "Fahim" },
    { id: 2, name: "Ruman" },
    { id: 3, name: "Fozol" },
    { id: 4, name: "Siam" },
    { id: 5, name: "Mahin" },
  ],
  score: [
    { gameId: 1, participantId: 1, score: 0 },
    { gameId: 1, participantId: 2, score: 10 },
  ],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    createPlayer: (state, action: PayloadAction<iPlayer>) => {
      state.players = [...state.players, action.payload];
    },
    createGame: (state, action: PayloadAction<iGame>) => {
      state.games = [...state.games, action.payload];
    },
    deleteGame: (state, action: PayloadAction<number>) => {
      state.games.filter((x) => x.id !== action.payload);
    },
    updateScore: (state, action: PayloadAction<iScore>) => {
      const { score } = state;

      const scoreIndex = score.findIndex(
        (s) =>
          s.gameId === action.payload.gameId &&
          s.participantId === action.payload.participantId
      );

      if (scoreIndex === -1) {
        return state;
      }

      const updatedScore = [
        ...score.slice(0, scoreIndex),
        {
          ...score[scoreIndex],
          score: action.payload.score,
        },
        ...score.slice(scoreIndex + 1),
      ];

      return {
        ...state,
        score: updatedScore,
      };
    },
  },
});

export default gameSlice.reducer;
export const { createPlayer, createGame, updateScore } = gameSlice.actions;
