import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import App from './App';

describe('render <App />', () => {
  it('renders it correctly', () => {
    render(<App />);
  });
});
