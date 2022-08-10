import raceActions from './raceActions';

const setPlayerName = (name) => dispatch => {
  dispatch(raceActions.setPlayerNameSuccess(name));
}

const setListHorses = (horses) => dispatch => {
  dispatch(raceActions.setListHorsesSuccess(horses));
}

const setCurrentRound = (round) => dispatch => {
  dispatch(raceActions.setCurrentRoundSuccess(round));
}

const setResult = (name) => dispatch => {
  dispatch(raceActions.setResultSuccess(name));
}

const setStart = () => dispatch => {
  dispatch(raceActions.setStartSuccess())
}

const setStop = () => dispatch => {
  dispatch(raceActions.setStopSuccess())
}

const setRefresh = () => dispatch => {
  dispatch(raceActions.setRefreshSuccess())
}

const setBet = (name) => dispatch => {
  dispatch(raceActions.setIsMadeBetSuccess(name))
}

const raceOperations = {
  setPlayerName,
  setListHorses,
  setCurrentRound,
  setResult,
  setStart,
  setStop,
  setRefresh,
  setBet
}

export default raceOperations
