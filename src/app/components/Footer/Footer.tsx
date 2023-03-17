import { Box, Grid } from "@mui/material";

export default function Footer() {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <footer>
      <Box bgcolor="palette.primary">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <p className="footerCopyright">
              Copyright @ {year} Mahmudur Rahman Fahim
            </p>
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
}
