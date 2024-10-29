export default function startingSortPlayers(players) {
  const sortedBasedOnRating = [...players].sort((a, b) => parseInt(b.rating) - parseInt(a.rating));
  return sortedBasedOnRating
}