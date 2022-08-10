import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { Typography } from "@mui/material";

import { ModalWindow } from "../modalWindow/ModalWindow";
import { Header } from "../header/Header";
import { Hippodrome } from "../hippodrome/Hippodrome";
import { raceOperations, raceSelectors } from "../../redux/race";

export const Layout = () => {
  const socket = io("http://localhost:3002");

  const [isOpenModal, setIsOpenModal] = useState(true);
  const [player, setPlayer] = useState("");
  const [winner, setWinner] = useState([]);
  const [winnerStatus, setWinnerStatus] = useState(null);
  const dispatch = useDispatch();
  const isMadeBet = useSelector(raceSelectors.getIsMadeBet);

  const finishChecker = (round) => {
    for (let i = 0; i < round.length; i += 1) {
      if (round[i].distance >= 1000) {
        if (!winner.includes(round[i].name)) {
          setWinner([winner.push(round[i].name)]);
          dispatch(raceOperations.setResult(round[i].name));
        }
      }
    }
    if (winner.length === round.length) {
      socket.emit("stop");
      onStop();
      if (isMadeBet === winner[0].name) {
        setWinnerStatus("You won !!!!");
      } else {
        setWinnerStatus("You lost ......");
      }
    }
  };

  const onStart = () => {
    dispatch(raceOperations.setStart());
    socket.emit("start");
    socket.on("ticker", (round) => {
      dispatch(raceOperations.setCurrentRound(round));
      finishChecker(round);
    });
  };

  const onStop = () => {
    dispatch(raceOperations.setStop());
    socket.emit("stop");
  };

  const onRefresh = () => {
    dispatch(raceOperations.setRefresh());
  };

  useEffect(() => {
    dispatch(raceOperations.setPlayerName(player));
  }, [dispatch, player]);

  useEffect(() => {
    socket.on("listHorses", (horses) =>
      dispatch(raceOperations.setListHorses(horses))
    );
  }, [dispatch, socket]);

  return (
    <>
      {isOpenModal && (
        <ModalWindow
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          setPlayer={setPlayer}
        />
      )}
      {!isOpenModal && (
        <>
          <Header playerName={player} />
          <Hippodrome onStart={onStart} onStop={onStop} onRefresh={onRefresh} />
          {isMadeBet && !winnerStatus && (
            <Typography sx={{ margin: "30px" }}>
              Your choice is {isMadeBet}
            </Typography>
          )}
          {winnerStatus && (
            <Typography
              sx={{ margin: "30px", fontWeight: "bold", color: "red" }}
            >
              {winnerStatus}
            </Typography>
          )}
        </>
      )}
    </>
  );
};
