import React from 'react';
import { makeImageFromView } from '@shopify/react-native-skia';
import {
  fireEvent,
  waitFor,
  render,
  screen,
} from '@testing-library/react-native';
import useSign from '../hooks/use-sign';
import SignModal from './sign-modal';

jest.mock('../components/sign', () => {
  return {
    __esModule: true,
    default: () => {
      const MockSign = () => null;
      return <MockSign />;
    },
  };
});

jest.mock('@shopify/react-native-skia', () => ({
  makeImageFromView: jest.fn(),
  ImageFormat: {
    PNG: 'PNG',
  },
}));

jest.mock('../hooks/use-sign');

describe('Render <SignModal/>', () => {
  const mockSetPaths = jest.fn();

  const defaultProps = {
    isOpen: true,
    onAccept: jest.fn(),
    onSetIsOpen: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useSign as jest.Mock).mockReturnValue({
      pan: {},
      paths: [],
      currentPath: null,
      setPaths: mockSetPaths,
    });
  });

  it('Renders correctly when open', () => {
    render(<SignModal {...defaultProps} />);

    expect(screen.getByText('Cancel')).toBeTruthy();
    expect(screen.getByText('Accept')).toBeTruthy();
  });

  it('Handles "Cancel" button press', () => {
    render(<SignModal {...defaultProps} />);
    fireEvent.press(screen.getByText('Cancel'));

    expect(defaultProps.onSetIsOpen).toHaveBeenCalledWith(false);
  });

  it('Disables "Accept" button when no paths exist', () => {
    render(<SignModal {...defaultProps} />);
    const acceptButton = screen.getByTestId('accept-button');
    expect(acceptButton.props.focusable).toBe(false);
  });

  it('Handles "Accept" button press with valid signature', async () => {
    const mockBase64 = 'mock-base64-string';
    const mockImage = {
      encodeToBase64: jest.fn().mockReturnValue(mockBase64),
    };
    (makeImageFromView as jest.Mock).mockResolvedValue(mockImage);

    (useSign as jest.Mock).mockReturnValue({
      pan: {},
      paths: [{ some: 'path' }],
      currentPath: null,
      setPaths: mockSetPaths,
    });

    render(<SignModal {...defaultProps} />);
    fireEvent.press(screen.getByTestId('accept-button'));
    await waitFor(() => {
      expect(defaultProps.onAccept).toHaveBeenCalledWith(
        `data:image/png;base64,${mockBase64}`,
      );
    });

    await waitFor(() => {
      expect(defaultProps.onSetIsOpen).toHaveBeenCalledWith(false);
    });
  });

  it('Handles modal close request', () => {
    render(<SignModal {...defaultProps} />);
    const modal = screen.getByTestId('modal');
    fireEvent(modal, 'onRequestClose');

    expect(defaultProps.onSetIsOpen).toHaveBeenCalled();
  });

  it('Handles failed image creation', async () => {
    (makeImageFromView as jest.Mock).mockResolvedValue(null);
    render(<SignModal {...defaultProps} />);
    fireEvent.press(screen.getByTestId('accept-button'));

    await waitFor(() => {
      expect(defaultProps.onAccept).not.toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(defaultProps.onSetIsOpen).not.toHaveBeenCalled();
    });
  });

  it('Clears paths after successful acceptance', async () => {
    const mockBase64 = 'mock-base64-string';
    const mockImage = {
      encodeToBase64: jest.fn().mockReturnValue(mockBase64),
    };
    (makeImageFromView as jest.Mock).mockResolvedValue(mockImage);

    (useSign as jest.Mock).mockReturnValue({
      pan: {},
      paths: [{ some: 'path' }],
      currentPath: null,
      setPaths: mockSetPaths,
    });

    render(<SignModal {...defaultProps} />);

    fireEvent.press(screen.getByTestId('accept-button'));

    await waitFor(() => {
      expect(mockSetPaths).toHaveBeenCalledWith([]);
    });
  });
});
