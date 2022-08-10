import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";

import { raceSelectors } from "../../redux/race";
import { ModalMadeBet } from "../modalMadeBet/ModalMadeBet";

export const Hippodrome = ({ onStart, onStop, onRefresh }) => {
  const start = useSelector(raceSelectors.getHorsesList);
  const race = useSelector(raceSelectors.getCurrentRound);
  const isStart = useSelector(raceSelectors.getIsStart);
  const isStop = useSelector(raceSelectors.getIsStop);
  const isRefresh = useSelector(raceSelectors.getIsRefresh);
  const isMadeBet = useSelector(raceSelectors.getIsMadeBet);

  const [modalBet, setModalBet] = useState(false);

  const round = race.length === 0 ? start : race;

  return (
    <Box sx={{ margin: "0 30px" }}>
      {!isMadeBet && (
        <Button
          sx={{ marginBottom: "20px", marginRight: "20px" }}
          variant="contained"
          disabled={isStart}
          onClick={() => {
            setModalBet(true);
          }}
        >
          Let's make a bet
        </Button>
      )}
      {modalBet && (
        <ModalMadeBet modalBet={modalBet} setModalBet={setModalBet} />
      )}
      {isMadeBet && (
        <>
          <Button
            sx={{ marginBottom: "20px", marginRight: "20px" }}
            variant="contained"
            disabled={isStart}
            onClick={() => onStart()}
          >
            Start
          </Button>
          <Button
            sx={{ marginBottom: "20px", marginRight: "20px" }}
            variant="contained"
            disabled={isStop}
            onClick={() => onStop()}
          >
            Stop
          </Button>
          <Button
            sx={{ marginBottom: "20px" }}
            variant="contained"
            disabled={isRefresh}
            onClick={() => onRefresh()}
          >
            Refresh
          </Button>
        </>
      )}
      <Box>
        {round.map((el) => {
          return (
            <Box
              key={el.name}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "1000px",
                  padding: "3px 3px 3px 0",
                  backgroundColor: "#dad8d8",
                  border: "1px solid #000000",
                  marginBottom: "3px",
                  marginRight: "10px",
                }}
              >
                <Box
                  sx={{
                    width: `10px`,
                    height: "10px",
                    backgroundColor: `${el.color}`,
                    // backgroundColor: "red",
                    margin: `10px 0 10px ${el.distance}px`,
                    borderRadius: "5px",
                  }}
                />
              </Box>
              <Typography>{el.name}</Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
