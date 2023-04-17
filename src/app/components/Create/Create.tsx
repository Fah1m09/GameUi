import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { iGame } from "../../../types/iGame";
import { createGame } from "../../features/Game/gameSlice";

export default function Create({ open, handleClose, gameList }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let data: iGame = {
      id: gameList.length + 1,
      gameName: name,
      participants: [],
    };
    dispatch(createGame(data));
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <form onSubmit={(e) => handleSubmit(e)}>
        <DialogTitle>Create New Game</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="name"
            label="Game Name"
            onChange={(e) => setName(e.target.value)}
            type="text"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
