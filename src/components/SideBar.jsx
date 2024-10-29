import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

export default function SideBar() {
  const location = useLocation();
  const { pathname } = location;
  const thisRoundNo = useSelector(state => state.match.thisRoundNo);
  const roundsCount = useSelector(state => state.match.roundsNo);

  // Check if the current pathname is not equal to '/register-players'
  const showSidebar = pathname !== '/register-players' || '';

  return (
    <>
      { showSidebar && (
        <div className='min-h-2/6 min-w-96 border-2 basis-1/5 bg-cyan-800 flex flex-col p-5 mb-10 rounded-b-2xl'>
          <h2 className='mb-3'>Round {thisRoundNo <= roundsCount ? thisRoundNo : roundsCount}</h2>

          {pathname !== '/tournaument/round-result' ? (
            <>
              <Link to='/tournaument/starting-table'>Starting Table</Link>
              <p>Standings after:</p>
              <br />
              <div className='mb-3'>
                {thisRoundNo - 1 === 0 ? null : Array(thisRoundNo-1).fill().map((_, id) => (
                  <Link key={id + 1} to={`/tournaument/standing-table/${parseInt(id+1) === parseInt(thisRoundNo-1) ? '' : id+1}`}>
                    <span>Rd{id + 1}, </span>
                  </Link>
                ))}
              </div>
              <br />
              <p>Board Pairing:</p>
              <br />
              <div className='mb-3'>
                {thisRoundNo - 1 === 0 ? null : Array(thisRoundNo-1).fill().map((_, id) => (
                  <Link key={id + 1} to={`/tournaument/round-result/${id+1}`}>
                    <span>Rd{id + 1}, </span>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <>
              <p>Starting Table</p>
              <p>Standings after:</p>
              <br />
              <div className='flex mb-3'>
                {thisRoundNo === 0 ? null : Array(thisRoundNo - 1).fill().map((_, id) => (
                  <p key={id + 1}>
                    <span>Rd{id + 1}, </span>
                  </p>
                ))}
              </div>
              <br />
              <p>Board Pairing:</p>
              <br />
              <div className='flex mb-3'>
                {thisRoundNo === 0 ? null : Array(thisRoundNo - 1).fill().map((_, id) => (
                  <p key={id + 1}>
                    <span>Rd{id + 1}, </span>
                  </p>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
