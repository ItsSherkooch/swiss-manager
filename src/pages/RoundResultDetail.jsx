import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export default function RoundResultDetailPage() {
  const params = useParams();
  const games = useSelector(state => state.match.games);
  const roundNumber = parseInt(params.roundNumber) - 1; 

  const roundGames = games[roundNumber] || [];

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
          {roundGames.length > 0 ? (
            roundGames.map((game, id) => (
              <tr key={`${game.id}-${id}`} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{id + 1}</td>
                <td className="px-4 py-2 border">{game.game.player1.name}</td>
                <td className="px-4 py-2 border">{game.result}</td>
                <td className="px-4 py-2 border">{game.game.player2.name}</td>
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
  );
}
