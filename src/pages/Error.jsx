import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>No such page is available...</p>
      <p>You can go back to the tournament by click on the link below.</p>
      <Link to='../standing-table'>Current Standing</Link>
    </div>
  )
}
