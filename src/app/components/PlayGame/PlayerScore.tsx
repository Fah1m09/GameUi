import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { iGame } from "../../../types/iGame";
import { updateScore } from "../../features/Game/gameSlice";

export default function PlayerScore({ game }) {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  console.log(game);

  const handleIncrease = () => {
    let data: iGame = {
      id: 1,
      gameName: "Ludo1",
      gameScores: [
        { playerId: 1, name: "Fahim", score: 10 },
        { playerId: 2, name: "Ruman", score: 0 },
      ],
    };
    dispatch(updateScore(data));
    setValue("0");
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <h3> {game.name}</h3>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Point"
            size="small"
            variant="outlined"
            type="number"
            fullWidth
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Button fullWidth variant="outlined" onClick={handleIncrease}>
            Update
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
