import React from 'react'
import { useSelector } from 'react-redux'
import PlayerInputTable from '../components/PlayerInputTable';

export default function PlayersRegisterPage() {
  const rounds = useSelector(state => state.match.roundsNo);
  return (
    <div>
      <h2>Number of Rounds: {rounds}</h2>
      <PlayerInputTable />
    </div>
  )
}
