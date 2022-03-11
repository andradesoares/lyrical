import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import SONG_LIST from '../queries/fetchSongs';
import CREATE_SONG from '../queries/createSong';

const SongCreate = () => {
  const [title, setTitle] = useState('');
  const [addSong, { data, loading, error }] = useMutation(CREATE_SONG, {
    refetchQueries: [SONG_LIST],
  });

  let navigate = useNavigate();

  const formHandler = (event) => {
    event.preventDefault();
    addSong({ variables: { title: title } });
    setTitle('');
    navigate('/songs', { replace: true });
  };

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <Link to="/songs">Back</Link>
      <h2>Create a New Song</h2>
      <form onSubmit={(event) => formHandler(event)}>
        <label>Song Title:</label>
        <input value={title} onChange={(event) => setTitle(event.target.value)} />
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
};

export default SongCreate;
