import { iPlayer } from "./iPlayer";

export type iGame = {
  id: number;
  gameName: string;
  participants?: iPlayer[];
};
