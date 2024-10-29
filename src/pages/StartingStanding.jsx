import React from 'react'
import { useSelector } from 'react-redux'
import startingSortPlayers from '../swiss-functions/startingSort'

export default function StartingStandingPage() {
  const players = useSelector(state => state.match.players)
  const startingStandings = startingSortPlayers(players)
  return (
    <div>
      <table className="min-w-full bg-gray-500 border border-gray-300">
        <thead>
          <tr className="bg-gray-500">
            <th className="px-4 py-2 border bg-gray-700">#</th>
            <th className="px-4 py-2 border bg-gray-700">Name</th>
            <th className="px-4 py-2 border bg-gray-700">Family</th>
            <th className="px-4 py-2 border bg-gray-700">Rating</th>
          </tr>
        </thead>
        <tbody>
          {startingStandings.map((player, id) => (
            <tr key={player.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border">{id+1}</td>
              <td className="px-4 py-2 border">{player.name}</td>
              <td className="px-4 py-2 border">{player.family}</td>
              <td className="px-4 py-2 border">{player.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
