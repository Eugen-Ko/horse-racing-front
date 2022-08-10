import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import raceActions from './raceActions';

const raceInitialState = {
  playerName: '',
  horses: [],
  round: [],
  result: [],
  isStart: false,
  isStop: true,
  isRefresh: true,
  isMadeBet: null,
};

const createColor = (payload) => {
  return payload.map(el => { return el.color = `#` + Math.floor(Math.random() * 16777215).toString(16) })
}

const copyColor = (state, payload) => {
  for (let i = 0; i < state.horses.length; i += 1) {
    payload[i]['color'] = state.horses[i].color;
  }
  return payload
}

const addWinner = (state, payload) => {
  const res = [...state.result];
  res.push(payload);
  return res
}

const raceState = createReducer(raceInitialState, {
  [raceActions.setPlayerNameSuccess]: (state, { payload }) => {
    return { ...state, playerName: payload }
  },
  [raceActions.setListHorsesSuccess]: (state, { payload }) => {
    createColor(payload);
    return { ...state, horses: [...payload] }
  },
  [raceActions.setCurrentRoundSuccess]: (state, { payload }) => {
    copyColor(state, payload);
    return { ...state, round: [...payload] }
  },
  [raceActions.setResultSuccess]: (state, { payload }) => {
    const res = addWinner(state, payload);
    return { ...state, result: [...res] }
  },
  [raceActions.setStartSuccess]: (state) => {
    return { ...state, isStart: true, isStop: false, isRefresh: true }
  },
  [raceActions.setStopSuccess]: (state) => {
    return { ...state, isStart: true, isStop: true, isRefresh: false }
  },
  [raceActions.setRefreshSuccess]: (state) => {
    return { ...state, round: [], result: [], isStart: false, isStop: true, isRefresh: true, isMadeBet: null }
  },
  [raceActions.setIsMadeBetSuccess]: (state, { payload }) => {
    return { ...state, isMadeBet: payload }
  },
});

// const loading = createReducer(false, {
// });

// const error = createReducer(null, {
// });

export default combineReducers({
  raceState,
  // loading,
  // error,
});