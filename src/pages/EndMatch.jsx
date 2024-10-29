import React, { useMemo } from 'react'
import StandingTableComp from '../components/StandingTableComp'
import { useSelector } from 'react-redux';
import sortPlayers from '../swiss-functions/sort';



export default function EndMatchPage() {
  const players = useSelector(state => state.match.players)
  const sortedPlayers = useMemo(() => sortPlayers(players), [players]);

  return (
    <div className='flex flex-col justify-center gap-10'>
      <StandingTableComp sortedPlayers={sortedPlayers}/>
      <button className='bg-slate-200 rounded-md p-2 text-black mb-15'>New Tournaument</button>
    </div>
  )
}
