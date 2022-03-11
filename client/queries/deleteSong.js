import { gql } from '@apollo/client';

const DELETE_SONG = gql`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default DELETE_SONG;
