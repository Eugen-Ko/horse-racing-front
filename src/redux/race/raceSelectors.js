const getHorsesList = state => state.race.raceState.horses;
const getCurrentRound = state => state.race.raceState.round;
const getResult = state => state.race.raceState.result;
const getIsStart = state => state.race.raceState.isStart;
const getIsStop = state => state.race.raceState.isStop;
const getIsRefresh = state => state.race.raceState.isRefresh;
const getIsMadeBet = state => state.race.raceState.isMadeBet;

const raceSelectors = {
  getHorsesList,
  getCurrentRound,
  getResult,
  getIsStart,
  getIsStop,
  getIsRefresh,
  getIsMadeBet,
}

export default raceSelectors;
