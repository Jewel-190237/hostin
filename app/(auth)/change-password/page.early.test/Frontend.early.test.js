import React from 'react'
import { postResetPassword } from '@/app/helpers/backend';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Frontend from '../page';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";

// Mocking necessary components and hooks
jest.mock("next/link", () => ({ children }) => <div>{children}</div>);
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children }) => <div>{children}</div>,
    button: ({ children }) => <button>{children}</button>,
  },
}));
jest.mock("react-icons/fa", () => ({
  FaEye: () => <span>FaEye</span>,
  FaEyeSlash: () => <span>FaEyeSlash</span>,
}));
jest.mock("antd", () => ({
  message: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));
jest.mock("react-hot-toast", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  Toaster: () => <div>Toaster</div>,
}));
jest.mock("@/app/context/user", () => ({
  useUser: () => ({
    getUser: jest.fn(),
  }),
}));
jest.mock("@/app/helpers/backend", () => ({
  postResetPassword: jest.fn(),
}));

describe('Frontend() Frontend method', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy Paths', () => {
    it('should render the component correctly', () => {
      // Test to ensure the component renders without crashing
      render(<Frontend />);
      expect(screen.getByText('Change your password')).toBeInTheDocument();
    });

    it('should toggle password visibility', () => {
      // Test to ensure password visibility toggles
      render(<Frontend />);
      const toggleButton = screen.getAllByText('FaEye')[0];
      fireEvent.click(toggleButton);
      expect(screen.getAllByText('FaEyeSlash')).toHaveLength(1);
    });

    it('should submit the form successfully', async () => {
      // Test to ensure form submission works correctly
      postResetPassword.mockResolvedValue({
        success: true,
        message: 'Password changed successfully',
      });

      render(<Frontend />);
      fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
        target: { value: 'newpassword' },
      });
      fireEvent.change(screen.getAllByPlaceholderText('Enter your password')[1], {
        target: { value: 'newpassword' },
      });

      fireEvent.click(screen.getByText('Change Password'));

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith('Password changed successfully');
        expect(useRouter().push).toHaveBeenCalledWith('/');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should show error message on failed submission', async () => {
      // Test to ensure error message is shown on failed submission
      postResetPassword.mockResolvedValue({
        success: false,
        message: 'Error changing password',
      });

      render(<Frontend />);
      fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
        target: { value: 'newpassword' },
      });
      fireEvent.change(screen.getAllByPlaceholderText('Enter your password')[1], {
        target: { value: 'newpassword' },
      });

      fireEvent.click(screen.getByText('Change Password'));

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Error changing password');
      });
    });

    it('should disable submit button when loading', () => {
      // Test to ensure submit button is disabled when loading
      render(<Frontend />);
      fireEvent.click(screen.getByText('Change Password'));
      expect(screen.getByText('Loading...')).toBeDisabled();
    });
  });
});