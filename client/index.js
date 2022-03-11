import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import SongList from './components/SongList';
import App from './components/App';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

import './style/style.css';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <Routes>
          <Route path="/" exact element={<App />} />
          <Route path="songs" exact element={<SongList />} />
          <Route path="songs/new" exact element={<SongCreate />} />
          <Route path="songs/:id" element={<SongDetail />} />
        </Routes>
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
