import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import SONG_LIST from '../queries/fetchSongs';
import DELETE_SONG from '../queries/deleteSong';

const SongList = () => {
  const { loading, error, data } = useQuery(SONG_LIST);
  const [deleteSong] = useMutation(DELETE_SONG, {
    refetchQueries: [SONG_LIST],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <>
      <div>
        <ul className="collection">
          {data.songs.map(({ id, title }) => (
            <li key={id} className="collection-item">
              <Link to={`/songs/${id}`}>{title}</Link>
              <i className="material-icons" onClick={() => deleteSong({ variables: { id: id } })}>
                delete
              </i>
            </li>
          ))}
        </ul>

        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </>
  );
};

export default SongList;
