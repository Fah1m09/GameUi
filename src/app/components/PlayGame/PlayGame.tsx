import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useAppSelector } from "../../../hooks/useReduxHooks";
import { iPlayer } from "../../../types/iPlayer";
import PlayerScore from "./PlayerScore";

type iPly = {
  id: number;
  name: string;
  score?: number;
};

export default function PlayGame() {
  const [playerData, setPlayerData] = useState<string>("");
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const playerList = useAppSelector((state) => state.game.players);
  const gameList = useAppSelector((state) => state.game.games);
  const scoreList = useAppSelector((state) => state.game.score);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedPlayer(event.target.value);
    const newPlayer: iPlayer = playerList.find(
      (x) => x.id === Number(event.target.value)
    );
  };

  const updatedParticipants: iPly[] = gameList[0].participants.map(
    (participant) => {
      const gameScores = scoreList.filter((s) => s.gameId === gameList[0].id);
      const scoreObject = gameScores.find(
        (s) => s.participantId === participant.id
      );
      // If no score object exists for this participant, return the original participant object
      if (!scoreObject) {
        return participant;
      }
      // Create a new participant object with the updated score property
      return {
        ...participant,
        score: scoreObject.score,
      };
    }
  );

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <TextField
            id="outlined-basic"
            label="Player Name"
            size="small"
            variant="outlined"
            type="text"
            name="Player Name"
            fullWidth
            value={playerData}
            onChange={(e) => setPlayerData(e.target.value)}
          />
          <Button type="submit">Add</Button>
        </form>
      </Grid>

      <Grid item xs={12} md={8} className="Update Score">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Player</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedPlayer}
            label="Select Player"
            onChange={handleChange}
          >
            {playerList.map((plr) => (
              <MenuItem key={plr.id} value={plr.id}>
                {plr.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {updatedParticipants.map((game) => (
          <PlayerScore key={game.id} game={game} gid={gameList[0].id} />
        ))}
      </Grid>

      <Grid item xs={12} md={4} className="Standings">
        <TableContainer component={Paper} variant="outlined">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {updatedParticipants.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}