import React from 'react';
import { useMutation } from '@apollo/client';
import LIKE_LYRIC from '../queries/likeLyric';
import { gql } from '@apollo/client';

const LyricList = ({ lyrics }) => {
  const [likeLyric, { error }] = useMutation(LIKE_LYRIC);

  if (error) return `Submission error! ${error.message}`;

  return (
    <ul className="collection">
      {lyrics.map(({ id, content, likes }) => (
        <li key={id} className="collection-item">
          {content}
          <div>
            {likes}
            <i
              className="material-icons"
              onClick={() =>
                likeLyric({
                  variables: { id: id },
                  optimisticResponse: {
                    updateComment: {
                      __typename: 'Mutation',
                      likeLyric: {
                        __typename: 'LyricType',
                        id: id,
                        likes: likes + 1,
                      },
                    },
                  },
                })
              }
            >
              thumb_up
            </i>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default LyricList;
