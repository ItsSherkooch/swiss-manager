import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialMatchState = { roundsNo: 0, thisRoundNo: 1 ,playersNo: 0, players: [], paired: [], games: [], matchEnd: false, standings: []}

const matchSlice = createSlice({
  name: 'match-properties',
  initialState: initialMatchState,
  reducers: {
    setRounds(state, action) {
      state.roundsNo = action.payload
    },
    setPlayers(state, action) {
      state.players.push(action.payload)
    },
    setPlayersNo(state, action){
      state.playersNo = action.payload
    },
    setPaired(state, action) {
      state.paired.push(action.payload)
    },
    updatePlayerScore(state, action) {
      const { id, points } = action.payload;
      const playerIndex = state.players.findIndex(p => p.id === id);
      if (playerIndex !== -1) {
        // Create a new player object to avoid mutating the original state
        state.players[playerIndex].score += points;
      }  
    },
    addRoundCount(state) {
      if (state.thisRoundNo <= state.roundsNo) {
        state.thisRoundNo++;
      } else {
        state.matchEnd = true
      }
    },
    insertCurRoundGames(state, action) {
      state.games = [...state.games, ...action.payload]
    },
    popCurRoundGames(state) {
      state.games.pop()
    },
    setStandings(state, action) {
      state.standings = [...state.standings, [...action.payload]]
    },
    setOpponent(state, action) {
      const { id, opponent } = action.payload;
      const playerIndex = state.players.findIndex(p => p.id === id);
      if (playerIndex !== -1 && !state.players[playerIndex].opponents.includes(opponent)) {
        // Ensure the opponents array is updated immutably
        state.players[playerIndex] = {
          ...state.players[playerIndex],
          opponents: [...state.players[playerIndex].opponents, opponent]
        };
      }
    },
    addPlayer(state) {
      state.playersNo ++
    },
    removePlayer(state) {
      if (state.playersNo > 2) {
        state.playersNo --
      }
    },
  }
})

const store = configureStore({
  reducer: {
    match: matchSlice.reducer
  }
})

export const matchActions = matchSlice.actions 

export default store;
