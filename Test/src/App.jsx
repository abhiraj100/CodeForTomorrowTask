import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Posts from './Posts';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Posts />
      </div>
    </Provider>
  );
}

export default App;
