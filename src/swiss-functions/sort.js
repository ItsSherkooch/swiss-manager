export default function sortPlayers(players) {
  const sortedBasedOnRating = [...players].sort((a, b) => parseInt(b.rating) - parseInt(a.rating));
  const sortedBasedOnScore = [...sortedBasedOnRating].sort((a, b) => parseInt(b.score) - parseInt(a.score));
  return sortedBasedOnScore
}