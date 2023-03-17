import {
  Button,
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
interface iPlayer {
  id: number;
  name: string;
  score: number;
}

const initialPlayers: iPlayer[] = [
  { id: 1, name: "John", score: 5 },
  { id: 2, name: "Jane", score: 0 },
];

export default function PlayGame() {
  const [players, setPlayers] = useState<iPlayer[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedPlayer(event.target.value);
    const newPlayer: iPlayer = initialPlayers.find(
      (x) => x.id === Number(event.target.value)
    );
    console.log(newPlayer);
    setPlayers([...players, newPlayer]);
  };
  const handleIncrease = (id: number, newScore: number) => {
    const updatedPlayers = players.map((player) => {
      if (player.id === id) {
        return { ...player, score: player.score + newScore };
      } else {
        return player;
      }
    });
    setPlayers(updatedPlayers);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <h3>Create Game Play</h3>
        <h3>Existing Game</h3>
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
            {initialPlayers.map((plr) => (
              <MenuItem value={plr.id}>{plr.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {players.map((player) => (
          <Grid item xs={12}>
            {player.name}
            <TextField
              id="outlined-basic"
              label="Increase"
              variant="outlined"
              type="number"
              onChange={(e) =>
                handleIncrease(player.id, parseInt(e.target.value))
              }
            />

            <Button variant="contained">Update Score</Button>
          </Grid>
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
              {players.map((row) => (
                <TableRow
                  key={row.id}
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
