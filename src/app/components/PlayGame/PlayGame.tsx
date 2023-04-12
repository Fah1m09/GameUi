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

export default function PlayGame() {
  const [playerData, setPlayerData] = useState<string>("");
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const playerList = useAppSelector((state) => state.game.players);
  const gameList = useAppSelector((state) => state.game.games);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedPlayer(event.target.value);
    const newPlayer: iPlayer = playerList.find(
      (x) => x.id === Number(event.target.value)
    );
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <h3>Create Game Play</h3>
        <h3>Existing Game</h3>
      </Grid>
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

      <Grid item xs={8} className="Update Score">
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
        {gameList[0].gameScores?.map((game) => (
          <PlayerScore key={game.playerId} game={game} />
        ))}
      </Grid>

      <Grid item xs={4} className="Standings">
        <TableContainer component={Paper} variant="outlined">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gameList[0].gameScores?.map((row) => (
                <TableRow
                  key={row.playerId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
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
