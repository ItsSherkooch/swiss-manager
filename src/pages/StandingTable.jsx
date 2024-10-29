import React, {useEffect, useMemo} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import sortPlayers from '../swiss-functions/sort';
import pair from '../swiss-functions/pair';
import { useNavigate } from 'react-router-dom';
import { matchActions } from '../redux/store';
import StandingTableComp from '../components/StandingTableComp';

export default function StandingTablePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const players = useSelector(state => state.match.players)
  const thisRoundNo = useSelector(state => state.match.thisRoundNo)
  const roundsCount = useSelector(state => state.match.roundsNo);

  const sortedPlayers = useMemo(() => sortPlayers(players), [players]);
  
  function handleClickOnPair() {
    dispatch(matchActions.setPaired(pair(sortedPlayers)))
    navigate('../round-result')
  }

  return (
    <div>
      <StandingTableComp sortedPlayers={sortedPlayers} />
      {
        thisRoundNo <= roundsCount &&
        <button onClick={handleClickOnPair}>Pair</button>
      }
    </div>
  )
}
