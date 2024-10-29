import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to='/standing-table'>Standing-Table</Link></li>
      </ul>
    </nav>
  )
}
