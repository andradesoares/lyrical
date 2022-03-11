import { gql } from '@apollo/client';

const SONG_DETAIL = gql`
  query GetSong($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default SONG_DETAIL;
