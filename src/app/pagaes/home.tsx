import AddIcon from "@mui/icons-material/Add";
import AppsIcon from "@mui/icons-material/Apps";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/useReduxHooks";
import Create from "../components/Create/Create";

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const gameList = useAppSelector((state) => state.game.games);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="container">
      <Grid className="homeContainer" container spacing={2}>
        <Grid item xs={12} md={6}>
          <Button
            onClick={handleClickOpen}
            className="buttonSize"
            size="large"
            startIcon={<AddIcon />}
            variant="outlined"
            fullWidth
          >
            Create New Game
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            className="buttonSize"
            size="large"
            startIcon={<AppsIcon />}
            variant="outlined"
            fullWidth
          >
            Play Existing Game
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table
              sx={{ minWidth: 650, border: "5px" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Game Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {gameList.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>
                      <Link to={`/game/${row.id}`}>{row.gameName}</Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      {open && (
        <Create open={open} handleClose={handleClose} gameList={gameList} />
      )}
    </div>
  );
}
