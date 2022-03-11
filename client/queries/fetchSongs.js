import { gql } from '@apollo/client';

const SONG_LIST = gql`
  query GetSongs {
    songs {
      id
      title
    }
  }
`;

export default SONG_LIST;
