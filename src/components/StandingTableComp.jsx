import React from 'react'
import { Link } from 'react-router-dom'

export default function StandingTableComp({sortedPlayers}) {
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-500 border border-gray-300">
        <thead>
          <tr className="bg-gray-500">
            <th className="px-4 py-2 border bg-gray-700">#</th>
            <th className="px-4 py-2 border bg-gray-700">Name</th>
            <th className="px-4 py-2 border bg-gray-700">Rating</th>
            <th className="px-4 py-2 border bg-gray-700">Points</th>
            <th className="px-4 py-2 border bg-gray-700">Opponents</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map((player, id) => (
            <tr key={player.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border">{id+1}</td>
              <td className="px-4 py-2 border"><Link to={`../profile/${player.id}`}>{player.name} {player.family}</Link></td>
              <td className="px-4 py-2 border">{player.rating}</td>
              <td className="px-4 py-2 border">{player.score}</td>
              <td className="px-4 py-2 border">{player.opponents}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
