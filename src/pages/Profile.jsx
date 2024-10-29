import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export default function ProfilePage() {

  const params = useParams()
  const playerId = params.playerId
  
  const player = useSelector(state => state.match.players[playerId])
  const playerOpponent = useSelector(state => state.match.players)

  const opponents = player.opponents

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-500 border border-gray-300">
        <thead>
          <tr className="bg-gray-500">
            <th className="px-4 py-2 border bg-gray-700">#</th>
            <th className="px-4 py-2 border bg-gray-700">White</th>
            <th className="px-4 py-2 border bg-gray-700">Result</th>
            <th className="px-4 py-2 border bg-gray-700">Black</th>
          </tr>
        </thead>
        <tbody>
          {opponents.length > 0 ? (
            opponents.map((opponent, id) => (
              <tr key={opponent} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{id+1}</td>
                <td className="px-4 py-2 border">{player.name}</td>
                <td className="px-4 py-2 border"> --- </td>
                {/* <td className="px-4 py-2 border">{game.result}</td> */}
                <td className="px-4 py-2 border">{playerOpponent[opponent].name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">No games available for this round</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
