import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';
import SONG_DETAIL from '../queries/fetchSong';

const SongDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(SONG_DETAIL, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div>
      {console.log(data)} <Link to="/songs">Back</Link>
      <h3>{data.song.title}</h3>
      <LyricList lyrics={data.song.lyrics} />
      <LyricCreate id={data.song.id} />
    </div>
  );
};

export default SongDetail;
