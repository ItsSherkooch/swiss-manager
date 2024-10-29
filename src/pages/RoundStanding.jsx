import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import StandingTableComp from '../components/StandingTableComp'

export default function RoundStandingPage() {
  const params = useParams()
  const navigate = useNavigate()
  function handleClick() {
    navigate('../../standing-table')
  }
  const standings = useSelector(state => state.match.standings[params.roundNumber])
  
  return (
    <div>
      <StandingTableComp sortedPlayers={standings} />
      <button onClick={handleClick}>Current Standings</button>
    </div>
  )
}
