import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../src/client/app/components/Home';

//eslint-disable-next-line
it('render compoenent Home', () => {
  const div = document.createElement('div'); //eslint-disable-line
  ReactDOM.render(<Home />, div);
});
