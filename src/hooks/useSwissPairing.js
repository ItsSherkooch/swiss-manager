import { useDispatch, useSelector } from 'react-redux';
import { matchActions } from '../redux/store';
import sortPlayers from '../swiss-functions/sort';

export function useSwissPairing() {
  const dispatch = useDispatch();
  const players = useSelector(state => state.match.players);

  const sortedPlayers = sortPlayers(players);
  const pairs = [];
  const unpaired = new Set(sortedPlayers.map(player => player.id));

  // Pairing logic
  for (let i = 0; i < sortedPlayers.length; i++) {
    const player1 = sortedPlayers[i];

    if (!unpaired.has(player1.id)) continue;

    for (let j = i + 1; j < sortedPlayers.length; j++) {
      const player2 = sortedPlayers[j];

      if (!unpaired.has(player2.id)) continue;

      if (!player1.opponents.includes(player2.id) && !player2.opponents.includes(player1.id)) {
        pairs.push({ player1, player2 });
        unpaired.delete(player1.id);
        unpaired.delete(player2.id);

        dispatch(matchActions.setOpponent({ id: player1.id, opponent: player2.id }));
        dispatch(matchActions.setOpponent({ id: player2.id, opponent: player1.id }));

        break;
      }
    }
  }

  if (unpaired.size > 0) {
    const remainingPlayerId = Array.from(unpaired)[0];
    const byePlayer = sortedPlayers.find(player => player.id === remainingPlayerId);
    pairs.push({ player1: byePlayer, player2: null });
  }

  return pairs;
}
