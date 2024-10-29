import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { matchActions } from '../redux/store'
import { useNavigate } from 'react-router-dom'
import sortPlayers from '../swiss-functions/sort'

export default function RoundsResultPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const thisRoundNo = useSelector(state => state.match.thisRoundNo)
  const roundsNo = useSelector(state => state.match.roundsNo)
  const paired = useSelector(state => state.match.paired)
  const players = useSelector(state => state.match.players)
  const playersNo = useSelector(state => state.match.playersNo)
  
  const [results, setResults] = useState({})
  const [enableReset, setEnableReset] = useState(false)
  const [curRoundGames, setCurRoundGames] = useState([])
  const [scoresArr, setScoresArr] = useState([])
  const [enableSubmit, setEnableSubmit] = useState(false)
  const [counter, setCounter] = useState(0)
  
  const sortedPlayers = sortPlayers(players);
  const this_round_paired = paired[thisRoundNo - 1]

  function check_if_id_exists(id) {
    const exists = scoresArr.find(score => 
      score.id === this_round_paired[id].player1.id
    );
    return exists
  }
  

  function handleResult(id, result) {
    if (!check_if_id_exists(id)) {
      setResults(prevResults => ({
        ...prevResults,
        [id]: result,
      }))


      switch (result) {
        case '1 - 0':
          setScoresArr((prevScores) => [...prevScores, { id: this_round_paired[id].player1.id, points: 1 }]);
          setCurRoundGames((prevGames) => [...prevGames, {game: this_round_paired[id], result: '1-0'}])
          break;
        case '1/2 - 1/2':
          setScoresArr((prevScores) => [...prevScores, { id: this_round_paired[id].player1.id, points: 0.5 }])
          setScoresArr((prevScores) => [...prevScores, { id: this_round_paired[id].player2.id, points: 0.5 }])
          setCurRoundGames((prevGames) => [...prevGames, {game: this_round_paired[id], result: '1/2-1/2'}])
          break;
        case '0 - 1':
          setScoresArr((prevScores) => [...prevScores, { id: this_round_paired[id].player2.id, points: 1 }])
          setCurRoundGames((prevGames) => [...prevGames, {game: this_round_paired[id], result: '0-1'}])
          break;
        default:
          break;
      }

      dispatch(matchActions.setOpponent({ id: this_round_paired[id].player1.id, opponent: this_round_paired[id].player2.id }))
      dispatch(matchActions.setOpponent({ id: this_round_paired[id].player2.id, opponent: this_round_paired[id].player1.id }))
      setEnableReset(true)
      setCounter((prevCounter) => {
        const newCounter = prevCounter + 1;
        if (newCounter === playersNo / 2) {
          setEnableSubmit(true);
        }
        return newCounter;
      });
      if (counter === playersNo / 2) {
        setEnableSubmit(true)
      }
    }
  }
  
  function handleSubmit() {
    const gamesArr = []
    gamesArr.push(curRoundGames)
    dispatch(matchActions.insertCurRoundGames(gamesArr))
    
    for (let i = 0; i < scoresArr.length; i++) {
      dispatch(matchActions.updatePlayerScore(scoresArr[i]))
    }
    
    dispatch(matchActions.setStandings(sortedPlayers));
    dispatch(matchActions.addRoundCount())
    
    if (thisRoundNo >= roundsNo) {
      navigate('../end-match')
    } else {
      navigate('../standing-table')
    }
  }
  
  function handleReset() {
    setEnableSubmit(false)
    setEnableReset(false)
    setCurRoundGames([])
    setScoresArr([])
    setResults({})
    setCounter(0)
  }

  return (
    <div className='standing-table'>
      Round: {thisRoundNo}
      <table>
        <thead>
          <tr>
            <th>Player 1</th>
            <th>Result</th>
            <th>Player 2</th>
          </tr>
        </thead>
        <tbody>
          { this_round_paired &&
            this_round_paired.map((pair, id) => (
              <tr key={id}>
                <td>{pair.player1.name}</td>
                <td className='p-4'>{enableReset && results[id]}</td>
                <td>{pair.player2.name}</td>
                <td><button onClick={() => handleResult(id, '1 - 0')} className='bg-green-400'>1-0</button></td>
                <td><button onClick={() => handleResult(id, '1/2 - 1/2')} className='bg-slate-400' >draw</button></td>
                <td><button onClick={() => handleResult(id, '0 - 1')} className='bg-red-400'>0-1</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className='flex gap-4'>
        <button onClick={handleSubmit} className={`mt-4 ${enableSubmit ? 'bg-blue-600' : 'bg-gray-600'}`} disabled={!enableSubmit}>submit</button>
        <button onClick={handleReset} className={`mt-4 ${enableReset ? 'bg-blue-600' : 'bg-gray-600'}`} disabled={!enableReset}>reset</button>
      </div>
    </div>
  )
}
