import React from 'react';
import {
  fireEvent,
  waitFor,
  screen,
  render,
} from '@testing-library/react-native';
import SignScreen from './sign-screen';

describe('Render <SignScreen />', () => {
  it('Renders "Sign here!" button correctly', () => {
    render(<SignScreen />);
    const signButton = screen.queryByText('Sign here!');

    expect(signButton).toBeDefined();
  });

  it('Renders "No current Signature" placeholder', () => {
    render(<SignScreen />);
    const noImagePlaceholder = screen.queryByText('No current signature');

    expect(noImagePlaceholder).toBeDefined();
  });

  test('Modal is not displayed', async () => {
    render(<SignScreen />);
    fireEvent.press(screen.getByText('Sign here!'));

    await waitFor(() => {
      const cancelButton = screen.queryByText('Cancel');
      expect(cancelButton).toBeDefined();
    });
  });

  test('Renders the modal when the "Sign here!" button is pressed', async () => {
    render(<SignScreen />);

    let modalWindows = screen.queryByText('Cancel');
    expect(modalWindows).toBeNull();

    fireEvent.press(screen.getByText('Sign here!'));

    await waitFor(() => {
      modalWindows = screen.queryByText('Cancel');
      expect(modalWindows).toBeDefined();
    });
  });
});
