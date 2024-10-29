export default function pair(players) {
  const pairs = [];
  const unpaired = new Set(players.map(player => player.id)); // Unpaired player IDs

  // Loop through the sorted players
  for (let i = 0; i < players.length; i++) {
    const player1 = players[i];

    // Skip player1 if they have already been paired
    if (!unpaired.has(player1.id)) continue;

    // Try to find an opponent for player1
    for (let j = i + 1; j < players.length; j++) {
      const player2 = players[j];

      // Skip player2 if they have already been paired
      if (!unpaired.has(player2.id)) continue;

      // Check if player1 and player2 have already played against each other
      if (!player1.opponents.includes(player2.id) && !player2.opponents.includes(player1.id)) {
        // Pair player1 and player2
        pairs.push({ player1, player2 });

        // Mark them as paired
        unpaired.delete(player1.id);
        unpaired.delete(player2.id);

        // Exit the inner loop once a pair is found
        break;
      }
    }
  }

  // Handle any unpaired player (bye, if odd number of players)
  if (unpaired.size > 0) {
    const remainingPlayers = Array.from(unpaired);
    if (remainingPlayers.length === 1) {
      const byePlayer = players.find(player => player.id === remainingPlayers[0]);
      pairs.push({ player1: byePlayer, player2: null }); // Bye round
    }
  }

  return pairs;
}