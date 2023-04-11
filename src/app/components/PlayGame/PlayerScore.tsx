import { Button, Grid, TextField } from "@mui/material";

export default function PlayerScore({ player, players, setPlayers }) {
  const handleIncrease = (e) => {
    const dt = players.map((pt) => {
      if (pt.id === player.id) {
        return { ...pt, score: player.score + parseInt(e.target.value) };
      }
      return pt;
    });
    setPlayers(dt);
  };

  return (
    <>
      <Grid item xs={12}>
        {player.name}
        <TextField
          id="outlined-basic"
          label="Increase"
          variant="outlined"
          type="number"
          onChange={(e) => handleIncrease(e)}
        />
        <Button variant="outlined">Update</Button>
      </Grid>
    </>
  );
}
