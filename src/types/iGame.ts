type iGameScores = {
  playerId: number;
  name: string;
  score: number;
};

export type iGame = {
  id: number;
  gameName: string;
  gameScores?: iGameScores[];
};
