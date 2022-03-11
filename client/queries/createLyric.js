import { gql } from '@apollo/client';

const CREATE_LYRIC = gql`
  mutation AddLyricToSong($content: String!, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
    }
  }
`;

export default CREATE_LYRIC;
