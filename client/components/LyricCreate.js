import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import CREATE_LYRIC from '../queries/createLyric';
import { gql } from '@apollo/client';

const LyricCreate = ({ id }) => {
  const [content, setContent] = useState('');
  const [addLyricToSong, { loading, error }] = useMutation(CREATE_LYRIC, {
    update(cache, { data: { addLyricToSong } }) {
      cache.modify({
        fields: {
          song(existingSong = []) {
            const newlyricRef = cache.writeFragment({
              data: addLyricToSong,
              fragment: gql`
                fragment NewLyric on Lyric {
                  id
                }
              `,
            });
            return { ...existingSong.lyrics, newlyricRef };
          },
        },
      });
    },
  });

  const formHandler = (event) => {
    event.preventDefault();
    addLyricToSong({ variables: { songId: id, content: content } });
    setContent('');
  };

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <form onSubmit={(event) => formHandler(event)}>
      <label>Add a lyric</label>
      <input value={content} onChange={(event) => setContent(event.target.value)} />
      <input type="submit" value="Enviar" />
    </form>
  );
};

export default LyricCreate;
