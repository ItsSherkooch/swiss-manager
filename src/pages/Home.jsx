import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { matchActions } from '../redux/store';
import { useDispatch } from 'react-redux';
import AlertModal from '../components/AlertModal'; 

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  function submitHandler(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const roundsNo = parseInt(fd.get('rounds'), 10); 
    const playersNo = parseInt(fd.get('players'), 10); 

    if (playersNo <= roundsNo) {
      setModalOpen(true); 
    } else {
      dispatch(matchActions.setRounds(roundsNo));
      dispatch(matchActions.setPlayersNo(playersNo));
      navigate('register-players'); 
    }
  }

  return (
    <div className='flex justify-center items-center border-red-500'>
      <form onSubmit={submitHandler}>
        <div className='flex justify-center items-center gap-2 border-2 p-5 rounded mb-10'>
          <label>Enter the number of rounds:</label>
          <input type="number" defaultValue='5' min='5' max='15' name='rounds' />
        </div>
        <div className='flex flex-col gap-2 border-2 p-5 rounded'>
          <label>Enter the number of players:</label>
          <input type="number" defaultValue='4' min='4' name='players' />
        </div>
        <button type="submit">Submit</button>
      </form>

      {modalOpen && <AlertModal open={modalOpen} 
        handleClose={() => setModalOpen(false)} 
        title='Invalid Input'
        description='The number of players cannot be equal or less than the number of rounds.' />}
    </div>
  );
}
