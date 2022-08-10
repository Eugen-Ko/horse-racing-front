import { Box, Typography } from "@mui/material";

export const Header = ({ playerName }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "40px",
        backgroundColor: "#1976d2",
        display: "flex",
        alignItems: "center",
        boxShadow: "0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)",
        marginBottom: "40px",
      }}
    >
      <Typography sx={{ color: "white", marginLeft: "50px" }}>
        {`Welcome ${playerName}`}
      </Typography>
    </Box>
  );
};
