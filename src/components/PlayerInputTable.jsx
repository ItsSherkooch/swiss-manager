import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { matchActions } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import AlertModal from './AlertModal';

export default function PlayerInputTable() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const playersNo = useSelector(state => state.match.playersNo);
  const roundsNo = useSelector(state => state.match.roundsNo)
  const playersCount = parseInt(playersNo)

  const [modalOpen, setModalOpen] = useState(false)

  function handleSubmit(event) {
    const fd = new FormData(event.target)

    for (let i = 0; i < playersCount; i++) {
      const id = i
      const name = fd.get(`name-${i}`);
      const family = fd.get(`family-${i}`);
      const rating = fd.get(`rating-${i}`);
      
      dispatch(matchActions.setPlayers({ id, name, family, rating, score: 0, opponents: [] }))
    } 
    navigate('/tournaument/standing-table')
  }

  function addPlayer(event) {
    dispatch(matchActions.addPlayer())
    event.preventDefault()
  }
  
  function removePlayer(event) {
    if (roundsNo < playersCount-1) {
      dispatch(matchActions.removePlayer())
      event.preventDefault()
    } else {
      event.preventDefault()
      setModalOpen(true)
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit} className='flex gap-5'> 
      <table className='mt-5'>
        <thead >
          <tr>
            <th>Name</th>
            <th>Family</th>
            <th>Rating</th>
          </tr>
        </thead>
        <AnimatePresence>
          <tbody>
              {
                Array(playersCount).fill().map((_, id) => (
                  <motion.tr 
                  key={id} 
                  layout
                  initial={{opacity: 0, y: -20}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: +20, transition:{duration: 0.3}}}
                  transition={{duration: 0.5, type: 'spring'}}
                  >
                    <AnimatePresence key={id}>
                      <td><input type="text" name={`name-${id}`} required/></td>
                      <td><input type="text" name={`family-${id}`} required/></td>
                      <td><input type="text" name={`rating-${id}`} required/></td>
                    </AnimatePresence>
                  </motion.tr>
                ))
              }
          </tbody>
        </AnimatePresence>
      </table>
      <div className='flex flex-col mt-10 gap-4'>
        <button className='' onClick={addPlayer}>Add Player</button>
        <button className='' onClick={removePlayer}>Remove Player</button>
        <button className=''>Submit</button>
      </div>
    </form>
    {modalOpen && <AlertModal open={modalOpen} 
      handleClose={() => setModalOpen(false)} 
      title='Invalid Input'
      description='The number of players cannot be equal or less than the number of rounds.' />}
    </>
  )
}
