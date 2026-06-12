import '@testing-library/jest-dom';
import React from 'react';

jest.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero component', () => {
  test('renders hero image', () => {
    render(<Hero />);

    const heroImage = screen.getByAltText('Hero Image');

    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute(
      'src',
      'media/images/homeHero.png'
    );
  });
});