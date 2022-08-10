import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

import { raceSelectors, raceOperations } from "../../redux/race";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  backgroundColor: "#fff",
  p: 4,
};

export const ModalMadeBet = ({ modalBet, setModalBet }) => {
  const horses = useSelector(raceSelectors.getHorsesList);
  const [horse, setHorse] = useState(horses[0].name);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setHorse(event.target.value);
  };

  const onSubmit = () => {
    dispatch(raceOperations.setBet(horse));
    setModalBet(false);
  };

  return (
    <Modal
      open={modalBet}
      onClose={() => {}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Pick a favorite...
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <TextField
            select
            label="Select"
            value={horse}
            onChange={handleChange}
            helperText="Please select your favorite"
            variant="standard"
          >
            {horses.map((el) => (
              <MenuItem key={el.name} value={el.name}>
                {el.name}
              </MenuItem>
            ))}
          </TextField>
          <Button onClick={onSubmit} variant="contained">
            Make a choice
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
