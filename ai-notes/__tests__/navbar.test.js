import { render, screen } from '@testing-library/react';
import { ClerkProvider, UserButton } from '@clerk/clerk-react';
import Navbar from '../src/app/notes/navbar.tsx';
import '@testing-library/jest-dom';

jest.mock('@clerk/clerk-react', () => ({
  ...jest.requireActual('@clerk/clerk-react'),
  UserButton: () => <div>UserButton</div>,
  ClerkProvider: ({ children }) => <div>{children}</div>,
}));

test('renders the navbar', () => {
  render(
    <ClerkProvider>
      <Navbar />
    </ClerkProvider>
  );
  const button = screen.getByRole('button', { name: 'Add Note' });
  expect(button).toBeInTheDocument();
});