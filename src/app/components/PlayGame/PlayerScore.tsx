import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { iScore } from "../../../types/iScore";
import { updateScore } from "../../features/Game/gameSlice";

export default function PlayerScore({ game, gid }) {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleIncrease = () => {
    let data: iScore = {
      gameId: gid,
      participantId: game.id,
      score: game.score + parseInt(value),
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
